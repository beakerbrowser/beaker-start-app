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
  display: flex;
  padding: 8px 18px;
  font-size: 13px;
}

.bookmark:hover {
  background: #f5f5f5;
}

.bookmark > * {
  margin-right: 10px;
}

.bookmark .favicon {
  width: 16px;
  heigh: 16px;
  object-fit: scale-down;
}

.bookmark .title {
  color: var(--blue);
  font-weight: 500;
}

.bookmark .href {
  color: var(--blue);
}

.bookmark .description {
  color: rgba(0,0,0,.5);
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