const mongoose = require('mongoose')
const Article = require('../models/articleModel')

// Post article
let addArticle = (metadata) => {
  return new Promise((resolve, reject) => {
    metadata.forEach((meta) => {
      let newArticle = new Article({
        postID: meta.postID,
        thumbnail: `http://${meta.thumbnail}`,
        link: meta.link,
        createdAt: meta.createdAt,
        author: meta.author,
        title: meta.title,
        content: meta.content,
        categories: meta.categories,
        read_time: meta.read_time
      })
      newArticle.save().then((dataArticles) => {
        resolve(dataArticles)
      }).catch((err) => {
        reject(err)
      })
    })
  })
}

module.exports = {
  addArticle
}
