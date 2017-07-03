import GoogleSearch from './GoogleSearch'

/* Create Map Object */
const map = new L.Map('mapid', {
  center: new L.LatLng(51.505, -0.04),
  zoom: 10
})

const drawnItems = L.featureGroup().addTo(map)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 25,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoibWJ1cmZpZWxkIiwiYSI6ImNqNGpkbWJtODA3YmIzM24zZndtbWhtM3UifQ.Xk0fSmcim5fpUkTpzNZIhg'
}).addTo(map)

map.addControl(new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
    selectedPathOptions: {
      maintainColor: true,
      moveMarkers: true
    }
  },
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true
    },
    polyline: false,
    circle: false,
    rectangle: false,
    marker: false
  }
}))

const googleSearch = new GoogleSearch()
googleSearch.addTo(map)

const input = document.getElementById('searchBox')

const searchBox = new google.maps.places.SearchBox(input)

searchBox.addListener('places_changed', () => {
  const places = searchBox.getPlaces()

  if (places.length === 0) {
    return null
  }

  const group = L.featureGroup()

  places.forEach((place) => {
    // Create a marker for each place.
    console.log(places)
    console.log(place.geometry.location.lat() + ' / ' + place.geometry.location.lng())
    const marker = L.marker([
      place.geometry.location.lat(),
      place.geometry.location.lng()
    ])
    group.addLayer(marker)
  })

  group.addTo(map)
  // map.fitBounds(group.getBounds())
  // map.setZoom(17)
  map.flyToBounds(group.getBounds())
})

map.on(L.Draw.Event.CREATED, function (event) {
  var layer = event.layer
  drawnItems.addLayer(layer)
})
