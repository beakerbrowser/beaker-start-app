import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import flyersCSS from '../../css/com/flyers.css.js'

class Flyers extends LitElement {
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
    this.shouldShow = (await beaker.browser.getSetting('start_section_hide_flyers')) !== 1
  }

  // rendering
  // =

  render() {
    if (!this.shouldShow) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      
      <div class="flyers-container">
        <h2>
          <span class="fas fa-bullhorn"></span>
          Flyers
          <button @click=${this.onClickManagerDropdown}><span class="fas fa-ellipsis-h"></span></button>
        </h2>
        <div class="flyers">
          <a class="flyer" href="dat://beakerbrowser.com">
            <h3>Beaker.Dev is online!</h3>
            <p>Beaker.Dev is a documentation site that covers everything you need to know to build on Beaker. Check it out!</p>
            <div class="meta">
              <span class="author" data-href="dat://pfrazee.hashbase.io" @click=${this.onClickSublink} @mousedown=${this.onMousedownSublink}>
                <img src="dat://628861e5140d1490833c3f2683e132fc8c485c99a448495a813649cd4ac05556/thumb">
                Paul Frazee
              </span>
              <span class="date">Today</span>
            </div>
          </a>
          <a class="flyer" href="dat://beakerbrowser.com">
            <h3>P2P Web Austin is coming October 5</h3>
            <p>Sign up for tickets and get an early-bird discount.</p>
            <div class="meta">
              <span class="author" data-href="dat://pfrazee.hashbase.io" @click=${this.onClickSublink} @mousedown=${this.onMousedownSublink}>
                <img src="dat://628861e5140d1490833c3f2683e132fc8c485c99a448495a813649cd4ac05556/thumb">
                Paul Frazee
              </span>
              <span class="date">3 days ago</span>
            </div>
          </a>
          <a class="flyer" href="dat://beakerbrowser.com">
            <h3>Web Component: profile-card.unwalled.garden</h3>
            <p>Simple, modern profile card UI for use in social media applications.</p>
            <div class="meta">
              <span class="author" data-href="dat://pfrazee.hashbase.io" @click=${this.onClickSublink} @mousedown=${this.onMousedownSublink}>
                <img src="dat://628861e5140d1490833c3f2683e132fc8c485c99a448495a813649cd4ac05556/thumb">
                Paul Frazee
              </span>
              <span class="date">13 days ago</span>
            </div>
          </a>
          <a class="flyer" href="dat://beakerbrowser.com">
            <h3>New Unwalled.Garden specs are published</h3>
            <p>The updates include annotations and web-of-trust signals such as "vouches" and "warnings."</p>
            <div class="meta">
              <span class="author" data-href="dat://pfrazee.hashbase.io" @click=${this.onClickSublink} @mousedown=${this.onMousedownSublink}>
                <img src="dat://628861e5140d1490833c3f2683e132fc8c485c99a448495a813649cd4ac05556/thumb">
                Paul Frazee
              </span>
              <span class="date">3 weeks ago</span>
            </div>
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
      x: e.currentTarget.getBoundingClientRect().right,
      y: e.currentTarget.getBoundingClientRect().bottom + document.documentElement.scrollTop,
      right: true,
      noBorders: true,
      items: [
        {icon: 'fas fa-times', label: 'Remove section', click: () => this.onRemoveSection()}
      ],
      style: 'padding: 4px 0;',
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'
    })
  }

  onClickSublink (e) {
    e.preventDefault()
    e.stopPropagation()

    if (e.ctrlKey || e.metaKey) {
      window.open(e.currentTarget.dataset.href)
    } else {
      window.location = e.currentTarget.dataset.href
    }
  }

  onMousedownSublink (e) {
    if (e.which === 2) {
      // middle click
      e.preventDefault()
      e.stopPropagation()
      window.open(e.currentTarget.dataset.href)
    }
  }

  async onRemoveSection () {
    await beaker.browser.setSetting('start_section_hide_flyers', 1)
    this.shouldShow = false

    const undo = async () => {
      await beaker.browser.setSetting('start_section_hide_flyers', 0)
      this.shouldShow = true
    }

    toast.create('Section removed', '', 10e3, {label: 'Undo', click: undo})
  }
}
Flyers.styles = flyersCSS

customElements.define('start-flyers', Flyers);