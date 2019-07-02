import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

.feed {
  display: none;
  height: 100vh;
  overflow-y: scroll;
  background: #fafafa;
}

.feed.visible {
  display: block;
}

.feed-inner {
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  width: 600px;
  margin: 0 auto;
  padding: 0 10px 200px;
  min-height: 100vh;
}

.expanded-post {
  height: 100vh;
  overflow-y: scroll;
  background: #fafafa;
}

.expanded-post-inner {
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  width: 600px;
  margin: 0 auto;
  padding: 0 10px 200px;
  min-height: 100vh;
}

beaker-feed-composer,
beaker-feed-post {
  display: block;
  box-sizing: border-box;
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid #ddd;
}

beaker-feed-composer {
  padding: 20px;
}

beaker-feed-post {
  padding: 6px 0;
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