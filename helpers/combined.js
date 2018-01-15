const listArticles = require('./listArticles')
const rssScrape = require('./rssCrape')

const getCombined = (topic, cb) => {
  Promise.all([rssScrape.getContent(topic), listArticles.getListMedium(topic)]).then((data) => {
    let scrapeContent = data[0]
    let scrapeList = data[1]
    let metadataContent = []
    let metadata = []
    scrapeContent.forEach((eachCategoryLoop) => {
      eachCategoryLoop.forEach((eachContent) => {
        let hasil = eachContent.read_time.split(' ').shift()
        let number = Number(hasil)

        let obj = {
          guid: eachContent.guid,
          link: eachContent.link,
          createdAt: eachContent.createdAt,
          author: eachContent.author,
          title: eachContent.title,
          content: eachContent.content,
          categories: eachContent.categories,
          read_time: number
        }
        metadataContent.push(obj)
      })
    })
    scrapeList.forEach((eachList, i) => {
      eachList.forEach((perList) => {
        // console.log(metadataContent.length);
        metadataContent.forEach((meta,i) => {
          // console.log(meta);
          if(i > 2) {
            if (meta.guid === perList.postID) {
              let objList = {
                postID: perList.postID,
                thumbnail: perList.photo,
                link: meta.link,
                createdAt: meta.createdAt,
                author: meta.author,
                title: meta.title,
                content: meta.content,
                categories: meta.categories,
                read_time: meta.read_time
              }
              metadata.push(objList)
            }
          }
        })
      })
    })
    cb(metadata)
  })
}

module.exports = {
  getCombined
}
