export const searchService = {
  searchAddress,
}

import { mapService } from './map.service.js'

let geocoder
let map = mapService.getMap()

function searchAddress(addressStr) {
  console.log(addressStr)
  console.log('InitSearch')

  return _connectGoogleApi().then(() => {
    console.log('Google Code available')
    geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: addressStr }, function (results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location)
        var marker = new google.maps.Marker({
          map: map.getMap(),
          position: results[0].geometry.location,
        })
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  })
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCRLWQLL3g2DjIsSlUSjs7CqjnuUtIBYYA' //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () =>
      reject('Google GeoLocation script failed to load')
  })
}
