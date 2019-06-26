import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

:host {
  display: block;
}

.pinned-bookmarks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  user-select: none;
  margin: 5px 0;
}

.pinned-bookmark {
  background: #fff;
  text-align: center;
  height: 120px;
  border-radius: 16px;
}

.pinned-bookmark:hover {
  background: rgb(245, 247, 249);
}

.pinned-bookmark.drag-hover {
  outline: 3px dashed var(--border-color);
}

.pinned-bookmark .favicon {
  margin-top: 30px;
  width: 32px;
  height: 32px;
}

.pinned-bookmark .title {
  text-overflow: ellipsis;
  color: #34495e;
  font-size: 12px;
  max-width: 100px;
  margin: auto;
  margin-top: 10px;
}

.explorer-pin {
  border: 0;
  background: none;
}

.explorer-pin i {
  color: rgb(222, 228, 232);
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
  font-size: 27px;
  margin-top: 44px;
}
`
export default cssStr