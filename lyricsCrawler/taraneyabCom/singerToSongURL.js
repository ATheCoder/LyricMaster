const cheerio = require('cheerio')
const urlToHTML = require('./urlToHTML')
const exampleArtistURL = 'http://taraneyab.com/category/persian-lyrics/singer/%D8%AD%D9%85%DB%8C%D8%AF-%D8%B9%D8%B3%DA%A9%D8%B1%DB%8C/'

const getOtherPageURLs = async (singerURL) => {
  let results = []
  results.push(singerURL)
  let singerHTML = await urlToHTML(singerURL)
  let $ = cheerio.load(singerHTML)
  let pages = $('div.pagination').find('a')
  pages.each((index, element) => {
    results.push(element.attribs.href)
  })
  return results
}


const getSongFromASinglePage = async (singerURL) => {
  let results = []
  let singerHTML = await urlToHTML(singerURL)
  let $ = cheerio.load(singerHTML)
  let songObjects = $('a.read-more-link')
  songObjects.each((index, element) => {
    results.push(element.attribs.href)
  })
  return results
}

const getSongFromMultiplePages = async (singerPagesArray) => {
  let allSongs = await Promise.all(singerPagesArray.map(async (singerPage) => {
    return await getSongFromASinglePage(singerPage)
  }))
  return [].concat.apply([], allSongs)
}

const getAllPossibleSongsFromArtist = async (artistBaseURL) => {
  let allArtistPages = await getOtherPageURLs(artistBaseURL)
  return await getSongFromMultiplePages(allArtistPages)
}

module.exports = getAllPossibleSongsFromArtist


