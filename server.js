const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

 let db,
 dbConnectionStr = process.env.DB_STRING,
 dbName = 'movies'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
 .then(client => { 
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
    app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
    //go to "movies" collection in db,put them in an array
    db.collection('movies').find().toArray() 
    .then(data => {
        db.collection('movies').countDocuments({completed: false})
        .then(moviesLeft => {
            res.render("index.ejs", {movies: data, left: moviesLeft})
        })
    })
    .catch(error => console.error(error))
})


app.post("/addMovies", (req, res) => {
    db.collection('movies').insertOne({name: req.body.movieName, completed: false})
    .then(result => {
        console.log("Movie added successfully!")
        res.redirect("/")
    })
    .catch(error => console.log(error))
})

app.put("/markWatched", (req, res) => {
   db.collection('movies').updateOne({name: req.body.movieFromJS},{
        $set: {
            completed: true
        }
   },{
        sort: {_id: -1}, 
        upsert: false
   }) 
   .then(result => {
        console.log('Marked Watched')
        res.json('Marked Watched')
   })
   .catch(error => console.error(error))
})


app.put('/markUnWatched', (req, res) => {
    db.collection('movies').updateOne({name:req.body.movieFromJS}, {
        $set: {
            completed: req.body.isComplete
        }
    },{
        sort: {_id: -1}, 
        upsert: false
    })
    .then(result => {
        console.log('Marked UnWatched')
        res.json('Marked UnWatched')
    })
    .catch(error => console.error(error))
})


app.delete('/deleteMovie', (req, res) => {
    db.collection('movies').deleteOne({thing: req.body.movieFromJS})

    .then(result => {
        console.log('Movie deleted')
        res.json('Movie deleted')
    })
    .catch(error => console.error(error))
})

app.listen (3000, function() {
    console.log("Node listening on 3000")
})
 })








