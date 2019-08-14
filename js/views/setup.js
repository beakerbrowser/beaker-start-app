import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import setupCSS from '../../css/views/setup.css.js'
import '../com/setup/profile-form.js'
import '../com/setup/theme.js'
import '../com/setup/follows.js'

const STEPS = ['renderIntro', 'renderProfile', 'renderTheme', 'renderFollows']

class SetupView extends LitElement {
  static get properties() {
    return {
      step: {type: Number}
    }
  }

  constructor () {
    super()
    this.step = 1
  }

  reset () {
    document.title = 'Setup'
  }

  async load () {
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      ${this[STEPS[this.step]]()}
    `
  }

  renderIntro () {
    return html`
      <main style="padding: 40px 0">
        <div class="header" style="text-align: center;">
          <img src="beaker://assets/logo" style="width: 100px">
          <h1 style="font-size: 28px; margin: 16px 0 0; border: 0">Welcome to Beaker Browser</h1>
        </div>
        <div class="footer" style="text-align: center">
          <button @click=${this.onClickNext}>
            Get Started
            <span class="fas fa-fw fa-arrow-alt-circle-right"></span>
          </button>
        </div>
      </main>
    `
  }

  renderProfile () {
    return html`
      <main>
        <div class="header">
          <h1>Create your profile</h1>
        </div>
        <div class="body">
          <setup-profile-form></setup-profile-form>
        </div>
        <div class="footer">
          <button @click=${this.onClickNext}>
            Next
            <span class="fas fa-fw fa-arrow-alt-circle-right"></span>
          </button>
        </div>
      </main>
    `
  }

  renderTheme () {
    return html`
      <main>
        <div class="header">
          <h1>Choose a theme for your site</h1>
        </div>
        <div class="body">
          <setup-theme></setup-theme>
        </div>
        <div class="footer">
          <button @click=${this.onClickNext}>
            Next
            <span class="fas fa-fw fa-arrow-alt-circle-right"></span>
          </button>
        </div>
      </main>
    `
  }

  renderFollows () {
    return html`
      <main>
        <div class="header">
          <h1>Follow some sites</h1>
        </div>
        <div class="body">
          <setup-follows></setup-follows>
        </div>
        <div class="footer">
          <button @click=${this.onClickNext}>
            Next
            <span class="fas fa-fw fa-arrow-alt-circle-right"></span>
          </button>
        </div>
      </main>
    `
  }

  // events
  // =

  async onClickNext (e) {
    var viewEl = this.shadowRoot.querySelector('.body > *')
    if (viewEl && typeof viewEl.submit === 'function') {
      if (!(await viewEl.submit())) {
        return
      }
    }

    // advance
    this.step = this.step + 1
  }
}

// styles
// =

SetupView.styles = setupCSS

customElements.define('setup-view', SetupView)