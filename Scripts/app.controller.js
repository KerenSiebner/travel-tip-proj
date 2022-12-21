import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { searchService } from './services/search.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onMyPlace = onMyPlace
window.onPlaceInput = onPlaceInput

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}


function onMyPlace() {
  getPosition()
    //? DONE: get user location
    .then((userPos) => {
      return {
        lat: userPos.coords.latitude,
        lng: userPos.coords.longitude,
      }
    })
    // ? DONE: center map
    .then(centerMap)
    // ? DONE : mark the location on the map
    .then(onAddMarker)
}

function centerMap(coords) {
  const { lat, lng } = coords
  mapService.getMap().setCenter({ lat, lng })
  return coords
}

function onAddMarker(coords) {
  console.log('Adding a marker')
  const { lat, lng } = coords
  mapService.addMarker({ lat, lng })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs)
    document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}
function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
}

function onPlaceInput(placeStr) {
  searchService
    .searchAddress(placeStr)
    .then((searchRes) => {
      console.log('Places found:', searchRes)
      return searchRes
    })
    .then((place) => {
      centerMap(place.coords)
      // mapService.addMarker(place)
      const placeCard = placeService.createPlace(place.coords)
      placeService.savePlaceToStorage(placeCard)
    })
    .catch((err) => console.log('Error by finding the requested place:', err))

  return false
}
