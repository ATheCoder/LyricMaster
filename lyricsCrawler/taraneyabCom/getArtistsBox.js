const cheerio = require('cheerio')

const getArtistBox = (html) =>{
  let results = []
  let $ = cheerio.load(html)
  let aTags = $('div.widget.widget_nav_menu').find('a')
  aTags.each((index, element) => {
    results.push(element.attribs.href)
  })
  return results
}

module.exports = getArtistBox
