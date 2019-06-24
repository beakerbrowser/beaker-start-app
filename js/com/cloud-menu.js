import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import cloudMenuCSS from '/css/com/cloud-menu.css.js'

const BACK_VIEWS = {
  ChooseProvider: 'Listing',
  ConfigureCustom: 'ChooseProvider',
  Login: 'ChooseProvider',
  Register: 'ChooseProvider'
}

export function create () {
  return contextMenu.create({
    withTriangle: false,
    render () {
      return html`
        <style>
          .context-menu {
            top: 38px;
            right: 64px;
          }
        </style>
        <cloud-menu></cloud-menu>
      `
    }
  })
}

class CloudMenu extends LitElement {
  static get properties () {
    return {
      view: {type: String},
      formErrors: {type: Object}
    }
  }

  constructor () {
    super()
    this.view = 'Listing'
    this.formErrors = {}
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="cloud-menu right">
        ${this.renderView()}
      </div>
    `
  }

  renderView () {
    var fn = this[`render${this.view}View`]
    return fn.call(this)
  }

  renderListingView () {
    return html`
      <div class="menu-heading">Peer-to-peer network</div>
      <div class="beaker-cloud-nav">
        <a class="active" href="#" @click=${this.setViewCb('Listing')}>Remotes</a>
        <span></span>
      </div>
      <p class="about">
        "Remotes" keep your data online when your computer is off.
      </p>
      <div class="remote-item">
        <div class="remote-item-row">
          <div class="remote-item-title">Beaker.Cloud</div>
          <div><span class="spinner"></span></div>
        </div>
        <div class="remote-item-row">
          <div class="remote-item-status">
            <progress value="70" max="100"></progress>
          </div>
        </div>
      </div>
      <div class="remote-item">
        <div class="remote-item-row">
          <div class="remote-item-title">Blue Link Labs</div>
          <div><span class="fas fa-check"></span></div>
        </div>
        <div class="remote-item-row">
          <div class="remote-item-status">Synced</div>
        </div>
      </div>
      <div class="remote-item">
        <div class="remote-item-row">
          <div class="remote-item-title">Hashbase</div>
          <div>
            <span class="fa-stack">
              <i class="fas fa-cloud fa-stack-1x"></i>
              <i class="fas fa-slash fa-stack-1x"></i>
            </span>
          </div>
        </div>
        <div class="remote-item-row">
          <div class="remote-item-status">Not connected</div>
        </div>
      </div>
      <div class="remote-item" @click=${this.setViewCb('ChooseProvider')}>
        <div class="add-remote">+ Add a remote</div>
      </div>
    `
  }

  renderChooseProviderView () {
    return html`
      <div class="menu-heading">Add Remote</div>
      <form class="choose-remote" @submit=${this.onSubmitProvider}>
        <label for="provider">Choose a provider</label>
        <select id="provider" name="provider">
          <option value="beaker.cloud" selected>Beaker.Cloud</option>
          <option value="custom">Self-host / Custom</option>
        </select>
        <div class="form-nav">
          <button @click=${this.onClickBack}><span class="fas fa-arrow-left"></span> Back</button>
          <button type="submit" class="primary">Next <span class="fas fa-arrow-right"></span></button>
        </div>
      </form>
    `
  }

  renderConfigureCustomView () {
    return html`
      <div class="menu-heading">Custom / Self-host</div>
      <div class="beaker-cloud-nav">
        <a class="active" href="#" @click=${this.setViewCb('Login')}>Login</a>
        <span></span>
      </div>
      <form class="login" @submit=${this.onSubmitLogin}>
        ${this.renderFormInput('hostname', 'text', 'Hostname (e.g. my-server.com)')}
        ${this.renderFormInput('email', 'text', 'Email')}
        ${this.renderFormInput('password', 'password', 'Password')}
        <div class="form-nav">
          <button @click=${this.onClickBack}><span class="fas fa-arrow-left"></span> Back</button>
          <button type="submit" class="primary">Next <span class="fas fa-arrow-right"></span></button>
        </div>
      </form>
      <p class="footer">
        Advanced: To self-host a remote, <a href="#todo" target="_blank">follow this guide.</a>
      </p>
    `
  }

  renderLoginView () {
    return html`
      <div class="menu-heading">Beaker.Cloud</div>
      <div class="beaker-cloud-nav">
        <a href="#" @click=${this.setViewCb('Register')}>New account</a>
        <a class="active" href="#" @click=${this.setViewCb('Login')}>Login</a>
      </div>
      <form class="login" @submit=${this.onSubmitLogin}>
        ${this.renderFormInput('email', 'text', 'Email')}
        ${this.renderFormInput('password', 'password', 'Password')}
        <p>
          Forgot password? <a href="#todo" target="_blank">Click to reset.</a>
        </p>
        <div class="form-nav">
          <button @click=${this.onClickBack}><span class="fas fa-arrow-left"></span> Back</button>
          <button type="submit" class="primary">Next <span class="fas fa-arrow-right"></span></button>
        </div>
      </form>
    `
  }

  renderRegisterView () {
    return html`
      <div class="menu-heading">Beaker.Cloud</div>
      <div class="beaker-cloud-nav">
        <a class="active" href="#" @click=${this.setViewCb('Register')}>New account</a>
        <a href="#" @click=${this.setViewCb('Login')}>Login</a>
      </div>
      <form class="register" @submit=${this.onSubmitRegister}>
        <p>
          Create a new account with <a href="https://beaker.cloud" target="_blank">Beaker.Cloud</a>.
        </p>
        ${this.renderFormInput('email', 'text', 'Email')}
        ${this.renderFormInput('password', 'password', 'Password')}
        ${this.renderFormInput('confirmPassword', 'password', 'Confirm password')}
        <p>
          By creating an account, you agree to the <a href="#todo" target="_blank">Terms of Service</a>.
          See our <a href="#todo" target="_blank">Privacy Policy</a>.
        </p>
        <div class="form-nav">
          <button @click=${this.onClickBack}><span class="fas fa-arrow-left"></span> Back</button>
          <button type="submit" class="primary">Next <span class="fas fa-arrow-right"></span></button>
        </div>
      </form>
    `
  }

  renderRegistrationCompletedView () {
    return html`
      <div class="menu-heading">Registration Complete!</div>
      <h2 class="about" style="font-weight: 500; font-size: 23px;">Welcome to <a href="https://beaker.cloud" target="_blank">Beaker.Cloud</a>!</h2>
      <form>
        <p style="text-align: center">Your public sites and files will automatically be synced and kept online.</p>
        <div class="form-nav">
          <span></span>
          <button type="submit" class="primary" @click=${this.setViewCb('Listing')}>Finish <span class="fas fa-arrow-right"></span></button>
        </div>
      </form>
    `
  }

  renderFormInput (id, type, placeholder) {
    return html`
      <p>
        <input id=${id} name=${id} type=${type} placeholder=${placeholder} ?error=${!!this.formErrors[id]}>
        ${this.formErrors[id] ? html`<div class="error">${this.formErrors[id]}</div>` : ''}
      </p>
    `
  }

  updated () {
    var input = this.shadowRoot.querySelector('input')
    if (input) input.focus()
  }

  // events
  // =

  onSubmitProvider (e) {
    e.preventDefault()
    var choice = e.currentTarget.provider.value
    if (choice === 'custom') {
      this.view = 'ConfigureCustom'
    } else {
      this.view = 'Register'
    }
  }

  onSubmitRegister (e) {
    e.preventDefault()
    // TODO
    // this.formErrors = {
    //   email: 'This email is already registered!',
    //   password: 'Password must be 100000 characters long.',
    //   confirmPassword: 'Passwords do not match.'
    // }
    this.view = 'RegistrationCompleted'
  }

  onSubmitLogin (e) {
    e.preventDefault()
    // TODO
    // this.formErrors = {
    //   email: 'Invalid email.',
    //   password: 'Invalid password.',
    // }
    this.view = 'Listing'
  }

  onClickBack (e) {
    e.preventDefault()
    if (this.view in BACK_VIEWS) {
      this.view = BACK_VIEWS[this.view]
    }
  }

  // helpers
  // =

  setViewCb (view) {
    return e => {
      e.preventDefault()
      this.formErrors = {}
      this.view = view
    }
  }
}
CloudMenu.styles = [cloudMenuCSS]

customElements.define('cloud-menu', CloudMenu)