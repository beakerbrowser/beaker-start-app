import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { ifDefined } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/if-defined.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { toNiceUrl, pluralize } from '/vendor/beaker-app-stdlib/js/strings.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import * as QP from '../lib/query-params.js'
import discoverCSS from '../../../css/com/discover.css.js'
import '/vendor/beaker-app-stdlib/js/com/hoverable.js'
import './discover/nav.js'
import './discover/sources.js'
import './discover/tags.js'
import './discover/filters.js'

const profiles = navigator.importSystemAPI('profiles')
const bookmarks = navigator.importSystemAPI('bookmarks')
const follows = navigator.importSystemAPI('unwalled-garden-follows')
const media = navigator.importSystemAPI('unwalled-garden-media')

const STANDARD_SORT_OPTIONS = {
  recent: 'Latest',
  alphabetical: 'Alphabetical'
}

const FOLLOW_SORT_OPTIONS = {
  follows: 'Most followed',
  alphabetical: 'Alphabetical'
}

const MEDIA_TYPES = {
  blogposts: 'blogpost',
  pages: 'page',
  podcasts: 'podcast',
  gifs: 'gif',
  images: 'image',
  music: 'music',
  videos: 'video',
  documents: 'document',
  ebooks: 'ebook',
  files: 'file'
}

class Network extends LitElement {
  static get properties () {
    return {
      items: {type: Array},
      counts: {type: Object},
      currentSearch: {type: String}
    }
  }

  constructor () {
    super()

    this.user = null
    this.currentView = QP.getParam('view', 'bookmarks')
    this.currentSearch = QP.getParam('q', '')
    this.currentTag = QP.getParam('tag') || undefined
    this.currentSource = QP.getParam('source', 'network')
    this.currentSort = QP.getParam('sort', 'recent')
    this.currentSourceTitle = '' // used when currentSource != network
    this.items = []
    this.counts = {}
  }

  reset () {
    // set default params as needed to be safe when the view changes
    if (this.currentView === 'follows') {
      this.currentSort = 'follows'
    } else {
      this.currentSort = 'recent'
    }
    QP.setParams({sort: this.currentSort})
  }

  async load () {
    if (!this.user) {
      this.user = await profiles.me()
    }

    // fetch source users
    var authors
    if (this.currentSource === 'network') {
      let followedUsers = await follows.list({filters: {authors: this.user.url}})
      authors = [this.user.url].concat(followedUsers.map(({topic}) => topic.url))
    } else {
      authors = this.currentSource
      this.currentSourceTitle = (await profiles.get(authors)).title
    }
    var tags = this.currentTag

    // fetch content for this view
    if (this.currentView === 'bookmarks') {
      this.items = await bookmarks.query({filters: {authors, tags}})
    } else if (this.currentView === 'follows') {
      let p = (await follows.list({filters: {authors}})).map(({topic}) => topic)
      // remove duplicates:
      p = p.filter((profile, index) => {
        return p.findIndex(profile2 => profile.url === profile2.url) === index
      })
      await Promise.all(p.map(async (profile) => {
        profile.isYou = profile.url === this.user.url
        profile.followers = (await follows.list({filters: {topics: profile.url}})).map(({author}) => author)
        profile.follows = (await follows.list({filters: {authors: profile.url}})).map(({topic}) => topic)
      }))
      this.items = p
    } else {
      let subtypes = `unwalled.garden/media#${MEDIA_TYPES[this.currentView]}`
      this.items = (await media.list({filters: {authors, subtypes, tags}}))
    }

    // TEMP sort in memory
    if (this.currentSort === 'alphabetical') {
      this.items.sort((a, b) => a.title.localeCompare(b.title))
    } else if (this.currentSort === 'recent') {
      this.items.sort((a, b) => b.createdAt - a.createdAt)
    } else if (this.currentSort === 'follows') {
      this.items.sort((a, b) => b.followers.length - a.followers.length)
    }

    console.log('loaded', this.items)

    // load counts on all media types
    var counts = {}
    for (let k in MEDIA_TYPES) {
      let subtypes = `unwalled.garden/media#${MEDIA_TYPES[k]}`
      counts[k] = (await media.list({filters: {authors, subtypes}})).length
    }
    this.counts = counts
  }

