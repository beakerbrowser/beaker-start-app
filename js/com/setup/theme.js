import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'

class SetupTheme extends LitElement {
  static get properties () {
    return {
      choice: {type: Number}
    }
  }

  static get styles () {
    return [buttonsCSS, css`
    :host {
      display: block;
      padding: 10px 10px 20px;
    }

    .themes {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 10px;
    }

    .theme {
      border: 3px solid #ddd;
      border-radius: 3px;
      cursor: pointer;
    }

    .theme.active {
      border: 3px solid var(--blue);
    }

    .hint {
      color: gray;
    }
    `]
  }

  constructor () {
    super()
    this.userUrl = 'dat://pfrazee.com' // TODO
    this.choice = 0
  }

  async submit () {
    // TODO
    return true
  }

  render () {
    return html`
      <div class="themes">
        ${this.renderTheme(0)}
        ${this.renderTheme(1)}
        ${this.renderTheme(2)}
      </div>
      <div class="hint">
        You can change your theme later.
      </div>
    `
  }

  renderTheme (id) {
    return html`
      <div class=${classMap({theme: true, active: id === this.choice})} @click=${e => this.onClickTheme(e, id)}>
        <div style="padding: 70px 0; text-align: center">todo</div>
      </div>
    `
  }

  onClickTheme (e, id) {
    this.choice = id
  }
}

customElements.define('setup-theme', SetupTheme)