import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

:host {
  display: block;
}

.layout {
  display: flex;
}

bookmarks-nav,
.bookmarks {
  height: 100vh;
  overflow-y: auto;
}

bookmarks-nav {
  flex: 0 0 200px;
}

.bookmarks,
.empty {
  flex: 1;
}

.bookmarks {
  font-size: 14px;
  padding: 5px 0 200px;
}

.bookmark {
  display: block;
  padding: 10px 18px;
  font-size: 13px;
}

.bookmark:hover {
  background: #f5f5f5;
}

.bookmark .title {
  font-size: 16px;
  color: var(--blue);
}

.bookmark .href {
  color: var(--blue);
}

.bookmark .description {
  color: rgba(0,0,0,.75);
}

.bookmark .tags {
  color: green;
}

.empty {
  margin: 2rem;
  color: #555;
  font-size: 15px;
}
`
export default cssStr