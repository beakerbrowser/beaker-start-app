import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'

const cssStr = css`
${colorsCSS}

:host {
  display: block;
  border-right: 1px solid #ddd;
  background: #eee;
}

h5 {
  margin: 8px;
  color: gray;
}

a {
  display: flex;
  padding: 5px 10px;
  align-items: center;
}

a {
  cursor: pointer;
}

a:hover {
  background: #f5f5f5;
}

a.current {
  background: #ddd;
}

a img {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 1px solid rgba(255, 255, 255, 0.75);
}
`
export default cssStr