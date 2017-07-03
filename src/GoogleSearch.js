const GoogleSearch = L.Control.extend({
  onAdd () {
    const element = document.createElement('input')
    element.id = 'searchBox'
    return element
  }
})

export default GoogleSearch
