export const weather = { callWeather }

// const testAPI = { lat: 32.047104, lng: 34.832384 }

// callWeather(testAPI).then(console.logs)

function callWeather({ lat, lng: lon }) {
  const WEATHER_KEY = 'c3b81f4ec3ef8ff6a1c3b96902e6b85b'
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`
    )
    .then((weatherData) => {
      console.log('OpenWeather API Requested')
      //   console.log(weatherData.data.weather)
      return weatherData.data.weather
    })
    .catch((err) => {
      console.warn('HAD ERROR WITH:', err)
    })
}
