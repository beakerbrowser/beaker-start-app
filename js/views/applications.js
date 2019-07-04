import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import applicationsCSS from '../../css/views/applications.css.js'
import { getNicePhrase } from '../lib/nice-phrases.js'

const NICE_PHRASE = getNicePhrase()

class ApplicationsView extends LitElement {
  static get properties() {
    return {
      applications: {type: Array}
    }
  }

  constructor () {
    super()
    this.applications = []
    this.load()
  }

  reset () {
    document.title = 'My Applications'
  }

  async load () {
    var apps = await beaker.applications.list()
    apps.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    this.applications = apps
  }

  // rendering
  // =

  render() {
    if (!this.applications) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <h2><span class="far fa-window-restore"></span></h2>
      <div class="applications">
        ${this.applications.length === 0 ? html`
          <div class="empty"><div><span class="far fa-sad-tear"></span></div>You don't currently have any applications installed.</div>
        ` : ''}
        ${repeat(this.applications, app => app.url, app => html`
          <div class="application" @click=${e => this.onClickApplication(e, app)}>
            <img src=${'asset:thumb:' + app.url}>
            <div class="info">
              <div class="title">${app.title}</div>
              <div class="description">${app.description}</div>
              <div class="url">${app.url}</div>
            </div>
            <div class="ctrls">
              <div><button @click=${e => this.onClickUninstall(e, app)}>Uninstall</button></div>
              <div>
                <label @click=${e => this.onToggleEnabled(e, app)}>
                  <input type="checkbox" ?checked=${app.enabled}>
                  Enabled
                </label>
              </div>
            </div>
          </div>
        `)}
      </div>
      <div class="nice-phrase">${NICE_PHRASE}</div>
    `
  }

  // events
  // =

  onClickApplication (e, app) {
    window.location = app.url
  }

  async onToggleEnabled (e, app) {
    e.preventDefault()
    e.stopPropagation()

    if (app.enabled) {
      await beaker.applications.disable(app.url)
      toast.create('Application disabled')
    } else {
      await beaker.applications.enable(app.url)
      toast.create('Application enabled')
    }
    this.load()
  }

  async onClickUninstall (e, app) {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm('Are you sure?')) return
    await beaker.applications.uninstall(app.url)
    toast.create('Application uninstalled')
    this.load()
  }
}

// styles
// =

ApplicationsView.styles = applicationsCSS

customElements.define('applications-view', ApplicationsView);