export const weather = { callWeather }

function callWeather({ lat, lng: lon }) {
  const WEATHER_KEY = 'c3b81f4ec3ef8ff6a1c3b96902e6b85b'
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`
    )
    .then((weatherData) => {
      console.log('OpenWeather API Requested')
      return weatherData.weather
    })
    .catch((err) => {
      console.warn('HAD ERROR WITH:', err)
    })
}
