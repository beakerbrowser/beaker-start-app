import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import { BeakerEditBookmarkPopup } from '/vendor/beaker-app-stdlib/js/com/popups/edit-bookmark.js'
import { BeakerExplorerPopup } from '/vendor/beaker-app-stdlib/js/com/popups/explorer.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import _debounce from '/vendor/lodash.debounce.js'
import { bookmarks } from '../tmp-beaker.js'
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
    this.draggedBookmark = null
    this.load()
    window.addEventListener('focus', _debounce(() => {
      // load latest when we're opened, to make sure we stay in sync
      this.load()
    }, 1e3, {leading: true}))
  }

  async load () {
    this.bookmarks = await bookmarks.query({filters: {pinned: true}})
    this.bookmarks.sort((a, b) => b.pinOrder > a.pinOrder ? 1 : -1)
  }

  // rendering
  // =

  render() {
    if (!this.bookmarks) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="pinned-bookmarks-container">
        <div class="pinned-bookmarks">
          ${repeat(this.bookmarks, b => b, b => html`
            <a
              class="pinned-bookmark"
              href=${b.href}
              @contextmenu=${e => this.onContextmenuPinnedBookmark(e, b)}
              @dragstart=${e => this.onDragstart(e, b)}
              @dragover=${e => this.onDragover(e, b)}
              @dragleave=${e => this.onDragleave(e, b)}
              @drop=${e => this.onDrop(e, b)}
            >
              <img src=${'beaker-favicon:64,' + b.href} class="favicon"/>
              <div class="title">${b.title}</div>
            </a>
          `)}
          <a class="pinned-bookmark explorer-pin" href="#" @click=${this.onClickExplorer}>
            <i class="fa fa-ellipsis-h"></i>
          </a>
        </div>
      </div>
    `
  }

  // events
  // =

  onClickManagerDropdown (e) {
    e.stopPropagation()
    contextMenu.create({
      x: e.currentTarget.getBoundingClientRect().left,
      y: e.currentTarget.getBoundingClientRect().bottom,
      noBorders: true,
      items: [
        {icon: 'fas fa-bookmark', label: 'Add a bookmark', click: () => this.onAddBookmark()},
        '-',
        {icon: 'fas fa-times', label: 'Remove section', click: () => this.onRemoveSection()}
      ],
      style: 'padding: 4px 0;',
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'
    })
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

  async onDeleteBookmark (bookmark) {
    await bookmarks.remove(bookmark.href)
    await this.load()

    const undo = async () => {
      await bookmarks.add(bookmark)
      await this.load()
    }

    toast.create('Bookmark deleted', '', 10e3, {label: 'Undo', click: undo})
  }

  onDragstart (e, draggedBookmark) {
    this.draggedBookmark = draggedBookmark
    e.dataTransfer.effectAllowed = 'move'
  }

  onDragover (e, b) {
    if (e.dataTransfer.files.length) {
      return // allow toplevel event-handler to handle
    }
    e.preventDefault()

    e.currentTarget.classList.add('drag-hover')
    e.dataTransfer.dropEffect = 'move'
    return false
  }

  onDragleave (e, b) {
    e.currentTarget.classList.remove('drag-hover')
  }

  onDrop (e, dropTargetBookmark) {
    if (e.dataTransfer.files.length) {
      return // allow toplevel event-handler to handle
    }
    e.stopPropagation()
    e.currentTarget.classList.remove('drag-hover')

    if (this.draggedBookmark !== this.dropTargetBookmark) {
      var dropIndex = this.bookmarks.indexOf(dropTargetBookmark)
      var draggedIndex = this.bookmarks.indexOf(this.draggedBookmark)
      
      // remove the dragged bookmark
      this.bookmarks.splice(draggedIndex, 1)

      // ...and reinsert it in front of the drop target
      this.bookmarks.splice(dropIndex, 0, this.draggedBookmark)

      // save new order
      bookmarks.configure({pins: this.bookmarks.map(b => b.href)})
    }

    // rerender
    this.requestUpdate()
    this.draggedBookmark = null
    return false
  }

  async onClickExplorer (e) {
    e.preventDefault()
    try { await BeakerExplorerPopup.create() }
    catch (e) { /*ignore*/ }
  
    // reload bookmarks in case any pins were added
    this.load()
  }
}

// styles
// =

PinnedBookmarks.styles = pinnedBookmarksCSS

customElements.define('start-pinned-bookmarks', PinnedBookmarks);