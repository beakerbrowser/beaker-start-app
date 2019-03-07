import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import {BeakerEditBookmarkPopup} from '/vendor/beaker-app-stdlib/js/com/popups/edit-bookmark.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import {writeToClipboard} from '/vendor/beaker-app-stdlib/js/clipboard.js'
import {bookmarks} from '../tmp-beaker.js'
import pinnedBookmarksCSS from '../../css/com/pinned-bookmarks.css.js'

class PinnedBookmarks extends LitElement {
  static get properties() {
    return { 
      bookmarks: {type: Array}
    }
  }

  constructor () {
    super()
    this.bookmarks = []
    this.load()
  }

  async load () {
    this.bookmarks = await bookmarks.list({filters: {pinned: true}})
  }

  // rendering
  // =

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/common.css">
      <div class="pinned-bookmarks-container">
        <h2><span class="fas fa-thumbtack"></span> Pinned Bookmarks</h2>
        <div class="pinned-bookmarks">
          ${this.bookmarks.map(b => html`
            <a class="pinned-bookmark" href=${b.href} @contextmenu=${e => this.onContextmenuPinnedBookmark(e, b)}>
              <img src=${'beaker-favicon:64,' + b.href} class="favicon"/>
              <div class="title">${b.title}</div>
            </a>
          `)}
        </div>
      </div>
    `
  }

  // events
  // =

  async onContextmenuPinnedBookmark (e, bookmark) {
    e.preventDefault()
    const items = [
      {icon: 'fa fa-external-link-alt', label: 'Open Link in New Tab', click: () => window.open(bookmark.href)},
      {icon: 'fa fa-link', label: 'Copy Link Address', click: () => writeToClipboard(bookmark.href)},
      {icon: 'fa fa-pencil-alt', label: 'Edit', click: () => this.onEditBookmark(bookmark)},
      {icon: 'fa fa-trash', label: 'Delete', click: () => this.onDeleteBookmark(bookmark)}
    ]
    await contextMenu.create({x: e.clientX, y: e.clientY, items, fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'})
  }

  async onEditBookmark (originalBookmark) {
    try {
      // render popup
      var b = await BeakerEditBookmarkPopup.create(originalBookmark)
      
      // make update
      await bookmarks.edit(originalBookmark.href, b)
      await this.load()
    } catch (e) {
      // ignore
      console.log(e)
    }
  }

  async onDeleteBookmark (bookmark) {
    // TODO
    // await beaker.bookmarks.unbookmarkPrivate(bookmark.href)
    // await loadBookmarks()

    async function undo () {
      // await beaker.bookmarks.bookmarkPrivate(bookmark.href, bookmark)
      // await beaker.bookmarks.setBookmarkPinned(bookmark.href, bookmark.pinned)
      // await loadBookmarks()
    }

    toast.create('Bookmark deleted', '', 10e3, {label: 'Undo', click: undo})
  }
}

// styles
// =

PinnedBookmarks.styles = pinnedBookmarksCSS

customElements.define('start-pinned-bookmarks', PinnedBookmarks);