import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

h2 {
  font-size: 11px;
  color: rgba(0,0,0,.75);
}

h2 button {
  outline: 0;
  cursor: pointer;
  float: right;
}

h2 button:hover {
  background: #eee;
}

.suggested-follows {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

beaker-profile-info-card {
  border-color: #ccc;
}
`
export default cssStr