import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import websitesHeaderCSS from '../../../css/com/websites/header.css.js'

class WebsitesHeader extends LitElement {
  static get properties () {
    return {
      category: {type: String},
      query: {type: String, reflected: true}
    }
  }

  constructor () {
    super()
    this.category = ''
    this.query = ''
  }

  // rendering
  // =

  render () {
    const item = (id, label) => {
      const cls = classMap({
        item: true,
        current: id === this.category
      })
      return html`
        <a class=${cls} @click=${e => this.onClickCategory(e, id)}>${label}</a>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="categories">
        ${item('saved', 'Saved')}
        ${item('trash', 'Trash')}
      </div>
      <div class="search-container">
        <input @keyup=${this.onKeyupInput} placeholder="Search" class="search" value=${this.query} />
        <i class="fa fa-search"></i>
      </div>
    `
  }

  // events
  // =

  onClickCategory (e, category) {
    emit(this, 'change-category', {detail: {category}})
  }

  clearSearch () {
    this.shadowRoot.querySelector('input').value = ''
  }

  onKeyupInput (e) {
    this.query = e.currentTarget.value
    emit(this, 'change-query', {detail: {query: this.query}})
  }
}
WebsitesHeader.styles = websitesHeaderCSS
customElements.define('websites-header', WebsitesHeader)