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
  text-align: center;
}

.header img {
  display: block;
  width: 100px;
  margin: 0 auto 30px;
}

#browser-links {
  display: flex;
  position: fixed;
  top: 8px;
  right: 10px;
  z-index: 1;
}

#browser-links a {
  position: relative;
  margin-left: 10px;
  border-radius: 4px;
  padding: 0 6px;
  height: 28px;
  line-height: 28px;
  color: #666;
  text-decoration: none;
}

#browser-links a:hover,
#browser-links a.active {
  background: rgb(245, 247, 249);
}

#browser-links .user-profile {
  padding: 0;
}

#browser-links .user-profile img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.start-view-wrapper {
  position: relative;
  margin: 15vh auto 0;
  width: 460px;
}

start-pinned-bookmarks {
  width: 460px;
}

@media (min-width: 640px) {
  .start-view-wrapper,
  start-pinned-bookmarks {
    width: 580px;
  }
}

@media (min-width: 800px) {
  .start-view-wrapper,
  start-pinned-bookmarks {
    width: 720px;
  }
}
`
export default cssStr