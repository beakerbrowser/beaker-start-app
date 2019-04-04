import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from '../tmp-beaker.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import {BeakerEditProfile} from '/vendor/beaker-app-stdlib/js/com/popups/edit-profile.js'
import {BeakerEditThumb} from '/vendor/beaker-app-stdlib/js/com/popups/edit-thumb.js'
import _debounce from '/vendor/lodash.debounce.js'

const JS_CONSOLE_URL = 'dat://2145f6c240076df9f1eb1146ef21571e5d680b58a6568a5a989b1488a410aa4c'

const createContextMenu = (el, items) => contextMenu.create({
  x: el.getBoundingClientRect().right,
  y: el.getBoundingClientRect().bottom,
  right: true,
  withTriangle: true,
  noBorders: true,
  style: 'padding: 4px 0; min-width: 200px; font-size: 14px; color: #000',
  fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css',
  items
})

class TopRightControls extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      cacheBuster: {type: Number}
    }
  }

  constructor () {
    super()
    this.user = null
    this.cacheBuster = 0
    this.load()
    window.addEventListener('focus', _debounce(() => {
      // load latest when we're opened, to make sure we stay in sync
      this.load()
      this.cacheBuster = Date.now()
    }, 1e3, {leading: true}))
  }

  async load () {
    this.user = await profiles.getCurrentUser()
  }

  get userName () {
    return this.user && this.user.title || 'Anonymous'
  }

  get userUrl () {
    return this.user ? this.user.url : ''
  }

  get userImg () {
    return this.user ? html`<img src="${this.user.url}/thumb?cache=${this.cacheBuster}">` : ''
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        <a @click=${this.onClickNewMenu} style="font-size: 14px; font-weight: 500; line-height: 14px;">New <i class="fas fa-caret-down"></i></a>
        <a href="beaker://settings"><span class="fas fa-cog"></span></a>
        <a @click=${this.onClickProfileMenu} class="profile">${this.userImg}<i class="fas fa-caret-down"></i></a>
      </div>`
  }

  onClickNewMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    const goto = (url) => { window.location = url }
    async function create (templateUrl, title, description) {
      var newSite = await DatArchive.fork(templateUrl, {title, description, prompt: false})
      window.location = newSite.url
    }
    const items = [
      html`<div class="section-header small light">Website</div>`,
      {icon: false, label: 'Empty project', click: () => goto('beaker://library/?view=new-website')},
      '-',
      html`<div class="section-header small light">Site templates</div>`,
      {icon: 'fas fa-terminal', label: 'JS Console Session', click: () => create(JS_CONSOLE_URL, `JS Console Session (${(new Date()).toLocaleDateString()})`)}
    ]
    createContextMenu(e.currentTarget, items)
  }

  onClickProfileMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    const goto = (url) => { window.location = url }
    const items = [
      {icon: false, label: 'Your profile site', click: () => goto(this.userUrl)},
      '-',
      {icon: false, label: 'Your address book', click: () => goto('beaker://library/?view=addressbook')},
      {icon: false, label: 'Your bookmarks', click: () => goto('beaker://library/?view=bookmarks')},
      {icon: false, label: 'Your websites', click: () => goto('beaker://library/?view=websites')},
      '-',
      {icon: false, label: 'Settings', click: () => goto('beaker://settings/')}
    ]
    createContextMenu(e.currentTarget, items)
  }
}

TopRightControls.styles = css`
div {
  display: flex;
  align-items: center;
  position: fixed;
  top: 8px;
  right: 10px;
  font-size: 16px;
}

a {
  color: gray;
  padding: 10px;
  cursor: pointer;
}

a:hover {
  color: #555;
}

.profile {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  border-radius: 2px;
  padding: 3px 6px;
  margin-left: 5px;
}

.profile:hover {
  color: #333;
  background: #eee;
}

.profile img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
`

customElements.define('start-top-right-controls', TopRightControls);

