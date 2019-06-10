import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  user-select: none;
  margin: 5px 0;
}

.item {
  background: #fff;
  text-align: center;
  height: 120px;
  border-radius: 16px;
}

.item:hover {
  background: rgb(245, 247, 249);
}

.item.drag-hover {
  outline: 3px dashed var(--border-color);
}

.item .favicon {
  margin-top: 30px;
  width: 32px;
  height: 32px;
}

.item .title {
  text-overflow: ellipsis;
  color: #34495e;
  font-size: 12px;
  max-width: 100px;
  margin: auto;
  margin-top: 10px;
}

.explorer-pin {
  border: 0;
  background: none;
}

.explorer-pin i {
  color: rgba(0,0,0,.075);
}

@media (min-width: 640px) {
  .grid-container .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 740px) {
  .grid-container .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 900px) {
  .grid-container .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

.grid-container .item.explorer-pin i {
  font-size: 45px;
  margin-top: 38px;
}
`
export default cssStr