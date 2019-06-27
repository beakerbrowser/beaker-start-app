import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  max-width: 600px;
  margin: 0px auto 200px;
}

hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0;
}

.expanded-post {
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
}

.heading {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}

.heading a {
  padding: 16px;
  font-size: 18px;
  margin-right: 10px;
}

.heading a:hover {
  background: #f5f5f5;
}

.heading .fas {
}

beaker-feed-post,
beaker-comments-thread {
  --border-color: #fff;
}

beaker-comments-thread {
  margin: 10px;
}
`
export default cssStr