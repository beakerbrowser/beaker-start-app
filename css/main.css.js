import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'
import spinnerCSS from '/vendor/beaker-app-stdlib/css/com/spinner.css.js'

const cssStr = css`
${buttonsCSS}
${spinnerCSS}

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
  border-bottom: 1px solid #ccc;
  height: 50px;
}

#nav {
  position: fixed;
  top: 0px;
  left: 20px;
  z-index: 1;
}

#nav button .fa-fw {
  color: gray;
  margin-right: 2px;
}

#nav button.radio {
  cursor: pointer;
  line-height: 49px;
  padding: 0 16px;
  font-size: 13px;
}

#nav button.radio.pressed {
  background: transparent;
  color: inherit;
  border-radius: 0;
  line-height: 47px;
  border-bottom: 2px solid var(--blue);
}

#nav button.radio:hover {
  background: rgb(243, 245, 247);
}

#browser-links {
  display: flex;
  position: fixed;
  top: 10px;
  right: 30px;
  z-index: 1;
}
#browser-links a {
  position: relative;
  margin-left: 15px;
  border-radius: 4px;
  text-align: center;
  width: 28px;
  height: 28px;
}
#browser-links a:hover,
#browser-links a.active {
  background: rgb(245, 247, 249);
}
#browser-links img,
#browser-links .fas {
  width: 16px;
  height: 16px;
  margin-top: 6px;
}
#browser-links a[href="beaker://history"] img {
  position: relative;
  left: -1px;
}
#browser-links .fas,
#browser-links .spinner {
  margin-top: 7px;
  color: #34495e;
}
#browser-links .spinner {
  width: 10px;
  height: 10px;
}
#browser-links .user-profile img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin: 0;
}

.views-wrapper {
  height: calc(100vh - 51px);
  overflow: hidden;
}

.views {
  position: relative;
  transform: translateX(0);
}

.views.transitioning {
  transition: transform 0.2s;
}
.views[data-view="feed"] {
  transform: translateX(-100vw);
}
.views[data-view="discover"] {
  transform: translateX(-200vw);
}

#view-pins,
#view-feed,
#view-discover {
  position: absolute;
  top: 0;
  width: 100%;
}
#view-feed {
  left: 100vw;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
#view-discover {
  left: 200vw;
}

start-pinned-bookmarks {
  width: 460px;
  margin: 12vh auto 20vh;
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