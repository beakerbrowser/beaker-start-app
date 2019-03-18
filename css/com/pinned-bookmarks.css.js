import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

h2 {
  font-size: 11px;
  color: rgba(0,0,0,.75);
}

h2 button {
  outline: 0;
  cursor: pointer;
  float: right;
}

h2 button:hover {
  background: #eee;
}

.pinned-bookmarks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  user-select: none;
}

.pinned-bookmark {
  background: #fff;
  text-align: center;
  outline: 1px solid #ccc;
  height: 120px;
}

.pinned-bookmark:hover {
  outline: 1px solid #ccc;
  background: #eee;
}

.pinned-bookmark.drag-hover {
  outline: 3px dashed #ccc;
}

.pinned-bookmark .favicon {
  margin-top: 30px;
  width: 32px;
  height: 32px;
}

.pinned-bookmark .title {
  text-overflow: ellipsis;
  color: rgba(51, 51, 51, 0.9);
  font-size: 12px;
  max-width: 100px;
  margin: auto;
  margin-top: 10px;
}

@media (min-width: 640px) {
  .pinned-bookmarks-container .pinned-bookmarks {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 740px) {
  .pinned-bookmarks-container .pinned-bookmarks {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 900px) {
  .pinned-bookmarks-container .pinned-bookmarks {
    grid-template-columns: repeat(6, 1fr);
  }
}

.pinned-bookmarks-container .pinned-bookmark.explorer-pin i {
  font-size: 45px;
  margin-top: 38px;
}
`
export default cssStr