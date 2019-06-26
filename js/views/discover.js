import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { ifDefined } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/if-defined.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { toNiceUrl, pluralize } from '/vendor/beaker-app-stdlib/js/strings.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import * as QP from '../lib/query-params.js'
import discoverCSS from '../../../css/views/discover.css.js'
import '/vendor/beaker-app-stdlib/js/com/hoverable.js'
import '../com/discover/nav.js'
import '../com/discover/sources.js'
import '../com/discover/tags.js'
import '../com/discover/filters.js'

const profiles = navigator.importSystemAPI('profiles')
const bookmarks = navigator.importSystemAPI('bookmarks')
const follows = navigator.importSystemAPI('unwalled-garden-follows')
const media = navigator.importSystemAPI('unwalled-garden-media')
const tagsAPI = navigator.importSystemAPI('unwalled-garden-tags')
const votes = navigator.importSystemAPI('unwalled-garden-votes')

const STANDARD_SORT_OPTIONS = {
  recent: 'Latest',
  votes: 'Highest voted',
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
    this.tags = []
    this.counts = {}
  }

  reset () {
    // set default params as needed to be safe when the view changes
    if (this.currentView === 'follows') {
      if (!(this.currentSort in FOLLOW_SORT_OPTIONS)) {
        this.currentSort = 'follows'
      }
    } else {
      if (!(this.currentSort in STANDARD_SORT_OPTIONS)) {
        this.currentSort = 'recent'
      }
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

    // fetch content for this view
    var items = []
    var tags = []
    if (this.currentView === 'bookmarks') {
      items = await bookmarks.query({filters: {isPublic: true, authors, tags: this.currentTag}})
      tags = await tagsAPI.listBookmarkTags({filters: {authors}})
    } else if (this.currentView === 'follows') {
      items = (await follows.list({filters: {authors}})).map(({topic}) => topic)
      // remove duplicates:
      items = items.filter((profile, index) => {
        return items.findIndex(profile2 => profile.url === profile2.url) === index
      })
      await Promise.all(items.map(async (profile) => {
        profile.isYou = profile.url === this.user.url
        profile.followers = (await follows.list({filters: {topics: profile.url}})).map(({author}) => author)
        profile.follows = (await follows.list({filters: {authors: profile.url}})).map(({topic}) => topic)
      }))
    } else {
      let subtypes = `unwalled.garden/media#${MEDIA_TYPES[this.currentView]}`
      items = (await media.list({filters: {authors, subtypes, tags: this.currentTag}}))
      tags = await tagsAPI.listMediaTags({filters: {authors, subtypes}})
    }
    tags.sort((a, b) => b.count - a.count)

    // fetch votes
    if (this.currentView !== 'follows') {
      await Promise.all(items.map(async (item) => {
        // TODO
        // when the bookmarks API finally hets updated, remove this `record` thing
        // -prf
        if (item.record) item.url = item.record.url

        item.votes = await votes.tabulate(item.url)
        item.votes.karma = item.votes.upvotes - item.votes.downvotes
        item.votes.user = 0
        if (item.votes.upvoters.find(u => u.url === this.user.url)) {
          item.votes.user = 1
        } else if (item.votes.downvoters.find(u => u.url === this.user.url)) {
          item.votes.user = -1
        }
      }))
    }

    // TEMP sort in memory
    if (this.currentSort === 'alphabetical') {
      items.sort((a, b) => a.title.localeCompare(b.title))
    } else if (this.currentSort === 'recent') {
      items.sort((a, b) => b.createdAt - a.createdAt)
    } else if (this.currentSort === 'follows') {
      items.sort((a, b) => b.followers.length - a.followers.length)
    } else if (this.currentSort === 'votes') {
      items.sort((a, b) => {
        var score = b.votes.karma - a.votes.karma
        return score !== 0 ? score : b.createdAt - a.createdAt
      })
    }

    this.items = items
    this.tags = tags
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
            ${this.currentView === 'follows'
              ? ''
              : html`<start-discover-tags .current=${this.currentTag} .list=${this.tags} @change=${this.onChangeTag}></start-discover-tags>`}
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
    var karma = item.votes ? item.votes.karma : 0
    var upcls = classMap({voted: item.votes && item.votes.user === 1})
    var downcls = classMap({voted: item.votes && item.votes.user === -1})
    var votecls = classMap({voted: item.votes && item.votes.user !== 0})
    return html`
      <div class="item">
        <div class="item-left">
          <div class="voting">
            <button class=${upcls} @click=${e => this.onUserVote(e, 1, item)}><span class="fas fa-fw fa-angle-up"></span></button>
            <span class=${votecls}>${karma || html`<span class="fas fa-fw fa-circle"></span>`}</span>
            <button class=${downcls} @click=${e => this.onUserVote(e, -1, item)}><span class="fas fa-fw fa-angle-down"></span></button>
          </div>
        </div>
        <div class="item-center">
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

  async onUserVote (e, vote, item) {
    // detect vote undo
    if (item.votes.user === vote) {
      vote = 0
    }

    // set vote, update, redraw
    await votes.set(item.url, vote)
    item.votes = await votes.tabulate(item.url)
    item.votes.karma = item.votes.upvotes - item.votes.downvotes
    item.votes.user = vote
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