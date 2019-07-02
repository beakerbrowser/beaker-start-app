import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import { toNiceUrl } from '/vendor/beaker-app-stdlib/js/strings.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as QP from '../lib/query-params.js'
import { SITE_TYPES, SITE_TYPES_SINGULAR, getTypeLabel, getTypeIcon } from '../lib/site-types.js'
import websitesCSS from '../../../css/views/websites.css.js'
import '/vendor/beaker-app-stdlib/js/com/hoverable.js'
import '../com/websites/header.js'
import '../com/websites/types.js'
import '../com/websites/writable-filter.js'
import '../com/websites/filters.js'

class WebsitesView extends LitElement {
  static get properties () {
    return {
      items: {type: Array},
      currentQuery: {type: String}
    }
  }

  constructor () {
    super()

    this.me = null
    this.currentCategory = ''
    this.currentType = ''
    this.currentQuery = ''
    this.currentSort = ''
    this.currentWritableFilter = ''
    this.items = []
  }

  reset () {
    document.title = 'My Websites'
    this.currentCategory = QP.getParam('category', 'saved')
    this.currentType = QP.getParam('type', 'websites')
    this.currentQuery = QP.getParam('q', '')
    this.currentSort = QP.getParam('sort', 'recent')
    this.currentWritableFilter = QP.getParam('writable', '')
  }

  async load () {
    this.me = await beaker.users.getCurrent()

    // fetch listing
    var items = await beaker.archives.list({type: SITE_TYPES[this.currentType]})

    // HACK
    // sometimes new archives wont have an mtime yet
    items.forEach(item => {
      if (!item.mtime) item.mtime = Date.now()
    })

    // apply filters
    if (this.currentType === 'websites') {
      // manually filter out known other types
      let knownTypes = Object.values(SITE_TYPES).filter(Boolean)
      items = items.filter(item => !item.type.find(t => knownTypes.includes(t)))
    }
    if (this.currentWritableFilter === 'readonly') {
      items = items.filter(item => !item.isOwner)
    } else if (this.currentWritableFilter === 'writable') {
      items = items.filter(item => item.isOwner)
    }
    if (this.currentCategory === 'saved') {
      items = items.filter(item => item.userSettings.isSaved)
    } else if (this.currentCategory === 'hosting') {
      // TODO
    } else if (this.currentCategory === 'published') {
      // TODO      
    } else if (this.currentCategory === 'trash') {
      items = items.filter(item => !item.userSettings.isSaved)      
    }

    // apply sort
    if (this.currentSort === 'alphabetical') {
      items.sort((a, b) => a.title.localeCompare(b.title))
    } else if (this.currentSort === 'recent') {
      items.sort((a, b) => b.mtime - a.mtime)
    }

    this.items = items
    console.log('loaded', this.items)
  }

  // rendering
  // =

