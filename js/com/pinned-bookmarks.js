import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import {BeakerEditBookmarkPopup} from '/vendor/beaker-app-stdlib/js/com/popups/edit-bookmark.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import {writeToClipboard} from '/vendor/beaker-app-stdlib/js/clipboard.js'

class PinnedBookmarks extends LitElement {
  static get properties() {
    return { 
      pinGridMode: {type: String},
      bookmarks: {type: Array}
    }
  }

  constructor () {
    super()
    this.pinGridMode = localStorage.pinGridMode || 'square-mode'
    this.bookmarks = []

    // DEBUG
    this.bookmarks = [
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548787496000,
        "href": "beaker://search",
        "notes": null,
        "pinOrder": 10,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Search"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "dat://beakerbrowser.com",
        "notes": null,
        "pinOrder": 9,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Beaker Home"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "dat://beakerbrowser.com/docs",
        "notes": null,
        "pinOrder": 8,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Documentation"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "dat://datproject.org",
        "notes": null,
        "pinOrder": 7,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Dat Project"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "dat://taravancil.com/explore-the-p2p-web.md",
        "notes": null,
        "pinOrder": 6,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Explore the p2p Web"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "https://github.com/beakerbrowser/beaker/issues",
        "notes": null,
        "pinOrder": 5,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Report an issue"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "https://hashbase.io",
        "notes": null,
        "pinOrder": 4,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Hashbase"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "https://opencollective.com/beaker",
        "notes": null,
        "pinOrder": 3,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "Support Beaker"
      },
      {
        "_origin": false,
        "_url": false,
        "createdAt": 1548698908000,
        "href": "https://twitter.com/beakerbrowser",
        "notes": null,
        "pinOrder": 2,
        "pinned": true,
        "private": true,
        "tags": [],
        "title": "@BeakerBrowser"
      }
    ]
  }

  // rendering
  // =

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/common.css">
      <div class="pinned-bookmarks-container ${this.pinGridMode}">
        <div class="pinned-bookmarks-config">
          <div class="mode">
            ${this.renderPinGridMode('fas fa-th', 'square-mode')}
            ${this.renderPinGridMode('fas fa-th-large', 'horz-mode')}
          </div>
        </div>
        <div class="pinned-bookmarks">
          ${this.bookmarks.map(b => html`
            <a class="pinned-bookmark" href=${b.href} @contextmenu=${e => this.onContextmenuPinnedBookmark(e, b)}>
              <img src=${'beaker-favicon:64,' + b.href} class="favicon"/>
              <div class="title">${b.title}</div>
            </a>
          `)}
          <a href="#" class="pinned-bookmark explorer-pin" @click=${this.onClickExplorer}>
            <i class="fa fa-ellipsis-h"></i>
          </a>
        </div>
      </div>
    </div>`
  }

  renderPinGridMode (icon, mode) {
    return html`<span class="${mode === this.pinGridMode ? 'active' : ''} ${icon}" @click=${() => this.onSetPinGridMode(mode)}></span>`
  }

  // events
  // =

  onSetPinGridMode (mode) {
    this.pinGridMode = localStorage.pinGridMode = mode
  }

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
      console.log('TODO', b)
  
      // TODO
      // delete old bookmark if url changed
      // if (originalBookmark.href !== b.href) {
      //   await beaker.bookmarks.unbookmarkPrivate(originalBookmark.href)
      // }
  
      // // set the bookmark
      // await beaker.bookmarks.bookmarkPrivate(b.href, b)
      // await beaker.bookmarks.setBookmarkPinned(b.href, b.pinned)
  
      // await loadBookmarks()
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

  onClickExplorer (e) {
    // TODO
    alert('todo')
  }
}

// styles
// =

PinnedBookmarks.styles = css`
.pinned-bookmarks-config {
  text-align: right;
  margin-bottom: 10px;
}

.pinned-bookmarks-config .mode span {
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-left: 2px;
  -webkit-font-smoothing: unset;
  font-size: 15px;
}

.pinned-bookmarks-config .mode span.active {
  color: rgba(0,0,0,0.6);
}

.pinned-bookmarks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  user-select: none;
}

.pinned-bookmark {
  background: #fff;
  text-align: center;
  font-size: .8rem;
  outline: 1px solid #ddd;
}

.pinned-bookmark:hover {
  outline: 1px solid #ddd;
  background: #eee;
}

.pinned-bookmark.sortable-ghost {
  outline: 3px dashed #ddd;
}

.pinned-bookmark .favicon {
  width: 32px;
  height: 32px;
}

.pinned-bookmark .title {
  text-overflow: ellipsis;
  color: rgba(51, 51, 51, 0.9);
}

.explorer-pin {
  outline: 0;
  background: none;
}

.explorer-pin:hover {
  background: #eee;
}

.explorer-pin i {
  color: rgba(0,0,0,.15);
}

@media (min-width: 640px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 740px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 900px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 1100px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(7, 1fr);
  }
}

.pinned-bookmarks-container.square-mode .pinned-bookmark {
  width: 120px;
  height: 120px;
}

.pinned-bookmarks-container.square-mode .pinned-bookmark .favicon {
  margin-top: 30px;
}

.pinned-bookmarks-container.square-mode .pinned-bookmark .title {
  font-size: .675rem;
  max-width: 100px;
  margin: auto;
  margin-top: 10px;
}

.pinned-bookmarks-container.square-mode .pinned-bookmark.explorer-pin i {
  font-size: 45px;
  margin-top: 38px;
}

@media (min-width: 780px) {
  .pinned-bookmarks-container.horz-mode .pinned-bookmarks {
    grid-template-columns: repeat(4, 1fr);
  }
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark {
  display: flex;
  align-items: center;
  padding: 10px;
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark .favicon {
  margin-right: 10px;
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark .title {
  font-size: .8rem;
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark.explorer-pin i {
  font-size: 40px;
  line-height: 27px;
}
`

customElements.define('start-pinned-bookmarks', PinnedBookmarks);