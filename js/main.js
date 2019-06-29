import './com/blue-notice.js'
import './views/pinned-bookmarks.js'
import './views/feed.js'
import './views/discover.js'
import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import * as cloudMenu from './com/cloud-menu.js'
import mainCSS from '../css/main.css.js'

const profiles = navigator.importSystemAPI('unwalled-garden-profiles')

const VIEWS = ['pins', 'feed', 'discover']

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
    {
      let u = new URL(window.location)
      let pathname = u.pathname.replace('/', '')
      if (VIEWS.includes(pathname)) {
        this.view = pathname
      }
    }

    // load
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
    } else if (this.view === 'feed') {
      el = this.shadowRoot.querySelector('start-feed')
    } else if (this.view === 'discover') {
      el = this.shadowRoot.querySelector('start-discover')
    }
    el.reset()
    el.load()
  }

  async setView (v) {
    this.view = v
    history.replaceState({}, '', `/${v === 'pins' ? '' : v}`)
    await this.updateCompleted
    this.loadView()
  }

  // rendering
  // =

  render () {
    const navItem = (v, label, icon) => {
      const cls = classMap({pressed: v == this.view, radio: true})
      return html`
        <button class="${cls}" @click=${e => this.setView(v)}>
          <span class="fa-fw ${icon}"></span>
          ${label}
        </button>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="header">
        <div id="nav" class="radio-group">
          ${navItem('pins', 'Pinned', 'far fa-star')}
          ${navItem('feed', 'Feed', 'far fa-user-circle')}
          ${navItem('discover', 'Discover', 'fas fa-search')}
        </div>
        <div id="browser-links">
          <a href="#" @click=${this.onClickCloud}>
            <span class="fas fa-cloud"></span>
          </a>
          <a href="beaker://settings"><img src="asset:favicon-16:beaker://settings"></a>
          ${this.user
            ? html`
              <a class="user-profile" href="#" @click=${this.onClickUserProfile}>
                <img src="asset:thumb:${this.user.url}">
              </a>
            `
            : ''}
        </div>
      </div>
      <div class="views">${this.renderView()}</div>
    `
  }

  renderView () {
    if (this.view === 'feed') return html`<start-feed></start-feed>`
    if (this.view === 'discover') return html`<start-discover></start-discover>`
    return html`<start-pinned-bookmarks></start-pinned-bookmarks>`    
  }

  // events
  // =

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
        {icon: 'far fa-edit', label: 'Edit my profile', click: () => { window.location = 'beaker://settings' }}
      ]
    })
    el.classList.remove('active')
    
  }
}
StartApp.styles = [mainCSS]

customElements.define('start-app', StartApp)