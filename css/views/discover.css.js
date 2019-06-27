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
  background: #fafafa;
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
  background: #fff;
  outline: 0;
}

.empty {
  background: #fff;
  padding: 4rem;
  text-align: center;
  border: 1px solid #bbb;
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
  align-items: stretch;
  border: 1px solid #bbb;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
}

.item-left {
  padding: 6px 0 6px 8px;
}

.item-center {
  padding: 10px 10px;
  flex: 1;
  align-self: center;
}

.item-right {
  padding: 10px 12px 8px 0;
  width: 160px;
  background: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.item .voting {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
}

.item .voting .fa-circle {
  font-size: 5px;
  position: relative;
  top: -3px;
  color: gray;
}

.item .voting button {
  font-size: 15px;
  padding: 4px 4px;
  border: 0;
  box-shadow: none;
  cursor: pointer;
  color: #aaa;
}

.item .voting button:hover {
  background: #f5f5f5;
}

.item .voting .voted {
  color: #000;
  font-weight: 800;
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

.item .provenance {
  color: var(--color-text--muted);
  line-height: 21px;
}

.item .provenance a {
  color: inherit;
}

.item .tags {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item .tags .fa-tags {
  font-size: 10px;
  width: 17px;
}

.item .tags a {
  display: inline-block;
  margin-right: 4px;
}

.site {
  display: flex;
  border: 1px solid #bbb;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
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
  padding: 16px 12px 8px 0;
  flex: 0 0 120px;
  line-height: 21px;
  background: #fff;
  color: var(--color-text--muted);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.site-right a {
  color: inherit;
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