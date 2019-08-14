import './com/blue-notice.js'
import './views/pinned-bookmarks.js'
import './views/bookmarks.js'
import './views/websites.js'
import './views/search.js'
import './views/setup.js'
import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import * as cloudMenu from './com/cloud-menu.js'
import * as QP from './lib/query-params.js'
import mainCSS from '../css/main.css.js'

const profiles = navigator.importSystemAPI('unwalled-garden-profiles')

const VIEWS = ['pins', 'bookmarks', 'websites', 'search', 'setup']

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
      <div class="views" @set-view=${this.onSetView}>${this.renderView()}</div>
    `
  }

 /*TODO<div id="browser-links">
    <a href="#" @click=${this.onClickCloud}>
      <span class="fas fa-cloud"></span>
    </a>
    </div>*/

  renderHeader () {
    const navItem = (v, label, icon) => {
      return html`
        <button class="transparent tooltip-nodelay" @click=${e => this.setView(v)} title=${label} data-tooltip=${label}>
          <span class="fa-fw ${icon}"></span>
        </button>`
    }
    if (this.view === 'pins') {
      return html`
        <div class="header">
          <img src="beaker://assets/logo">
          <div class="nav">
            ${navItem('bookmarks', 'Bookmarks', 'far fa-star')}
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
    if (this.view === 'websites') return html`<websites-view></websites-view>`
    if (this.view === 'search') return html`<search-view></search-view>`
    if (this.view === 'setup') return html`<setup-view></setup-view>`
    return html`
      <div class="start-view-wrapper">
        ${this.renderHeader()}
        <start-pinned-bookmarks></start-pinned-bookmarks>
      </div>
    `
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
}
StartApp.styles = [mainCSS]

customElements.define('start-app', StartApp)