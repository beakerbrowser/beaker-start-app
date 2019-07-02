import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import searchTagsCSS from '../../../css/com/search/tags.css.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'

class SearchTags extends LitElement {
  static get properties () {
    return {
      current: {type: String},
      list: {type: Array}
    }
  }

  constructor () {
    super()

    this.current = false
    this.list = []
  }

  // rendering
  // =

  render () {
    console.log(this.list)
    const item = (tagRecord) => {
      const cls = classMap({
        item: true,
        current: tagRecord ? tagRecord.tag === this.current : !this.current
      })
      return html`
        <div>
          <a class=${cls} title=${tagRecord || 'All tags'} @click=${e => this.onClick(e, tagRecord ? tagRecord.tag : undefined)}>
            ${tagRecord ? html`#${tagRecord.tag} <small>(${tagRecord.count})</small>` : 'All tags'}
          </a>
        </div>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="heading"><span class="fas fa-tags"></span> Tags</div>
      <div class="tags">
        ${item(undefined)}
        ${repeat(this.list, item)}
      </div>
    `
  }

  // events
  // =

  onClick (e, tag) {
    e.preventDefault()
    emit(this, 'change', {bubbles: true, detail: {tag}})
  }
}
SearchTags.styles = searchTagsCSS
customElements.define('search-tags', SearchTags)