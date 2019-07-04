import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

:host {
  display: block;
}

h2 {
  text-align: center;
  margin: 20px 0;
  font-weight: 400;
}

.bookmarks {
  width: 1000px;
  margin: 10px auto;
  font-size: 14px;
}

.bookmark {
  display: flex;
  flex-align: center;
  padding: 10px 16px;
  border-radius: 16px;
}

.bookmark:hover {
  background: #f5f5f5;
}

.bookmark > * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 10px;
}

.bookmark .favicon {
  width: 16px;
  height: 16px;
}

.bookmark .title {
  width: 200px;
}

.bookmark .description {
  flex: 1;
}

.bookmark .href {
  width: 200px;
  color: var(--blue);
}

.bookmark .tags {
  width: 200px;
  color: gray;
}

.nice-phrase {
  margin: 30px;
  font-weight: 300;
  color: #bbb;
  text-align: center;
}
`
export default cssStr