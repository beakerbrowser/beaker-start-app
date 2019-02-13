import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

class TopRightControls extends LitElement {
  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div>
        <a href="beaker://settings"><span class="fas fa-cog"></span></a>
      </div>`
  }
}

TopRightControls.styles = css`
div {
  position: fixed;
  top: 10px;
  right: 16px;
}

a {
  color: gray;
}
`

customElements.define('start-top-right-controls', TopRightControls);

