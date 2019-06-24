import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'

const cssStr = css`
${colorsCSS}

:host {
  display: block;
}

.heading {
  margin: 6px 0 14px;
  color: var(--color-text);
}

.tags {
}

a {
  display: inline-block;
  cursor: pointer;
  color: var(--color-text--muted);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 15px;
}

a:hover {
  text-decoration: underline;
}

a.current {
  color: var(--color-text);
  background: #eee;
  font-weight: 500;
}
`
export default cssStr