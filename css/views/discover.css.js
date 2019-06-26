import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import colorsCSS from '/vendor/beaker-app-stdlib/css/colors.css.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'
import tooltipCSS from '/vendor/beaker-app-stdlib/css/tooltip.css.js'

const cssStr = css`
${colorsCSS}
${buttonsCSS}
${tooltipCSS}

:host {
  display: block;
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
}

.nav {
  flex: 0 0 220px;
  padding-left: 20px;
}

.content {
  flex: 1;
  overflow-y: scroll;
  height: calc(100vh - 50px);
}

.content-center {
  flex: 1;
  margin-right: 10px;
}

.content-right {
  flex: 0 0 230px;
  padding: 20px 70px 20px 20px;
}

.content-right > * {
  margin-bottom: 20px;
}

start-discover-nav {
  margin-right: 10px;
}

start-discover-filters {
  margin: 19px 0;
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

#search {
  box-sizing: border-box;
  width: 160px;
  border-radius: 20px;
  border: 1px solid #bbb;
  padding: 8px 16px;
  margin: 16px 0;
  font-size: 14px;
  box-shadow: inset 0px 2px 1px rgba(0,0,0,.05);
  background: #fafafa;
  outline: 0;
}

.empty {
  background: #f5f5f5;
  padding: 3rem;
  text-align: center;
  border-radius: 4px;
  color: gray;
  font-weight: 300;
  font-size: 15px;
  line-height: 2;
}

.empty .far {
  font-size: 50px;
  color: #bbb;
}

.listing {
  padding-bottom: 100px;
}

.item {
  display: flex;
  border: 1px solid #bbb;
  border-radius: 4px;
  margin-bottom: 10px;
}

.item-left {
  padding: 16px 18px 14px;
  flex: 1;
}

.item-right {
  padding: 10px 12px 8px;
  flex: 0 0 160px;
  background: #fafafa;
  border-left: 1px solid #ccc;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
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

.item .url {
  line-height: 20px;
}

.item .url a {
  color: gray;
}

.item .provenance {
  color: var(--color-text);
  line-height: 21px;
}

.item .provenance a {
  color: var(--color-text);
}

.item .tags .fa-tags {
  font-size: 10px;
  width: 17px;
}

.item .tags a {
  display: inline-block;
  margin-right: 4px;
  color: var(--color-text--muted);
}

.site {
  display: flex;
  border: 1px solid #bbb;
  border-radius: 4px;
  margin-bottom: 10px;
}

.site-left {
  padding: 16px 18px 14px;
  flex: 0 0 50px;
}

.site-center {
  padding: 16px 0 14px;
  flex: 1;
}

.site-right {
  padding: 10px 12px 8px;
  flex: 0 0 160px;
  line-height: 21px;
  background: #fafafa;
  border-left: 1px solid #ccc;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.site-right a {
  color: var(--color-text);
  cursor: pointer;
}

.site-right .fa-fw {
  font-size: 12px;
  position: relative;
  top: -1px;
  margin-right: 3px;
}

.site img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.site .ctrls {
  float: right;
  margin-right: 20px;
  text-align: right;
}

.site .ctrls > div {
  margin-bottom: 10px;
}

.site .ctrls button {
  cursor: pointer;
}

.site .title {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}

.site .description {
  line-height: 20px;
  font-size: 15px;
}

.site .url {
  line-height: 20px;
}

.site .url a {
  color: gray;
}

`
export default cssStr