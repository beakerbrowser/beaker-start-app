import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import discoverNavCSS from '../../../css/com/discover/nav.css.js'

class DiscoverNav extends LitElement {
  static get properties () {
    return {
      current: {type: String},
      counts: {type: Object}
    }
  }

  constructor () {
    super()
    this.counts = {}
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
          <span class="label">${label} ${(id in this.counts) ? html`<small>(${this.counts[id]})</small>` : ''}</span>
        </a>
      `
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        ${item('bookmarks', 'far fa-star', 'Bookmarks')}
        ${item('follows', 'far fa-user-circle', 'Followed sites')}
        <div class="heading"><span class="fa-fw far fa-file-image""></span> <span class="label">Media</span></div>
        <div class="sub">
          ${item('blogposts', false, 'Blog posts')}
          ${item('pages', false, 'Pages')}
          ${item('podcasts', false, 'Podcasts')}
          ${item('gifs', false, 'Gifs')}
          ${item('images', false, 'Images')}
          ${item('music', false, 'Music')}
          ${item('videos', false, 'Videos')}
          ${item('documents', false, 'Documents')}
          ${item('ebooks', false, 'E-books')}
          ${item('files', false, 'Files')}
        </div>
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
DiscoverNav.styles = discoverNavCSS
customElements.define('start-discover-nav', DiscoverNav)