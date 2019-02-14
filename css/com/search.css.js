import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'
import autocompleteCSS from '/vendor/beaker-app-stdlib/css/com/autocomplete.css.js'

const cssStr = css`
${commonCSS}
${autocompleteCSS}

.search-container {
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 15px;
}

.spinner,
.close-btn,
.search {
  position: absolute;
}

input.search {
  left: 0;
  top: 0;
  width: calc(100% - 50px);
  height: 40px;
  padding: 0 10px;
  padding-left: 47px;
  border-radius: 0;
  border-radius: 4px 0 0 4px;
  border-right: 0;
}

input.search:invalid + .close-btn {
  opacity: 0;
}

input:focus {
  box-shadow: none;
}

i.fa-search {
  position: absolute;
  font-size: 16px;
  left: 17px;
  top: 11px;
  color: rgba(0,0,0,0.4);
}

.btn.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 40px;
  border-radius: 0 4px 4px 0;
  font-size: 20px;
  line-height: 16px;
}

i.fa-arrow-right {
  -webkit-text-stroke: 1px @blue;
}

.search-results {
  top: 41px;
  max-height: calc(90vh - 300px);
  overflow-y: auto;
}

.search-result .icon.fa-search {
  position: initial;
}

.filter-btn {
  position: absolute;
  left: ~"calc(100% + 3px)";
  top: 1px;
}

.filter-btn .dropdown-items {
  right: -3px;
}

.dropdown-items.filters {
  width: 200px;
}

.spinner {
  left: 8px;
  top: 8px;
}

.spinner.hidden {
  display: none;
}

.close-btn {
  right: 7px;
  top: 7px;
}
`
export default cssStr