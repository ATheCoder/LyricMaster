const cheerio = require('cheerio')
const axios = require('axios')
const songFullTitle = require('./songFullTitle')

getSongNameFromSongURL = (songHTMLData) => {
  let songName = ''
  const $ = cheerio.load(songHTMLData)
  let strongs = $('strong')
  strongs.each(function (index, element) {
    if(index === 0){
      let unParsedText = cheerio(element).text()
      let FullTitle = songFullTitle(unParsedText)
      songName = FullTitle.replace(getArtistNameFromSongURL(songHTMLData), '')
    }
  })
  return songName
}

getArtistNameFromSongURL = (songHTMLData) => {
  let artistName = ''
  const $ = cheerio.load(songHTMLData)
  let strongs = $('strong')
    strongs.each(function (index, element) {
    if(index === strongs.length - 1){
      let unParsedText = cheerio(element).text()
      artistName = parseArtistName(unParsedText)
    }
  })
  return artistName
}

findShit = (songHTMLData) => {
  let shit = ''
  const $ = cheerio.load(songHTMLData)
  let strongs = $('strong')
  strongs.each(function (index, element) {
    if(index === 0){
      shit = cheerio(element).text()
    }
  })
  return shit
}

getLyricsFromSongURL = (songHTMLData) => {
  const $ = cheerio.load(songHTMLData)
  let shit = findShit(songHTMLData)
  let content = $('.entry-content').text()
  let lyrics = content.substr(0, content.indexOf('ترانه سرا'))
  return lyrics.replace(shit, '').replace(shit, '');
}

parseArtistName = (string) => {
  return string.replace('خواننده : ', '')
}

axios.get('http://taraneyab.com/%D9%85%D8%AA%D9%86-%D8%A2%D9%87%D9%86%DA%AF-%D8%AA%D9%88%D9%82%D8%B9-%D9%86%D8%AF%D8%A7%D8%B1%D9%85-%D8%A8%D9%87%D9%86%D8%A7%D9%85-%D8%A8%D8%A7%D9%86%DB%8C-%D9%BE%D8%AE%D8%B4-%D8%A2%D9%86%D9%84/').then(response => {
  console.log(getLyricsFromSongURL(response.data))
})
