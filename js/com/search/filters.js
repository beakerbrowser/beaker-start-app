import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import searchFiltersCSS from '../../../css/com/search/filters.css.js'
import '../hover-menu.js'
import '../current-filter.js'

class SearchFilters extends LitElement {
  static get properties () {
    return {
      sort: {type: 'String'},
      sortOptions: {type: 'Object'},
      source: {type: 'String'},
      tag: {type: 'String'},
      search: {type: 'String'}
    }
  }

  constructor () {
    super()
    this.sort = 'recent'
    this.sortOptions = {}
    this.source = ''
    this.tag = ''
    this.search = ''
  }

  // rendering
  // =

  render () {
    return html`
      <div class="filters">
        <start-hover-menu
          icon="fas fa-sort-amount-down"
          current=${this.sort}
          .options=${this.sortOptions}
          @change=${this.onChangeSort}
        ></start-hover-menu>
        ${this.source ? html`<start-current-filter label="By: ${this.source}" @click=${this.onClickSourceFilter}></start-current-filter>` : ''}
        ${this.tag ? html`<start-current-filter label="Tagged: ${this.tag}" @click=${this.onClickTagFilter}></start-current-filter>` : ''}
        ${this.search ? html`<start-current-filter label="${'"' + this.search + '"'}" @click=${this.onClickSearchFilter}></start-current-filter>` : ''}
      </div>
    `
  }

  // events
  // =

  onMouseOver (e) {
    this.isOpen = true
  }

  onMouseLeave (e) {
    this.isOpen = false
  }

  onChangeSort (e) {
    emit(this, 'change-sort', {bubbles: true, detail: {sort: e.detail.id}})
  }

  onClickSourceFilter (e) {
    emit(this, 'clear-source', {bubbles: true})
  }

  onClickTagFilter (e) {
    emit(this, 'clear-tag', {bubbles: true})
  }

  onClickSearchFilter (e) {
    emit(this, 'clear-search', {bubbles: true})
  }
}
SearchFilters.styles = searchFiltersCSS
customElements.define('search-filters', SearchFilters)