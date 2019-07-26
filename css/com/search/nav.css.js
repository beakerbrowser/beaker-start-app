import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'

const cssStr = css`
${colorsCSS}

:host {
  display: block;
}

:host > div {
  display: flex;
}

a,
.heading {
  display: block;
  padding: 10px 10px;
}

a {
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-right: 10px;
}

a:hover {
  color: var(--blue);
}

.heading {
  padding-bottom: 8px;
}

.sub a {
  color: var(--color-text--muted);
  padding: 8px 10px;
}

a.current {
  color: var(--blue);
  border-bottom: 3px solid var(--blue);
}

.no-icon {
  display: inline-block;
}
`
export default cssStr