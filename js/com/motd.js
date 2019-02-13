/* globals DatArchive */
import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

class MOTD extends LitElement {
  static get properties() {
    return { 
      motd: {type: String},
      isDismissed: {type: Boolean}
    }
  }

  constructor () {
    super()
    this.motd = null
    this.isDismissed = false
  }

  firstUpdated () {
    this.load()
  }

  async load () {
    try {
      var lastSeenMOTD = (+localStorage.lastSeenMOTD || 0)
      var archive = new DatArchive('dat://beakerbrowser.com')
      var latestMOTD = JSON.parse(await archive.readFile('/motd/en-US.json'))
      if (latestMOTD.number > lastSeenMOTD) {
        this.motd = latestMOTD
      }
    } catch (e) {
      console.warn('Failed to load latest motd', e)
    }
  }

  render() {
    if (!this.motd || this.isDismissed) {
      return html`<div class="motd"></div>`
    }

    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/buttons.css">
      <div class="motd">
        <i class="fa fa-${this.motd.icon} icon"></i>
        <span class="content">
          <span>${this.motd.content}</span>
          <a href=${this.motd.href} target="_blank" class="btn transparent cta nofocus">${this.motd.cta}</a>
        </span>
        <button class="btn plain close" @click=${this.onClickDismiss}>
          <i class="fa fa-times"></i>
        </button>
      </div>`
  }

  onClickDismiss (e) {
    e.preventDefault()
    this.isDismissed = true
    localStorage.lastSeenMOTD = this.motd.number
  }
}

MOTD.styles = css`
.motd {
  display: flex;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  background: #8257cf;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  font-weight: 600;
  border-radius: 2px;
  padding: 7px 15px;
  white-space: nowrap;
}

.motd:empty {
  display: none;
}

.motd > i {
  margin-right: 10px;
  font-size: 16px;
}

p {
  margin: 0;
}

.icon {
  margin-right: 12px;
}

.btn {
  color: inherit !important;
}

.btn:hover {
  color: inherit !important;
}

.btn.cta {
  border: 1px solid #fff;
  margin: 0 12px;
  font-weight: inherit;
  height: 28px;
}
`

customElements.define('start-motd', MOTD);
