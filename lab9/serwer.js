/*jshint globalstrict: true, devel: true, node: true, esversion: 6*/
'use strict';

let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let baza = require('./db/books');
let fs=require('fs');

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let genres = baza().distinct("genre").sort();
    res.render('index.ejs', {genres: genres});
});

app.get('/:gen', function (req, res) {
    let genres = baza().distinct("genre");
    let books = baza({genre: req.params.gen}).select("title", "author");
    let genre = req.params.gen;
    res.render('index.ejs', {genres: genres, books: books, genre: genre});
});

app.post('/:gen', function (req, res) {
    let newAuthor = req.body.author;
    let newTitle = req.body.title;

    let login = req.body.login;
    let password = req.body.password
    if (login !== "admin" || password !== "nimda") {
        return res.status(401).send("Wrong login or password");
    }
    let genre = req.params.gen;
    var newBook = {title: newTitle, author: newAuthor, genre: genre}
    baza.insert(newBook);

    console.log(newAuthor, newTitle);
    let genres = baza().distinct("genre");
    let books = baza({genre: genre}).select("title", "author");
    res.render('index.ejs', {genres: genres, books: books, genre: genre});
});


app.listen(3000, function () {
    console.log('Serwer działa na porcie 3000');
});


process.on('SIGINT',  function () {

    console.log("Good Bye");
    const newBase = baza().stringify();
    fs.writeFileSync('db/booksData.json',  JSON.stringify(newBase));

    console.log('\nshutting down');
    process.exit();
});
