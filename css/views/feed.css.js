import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  background: #fafafa;
}

.feed {
  display: none;
  height: calc(100vh - 131px);
  overflow-y: scroll;
  padding: 40px;
}

.feed.visible {
  display: block;
}

.expanded-post {
  height: calc(100vh - 91px);
  overflow-y: scroll;
  padding: 20px;
}

beaker-feed-composer,
beaker-feed-post {
  display: block;
  box-sizing: border-box;
  width: 600px;
  margin: 0 auto 10px;
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