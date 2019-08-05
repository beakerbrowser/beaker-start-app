import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'

const cssStr = css`
${colorsCSS}

:host {
  display: block;
  border-right: 1px solid #ddd;
  background: #eee;
}

a {
  display: block;
  padding: 12px 10px;
}

a {
  cursor: pointer;
}

a:hover {
  background: #f5f5f5;
}

a.current {
  background: var(--blue);
  color: #fff;
}

a img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  top: -1px;
  margin-right: 5px;
  vertical-align: middle;
  border: 1px solid rgba(255, 255, 255, 0.75);
}
`
export default cssStr