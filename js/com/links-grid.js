import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import { writeToClipboard } from '/vendor/beaker-app-stdlib/js/clipboard.js'
import linksGridCSS from '../../css/com/links-grid.css.js'

class LinksGrid extends LitElement {
  static get properties() {
    return {
      items: {type: Array}
    }
  }

  constructor () {
    super()
    this.items = []
  }

  // rendering
  // =

  render() {
    if (!this.items) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="grid-container">
        <div class="grid">
          ${repeat(this.items, b => b, b => html`
            <a
              class="item"
              href=${b.href || b.url}
              @contextmenu=${e => this.onContextmenuItem(e, b)}
            >
              <img src=${'asset:favicon-32:' + (b.href || b.url)} class="favicon"/>
              <div class="title">${b.title}</div>
            </a>
          `)}
        </div>
      </div>
    `
  }

  // events
  // =

  async onContextmenuItem (e, item) {
    e.preventDefault()
    const items = [
      {icon: 'fa fa-external-link-alt', label: 'Open Link in New Tab', click: () => window.open(item.href)},
      {icon: 'fa fa-link', label: 'Copy Link Address', click: () => writeToClipboard(item.href)}
    ]
    await contextMenu.create({x: e.clientX, y: e.clientY, items, fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'})
  }
}

// styles
// =

LinksGrid.styles = linksGridCSS

customElements.define('start-links-grid', LinksGrid);