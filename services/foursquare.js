const axios = require("axios")
const config = require("../config")

const fourSquareApiUrl = `https://api.foursquare.com/v2/venues/search?LOCATION&client_id=${config
  .KEYS.fourSquareClientId}&client_secret=${config.KEYS
  .fourSquareSecret}&v=20170801&m=foursquare`

module.exports = async data => {
  console.log(data)
  locationString = ""
  if (data.phrase) {
    locationString = `near=${data.phrase}`
  } else {
    locationString = `ll=${data.lat},${data.lng}`
  }
  const requestUrl = fourSquareApiUrl.replace("LOCATION", locationString)
  const venues = await axios.get(requestUrl)
  return venues
}
