const parser = require('parse-rss')
const readingTime = require('reading-time');
const request = require('request');
const cheerio = require('cheerio');

let dataArr = []

const getCategory = (req, res) => {
  return new Promise ((resolve, reject) => {
    request('https://medium.com/topics', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var Preferences = []
        $('.link.link--noUnderline.u-baseColor--link.u-flex1.u-uiDisplayBold.u-fontSize20').each((i, element) => {
          var topic_name = element.attribs.href
          var dummy = topic_name.split('/')
          // console.log(dummy[dummy.length-1]);
          dataArr.push(dummy[dummy.length-1].toLowerCase())
        });
        resolve(dataArr)
      }
    })
  })
}

let getContent = (topic) => {
  return new Promise ((resolve, reject) => {
      let bigData = []
        parser(`https://medium.com/feed/topic/${topic}`, (err, rss) => {
          if(err){
            console.log(err);
          } else {
            let data =[]
            rss.forEach((dataRss) => {
              let stats = readingTime(dataRss.description)
              // Maniuplating Guid
              let guidSplitted = dataRss.guid.split('/')
              let guidId = guidSplitted[4]
              let obj = {
                newData: topic,
                link: dataRss.link,
                guid: guidId,
                createdAt: dataRss.date,
                author: dataRss.author,
                title: dataRss.title,
                content: dataRss.description,
                categories: dataRss.categories,
                read_time: stats.text
              }
              data.push(obj)
            })
            bigData.push(data)
          }
          resolve(bigData)
        })
  })
}

module.exports = {
  getContent
}
