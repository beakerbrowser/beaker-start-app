import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

h2 {
  font-size: 11px;
  color: rgba(0,0,0,.75);
}

h2 button {
  outline: 0;
  cursor: pointer;
  float: right;
}

h2 button:hover {
  background: #eee;
}

.flyers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.flyer {
  display: block;
  padding: 20px 16px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  background: #fff;
  outline: 1px solid #ccc;
}

.flyer:hover {
  background: #eee;
}

.flyer h3 {
  font-weight: 500;
}

.flyer > :first-child {
  margin-top: 0;
}

.flyer > :last-child {
  margin-bottom: 0;
}

.meta {
  display: flex;
  align-items: center;
}

.meta .author {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  color: var(--blue);
}

.meta .author:hover {
  text-decoration: underline;
}

.meta .author img {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
}

.meta .date {
  color: rgba(0,0,0,.5);
}
`
export default cssStr