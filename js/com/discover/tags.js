import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import discoverTagsCSS from '../../../css/com/discover/tags.css.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'

const SUGGESTED_TAGS = [
  'aww',
  'funny',
  'food',
  'news',
  'tech',
  'gaming',
  'interesting',
  'movies',
  'science',
  'tv',
  'culture',
  'art',
  'politics',
  'nsfw'
]

class DiscoverTags extends LitElement {
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
    this.load()
  }

  async load () {
    // TODO
    this.list = SUGGESTED_TAGS
  }

  // rendering
  // =

  render () {
    const item = (tag) => {
      const cls = classMap({
        item: true,
        current: tag === this.current || (!tag && !this.current)
      })
      return html`
        <div>
          <a class=${cls} title=${tag || 'All tags'} @click=${e => this.onClick(e, tag)}>${tag ? '#' + tag : 'All tags'}</a>
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
DiscoverTags.styles = discoverTagsCSS
customElements.define('start-discover-tags', DiscoverTags)