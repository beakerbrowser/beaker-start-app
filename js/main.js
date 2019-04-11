import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { profiles } from './tmp-beaker.js'
import '/vendor/beaker-app-stdlib/js/com/app-header/search.js'
import '/vendor/beaker-app-stdlib/js/com/top-right-controls.js'
import './com/blue-notice.js'
import './com/pinned-bookmarks.js'

class TopRightControls extends LitElement {
  static get properties() {
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
    return html`<beaker-top-right-controls .user=${this.user}></beaker-top-right-controls>`
  }
}

customElements.define('start-top-right-controls', TopRightControls)