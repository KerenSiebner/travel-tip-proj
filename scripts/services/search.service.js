export const searchService = {
  searchAddress,
}

let geocoder

function searchAddress(addressStr) {
  //   console.log(addressStr)
  console.log('InitSearch')

  return _connectGoogleApi().then(() => {
    console.log('Google Code available')
    geocoder = new google.maps.Geocoder()
    return geocoder.geocode({ address: addressStr }).then((res) => {
      return {
        address: res.results[0].formatted_address,
        coords: {
          lat: res.results[0].geometry.location.lat(),
          lng: res.results[0].geometry.location.lng(),
        },
        placeId: res.results[0].place_id,
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
