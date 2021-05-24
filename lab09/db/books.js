var TAFFY = require('taffydb').taffy;
var booksData = require("./booksData.json");
var books = TAFFY(JSON.parse(booksData));

module.exports = books;