  // rendering
  // =

  render () {
    var currentSource = this.currentSource
    if (currentSource === 'network') currentSource = false
    else currentSource = this.currentSourceTitle

    var items = this.items
    if (this.currentSearch) {
      // TEMP filter in memory
      let q = this.currentSearch.toLocaleLowerCase()
      items = items.filter(item => (
        item.title.toLowerCase().includes(q)
      ))
    }
    
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="layout">
        <div class="nav">
          <input id="search" type="text" placeholder="Search" @keyup=${this.onKeyupSearch}>
          <start-discover-nav .counts=${this.counts} current=${this.currentView} @change=${this.onChangeView}></start-discover-nav>
        </div>
        <div class="content layout">
          <div class="content-center">
          ${this.currentView === 'follows'
            ? html`
              <start-discover-filters
                .sort=${this.currentSort}
                .sortOptions=${FOLLOW_SORT_OPTIONS}
                .source=${currentSource}
                .search=${this.currentSearch}
                @change-sort=${this.onChangeSort}
                @clear-source=${this.onClearSource}
                @clear-search=${this.onClearSearch}
              ></start-discover-filters>
              ${!items.length
                ? html`<div class="empty"><div><span class="far fa-sad-tear"></span></div>No followed sites found.</div>`
                : ''}
              <div class="listing">
                ${repeat(items, item => this.renderSite(item))}
              </div>
            `
            : html`
              <start-discover-filters
                .sort=${this.currentSort}
                .sortOptions=${STANDARD_SORT_OPTIONS}
                .source=${currentSource}
                .tag=${this.currentTag}
                .search=${this.currentSearch}
                @change-sort=${this.onChangeSort}
                @clear-source=${this.onClearSource}
                @clear-tag=${this.onClearTag}
                @clear-search=${this.onClearSearch}
              ></start-discover-filters>
              ${!items.length
                ? html`<div class="empty"><div><span class="far fa-sad-tear"></span></div>No ${this.currentView} found.</div>`
                : ''}
              <div class="listing">
                ${repeat(items, item => this.renderItem(item))}
              </div>
              `}
          </div>
          <div class="content-right">
            <start-discover-sources
              label=${this.currentView === 'follows' ? 'Followed' : 'Created'}
              current=${this.currentSource}
              @change=${this.onChangeSource}
            ></start-discover-sources>
            ${this.currentView === 'follows' ? '' : html`<start-discover-tags .current=${this.currentTag} @change=${this.onChangeTag}></start-discover-tags>`}
          </div>
        </div>
      </div>
    `
  }

  renderSite (item) {
    var connections = getConnections(item)
    var onewayFollows = getOnewayFollows(item)
    return html`
      <div class="site">
        <div class="site-left">
          <a href=${item.url}><img src="asset:thumb:${item.url}"></a>
        </div>
        <div class="site-center">
          <div class="ctrls">
            ${item.isYou
              ? html`
                <span class="label">This is you</span>
              `
              : html`
                <div>
                  ${isFollowed(item, this.user)
                    ? html`
                      <beaker-hoverable @click=${e => this.onUnfollow(e, item)}>
                        <button slot="default" style="width: 90px"><span class="fa fa-check"></span> Following</button>
                        <button slot="hover" style="width: 90px"><span class="fa fa-times"></span> Unfollow</button>
                      </beaker-hoverable>`
                    : html`
                      <button @click=${e => this.onFollow(e, item)}>
                        <span class="fa fa-rss"></span> Follow
                      </button>`}
                </div>
                ${followsYou(item, this.user) ? html`<div><span class="label">Follows you</span></div>` : ''}
              `}
          </div>
          <div class="title"><a href=${item.url}>${item.title}</a></div>
          ${item.description ? html`<div class="description">${item.description}</div>` : ''}
          <div class="url"><a href=${item.url}>${toNiceUrl(item.url)}</a></div>
        </div>
        <div class="site-right">
          <div>
            <span class="fas fa-fw fa-user-friends"></span>
            <a class="tooltip-nodelay" data-tooltip=${ifDefined(connections.length ? connections.map(c => c.title).join(', ') : undefined)}>
              ${connections.length} ${pluralize(connections.length, 'connection')}
            </a>
          </div>
          <div>
            <span class="fas fa-fw fa-user"></span>
            <a class="tooltip-nodelay" data-tooltip=${ifDefined(onewayFollows.length ? onewayFollows.map(f => f.title).join(', ') : undefined)}>
              ${onewayFollows.length} ${pluralize(onewayFollows.length, 'follower')}
            </a>
          </div>
        </div>
      </div>
    `
  }

  renderItem (item) {
    return html`
      <div class="item">
        <div class="item-left">
          <div class="title"><a href=${item.href}>${item.title}</a></div>
          ${item.description ? html`<div class="description">${item.description}</div>` : ''}
          <div class="url"><a href=${item.href}>${toNiceUrl(item.href)}</a></div>
        </div>
        <div class="item-right">
          <div class="provenance">
            <div><span class="fa-fw fas fa-pen-square"></span> <a href=${item.author.url}>${item.author.title}</a></div>
            <div><span class="far fa-fw fa-clock"></span> ${timeDifference(item.createdAt)}</div>
            ${item.tags && item.tags.length
              ? html`
                <div class="tags"><span class="fas fa-fw fa-tags"></span> ${repeat(item.tags, tag => html`<a href="#">#${tag}</a>`)}</div>
              ` : ''}
          </div>
        </div>
      </div>
    `
  }

  // events
  // =

  onChangeView (e) {
    this.currentView = e.detail.view
    QP.setParams({view: this.currentView})
    this.reset()
    this.load()
  }

  onChangeSort (e) {
    this.currentSort = e.detail.sort
    QP.setParams({sort: this.currentSort})
    this.load()
  }

  onChangeTag (e) {
    this.currentTag = e.detail.tag
    QP.setParams({tag: this.currentTag})
    this.load()
  }

  onClearTag (e) {
    this.currentTag = undefined
    QP.setParams({tag: this.currentTag})
    this.load()
  }

  onChangeSource (e) {
    this.currentSource = e.detail.source
    QP.setParams({source: this.currentSource})
    this.load()
  }

  onClearSource (e) {
    this.currentSource = 'network'
    QP.setParams({source: this.currentSource})
    this.load()
  }

  onKeyupSearch (e) {
    let q = e.currentTarget.value
    if (this.currentSearch !== q) {
      this.currentSearch = q
      QP.setParams({q})
    }
  }

  onClearSearch (e) {
    this.currentSearch = ''
    this.shadowRoot.querySelector('#search').value = ''
    QP.setParams({q: ''})
  }

  async onFollow (e, user) {
    await follows.add(user.url)
    toast.create(`Followed ${user.title}`, '', 1e3)
    user.followers.push(this.user)
    this.requestUpdate()
  }

  async onUnfollow (e, user) {
    await follows.remove(user.url)
    toast.create(`Unfollowed ${user.title}`, '', 1e3)
    user.followers = user.followers.filter(f => f.url !== this.user.url)
    this.requestUpdate()
  }
}
Network.styles = discoverCSS
customElements.define('start-discover', Network)

function getConnections (profile) {
  return profile.followers.filter(f1 => profile.follows.find(f2 => f2.url === f1.url))
}

function getOnewayFollows (profile) {
  return profile.followers.filter(f1 => !profile.follows.find(f2 => f2.url === f1.url))
}

function isFollowed (profile, user) {
  return profile.followers.find(f => f.url === user.url)
}

function followsYou (profile, user) {
  return profile.follows.find(f => f.url === user.url)
}