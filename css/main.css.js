import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'
import spinnerCSS from '/vendor/beaker-app-stdlib/css/com/spinner.css.js'
import tooltipCSS from '/vendor/beaker-app-stdlib/css/tooltip.css.js'

const cssStr = css`
${buttonsCSS}
${spinnerCSS}
${tooltipCSS}

.hidden {
  display: none;
}

h5 {
  color: #556779;
  margin-bottom: 0;
  opacity: 0.7;
  font-weight: 400;
}

.header {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  width: 452px;
  z-index: 1;
  text-align: center;
}

.header img {
  display: block;
  width: 100px;
  margin: 0 auto 30px;
}

.nav button .fa-fw {
  color: inherit;
  margin-right: 2px;
}

.nav button {
  display: inline-block;
  cursor: pointer;
  line-height: 32px;
  padding: 8px 14px 8px 16px;
  font-size: 13px;
  color: #555;
  background: #f5f5f5;
  border-radius: 50%;
  margin: 0 30px;
}

.nav button[data-tooltip]:hover::before {
  transform: translate(-50%, 20px);
}

.nav button[data-tooltip]::after {
  top: 48px;
}

start-pinned-bookmarks {
  width: 460px;
  margin: 300px auto;
}

@media (min-width: 640px) {
  start-pinned-bookmarks {
    width: 580px;
  }
}

@media (min-width: 740px) {
  start-pinned-bookmarks {
    width: 700px;
  }
}

@media (min-width: 900px) {
  start-pinned-bookmarks {
    width: 830px;
  }
}

@media (min-width: 1100px) {
  start-pinned-bookmarks {
    width: 950px;
  }
}
`
export default cssStr