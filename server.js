const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://film:film@movie-tye3w.mongodb.net/test?retryWrites=true";
const dbName = "movies";

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  let movies = null;
  let books = null;
  db.collection('movies').find().toArray((err, result) => {
    movies = result;
    if (err) return console.log(err)
    db.collection('books').find().toArray((err, result) => {

      books = result;
      if (err) return console.log(err)
      console.log("movies:", movies, "books:", books);
      res.render('index.ejs', {movies, books})
    })
  })
})

// MOVIES=====>

app.post('/comments', (req, res) => {
  db.collection('movies').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/comments', (req, res) => {
  db.collection('movies')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/comments/downvote', (req, res) => {
  db.collection('movies')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbDown:req.body.thumbDown + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/comments', (req, res) => {
  db.collection('movies').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

// BOOKS ==================================


app.post('/reviews', (req, res) => {
  db.collection('books').save({books: req.body.books, rvw: req.body.rvw, thumbUpB: 0, thumbDownB:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/reviews', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({books: req.body.books, rvw: req.body.rvw}, {
    $set: {
      thumbUpB:req.body.thumbUpB + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/reviews/downvote', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({books: req.body.books, rvw: req.body.rvw}, {
    $set: {
      thumbDownB:req.body.thumbDownB + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/reviews', (req, res) => {
  db.collection('books').findOneAndDelete({books: req.body.books, rvw: req.body.rvw}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Review deleted!')
  })
})