  render () {
    let items = this.items
    
    // apply query filter
    if (this.currentQuery) {
      let q = this.currentQuery.toLowerCase()
      items = items.filter(item => (
        (item.title || '').toLowerCase().includes(q)
        || (item.description || '').toLowerCase().includes(q)
        || (item.url || '').toLowerCase().includes(q)
        || (item.userSettings.localSyncPath || '').toLowerCase().includes(q)
      ))
    }
    
    const isViewingTrash = this.currentCategory === 'trash'
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <websites-header
        category=${this.currentCategory}
        query=${this.currentQuery}
        @change-category=${this.onChangeCategory}
        @change-query=${this.onChangeQuery}
      ></websites-header>
      <div class="layout">
        <div class="left">
          <websites-types current=${this.currentType} @change=${this.onChangeType}></websites-types>
        </div>
        <div class="center">
          <div class="center-header">
            <websites-filters
              sort=${this.currentSort}
              query=${this.currentQuery}
              writable=${this.currentWritableFilter}
              @change-sort=${this.onChangeSort}
              @clear-query=${this.onClearQuery}
              @clear-writable=${this.onClearWritableFilter}
            ></websites-filters>
            ${isViewingTrash
              ? html`<button class="primary" @click=${this.onEmptyTrash}><span class="fas fa-fw fa-trash"></span> Empty trash</button>`
              : html`<button class="primary" @click=${this.onClickNew}><span class="fas fa-fw fa-plus"></span> New ${SITE_TYPES_SINGULAR[this.currentType]}</button>`}
          </div>
          ${!items.length
            ? html`<div class="empty"><div><span class="${isViewingTrash ? 'fas fa-trash' : 'far fa-sad-tear'}"></span></div>No ${this.currentType} found.</div>`
            : ''}
          <div class="listing">
            ${repeat(items, item => this.renderItem(item))}
          </div>
        </div>
        <div class="right">
          <websites-writable-filter
            current=${this.currentWritableFilter}
            @change=${this.onChangeWritableFilter}
          ></websites-writable-filter>
        </div>
      </div>
    `
  }

  renderItem (item) {
    return html`
      <div class="item" @contextmenu=${e => this.onContextMenuSite(e, item)}>
        <div class="item-left">
          <img src="asset:thumb:${item.url}?cache_buster=${Date.now()}">
        </div>
        <div class="item-center">
          <div class="ctrls">
            <button @click=${e => { window.location = `beaker://editor/${item.url}` }}><span class="far fa-fw fa-edit"></span> Site Editor</button>
            <button @click=${e => this.onClickItemMenu(e, item)}><span class="fas fa-fw fa-ellipsis-h"></span></button>
          </div>
          <div class="title">
            <a href=${item.url}>${item.title}</a>
            ${item.url === this.me.url ? html`<span class="label">This is you!</span>` : ''}
          </div>
          ${item.description ? html`<div class="description">${item.description}</div>` : ''}
          ${item.userSettings.localSyncPath ? html`<div class="local-sync-path">${item.userSettings.localSyncPath}</div>` : ''}
          <div class="url"><a href=${item.url}>${toNiceUrl(item.url)}</a></div>
        </div>
        <div class="item-right">
          <div><span class="fa-fw ${getTypeIcon(item.type)}"></span> ${getTypeLabel(item.type)}</div>
          <div><span class="far fa-fw fa-clock"></span> ${timeDifference(item.mtime)}</div>
          ${item.isOwner ? '' : html`<div><span class="label">Read-only</span></div>`}
        </div>
      </div>
    `
  }

  // events
  // =

  onChangeCategory (e) {
    this.currentCategory = e.detail.category
    QP.setParams({category: this.currentCategory})
    this.load()
  }

  onChangeSort (e) {
    this.currentSort = e.detail.sort
    QP.setParams({sort: this.currentSort})
    this.load()
  }

  onChangeType (e) {
    this.currentType = e.detail.type
    QP.setParams({type: this.currentType})
    this.load()
  }

  onClearType (e) {
    this.currentType = undefined
    QP.setParams({type: this.currentType})
    this.load()
  }

  onChangeWritableFilter (e) {
    this.currentWritableFilter = e.detail.writable
    QP.setParams({writable: this.currentWritableFilter})
    this.load()
  }

  onClearWritableFilter (e) {
    this.currentWritableFilter = ''
    QP.setParams({writable: this.currentWritableFilter})
    this.load()
  }

  onChangeQuery (e) {
    let q = e.detail.query
    if (this.currentQuery !== q) {
      this.currentQuery = q
      QP.setParams({q})
    }
  }

  onClearQuery (e) {
    this.currentQuery = ''
    QP.setParams({q: ''})
    this.shadowRoot.querySelector('websites-header').clearSearch()
  }

  onContextMenuSite (e, item) {
    e.preventDefault()
    e.stopPropagation()

    this.showMenu(item, e.clientX, e.clientY, true)
  }

  onClickItemMenu (e, item) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    this.showMenu(item, rect.right + 4, rect.bottom + 8, false)
  }

  async onClickNew () {
    await DatArchive.create({type: SITE_TYPES[this.currentType]})
    this.load()
  }

  async onEmptyTrash () {
    if (!confirm('Empty your trash? This will delete the sites from you computer.')) {
      return
    }
    await beaker.archives.clearGarbage()
    this.load()
  }

  showMenu (item, x, y, isContextMenu) {
    var items = [
      {icon: 'fas fa-fw fa-external-link-alt', label: 'Open in new tab', click: () => window.open(item.url) },
      {icon: 'far fa-edit', label: 'Site Editor', click: () => { window.location = `beaker://editor/${item.url}` }},
      {icon: 'fas fa-fw fa-link', label: 'Copy URL', click: () => {
        writeToClipboard(item.url)
        toast.create('Copied to your clipboard')
      }},
      '-',
      {icon: 'fas fa-fw fa-code-branch', label: 'Fork this site', click: async () => {
        await DatArchive.fork(item.url)
        this.load()
      }}
    ]
    if (item.url !== this.me.url) {
      items.push('-')
      if (item.userSettings.isSaved) {
        items.push({icon: 'fas fa-trash', label: 'Move to trash', click: async () => {
          await beaker.archives.remove(item.url)
          toast.create('Moved to trash')
          this.load()
        }})
      } else {
        items.push({icon: 'fas fa-undo', label: 'Restore from trash', click: async () => {
          await beaker.archives.add(item.url)
          toast.create('Restored')
          this.load()
        }})
      }
    }
  
    contextMenu.create({
      x,
      y,
      right: true,
      withTriangle: !isContextMenu,
      roomy: !isContextMenu,
      noBorders: true,
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css',
      style: `padding: 4px 0`,
      items 
    })
  }
}
WebsitesView.styles = websitesCSS
customElements.define('websites-view', WebsitesView)
