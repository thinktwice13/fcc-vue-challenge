const axios = require("axios")
const config = require("../config")

module.exports = async data => {
  locationString = ""
  if (data.phrase) {
    locationString = `near=${data.phrase}`
  } else {
    locationString = `ll=${data.ll}`
  }
  // const requestUrl = fourSquareApiUrl.replace("LOCATION", locationString)
  const requestUrl = `https://api.foursquare.com/v2/venues/explore?v=20170801&venuePhotos=1&${locationString}&section=drinks&client_id=${config
    .KEYS.fourSquareClientId}&client_secret=${config.KEYS.fourSquareSecret}`
  try {
    const venues = await axios.get(requestUrl)
    return venues.data
  } catch (err) {
    console.log(err)
  }
}
