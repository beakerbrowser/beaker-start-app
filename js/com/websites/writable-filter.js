import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import websitesWritableFilterCSS from '../../../css/com/websites/writable-filter.css.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'

class WebsitesWritableFilter extends LitElement {
  static get properties () {
    return {
      current: {type: String}
    }
  }

  constructor () {
    super()

    this.current = false
  }

  // rendering
  // =

  render () {
    const item = (value, label) => {
      const cls = classMap({
        item: true,
        current: value === this.current
      })
      return html`
        <div>
          <a class=${cls} title=${label} @click=${e => this.onClick(e, value)}>${label}</a>
        </div>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="heading"><span class="fas fa-pencil-alt"></span> Filter by:</div>
      <div class="tags">
        ${item('writable', 'Can edit')}
        ${item('readonly', 'Readonly')}
      </div>
    `
  }

  // events
  // =

  onClick (e, writable) {
    e.preventDefault()
    emit(this, 'change', {bubbles: true, detail: {writable}})
  }
}
WebsitesWritableFilter.styles = websitesWritableFilterCSS
customElements.define('websites-writable-filter', WebsitesWritableFilter)