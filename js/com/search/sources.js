import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { ifDefined } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/if-defined.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import searchSourcesCSS from '../../../css/com/search/sources.css.js'

const profiles = navigator.importSystemAPI('unwalled-garden-profiles')
const follows = navigator.importSystemAPI('unwalled-garden-follows')

class SearchSources extends LitElement {
  static get properties () {
    return {
      label: {type: String},
      current: {type: String}
    }
  }

  constructor () {
    super()

    this.label = 'Created'
    this.current = 'network'
    this.me = null
    this.follows = []
    this.load()
  }

  async load () {
    this.me = await profiles.me()
    this.follows = (await follows.list({filters: {authors: this.me.url}})).map(({topic}) => topic)
    this.requestUpdate()
  }

  // rendering
  // =

  render () {
    const item = (id, label, img) => {
      const cls = classMap({
        item: true,
        textual: !img,
        'tooltip-nodelay': true,
        current: id === this.current
      })
      return html`
        <a class=${cls} data-tooltip="${ifDefined(!!img ? label : undefined)}" @click=${e => this.onClick(e, id)}>
          ${img
            ? html`<span class="img-wrapper"><span class="img">${img}</span></span>`
            : html`<span class="img-wrapper"><span class="img">${label}</span></span>`}
        </a>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="heading"><span class="fas fa-user"></span> ${this.label} by</div>
      <div class="sources">
        ${item('network', 'All', false)}
        ${this.me ? item(this.me.url, 'Me', html`<img src="asset:thumb:${this.me.url}">`) : ''}
        ${repeat(this.follows, f => item(f.url, f.title, html`<img src="asset:thumb:${f.url}">`))}
      </div>
    `
  }

  // events
  // =

  onClick (e, source) {
    e.preventDefault()
    emit(this, 'change', {bubbles: true, detail: {source}})
  }
}
SearchSources.styles = searchSourcesCSS
customElements.define('search-sources', SearchSources)