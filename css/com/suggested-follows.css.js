import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
h2 {
  font-size: 11px;
  color: rgba(0,0,0,.75);
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