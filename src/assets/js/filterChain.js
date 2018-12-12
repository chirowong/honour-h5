function FilterChain () {
  this.filter = null

  this.setFilter = function (_filter) {
    this.filter = _filter
  }

  this.doFilter = function (context) {
    let originFilter = this.filter
    if (this.filter.next) {
      this.filter = this.filter.next
    }
    originFilter.doFilter(context, this)
  }
}

export default FilterChain
