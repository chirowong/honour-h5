function Filter () {
  this.shouldFilter = false
  this.next = null
  this.name = ''

  this.setName = function (_name) {
    this.name = _name
  }

  this.setNext = function (_next) {
    this.next = _next
  }

  this.setShouldFilter = function (_shouldFilter) {
    this.shouldFilter = _shouldFilter
  }

  this.handleFilter = function (context, callback) {}

  this.doFilter = function (context, filterChain) {
    if (this.shouldFilter) {
      this.handleFilter(context)
      if (this.next) {
        filterChain.doFilter(context)
      }
    }
  }
}

export default Filter
