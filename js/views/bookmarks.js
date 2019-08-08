import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import { BeakerEditBookmarkPopup } from '/vendor/beaker-app-stdlib/js/com/popups/edit-bookmark.js'
import { AddPinnedBookmarkPopup } from '/vendor/beaker-app-stdlib/js/com/popups/add-pinned-bookmark.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import _debounce from '/vendor/lodash.debounce.js'
import { profiles, follows, bookmarks } from 'dat://unwalled.garden/index.js'
import bookmarksCSS from '../../css/views/bookmarks.css.js'
import '../com/bookmarks/nav.js'

class BookmarksView extends LitElement {
  static get properties() {
    return {
      source: {type: String},
      sources: {type: Array},
      bookmarks: {type: Array}
    }
  }

  constructor () {
    super()
    this.me = null
    this.source = 'me'
    this.sources = null
    this.bookmarks = []
    this.load()
  }

  reset () {
    document.title = 'My Bookmarks'
  }

  async load () {
    if (!this.sources) {
      this.me = await profiles.me()
      this.sources = (await follows.list({filters: {authors: this.me.url}})).map(({topic}) => topic)
    }

    var bs
    if (this.source === 'me') {
      bs = await bookmarks.query({filters: {isOwner: true}})
    } else {
      bs = await bookmarks.query({filters: {isPublic: true, authors: this.source}})
    }
    bs.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    this.bookmarks = bs
  }

  // rendering
  // =

  render() {
    if (!this.me || !this.bookmarks) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="layout">
        <bookmarks-nav
          me=${this.me.url}
          current=${this.source}
          .sources=${this.sources || []}
          @change=${this.onChangeSource}
        ></bookmarks-nav>
        ${this.bookmarks.length === 0 ? html`
          <div class="empty">No bookmarks have been shared.</div>
        ` : html`
          <div class="bookmarks">
            ${repeat(this.bookmarks, b => b, b => html`
              <a
                class="bookmark"
                href=${b.href}
                @contextmenu=${e => this.onContextmenuBookmark(e, b)}
              >
                <img class="favicon" src="asset:favicon-16:${b.href}">
                <div class="title">${b.title}</div>
                <div class="description">${b.description}</div>
                <div class="tags">${b.tags.map(t => `#${t}`).join(', ')}</div>
              </a>
            `)}
          </div>
        `}
      </div>
    `
  }

  // events
  // =

  onChangeSource (e) {
    this.source = e.detail.source
    this.load()
  }

  async onContextmenuBookmark (e, bookmark) {
    e.preventDefault()
    const items = [
      {icon: 'fa fa-external-link-alt', label: 'Open Link in New Tab', click: () => window.open(bookmark.href)},
      {icon: 'fa fa-link', label: 'Copy Link Address', click: () => writeToClipboard(bookmark.href)},
      {icon: 'fa fa-pencil-alt', label: 'Edit', click: () => this.onEditBookmark(bookmark)},
      {icon: 'fa fa-trash', label: 'Delete', click: () => this.onDeleteBookmark(bookmark)}
    ]
    await contextMenu.create({x: e.clientX, y: e.clientY, items, fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'})
  }

  async onAddBookmark () {
    try {
      // render popup
      var b = await BeakerEditBookmarkPopup.create({
        href: '',
        title: '',
        tags: [],
        pinned: true
      }, {
        fontawesomeSrc: '/vendor/beaker-app-stdlib/css/fontawesome.css'
      })
      
      // make update
      await bookmarks.add(b)
      await this.load()
    } catch (e) {
      // ignore
      console.log(e)
    }
  }

  async onEditBookmark (originalBookmark) {
    try {
      // render popup
      var b = await BeakerEditBookmarkPopup.create(originalBookmark, {
        fontawesomeSrc: '/vendor/beaker-app-stdlib/css/fontawesome.css'
      })
      
      // make update
      await bookmarks.edit(originalBookmark.href, b)
      await this.load()
    } catch (e) {
      // ignore
      console.log(e)
    }
  }

  async onDeleteBookmark (b) {
    try {
      // make update
      await bookmarks.remove(b.href)
      await this.load()
      toast.create('Bookmark deleted')
    } catch (e) {
      // ignore
      console.log(e)
    }
  }
}

// styles
// =

BookmarksView.styles = bookmarksCSS

customElements.define('bookmarks-view', BookmarksView);