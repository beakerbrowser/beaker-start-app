import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from '../tmp-beaker.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import {BeakerEditProfile} from '/vendor/beaker-app-stdlib/js/com/popups/edit-profile.js'
import {BeakerEditThumb} from '/vendor/beaker-app-stdlib/js/com/popups/edit-thumb.js'

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
  }

  async load () {
    this.user = await profiles.getCurrentUser()
  }

  get userName () {
    return this.user ? this.user.title : ''
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
        <a @click=${this.onClickProfileMenu} class="profile"><span>${this.userName}</span>${this.userImg}</a>
      </div>`
  }

  onClickNewMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    const goto = (url) => { window.location = url }
    const items = [
      {icon: false, label: 'Website', click: () => goto('beaker://library/?new')}
    ]
    createContextMenu(e.currentTarget, items)
  }

  onClickProfileMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    const goto = (url) => { window.location = url }
    const editProfile = async () => {
      this.user = await BeakerEditProfile.runFlow(profiles)
    }
    const editThumb = async () => {
      await BeakerEditThumb.runFlow(profiles)
      this.cacheBuster = Date.now()
    }
    const items = [
      {icon: 'fas fa-fw fa-external-link-alt', label: 'Your website', click: () => goto(this.userUrl)},
      '-',
      html`<div class="section-header small light">Social</div>`,
      {icon: 'fas fa-fw fa-user', label: 'Your social profile', click: () => goto(`intent:unwalled.garden/view-profile?url=${encodeURIComponent(this.userUrl)}`)},
      {icon: 'fas fa-fw fa-rss', label: 'Followed sites', click: () => goto('beaker://library/?category=following')},
      '-',
      html`<div class="section-header small light">Settings</div>`,
      {icon: false, label: 'Edit your profile', click: editProfile},
      {icon: false, label: 'Change your photo', click: editThumb},
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
  background: #fff;
  font-size: 13px;
  border-radius: 2px;
  padding: 3px 6px;
  margin-left: 10px;
  color: #333;
  border: 1px solid #ccc;
  text-decoration: none;
}

.profile:hover {
  color: #333;
  background: #eee;
}

.profile span {
  margin: 0 12px 0 4px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}
`

customElements.define('start-top-right-controls', TopRightControls);

