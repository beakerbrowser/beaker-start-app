import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import searchHeaderCSS from '../../../css/com/search/header.css.js'

class SearchHeader extends LitElement {
  static get properties () {
    return {
      query: {type: String, reflected: true}
    }
  }

  constructor () {
    super()
    this.query = ''
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <img class="brand" src="/vendor/beaker-app-stdlib/img/beaker-logo.png">
      <div class="search-container">
        <input autofocus @keyup=${this.onKeyupInput} placeholder="Search your network" class="search" value=${this.query} />
        <i class="fa fa-search"></i>
      </div>
    `
  }

  // events
  // =

  clearSearch () {
    this.shadowRoot.querySelector('input').value = ''
  }

  onKeyupInput (e) {
    this.query = e.currentTarget.value
    // if (e.key === 'Enter') {
      emit(this, 'submit-query', {detail: {query: this.query}})
    // }
  }
}
SearchHeader.styles = searchHeaderCSS
customElements.define('search-header', SearchHeader)