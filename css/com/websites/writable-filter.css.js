import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'

const cssStr = css`
${colorsCSS}

:host {
  display: block;
}

.heading {
  margin: 4px 0;
  color: var(--color-text);
}

a {
  display: inline-block;
  cursor: pointer;
  color: var(--color-text--muted);
  font-size: 14px;
  padding: 2px 0;
}

a:hover {
  text-decoration: underline;
}

a.current {
  color: var(--blue);
}
`
export default cssStr