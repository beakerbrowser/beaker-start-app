import './com/blue-notice.js'
import './views/pinned-bookmarks.js'
import './views/bookmarks.js'
import './views/websites.js'
import './views/search.js'
import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import * as cloudMenu from './com/cloud-menu.js'
import * as QP from './lib/query-params.js'
import mainCSS from '../css/main.css.js'

const profiles = navigator.importSystemAPI('unwalled-garden-profiles')

const VIEWS = ['pins', 'bookmarks', 'apps', 'websites', 'search']

export class StartApp extends LitElement {
  static get properties() {
    return { 
      view: {type: String},
      user: {type: Object},
      isTransitioning: {type: Boolean}
    }
  }

  constructor () {
    super()
    this.isTransitioning = false
    this.view = 'pins'

    // extract current view from the URL
    const readView = () => {
      let u = new URL(window.location)
      let pathname = u.pathname.replace('/', '')
      if (VIEWS.includes(pathname)) {
        return pathname
      }
      return 'pins'
    }

    window.addEventListener('popstate', e => {
      this.setView(readView())
    })

    // load
    this.view = readView()
    this.user = null
    this.load()
  }

  async load () {
    this.user = await profiles.me()
    this.loadView()
  }

  async loadView () {
    var el
    if (this.view === 'pins') {
      el = this.shadowRoot.querySelector('start-pinned-bookmarks')
    } else {
      el = this.shadowRoot.querySelector(this.view + '-view')
    }
    el.reset()
    el.load()
  }

  async setView (v, params = null) {
    this.view = v
    history.pushState({}, '', `/${v === 'pins' ? '' : v}`)
    if (params) QP.setParams(params, true, true)
    await this.updateCompleted
    this.loadView()
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      ${this.renderHeader()}
      <div class="views" @set-view=${this.onSetView}>${this.renderView()}</div>
    `
  }

 /*TODO<div id="browser-links">
    <a href="#" @click=${this.onClickCloud}>
      <span class="fas fa-cloud"></span>
    </a>
    ${this.user
      ? html`
        <a class="user-profile" href="#" @click=${this.onClickUserProfile}>
          <img src="asset:thumb:${this.user.url}">
        </a>
      `
      : ''}
    </div>*/

  renderHeader () {
    const navItem = (v, label, icon) => {
      const cls = classMap({transparent: true, 'tooltip-nodelay': true})
      return html`
        <button class="${cls}" @click=${e => this.setView(v)} title=${label} data-tooltip=${label}>
          <span class="fa-fw ${icon}"></span>
        </button>`
    }
    if (this.view === 'pins') {
      return html`
        <div class="header">
          <img src="beaker://assets/logo">
          <div class="nav">
            ${navItem('bookmarks', 'My Bookmarks', 'far fa-star')}
            ${navItem('apps', 'My Applications', 'far fa-window-restore')}
            ${navItem('websites', 'My Websites', 'fas fa-sitemap')}
            ${navItem('search', 'Search', 'fas fa-search')}
          </div>
        </div>
      `
    }
    return html``
  }

  renderView () {
    if (this.view === 'bookmarks') return html`<bookmarks-view></bookmarks-view>`
    if (this.view === 'apps') return html`<div>todo</div>`
    if (this.view === 'websites') return html`<websites-view></websites-view>`
    if (this.view === 'search') return html`<search-view></search-view>`
    return html`<start-pinned-bookmarks></start-pinned-bookmarks>`    
  }

  // events
  // =

  onSetView (e) {
    this.setView(e.detail.view, e.detail.params)
  }

  async onClickCloud (e) {
    e.preventDefault()
    e.stopPropagation()

    var el = e.currentTarget
    el.classList.add('active')
    await cloudMenu.create()
    el.classList.remove('active')
  }

  async onClickUserProfile (e) {
    e.preventDefault()
    e.stopPropagation()

    var el = e.currentTarget
    el.classList.add('active')
    var rect = el.getClientRects()[0]
    await contextMenu.create({
      x: rect.right + 4,
      y: rect.bottom + 8,
      right: true,
      withTriangle: true,
      roomy: true,
      noBorders: true,
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css',
      style: `padding: 4px 0`,
      items: [
        {icon: 'fas fa-external-link-alt', label: 'View my website', href: this.user.url },
        {icon: 'fa fa-link', label: 'Copy link', click: () => {
          writeToClipboard(this.user.url)
          toast.create('Copied to your clipboard')
        }},
        '-',
        {icon: 'fas fa-cog', label: 'Settings', click: () => { window.location = 'beaker://settings' }}
      ]
    })
    el.classList.remove('active')
    
  }
}
StartApp.styles = [mainCSS]

customElements.define('start-app', StartApp)