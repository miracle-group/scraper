const app               = require('express')()
      bodyParser        = require('body-parser')
      logger            = require('morgan')
      CronJob           = require('cron').CronJob
      scraper           = require('./helpers/combined')
      category          = require('./helpers/category')
      combine           = require('./helpers/combined')
      mongoose          = require('mongoose')
      articleController = require('./controllers/articleController')
      axios             = require('axios')
      scrap             = require('./gcf')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongoose.connection.openUri('mongodb://hary:hary@cluster0-shard-00-00-dvvn1.mongodb.net:27017,cluster0-shard-00-01-dvvn1.mongodb.net:27017,cluster0-shard-00-02-dvvn1.mongodb.net:27017/repod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err,db) => {
//   if (err) {
//     console.log('TIDAK TERHUBUNG KE DATABASE')
//   } else {
//     console.log('DATABASE TERHUBUNG!')
//   }
// })

let categories = []

//scrape the categories

const job = new CronJob ('0 2 * * * *', () => {
  categories = []
  category.getCategory (datas => {
    datas.forEach(data => {
      categories.push(data.name)
    })
  })
}, () => console.log('the job is completed'), true)

//split them to several parts

const scrapeJob = new CronJob ('10 * * * * *', () => {
  console.log('sekarang lagi ngescrape ', categories[0])
  // combine.getCombined(categories[0], articleController.addArticle)
  axios.post('http://localhost:8010/project-sampingan/us-central1/index', {
    topic: categories[0]
  }).then(suc => console.log(suc))
  .catch(err => console.log(err))
  categories = categories.slice(1)
  console.log(`categories sekarang adalah ${categories}`)

}, () => console.log('scrapejob done'), true)


// combine.getCombined('art',articleController.addArticle)

//run queue for each categories, separated by 10 mins each
//save scraped article to database


module.exports = app
