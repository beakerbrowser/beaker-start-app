import './com/blue-notice.js'
import './com/pinned-bookmarks.js'
import './com/feed.js'
import './com/discover.js'
import { profiles } from 'dat://unwalled.garden/index.js'
import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import * as cloudMenu from './com/cloud-menu.js'
import mainCSS from '../css/main.css.js'


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

    // register global event listeners
    this.didGesture = false
    const moveView = dir => {
      let i = VIEWS.indexOf(this.view)
      if (dir < 0 && i > 0) {
        this.setView(VIEWS[i - 1])
      } else if (dir > 0 && i < VIEWS.length - 1) {
        this.setView(VIEWS[i +  1])
      }
    }
    window.addEventListener('wheel', (e) => {
      // handle trackpad swipe
      var absX = Math.abs(e.deltaX)
      if (!this.didGesture && absX > 30) {
        this.didGesture = true
        moveView(e.deltaX)
      }
      if (this.didGesture && absX < 10) {
        this.didGesture = false
      }
    })
  }

  async load () {
    this.user = await profiles.me()
  }

  setView (v) {
    this.view = v
    history.replaceState({}, '', `/${v === 'pins' ? '' : v}`)
    this.shadowRoot.querySelector(`#view-${v}`).classList.remove('hidden')
    this.isTransitioning = true
    setTimeout(() => {
      this.isTransitioning = false
      Array.from(this.shadowRoot.querySelectorAll('.views > *')).map(el => el.classList.add('hidden'))
      this.shadowRoot.querySelector(`#view-${this.view}`).classList.remove('hidden')
    }, 300)
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
      <div class="views-wrapper">
        <div class="views ${this.isTransitioning ? 'transitioning' : ''}" data-view=${this.view}>
          <div id="view-pins"><start-pinned-bookmarks></start-pinned-bookmarks></div>
          <div id="view-feed"><start-feed></start-feed></div>
          <div id="view-discover"><start-discover></start-discover></div>
        </div>
      </div>
    `
  }

  // events
  // =

  updated () {
    if (this.view === 'pins') {
      this.shadowRoot.querySelector('start-pinned-bookmarks').load()
    }
    if (this.view === 'feed') {
      this.shadowRoot.querySelector('start-feed').load()
    }
    if (this.view === 'discover') {
      this.shadowRoot.querySelector('start-discover').load()
    }
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
        {icon: 'fas fa-external-link-alt', label: 'View my website', click: () => { window.location = this.user.url }},
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