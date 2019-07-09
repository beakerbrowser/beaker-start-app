import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import websitesNavCSS from '../../../css/com/websites/nav.css.js'

class WebsitesNav extends LitElement {
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
        ${item('templates', 'fas fa-pencil-ruler', 'Templates')}
        ${item('themes', 'fas fa-drafting-compass', 'Themes')}
        <hr>
        ${item('trash', 'fas fa-trash', 'Trash')}
        <hr>
      </div>
    `
  }

  // events
  // =

  onClick (e, view) {
    e.preventDefault()
    emit(this, 'change', {bubbles: true, detail: {view}})
  }
}
WebsitesNav.styles = websitesNavCSS
customElements.define('websites-nav', WebsitesNav)