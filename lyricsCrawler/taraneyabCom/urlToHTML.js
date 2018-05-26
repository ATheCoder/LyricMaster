const axios = require('axios')

module.exports = async (url) => {
  let requestResponse = await axios.get(url)
  return requestResponse.data
}
