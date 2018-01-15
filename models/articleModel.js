const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  postID: { type: String, unique: true},
  thumbnail: String,
  createdAt: { type: Date, default: Date.now },
  author: String,
  title: String,
  content: String,
  categories: [{ type: String }],
  read_time: Number
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
