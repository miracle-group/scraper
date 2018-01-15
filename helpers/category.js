var request = require('request')
var cheerio = require('cheerio')


const getCategory = (cb) => {
  request('https://medium.com/topics', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)
      var Preferences = []
      $('.link.link--noUnderline.u-baseColor--link.u-flex1.u-uiDisplayBold.u-fontSize20').each(function(i, element){
        // console.log(element.children[0].data)
        var topic_url = element.attribs.href
        var topic_name = element.children[0].data

        var metadata = {
          url : topic_url,
          name : topic_name.split(' ').join('-').toLowerCase()

        }
        Preferences.push(metadata)
      })
       cb(Preferences)
    }
  })
}

module.exports = {
  getCategory
}
