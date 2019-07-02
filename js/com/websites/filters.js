import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import websitesFiltersCSS from '../../../css/com/websites/filters.css.js'
import '../hover-menu.js'
import '../current-filter.js'

const SORT_OPTIONS = {
  recent: 'Recently updated',
  alphabetical: 'Alphabetical'
}

class WebsitesFilters extends LitElement {
  static get properties () {
    return {
      sort: {type: 'String'},
      query: {type: 'String'},
      writable: {type: 'String'}
    }
  }

  constructor () {
    super()
    this.sort = 'recent'
    this.query = ''
    this.writable = ''
  }

  // rendering
  // =

  render () {
    return html`
      <div class="filters">
        <start-hover-menu
          icon="fas fa-sort-amount-down"
          current=${this.sort}
          .options=${SORT_OPTIONS}
          @change=${this.onChangeSort}
        ></start-hover-menu>
        ${this.query ? html`<start-current-filter label="${'"' + this.query + '"'}" @click=${this.onClickQueryFilter}></start-current-filter>` : ''}
        ${this.writable ? html`<start-current-filter label="${this.writable}" @click=${this.onClickWritableFilter}></start-current-filter>` : ''}
      </div>
    `
  }

  // events
  // =

  onChangeSort (e) {
    emit(this, 'change-sort', {bubbles: true, detail: {sort: e.detail.id}})
  }

  onClickQueryFilter (e) {
    emit(this, 'clear-query', {bubbles: true})
  }

  onClickWritableFilter (e) {
    emit(this, 'clear-writable', {bubbles: true})
  }
}
WebsitesFilters.styles = websitesFiltersCSS
customElements.define('websites-filters', WebsitesFilters)