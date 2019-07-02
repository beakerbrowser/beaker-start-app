import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'
import searchInputCSS from '/vendor/beaker-app-stdlib/css/com/search-input.css.js'

const cssStr = css`
${commonCSS}
${searchInputCSS}
:host {
  display: flex;
  height: 30px;
  padding: 15px 150px 5px;
  align-items: center;
}

a {
  margin-right: 30px;
  font-size: 18px;
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: #777;
}

a.current {
  color: var(--blue);
}

.search-container {
  position: relative;
  margin-left: auto;
  width: 260px;
  height: 36px;
}

input.search {
  font-size: 15px;
  border-radius: 20px;
  height: 36px;
}

input.search::-webkit-input-placeholder {
  font-size: 0.9rem;
}

i.fa-search {
  top: 12px;
}

`
export default cssStr