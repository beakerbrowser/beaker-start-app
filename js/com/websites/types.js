import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import websitesTypesCSS from '../../../css/com/websites/types.css.js'

class WebsitesTypes extends LitElement {
  static get properties () {
    return {
      current: {type: String}
    }
  }

  constructor () {
    super()
  }

  // rendering
  // =

  render () {
    const item = (id, icon, label) => {
      const cls = classMap({
        item: true,
        current: id === this.current
      })
      return html`
        <a class=${cls} @click=${e => this.onClick(e, id)}>
          <span class="fa-fw ${icon || 'no-icon'}""></span>
          <span class="label">${label}</span>
        </a>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        ${item('websites', 'fas fa-sitemap', 'Websites')}
        ${item('people', 'far fa-user', 'People')}
        ${item('applications', 'far fa-window-restore', 'Applications')}
        ${item('modules', 'fas fa-cube', 'Modules')}
        ${item('templates', 'fas fa-pencil-ruler', 'Templates')}
        ${item('themes', 'fas fa-drafting-compass', 'Themes')}
      </div>
    `
  }

  // events
  // =

  onClick (e, type) {
    e.preventDefault()
    emit(this, 'change', {bubbles: true, detail: {type}})
  }
}
WebsitesTypes.styles = websitesTypesCSS
customElements.define('websites-types', WebsitesTypes)