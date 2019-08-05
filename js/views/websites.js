import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import { toNiceUrl } from '/vendor/beaker-app-stdlib/js/strings.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as QP from '../lib/query-params.js'
import { SITE_TYPES, getTypeLabel, getTypeIcon } from '../lib/site-types.js'
import websitesCSS from '../../../css/views/websites.css.js'
import '/vendor/beaker-app-stdlib/js/com/hoverable.js'
import '../com/websites/nav.js'
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
    this.currentView = ''
    this.currentQuery = ''
    this.currentSort = ''
    this.currentWritableFilter = ''
    this.items = []
  }

  reset () {
    document.title = 'My Websites'
    this.currentView = QP.getParam('view', 'websites')
    this.currentQuery = QP.getParam('q', '')
    this.currentSort = QP.getParam('sort', 'recent')
    this.currentWritableFilter = QP.getParam('writable', '')
  }

  async load () {
    this.me = await beaker.users.getCurrent()

    // fetch listing
    var type = this.currentView === 'trash' ? undefined : SITE_TYPES[this.currentView]
    var items = await beaker.archives.list({type, isSaved: this.currentView !== 'trash'})

    // HACK
    // sometimes new archives wont have an mtime yet
    items.forEach(item => {
      if (!item.mtime) item.mtime = Date.now()
    })

    // apply filters
    if (this.currentView === 'websites') {
      // manually filter out known other types
      let knownTypes = Object.values(SITE_TYPES).filter(Boolean)
      items = items.filter(item => !item.type.find(t => knownTypes.includes(t)))
    }
    if (this.currentWritableFilter === 'readonly') {
      items = items.filter(item => !item.isOwner)
    } else if (this.currentWritableFilter === 'writable') {
      items = items.filter(item => item.isOwner)
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
    
    const isViewingTrash = this.currentView === 'trash'
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="layout">
        <div class="left">
          <div class="search-container">
            <input @keyup=${this.onKeyupQuery} placeholder="Search" class="search" value=${this.currentQuery} />
            <i class="fa fa-search"></i>
          </div>
          <websites-nav current=${this.currentView} @change=${this.onChangeView}></websites-nav>
          <websites-writable-filter
            current=${this.currentWritableFilter}
            @change=${this.onChangeWritableFilter}
          ></websites-writable-filter>
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
              : html`
                <div>
                  <button class="primary" @click=${this.onClickNew}><span class="fas fa-fw fa-plus"></span> New Website</button>
                  <button @click=${this.onClickHeaderMenu}><span class="fas fa-fw fa-caret-down"></span></button>
                </div>
              `}
          </div>
          ${!items.length
            ? html`<div class="empty"><div><span class="${isViewingTrash ? 'fas fa-trash' : 'far fa-sad-tear'}"></span></div>No ${this.currentView} found.</div>`
            : ''}
          <div class="listing">
            ${repeat(items, item => this.renderItem(item))}
          </div>
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
            <button @click=${e => this.onClickItemMenu(e, item)}><span class="fas fa-fw fa-ellipsis-h"></span></button>
          </div>
          <div class="title">
            <a href=${item.url}>${item.title}</a>
            ${item.url === this.me.url ? html`<span class="label">This is you!</span>` : ''}
            ${item.isOwner ? '' : html`<span class="label">Read-only</span>`}
          </div>
          ${item.description ? html`<div class="description">${item.description}</div>` : ''}
          ${item.userSettings.localSyncPath ? html`<div class="local-sync-path">${item.userSettings.localSyncPath}</div>` : ''}
          <div class="url"><a href=${item.url}>${toNiceUrl(item.url)}</a></div>
        </div>
        <div class="item-right">
          <div><span class="fa-fw ${getTypeIcon(item.type)}"></span> ${getTypeLabel(item.type)}</div>
          <div><span class="far fa-fw fa-clock"></span> ${timeDifference(item.mtime)}</div>
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

  onChangeView (e) {
    this.currentView = e.detail.view
    QP.setParams({view: this.currentView})
    this.load()
  }

  onClearType (e) {
    this.currentView = undefined
    QP.setParams({type: this.currentView})
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

  onKeyupQuery (e) {
    let q = e.currentTarget.value
    if (this.currentQuery !== q) {
      this.currentQuery = q
      QP.setParams({q})
    }
  }

  onClearQuery (e) {
    this.currentQuery = ''
    QP.setParams({q: ''})
    this.shadowRoot.querySelector('input').value = ''
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

  onClickHeaderMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    contextMenu.create({
      x: rect.right + 4, 
      y: rect.bottom + 8,
      right: true,
      withTriangle: true,
      roomy: true,
      noBorders: true,
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css',
      style: `padding: 4px 0`,
      items: [
        {icon: 'fas fa-fw fa-drafting-compass', label: 'Create New Theme', click: async () => {          
          var archive = await DatArchive.create({title: 'Untitled Theme', type: 'unwalled.garden/theme', prompt: false, template: 'theme'})
          toast.create('Theme created')
          beaker.browser.openUrl(archive.url, {setActive: true, isSidebarActive: true, sidebarApp: 'site'})
          this.load()
        }}
      ]
    })
  }

  async onClickNew () {
    var archive = await DatArchive.create()
    toast.create('Website created')
    beaker.browser.openUrl(archive.url, {setActive: true, isSidebarActive: true, sidebarApp: 'site'})
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
      {icon: 'fas fa-fw fa-external-link-alt', label: 'Open in new tab', click: () => beaker.browser.openUrl(item.url, {setActive: true}) },
      {icon: 'fas fa-fw fa-link', label: 'Copy URL', click: () => {
        writeToClipboard(item.url)
        toast.create('Copied to your clipboard')
      }},
      '-',
      {icon: 'far fa-fw fa-clone', label: 'Duplicate this site', click: async () => {
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
