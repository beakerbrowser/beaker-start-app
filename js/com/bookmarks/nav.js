import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import bookmarksNavCSS from '../../../css/com/bookmarks/nav.css.js'

class BookmarksNav extends LitElement {
  static get properties () {
    return {
      me: {type: String},
      current: {type: String},
      sources: {type: Array}
    }
  }

  static get styles () {
    return bookmarksNavCSS
  }

  constructor () {
    super()
    this.sources = []
  }

  // rendering
  // =

  render () {
    const item = (id, label) => {
      const cls = classMap({
        item: true,
        current: id === this.current
      })
      return html`
        <a class=${cls} @click=${e => this.onClick(e, id)}>
          <img src="asset:thumb:${id === 'me' ? this.me : id}">
          <span class="label">${label}</span>
        </a>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        <h5>Personal</h5>
        ${item('me', 'My Bookmarks')}
        <h5>Shared with you</h5>
        ${repeat(this.sources, source => item(source.url, source.title))}
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
customElements.define('bookmarks-nav', BookmarksNav)