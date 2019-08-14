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

main {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #bbb;
  border-radius: 3px;
  margin-top: 10vh;
}

button {
  padding: 8px 12px;
  font-size: 12px;
}

.header {
  padding: 16px 20px 10px;
}

.header h1 {
  margin: 0;
  padding-bottom: 10px;
  font-weight: 300;
  border-bottom: 1px solid #eee;
}

.body {
  padding: 10px;
}

.footer {
  padding: 10px;
  text-align: right;
}

`
export default cssStr