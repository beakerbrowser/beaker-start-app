import './com/blue-notice.js'
import './com/pinned-bookmarks.js'
import './com/links-grid.js'
import { LitElement, html, css } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import * as cloudMenu from './com/cloud-menu.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'
import spinnerCSS from '/vendor/beaker-app-stdlib/css/com/spinner.css.js'

const library = navigator.importSystemAPI('library')
const VIEWS = ['bookmarks', 'apps']

export class StartApp extends LitElement {
  static get properties() {
    return { 
      view: {type: String},
      isTransitioning: {type: Boolean},
      apps: {type: Array}
    }
  }

  constructor () {
    super()
    this.isTransitioning = false
    this.apps = []
    this.view = 'bookmarks'
    this.load()

    this.didGesture = false
    window.addEventListener('wheel', (e) => {
      var absX = Math.abs(e.deltaX)
      if (!this.didGesture && absX > 30) {
        this.didGesture = true
        let i = VIEWS.indexOf(this.view)
        if (e.deltaX < 0 && i > 0) {
          this.setView(VIEWS[i - 1])
        } else if (e.deltaX > 0 && i < VIEWS.length - 1) {
          this.setView(VIEWS[i +  1])
        }
      }
      if (this.didGesture && absX < 10) {
        this.didGesture = false
      }
    })

    document.addEventListener('contextmenu', e => this.onContextmenuPage(e), {capture: true})
  }

  async load () {
    var apps = await library.list({
      filters: {
        saved: true,
        type: 'unwalled.garden/application'
      }
    })
    apps.sort((a, b) => a.title.localeCompare(b.title))
    this.apps = apps
  }

  setView (v) {
    this.view = v
    this.isTransitioning = true
    setTimeout(() => { this.isTransitioning = false }, 300)
  }

  // rendering
  // =

  render () {
    const filterOpt = (v, label) => {
      const cls = classMap({pressed: v == this.view, radio: true})
      return html`<button class="${cls}" @click=${e => this.setView(v)}>${label}</button>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div id="nav" class="radio-group">
        ${filterOpt('bookmarks', 'Pinned')}
        ${filterOpt('apps', 'Applications')}
      </div>
      <div id="browser-links">
        <a href="#" @click=${this.onClickCloud}>
          <span class="fas fa-cloud"></span>
        </a>
        <a href="beaker://settings"><img src="asset:favicon-16:beaker://settings"></a>
      </div>
      <div class="views-wrapper">
        <div class="views ${this.isTransitioning ? 'transitioning' : ''}" data-view=${this.view}>
          <start-pinned-bookmarks></start-pinned-bookmarks>
          <start-links-grid .items=${this.apps}></start-links-grid>
        </div>
      </div>
    `
  }

  // events
  // =

  updated () {
    if (this.view === 'bookmarks') {
      this.shadowRoot.querySelector('start-pinned-bookmarks').load()
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

  async onContextmenuPage (e, item) {
    e.preventDefault()
    const items = [
      {icon: 'fas fa-thumbtack', label: 'New Pin', click: () => this.shadowRoot.querySelector('start-pinned-bookmarks').addPin()}
    ]
    await contextMenu.create({x: e.clientX, y: e.clientY, items, fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'})
  }
}
StartApp.styles = [buttonsCSS, spinnerCSS, css`
h5 {
  color: #556779;
  margin-bottom: 0;
  opacity: 0.7;
  font-weight: 400;
}
#nav {
  margin-bottom: 10px;
  position: fixed;
  top: 10px;
  left: 20px;
}
#browser-links {
  display: flex;
  position: fixed;
  top: 10px;
  right: 20px;
}
#browser-links a {
  position: relative;
  margin-left: 15px;
  border-radius: 4px;
  text-align: center;
  width: 28px;
  height: 28px;
}
#browser-links a:hover,
#browser-links a.active {
  background: rgb(245, 247, 249);
}
#browser-links img,
#browser-links .fas {
  width: 16px;
  height: 16px;
  margin-top: 6px;
}
#browser-links a[href="beaker://history"] img {
  position: relative;
  left: -1px;
}
#browser-links .fas,
#browser-links .spinner {
  margin-top: 7px;
  color: #34495e;
}
#browser-links .spinner {
  width: 10px;
  height: 10px;
}

.views-wrapper {
  overflow: hidden;
}

.views {
  position: relative;
  transform: translateX(0);
  width: 460px;
  margin: 20vh auto 20vh;
}

.views.transitioning {
  transition: transform 0.2s;
}

.views[data-view="apps"] {
  transform: translateX(-100vw);
}

start-pinned-bookmarks {
  display: block;
}

start-links-grid {
  position: absolute;
  left: 100vw;
  top: 0;
  width: 100%;
}

@media (min-width: 640px) {
  .views {
    width: 580px;
  }
}

@media (min-width: 740px) {
  .views {
    width: 700px;
  }
}

@media (min-width: 900px) {
  .views {
    width: 830px;
  }
}

@media (min-width: 1100px) {
  .views {
    width: 950px;
  }
}
`]

customElements.define('start-app', StartApp)