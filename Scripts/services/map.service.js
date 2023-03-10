import { utilService } from './util.service.js'
import { placeService } from './place.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getMap,
}

let gPlaces=[]

const CURR_LOC_KEY = 'curr_loc_DB'

// Var that is used throughout this Module (not global)
var gMap

function getMap() {
  return gMap
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    // Configure the click listener.
    gMap.addListener('click', (mapsMouseEvent) => {
      const loc = {
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      }
      console.log('loc', loc)
      let place = placeService.createPlace(loc)
      placeService.savePlaceToStorage(place)
      addMarker(loc)
    })
    console.log('Map!', gMap)
  })
}


function addMarker(loc) {
  console.log('loc', loc)
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}



function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCRLWQLL3g2DjIsSlUSjs7CqjnuUtIBYYA' //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google Map script failed to load')
  })
}
