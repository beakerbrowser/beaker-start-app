import './views/pins.js'
import './views/setup.js'
import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as cloudMenu from './com/cloud-menu.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as QP from './lib/query-params.js'
import mainCSS from '../css/main.css.js'
import libTools from '/vendor/library-tools/index.build.js'

const profiles = navigator.importSystemAPI('unwalled-garden-profiles')

const VIEWS = ['pins', 'setup']

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
      el = this.shadowRoot.querySelector('start-pins')
    } else {
      el = this.shadowRoot.querySelector(this.view + '-view')
    }
    el.reset()
    el.load()
    this.requestUpdate()
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

  renderView () {
    if (this.view === 'setup') return html`<setup-view></setup-view>`
    return html`
      <div class="start-view-wrapper">
        <div id="browser-links">
          <a href="beaker://library/?view=bookmarks"><span class="fa-fw far fa-star"></span> Bookmarks</a>
          <a href="beaker://library/?view=people"><span class="fa-fw ${libTools.getFAIcon('people')}"></span> People</a>
          <a href="beaker://library/?view=websites"><span class="fa-fw ${libTools.getFAIcon('websites')}"></span> Websites</a>
          <a href="beaker://library/?view=modules"><span class="fa-fw ${libTools.getFAIcon('modules')}"></span> Modules</a>
          <a href="#" @click=${this.onClickMore}>More <span class="fas fa-caret-down"></span></a>
          <div style="flex: 1"></div>
          <a href="#" @click=${this.onClickNewWebsite}><span class="fas fa-fw fa-plus"></span> New Website</a>
          ${this.user ? html`
          <a href=${this.user.url}><span class="far fa-fw fa-user-circle"></span> My Profile</a>
          ` : ''}
        </div>
        <div class="header">
          <img src="beaker://assets/logo">
        </div>
        <start-pins></start-pins>
      </div>
    `
  }

  // events
  // =

  onSetView (e) {
    this.setView(e.detail.view, e.detail.params)
  }

  onClickMore (e) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    contextMenu.create({
      x: rect.left,
      y: rect.bottom,
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css',
      noBorders: true,
      roomy: true,
      items: [
        {icon: libTools.getFAIcon('templates'), label: 'Templates', href: 'beaker://library?view=templates'},
        {icon: libTools.getFAIcon('themes'), label: 'Themes', href: 'beaker://library?view=themes'},
        '-',
        {icon: 'fas fa-trash', label: 'Trash', href: 'beaker://library?view=trash'},
      ]
    })
  }

  async onClickNewWebsite (e) {
    e.preventDefault()
    e.stopPropagation()

    var a = await DatArchive.create()
    window.location = a.url
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