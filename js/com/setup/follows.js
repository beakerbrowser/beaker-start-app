import { LitElement, html, css } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'

const SITES = [
  {
    url: 'dat://pfrazee.com',
    title: 'Paul Frazee',
    description: 'Founder of Beaker Browser'
  },
  {
    url: 'dat://beakerbrowser.com',
    title: 'Beaker Browser',
    description: 'Official site'
  },
]

class SetupFollows extends LitElement {
  static get properties () {
    return {
      selections: {type: Array}
    }
  }

  static get styles () {
    return [buttonsCSS, css`
    :host {
      display: grid;
      padding: 0px 10px 10px;
    }

    .sites {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(2, 1fr);
    }

    .site {
      display: flex;
      cursor: pointer;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #eee;
    }

    .site:hover {
      border-color: #adc6e6;
    }

    .site .check {
      align-self: center;
      width: 33px;
      text-align: center;
    }

    .site .check div {
      display: inline-block;
      width: 0px;
      height: 0px;
      border: 1px solid #666;
      padding: 4px;
      line-height: 1;
      border-radius: 50%;
      margin-right: 10px;
    }

    .site .check div.checked {
      width: 13px;
      height: 13px;
      color: #fff;
      border-color: #217ff3;
      background: #217ff3;
    }

    .site .check .fa-check {
      position: relative;
      top: 1px;
    }

    .site img {
      width: 50px;
      height: 45px;
      border-radius: 2px;
      object-fit: cover;
      margin-right: 10px;
    }

    .site .title {
      font-weight: 500;
      font-size: 16px;
    }

    .site .url {
      color: gray;
      font-weight: 300;
    }
    `]
  }

  constructor () {
    super()
    this.userUrl = 'dat://pfrazee.com' // TODO
    this.selections = SITES.map(s => true)
  }

  async submit () {
    // TODO
    return true
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="sites">
        ${repeat(SITES, (s, i) => this.renderSite(s, this.selections[i]))}
      </div>
    `
  }

  renderSite (site, isChecked) {
    return html`
      <div class="site" @click=${e => this.onToggle(e, site)}>
        <div class="check">
          ${isChecked ? html`
            <div class="checked"><span class="fas fa-check"></span></div>
          ` : html`
            <div></div>
          `}
        </div>
        <img src="asset:thumb:${site.url}">
        <div class="details">
          <div class="title">${site.title}</div>
          <div class="description">${site.description}</div>
          <div class="url">${site.url}</div>
        </div>
      </div>
    `
  }

  // events
  // =

  onToggle (e, site) {
    var i = SITES.indexOf(site)
    this.selections[i] = !this.selections[i]
    this.requestUpdate()
  }
}

customElements.define('setup-follows', SetupFollows)