import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'
import tooltipCSS from '/vendor/beaker-app-stdlib/css/tooltip.css.js'
import searchInputCSS from '/vendor/beaker-app-stdlib/css/com/search-input.css.js'

const cssStr = css`
${colorsCSS}
${buttonsCSS}
${tooltipCSS}
${searchInputCSS}

:host {
  display: block;
  height: 100vh;
  overflow-y: scroll;
}

a {
  color: var(--blue);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.layout {
  display: flex;
  margin-top: 10px;
}

.left {
  width: 180px;
  box-sizing: border-box;
  padding: 0px 10px 10px 10px;
}

.center {
  flex: 1;
  margin-right: 10px;
}

.left > * {
  margin: 0 0 20px;
}

.center-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 15px;
}

.search-container {
  position: relative;
  margin: 4px 0 10px;
  height: 34px;
}

input.search {
  font-size: 13px;
  border: 1px solid #ddd;
  outline: 0;
  box-sizing: border-box;
  width: 150px;
  height: 34px;
  border-radius: 18px;
  padding-left: 38px;
}

.search-container > i.fa-search  {
  top: 11px;
  font-size: 13px;
}

.label {
  position: relative;
  top: -1px;
  display: inline-block;
  color: #555;
  font-weight: 500;
  padding: 4px 6px 5px;
  border-radius: 4px;
  background: #eee;
  font-size: 10px;
  line-height: 1;
}

.empty {
  background: #fafafa;
  padding: 4rem;
  text-align: center;
  border-radius: 4px;
  color: gray;
  font-weight: 300;
  font-size: 15px;
  line-height: 2;
}

.empty .far,
.empty .fas {
  font-size: 50px;
  color: #bbb;
}

.item {
  display: flex;
  border-top: 1px solid #eee;
  background: #fff;
  padding: 5px 0;
}

.item:last-child {
  border-bottom: 1px solid #eee;
}

.item:hover {
  background: #fafafa;
}

.item-left {
  padding: 6px;
}

.item-center {
  padding: 10px 10px;
  flex: 1;
}

.item-right {
  padding: 10px 12px 8px 0;
  width: 120px;
  color: var(--color-text--muted);
  line-height: 21px;
}

.item img {
  display: block;
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #a4a4a4;
}

.item .title {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}

.item .description {
  line-height: 20px;
  font-size: 15px;
}

.item .local-sync-path {
  color: green;
}

.item .url {
  line-height: 20px;
}

.item .url a {
  color: gray;
}

.item .ctrls {
  float: right;
  text-align: right;
}

.item .ctrls > div {
  margin-bottom: 10px;
}

.item .ctrls button {
  cursor: pointer;
}

.item-right a {
  color: inherit;
}

.nice-phrase {
  margin: 30px;
  font-weight: 300;
  color: #bbb;
  text-align: center;
}
`
export default cssStr