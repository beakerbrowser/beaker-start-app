import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { profiles } from '../tmp-beaker.js'
import { followgraph } from '../tmp-unwalled-garden.js'
import suggestedFollowsCSS from '../../css/com/suggested-follows.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

class SuggestedFollows extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      profiles: {type: Array}
    }
  }

  constructor () {
    super()
    this.user = null
    this.profiles = null
    this.load()
  }

  async load () {
    this.user = await profiles.getCurrentUser()
    // TODO change to a query for unfollowed foafs
    this.profiles = [this.user].concat(await followgraph.listFollows(this.user.url)).slice(0, 3)
    console.log(this.profiles)
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="suggested-follows-container">
        <h2><span class="fas fa-user"></span> Suggested Follows</h2>
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
    if (this.profiles.length === 0) {
      return html`
        <div class="empty">Beaker has no suggestions at the moment!</div>
      `
    }
    return html`
      ${repeat(this.profiles, profile => html`<beaker-profile-info-card .user=${profile}></beaker-profile-info-card>`)}
    `
  }
}
SuggestedFollows.styles = suggestedFollowsCSS

customElements.define('start-suggested-follows', SuggestedFollows)

