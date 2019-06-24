import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  margin: 40px auto;
  width: 800px;
}

.layout {
  display: flex;
}

.nav {
  flex: 0 0 130px;
  text-align: right;
  margin-right: 10px;
}

.content {
  flex: 0 0 540px;
}

beaker-feed-composer,
beaker-feed-post {
  margin-bottom: 10px;
  --border-color: #bbb;
}

.empty {
  background: #fff;
  padding: 40px 0 0;
  color: #8a8a8a;
  text-align: center;
  min-height: 200px;
}

.empty .fas {
  font-size: 85px;
  margin-bottom: 30px;
  color: #ccc;
}
`
export default cssStr