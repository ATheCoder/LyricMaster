const cheerio = require('cheerio')
const axios = require('axios')
const download = require('download-file')

async function GetSongURLs (artistLink) {
  let result = []
  await axios.get(artistLink).then(response => {
    let $ = cheerio.load(response.data)
    let more = $('a.more')
    more.each(function (index, element) {
      result.push(cheerio(element).attr('href'))
    })
  })
  return result
}

async function getDownloadLink (SongURL) {
  let link = '';
    await axios.get(SongURL).then(response => {
    let $ = cheerio.load(response.data)
    let downloadBox = $('.dlbox').find('a').each(function (index, element) {
      if(index === 0){
        link = cheerio(element).attr('href')
        // console.log(SongURL + '  ' + link)
      }
    })
  })
  return link
}

function downloadURL (url, downloadLocation) {
  download(url, {directory: downloadLocation}, function () {
    console.log('Download Completed')
  })
}

async function getSongFromFullAlbum (link) {
  let result = []
  await axios.get(link).then(response => {
    let $ = cheerio.load(response.data)
    let links = $('article').find('a')
    for(let i = 3;i<links.length - 3;i+=2){
      result.push(cheerio(links[i]).attr('href'))
    }
  })
  return result
}

GetSongURLs('http://nicmusic.net/category/%D8%A2%D9%87%D9%86%DA%AF-%D9%87%D8%A7%DB%8C-%D8%A8%D9%87%D9%86%D8%A7%D9%85-%D8%A8%D8%A7%D9%86%DB%8C/page/2/').then(songLinks => {
  for(let song of songLinks){
    getDownloadLink(song).then(downloadLink => {
      downloadURL(downloadLink, './music/')
    })
  }
})


// getSongFromFullAlbum('http://nicmusic.net/1396/08/hamid-hiraad/').then(result => {
//   for(let song of result){
//     downloadURL(song, './music/')
//   }
// })
