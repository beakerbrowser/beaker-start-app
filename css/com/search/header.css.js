import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'
import searchInputCSS from '/vendor/beaker-app-stdlib/css/com/search-input.css.js'

const cssStr = css`
${commonCSS}
${searchInputCSS}
:host {
  display: block;
  padding: 10px 20px 0;
  border-bottom: 1px solid #ddd;
}

.top {
  display: flex;
  align-items: center;
  height: 50px;
}

img.brand {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

a {
  margin-right: 30px;
  font-size: 18px;
  font-weight: 300;
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: #777;
}

.search-container {
  position: relative;
  width: 600px;
  height: 40px;
}

input.search {
  font-size: 15px;
}

input.search::-webkit-input-placeholder {
  font-size: 0.9rem;
}

i.fa-search {
  top: 12px;
}

search-nav {
  margin-left: 70px;
}
`
export default cssStr