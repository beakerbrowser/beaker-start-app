import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

class BeakerBlueNotice extends LitElement {
  render() {
    return html`
      <div>
        <span>Blue r1</span><br>
        Beta pre-release
      </div>`
  }
}

BeakerBlueNotice.styles = css`
div {
  position: fixed;
  bottom: 10px;
  right: 20px;
  font-size: 22px;
  text-align: right;
  font-weight: 300;
}
span {
  color: #2864dc;
  font-size: 38px;
  line-height: 1;
}
`

customElements.define('beaker-blue-notice', BeakerBlueNotice)