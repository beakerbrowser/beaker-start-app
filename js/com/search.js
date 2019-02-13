import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import searchCSS from '../../css/com/search.css.js'

// constants
// =

const SEARCH_GROUPS = [
  {key: 'fixed'},
  {key: 'apps', label: 'Applications'},
  {key: 'people', label: 'People'},
  {key: 'webPages', label: 'Web pages'},
  {key: 'imageCollections', label: 'Image collections'},
  {key: 'fileShares', label: 'File shares'},
  {key: 'bookmarks', label: 'Bookmarks'},
  {key: 'history', label: 'Your browsing history'},
  {key: 'others', label: 'Saved to your Library'}
]

class Search extends LitElement {
  static get properties() {
    return { 
      query: {type: String},
      searchResults: {type: Object},
      activeSearchResultIndex: {type: Number},
      isSearchFocused: {type: Boolean}
    }
  }

  constructor () {
    super()
    this.searchResults = {}
    this.query = ''
    this.lastQuery = undefined
    this.activeSearchResultIndex = 0
    this.isSearchFocused = false
  }

  // rendering
  // =

  render () {
    const renderSearchResultGroup = (group, label) => {
      if (!group || !group.length) return ''
      return html`
        <div class="autocomplete-result-group">
          ${label ? html`<div class="autocomplete-result-group-title">${label}</div>` : ''}
          ${group.map(renderSearchResult)}
        </div>
      `
    }

    var i = 0
    const renderSearchResult = (res) => {
      return html`
        <a href=${res.url} class="autocomplete-result search-result ${i++ === this.activeSearchResultIndex ? 'active' : ''}">
          ${res.icon
              ? html`<i class="icon ${res.icon}"></i>`
              : res.type === 'user'
                ? html`<img class="icon favicon rounded" src="${res.url}/thumb"/>`
                : html`<img class="icon favicon" src="beaker-favicon:32,${res.url}"/>`
            }
          <span class="title">${res.title}</span>
          <span class="label">— ${res.url}</span>
        </a>
      `
    }

    const onKeyUp = e => {
      var keyCode = e.keyCode
      var inputValue = e.target.value
      delay(() => this.onInputSearch(keyCode, inputValue), e)
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="autocomplete-container search-container">
        <input type="text" autofocus @focus=${this.onFocusSearch} @blur=${this.onBlurSearch} class="search" placeholder="Search your Web" @keyup=${onKeyUp}/>
        <i class="fa fa-search"></i>

        <button class="btn primary search-btn" title="Submit search query" @click=${this.onClickSubmitActiveSearch}>
          <i class="fa fa-arrow-right"></i>
        </button>

        ${this.query.length && this.isSearchFocused
          ? html`<div class="search-results autocomplete-results">
            ${SEARCH_GROUPS.map(({key, label}) => renderSearchResultGroup(this.searchResults[key], label))}
          </div>`
          : ''}
      </div>`
  }

  // event handlers
  // =

  onFocusSearch () {
    this.isSearchFocused = true
  }

  onBlurSearch () {
    this.isSearchFocused = false
  }
  
  onClickSubmitActiveSearch () {
    var res = this.getActiveSearchResult()
    if (!res) return
    window.location = res.url
  }

  onInputSearch (keyCode, inputValue) {
    // enter
    if (keyCode === 13) {
      // ENTER
      window.location = this.getActiveSearchResult().url
    } else if (keyCode === 40) {
      // DOWN
      this.moveActiveSearchResult(1)
    } else if (keyCode === 38) {
      // UP
      this.moveActiveSearchResult(-1)
    } else {
      this.onUpdateSearchQuery(inputValue)
    }
  }

  async onUpdateSearchQuery (q) {
    var searchResults = {}
    var query = q.length ? q.toLowerCase() : ''
  
    // reset selection if query changed
    if (this.lastQuery !== query) {
      this.activeSearchResultIndex = 0
    }
    this.lastQuery = query
  
    if (query.length) {
      // TODO
      // searchResults = await beaker.crawler.listSuggestions(query)
      searchResults.fixed = [{
        url: `beaker://search?q=${encodeURIComponent(query)}`,
        icon: 'fa fa-search',
        title: `Search your Web for "${query}"`
      }]
    }
  
    this.query = query
    this.searchResults = searchResults
  }

  // search-result management
  // =

  getMergedSearchResults () {
    var list = []
    for (let group of SEARCH_GROUPS) {
      list = list.concat(this.searchResults[group.key])
    }
    return list
  }

  getActiveSearchResult () {
    var mergedResults = this.getMergedSearchResults()
    return mergedResults[this.activeSearchResultIndex || 0]
  }

  moveActiveSearchResult (dir) {
    var mergedResults = this.getMergedSearchResults()
    var i = this.activeSearchResultIndex || 0
    i += dir
    // make sure we don't go out of bounds
    if (i < 0) i = 0
    if (i > mergedResults.length - 1) i = mergedResults.length - 1
    this.activeSearchResultIndex = i
  }
}
Search.styles = searchCSS
customElements.define('start-search', Search)

// helpers
// =

function delay (cb, param) {
  window.clearTimeout(cb)
  setTimeout(cb, 75, param)
}