import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.pinned-bookmarks-config {
  text-align: right;
  margin-bottom: 10px;
}

.pinned-bookmarks-config .mode span {
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-left: 2px;
  -webkit-font-smoothing: unset;
  font-size: 15px;
}

.pinned-bookmarks-config .mode span.active {
  color: rgba(0,0,0,0.6);
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
  font-size: .8rem;
  outline: 1px solid #ddd;
}

.pinned-bookmark:hover {
  outline: 1px solid #ddd;
  background: #eee;
}

.pinned-bookmark.sortable-ghost {
  outline: 3px dashed #ddd;
}

.pinned-bookmark .favicon {
  width: 32px;
  height: 32px;
}

.pinned-bookmark .title {
  text-overflow: ellipsis;
  color: rgba(51, 51, 51, 0.9);
}

.explorer-pin {
  outline: 0;
  background: none;
}

.explorer-pin:hover {
  background: #eee;
}

.explorer-pin i {
  color: rgba(0,0,0,.15);
}

@media (min-width: 640px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 740px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 900px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 1100px) {
  .pinned-bookmarks-container.square-mode .pinned-bookmarks {
    grid-template-columns: repeat(7, 1fr);
  }
}

.pinned-bookmarks-container.square-mode .pinned-bookmark {
  width: 120px;
  height: 120px;
}

.pinned-bookmarks-container.square-mode .pinned-bookmark .favicon {
  margin-top: 30px;
}

.pinned-bookmarks-container.square-mode .pinned-bookmark .title {
  font-size: .675rem;
  max-width: 100px;
  margin: auto;
  margin-top: 10px;
}

.pinned-bookmarks-container.square-mode .pinned-bookmark.explorer-pin i {
  font-size: 45px;
  margin-top: 38px;
}

@media (min-width: 780px) {
  .pinned-bookmarks-container.horz-mode .pinned-bookmarks {
    grid-template-columns: repeat(4, 1fr);
  }
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark {
  display: flex;
  align-items: center;
  padding: 10px;
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark .favicon {
  margin-right: 10px;
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark .title {
  font-size: .8rem;
}

.pinned-bookmarks-container.horz-mode .pinned-bookmark.explorer-pin i {
  font-size: 40px;
  line-height: 27px;
}
`
export default cssStr