import { storageService } from '.services/async.storage.service.js'
import { utilService } from './services/utilService.js'

//TODO: export relevant functions

const LOCATION_KEY = 'locDB'

let gPlaces = get(entityType, entityId) || createPlaces()

//function in controller:
// placeService.query(LOC_KEY)
// .then(res=>post(entityType, newEntity))



function createPlaces() {
    //TODO: make an array gPlaces with all created places
    //TODO: store gPlaces to storage
    let places = utilService.loadFromStorage(LOCATION_KEY)
    if (!places || !places.length) _createPlace()
}

function getEmptyPlace(name = '',) {
    return { id: '', name, lat, lng, weather, createdAt, updatedAt, score }
}

function _createPlace() {
    const place = getEmptyPlace
    place.id = utilService.makeId()
    place.name = name || 'No name'
    place.lat = lat || 32
    place.lng = lng || 34
    place.weather = '20C'
    place.createdAt = Date.now()
    place.updatedAt = '12423535'
    return place
}