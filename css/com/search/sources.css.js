import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'
import tooltipCSS from '/vendor/beaker-app-stdlib/css/tooltip.css.js'

const cssStr = css`
${colorsCSS}
${tooltipCSS}

:host {
  display: block;
}

.heading {
  margin: 6px 0 14px;
  color: var(--color-text);
}

.sources {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3px;
}

a {
  display: block;
  cursor: pointer;
}

.img-wrapper {
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 2px solid transparent;
}

a.current .img-wrapper {
  border: 2px solid #ddd;
}

.img {
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #aaa;
}

a.textual .img {
  text-align: center;
  line-height: 42px;
  color: rgba(0, 0, 0, 0.66);
}

a:hover .img {
  border-color: #555;
}

a.current .img {
  border-color: #333;
  font-weight: 500;
}

.img > * {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}

.img > span {
  font-size: 14px;
  line-height: 40px;
}

*[data-tooltip]:before {
  top: 48px;
}

*[data-tooltip]:after {
  top: 44px;
}
`
export default cssStr