import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from '../tmp-beaker.js'
import * as appMenu from '/vendor/beaker-app-stdlib/js/com/app-menu.js'

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
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        <a @click=${this.onClickAppMenu}><span class="fas fa-th"></span></a>
        <a href="beaker://settings"><span class="fas fa-cog"></span></a>
      </div>`
  }

  onClickAppMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    var x = rect.right + 10
    var y = rect.top + e.currentTarget.offsetHeight
    appMenu.create({x, y, currentUserUrl: this.user.url})
  }
}

TopRightControls.styles = css`
div {
  display: flex;
  position: fixed;
  top: 10px;
  right: 16px;
  font-size: 16px;
}

a {
  color: gray;
  margin-left: 1em;
  cursor: pointer;
}

a:hover {
  color: #555;
}
`

customElements.define('start-top-right-controls', TopRightControls);

