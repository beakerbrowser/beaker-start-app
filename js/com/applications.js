import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import applicationsCSS from '../../css/com/applications.css.js'

class Applications extends LitElement {
  static get properties() {
    return {
      shouldShow: {type: Boolean}
    }
  }

  constructor () {
    super()
    this.shouldShow = false
    this.load()
  }

  async load () {
    this.shouldShow = (await beaker.browser.getSetting('start_section_hide_applications')) !== 1
  }

  // rendering
  // =

  render() {
    if (!this.shouldShow) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="applications-container">
        <h2>
          <span class="far fa-window-maximize"></span>
          Applications
          <button @click=${this.onClickManagerDropdown}><span class="fas fa-chevron-down"></span></button>
        </h2>
        <div class="applications">
          <a class="application" href="beaker://bookmarks" @contextmenu=${this.onContextmenuApplication}>
            <img class="favicon" src="beaker-favicon:64,beaker://bookmarks">
            <div class="title">Bookmarks</div>
          </a>
          <a class="application" href="beaker://library" @contextmenu=${this.onContextmenuApplication}>
            <img class="favicon" src="beaker-favicon:64,beaker://library">
            <div class="title">Library</div>
          </a>
          <a class="application" href="beaker://search" @contextmenu=${this.onContextmenuApplication}>
            <img class="favicon" src="beaker-favicon:64,beaker://search">
            <div class="title">Search</div>
          </a>
          <a class="application" href="dat://beaker.social" @contextmenu=${this.onContextmenuApplication}>
            <img class="favicon" src="beaker-favicon:64,dat://beaker.social">
            <div class="title">Beaker.Social</div>
          </a>
        </div>
      </div>
    `
  }

  // events
  // =

  onClickManagerDropdown (e) {
    e.stopPropagation()
    contextMenu.create({
      x: e.currentTarget.getBoundingClientRect().left,
      y: e.currentTarget.getBoundingClientRect().bottom,
      noBorders: true,
      items: [
        {icon: 'fas fa-times', label: 'Remove section', click: () => this.onRemoveSection()}
      ],
      style: 'padding: 4px 0;',
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'
    })
  }

  async onContextmenuApplication (e) {
    e.preventDefault()
    var url = e.currentTarget.getAttribute('href')
    const items = [
      {icon: 'fa fa-external-link-alt', label: 'Open Link in New Tab', click: () => window.open(url)},
      {icon: 'fa fa-link', label: 'Copy Link Address', click: () => writeToClipboard(url)}
    ]
    await contextMenu.create({x: e.clientX, y: e.clientY, items, fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'})
  }

  async onRemoveSection () {
    await beaker.browser.setSetting('start_section_hide_applications', 1)
    this.shouldShow = false

    const undo = async () => {
      await beaker.browser.setSetting('start_section_hide_applications', 0)
      this.shouldShow = true
    }

    toast.create('Section removed', '', 10e3, {label: 'Undo', click: undo})
  }
}

// styles
// =

Applications.styles = applicationsCSS

customElements.define('start-applications', Applications);