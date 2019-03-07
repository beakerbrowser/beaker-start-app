import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { profiles } from '../tmp-beaker.js'
import { followgraph } from '../tmp-unwalled-garden.js'
import suggestedFollowsCSS from '../../css/com/suggested-follows.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

class SuggestedFollows extends LitElement {
  static get properties () {
    return {
      shouldShow: {type: Boolean},
      user: {type: Object},
      profiles: {type: Array}
    }
  }

  constructor () {
    super()
    this.shouldShow = false
    this.user = null
    this.profiles = null
    this.load()
  }

  async load () {
    this.shouldShow = (await beaker.browser.getSetting('start_section_hide_suggested_follows')) !== 1
    this.user = await profiles.getCurrentUser()
    // TODO change to a query for unfollowed foafs
    this.profiles = [this.user].concat(await followgraph.listFollows(this.user.url)).slice(0, 3)
    console.log(this.profiles)
  }

  // rendering
  // =

  render() {
    if (!this.shouldShow) {
      return html`<div></div>`
    }
    if (this.profiles && this.profiles.length === 0) {
      return html`` // no suggestions
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="suggested-follows-container">
        <h2>
          <span class="fas fa-user"></span>
          Suggested Follows
          <button @click=${this.onClickManagerDropdown}><span class="fas fa-ellipsis-h"></span></button>
        </h2>
        <div class="suggested-follows">
          ${this.renderSuggestedFollows()}
        </div>
      </div>
    `
  }

  renderSuggestedFollows () {
    if (!this.profiles) {
      return html`
        <div class="empty">Loading...</div>
      `
    }
    return html`
      ${repeat(this.profiles, profile => html`<beaker-profile-info-card .user=${profile}></beaker-profile-info-card>`)}
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

  async onRemoveSection () {
    await beaker.browser.setSetting('start_section_hide_suggested_follows', 1)
    this.shouldShow = false

    const undo = async () => {
      await beaker.browser.setSetting('start_section_hide_suggested_follows', 0)
      this.shouldShow = true
    }

    toast.create('Section removed', '', 10e3, {label: 'Undo', click: undo})
  }
}
SuggestedFollows.styles = suggestedFollowsCSS

customElements.define('start-suggested-follows', SuggestedFollows)

