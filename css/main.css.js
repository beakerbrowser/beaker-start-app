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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fafafa;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 0 6px 0 0px;
  box-sizing: border-box;
}

#browser-links > span {
  color: #34495e;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
}

#browser-links a {
  position: relative;
  margin-left: 10px;
  padding: 0 6px;
  height: 28px;
  line-height: 28px;
  color: #34495e;
  text-decoration: none;
}

#browser-links a:hover{
  background: #eee;
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