// Setup
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const postSchema = new mongoose.Schema({
  body: String,
  date: { type: Date, default: Date.now },
  title:  String
});

const Post = mongoose.model('Post', postSchema);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

mongoose.connect('mongodb://localhost:27017/node-blog')

// Routes
app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('index', { posts: posts})
  });
});


app.post('/addpost', (req, res) => {
  const postData = new Post(req.body, req.title);
  postData.save().then( result => {
    res.redirect('/');
  }).catch(err => {
    res.status(400).send("Unable to save data");
  });
});


// Listen
app.listen(3000, () => {
  console.log('Server listing on 3000');
})