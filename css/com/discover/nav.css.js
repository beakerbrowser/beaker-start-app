import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'

const cssStr = css`
${colorsCSS}

:host {
  display: block;
}

a,
.heading {
  display: block;
  padding: 12px 10px;
}

a {
  cursor: pointer;
  border-radius: 4px;
}

a:hover {
  background: #f5f5f5;
}

.heading {
  padding-bottom: 8px;
}

.sub a {
  color: var( --color-text--muted);
  padding: 8px 10px;
}

a.current {
  color: var(--blue);
}


.no-icon {
  display: inline-block;
}
`
export default cssStr