import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from '../tmp-beaker.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'

class TopRightControls extends LitElement {
  static get properties () {
    return {
      user: {type: Object}
    }
  }

  constructor () {
    super()
    this.user = null
    this.load()
  }

  async load () {
    this.user = await profiles.getCurrentUser()
    console.log(this.user)
  }

  get userName () {
    return this.user ? this.user.title : ''
  }

  get userUrl () {
    return this.user ? this.user.url : ''
  }

  get userImg () {
    return this.user ? html`<img src="${this.user.url}/thumb">` : ''
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        <a @click=${this.onClickNewMenu} style="font-size: 14px; font-weight: 500; line-height: 14px;">New <i class="fas fa-caret-down"></i></a>
        <a href="beaker://settings"><span class="fas fa-cog"></span></a>
        <a class="profile" href="intent:unwalled.garden/view-profile?url=${encodeURIComponent(this.userUrl)}"><span>${this.userName}</span>${this.userImg}</a>
      </div>`
  }

  onClickNewMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    const goto = (url) => { window.location = url }
    contextMenu.create({
      x: e.currentTarget.getBoundingClientRect().right,
      y: e.currentTarget.getBoundingClientRect().bottom,
      right: true,
      withTriangle: true,
      noBorders: true,
      roomy: true,
      style: 'padding: 4px 0; min-width: 160px; font-size: 14px; color: #000',
      items: [{icon: false, label: 'Website', click: () => goto('beaker://library/?new')}]
    })
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

