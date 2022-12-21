import { storageService } from './async.storage.service.js'
import { utilService } from './util.service.js'
import { weatherService } from './weather.service.js'

export const placeService = {
    createPlace,
    save,
    getPlaces,
    savePlaceToStorage
}

//TODO: export relevant functions

const PLACE_KEY = 'locDB'

let gPlaces = utilService.loadFromStorage(PLACE_KEY) || []

function getPlaces() {
    return gPlaces
}
function savePlaceToStorage(place) {
    gPlaces.push(place)
    utilService.saveToStorage(PLACE_KEY, gPlaces)
    console.log('gPlaces', gPlaces)
}



function save(place) {
    if (place.id) {
        return storageService.put(PLACE_KEY, place)
    } else {
        return storageService.post(PLACE_KEY, place)
    }
}


function createPlace(loc) {
    //   const place = getEmptyPlace
// console.log('weatherService.callWeather(loc)', weatherService.callWeather(loc).then(res=> res))
    // let weather = axios.weatherService.callWeather(loc)
    // console.log('weather', weather)
    const place = {
        id: utilService.makeId(),
        //   name.  'No name'
        lat: loc.lat || 32,
        lng: loc.lng || 34,
        // weather: res,
        createdAt: Date.now(),
        updatedAt: '12423535'
    }
    return place
}
// function createPlaces() {
//   //TODO: make an array gPlaces with all created places
//   //TODO: store gPlaces to storage
//   gPlaces = utilService.loadFromStorage(PLACE_KEY)
//   if (!gPlaces || !gPlaces.length) gPlaces
// }

// function getEmptyPlace(name = '') {
//   return { id: '', name, lat, lng, weather, createdAt, updatedAt, score }
// }