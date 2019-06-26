import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import feedCSS from '../../../css/views/feed.css.js'
import * as QP from '../lib/query-params.js'
import '/vendor/beaker-app-stdlib/js/com/feed/post.js'
import '/vendor/beaker-app-stdlib/js/com/feed/composer.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

const profiles = navigator.importSystemAPI('profiles')
const posts = navigator.importSystemAPI('unwalled-garden-posts')
const follows = navigator.importSystemAPI('unwalled-garden-follows')
const reactions = navigator.importSystemAPI('unwalled-garden-reactions')

const LOAD_LIMIT = 50

class Feed extends LitElement {
  static get properties () {
    return {
      posts: {type: Array},
      addressBook: {type: Array}
    }
  }

  constructor () {
    super()

    this.user = null
    this.currentView = QP.getParam('view', 'posts')
    this.followedUsers = []
    this.posts = []
    this.addressBook = []
  }

  get feedAuthors () {
    if (!this.user) return []
    return [this.user.url].concat(this.followedUsers)
  }

  async load () {
    if (!['posts', 'addressbook'].includes(this.currentView)) {
      this.currentView = 'posts'
    }
    if (!this.user) {
      this.user = await profiles.me()
    }
    this.followedUsers = (await follows.list({filters: {authors: this.user.url}})).map(({topic}) => topic.url)

    if (this.currentView === 'posts') {
      var p = await posts.list({
        filters: {authors: this.feedAuthors},
        limit: LOAD_LIMIT,
        reverse: true
      })
      await Promise.all(p.map(async (post) => {
        post.reactions = await reactions.tabulate(post.url)
      }))
      this.posts = p
      console.log(this.posts)
    } else if (this.currentView === 'addressbook') {
      let profiles = (await follows.list({filters: {authors: this.feedAuthors}})).map(({topic}) => topic)
      // remove duplicates:
      profiles = profiles.filter((profile, index) => {
        return profiles.findIndex(profile2 => profile.url === profile2.url) === index
      })
      await Promise.all(profiles.map(async (profile) => {
        profile.isYou = profile.url === this.user.url
        profile.isFollowed = !!(await follows.get(this.user.url, profile.url))
        profile.isFollowingYou = !!(await follows.get(profile.url, this.user.url))
        profile.followers = (await follows.list({filters: {topics: profile.url}}))
          .map(({author}) => author)
          .filter(f => f.url !== this.user.url)
          .slice(0, 6)
      }))
      this.addressBook = profiles
      console.log(this.addressBook)
    }
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="layout">
        <div class="nav">
          <start-social-nav current=${this.currentView} @change=${this.onChangeView}></start-social-nav>
        </div>
        <div class="content">
          ${this.currentView === 'posts'
            ? this.renderPosts()
            : this.renderAddressbook()}
        </div>
      </div>
    `
  }

  renderPosts () {
    return html`
      <beaker-feed-composer @submit=${this.onSubmitFeedComposer}></beaker-feed-composer>
      ${repeat(this.posts, post => html`<beaker-feed-post .post=${post} user-url="${this.user.url}"></beaker-feed-post>`)}
      ${this.posts.length === 0
        ? html`
          <div class="empty">
            <div><span class="fas fa-image"></span></div>
            <div>This is your feed. It will show posts from sites you follow.</div>
          </div>
        ` : ''}
    `
  }

  renderAddressbook () {
    return html`
      <div class="listing grid">
        ${repeat(this.addressBook, item => html`
          <beaker-profile-info-card
            .user=${item}
            show-controls
            fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
            @follow=${this.onFollow}
            @unfollow=${this.onUnfollow}
          ></beaker-profile-info-card>
        `)}
      </div>
    `
  }



  // events
  // =

  onChangeView (e) {
    this.currentView = e.detail.view
    QP.setParams({view: this.currentView})
    this.load()
  }

  onFollow (e) {
    // TODO
  }

  onUnfollow (e) {
    // TODO
  }
  async onSubmitFeedComposer (e) {
    // add the new post
    try {
      console.log({body: e.detail.body})
      await posts.add({body: e.detail.body})
    } catch (e) {
      alert('Something went wrong. Please let the Beaker team know! (An error is logged in the console.)')
      console.error('Failed to add post')
      console.error(e)
      return
    }

    // reload the feed to show the new post
    this.load()
  }
}
Feed.styles = feedCSS
customElements.define('start-feed', Feed)