/*jshint node: true, esversion:6 */
'use strict';

let express = require('express');
let app = express();
let session = require('express-session');
let path = require('path');
let bodyParser = require('body-parser');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let baza = require('./db/books');

app.use(session({
    secret: 'xxxyyyzzz',
    resave: false,
  saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/genres', function (req, res) {
    let genres = baza().distinct("genre");
    res.json(genres);
});

app.get('/genre/:gen', function (req, res) {
    let books = baza({genre: req.params.gen}).select("title", "author");
    res.json(books);
});

app.post('/genre/:gen', function (req, res) {
    let newAuthor = req.body.author;
    let newTitle = req.body.title;
    let genre = req.params.gen;
    var newBook = {title: newTitle, author: newAuthor, genre: genre}
    baza.insert(newBook);
    let books = baza({genre: req.params.gen}).select("title", "author");
    res.json(books);
});


app.listen(3000, function () {
    console.log('Serwer działa na porcie 3000');
});


