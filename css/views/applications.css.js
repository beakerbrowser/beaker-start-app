import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'

const cssStr = css`
${commonCSS}
${buttonsCSS}

:host {
  display: block;
}

h2 {
  text-align: center;
  margin: 20px 0;
  font-weight: 400;
}

.applications {
  width: 1000px;
  margin: 10px auto;
  font-size: 14px;
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

.application {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
}

.application:hover {
  border-color: var(--blue);
}

.application img {
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.application .info {
  flex: 1;
}

.application .ctrls {
  text-align: right;
}

.application .title {
  font-size: 18px;
  line-height: 1.8;
}

.application .description {

}

.application .url {
  width: 200px;
  color: var(--blue);
}

button,
label {
  cursor: pointer;
}

button:hover {
  border-color: red;
  color: red;
}

label {
  margin: 8px 0;
  border-radius: 4px;
  padding: 2px 2px;
  display: block;
  font-weight: normal;
  font-size: 12px;
}

label:hover {
  background: #eee;
}

input {
  height: 13px;
  padding: 0;
}

.nice-phrase {
  margin: 30px;
  font-weight: 300;
  color: #bbb;
  text-align: center;
}
`
export default cssStr