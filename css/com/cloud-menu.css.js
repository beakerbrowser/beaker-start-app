import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import spinnerCSS from '/vendor/beaker-app-stdlib/css/com/spinner.css.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'

const cssStr = css`
${spinnerCSS}
${buttonsCSS}

:host {
  --outer-border-color: rgb(118, 134, 150);
  --color: rgb(52, 73, 94);
  --light-color: rgba(52, 73, 94, 0.6);
  color: var(--color);
}

.cloud-menu {
  position: absolute;
  right: 0px;
  z-index: 3000;
  background: #fff;
  min-width: 360px;
  font-size: 16px;
  border: 1px solid var(--outer-border-color);
  padding-bottom: 10px;
}

.menu-heading {
  padding: 6px;
  font-size: 12px;
  background: rgb(232, 235, 239);
  margin-bottom: 6px;
}

.about {
  text-align: center;
  background: #fafafe;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  font-size: 14px;
}

.footer {
  text-align: center;
  background: rgb(232, 235, 239);
  padding: 10px;
  font-size: 12px;
  margin: 10px 0 -10px;
  border-top: 1px solid var(--outer-border-color);
}

.remote-item {
  padding: 12px 20px 12px 16px;
  cursor: pointer;
}

.remote-item:hover {
  background: rgb(245, 247, 249);
}

.remote-item-row {
  display: flex;
}

.remote-item-title {
  flex: 1;
}

.remote-item progress {
  width: 100%;
}

.remote-item .spinner {
  width: 11px;
  height: 11px;
  border-width: 1px;
  color: #333;
  position: relative;
  top: 2px;
  right: 1px;
}

.remote-item-status {
  flex: 1;
  margin-top: 4px;
  font-size: 12px;
}

.add-remote {
  color: var(--light-color);
  font-weight: 300;
}

.fa-stack {
  width: 1.2em;
  height: 1.2em;
  line-height: 1;
}

.fa-stack .fa-cloud {
  font-size: 14px;
}

.fa-stack .fa-slash {
  color: tomato;
}

form {
  font-size: 14px;
  padding: 0 10px;
}

label {
  display: block;
  margin: 0 0 6px;
  font-size: 90%;
  font-weight: 500;
}

select {
  display: block;
  width: 100%;
  height: 56px;
  font-size: 16px;
  outline: 0;
  border: 0;
  overflow: hidden;
  background: rgb(244, 247, 251);
  border-radius: 4px;
}

input[type="text"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: 15px;
  border-radius: 2px;
  border: 1px solid var(--border-color);
  outline: 0;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: var(--blue);
}

input[error] {
  border-color: var(--red) !important;
}

.error {
  color: var(--red);
}

.beaker-cloud-nav {
  display: flex;
  background: rgb(232, 235, 239);
  margin-top: -6px;
}

.beaker-cloud-nav:before,
.beaker-cloud-nav:after {
  content: ' ';
  border-bottom: 1px solid var(--outer-border-color);
  width: 6px;
}

.beaker-cloud-nav a,
.beaker-cloud-nav span {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  color: var(--light-color);
  border: 1px solid transparent;
  border-bottom: 1px solid var(--outer-border-color);
  text-decoration: none;
}

.beaker-cloud-nav a:hover {
  color: var(--color);
}

.beaker-cloud-nav a.active {
  border-color: var(--outer-border-color);
  border-bottom-color: transparent;
  color: var(--color);
  background: #fff;
}

.form-nav {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;
}
`
export default cssStr