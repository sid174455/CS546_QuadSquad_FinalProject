var mongoose = require('mongoose');

//Book Schema
var BookSchema = mongoose.Schema({
    ISBN:{ type: Number, index: true},
    name: { type: String},
    author: { type: String},
    edition: { type: Number},
    category: { type: String},
    url: {type:String}},
	{versionKey: false} 
);

var Book = module.exports = mongoose.model('publicBook', BookSchema);

module.exports.createBook = async function(newBook, callback){
    newBook.save(callback);
};

module.exports.getBookByISBN = async function(bookISBN, callback){
    var query = {ISBN: bookISBN};
    return(Book.findOne(query, callback));
};

module.exports.updateBook = async function(bookISBN,edition,url, callback){
    var query = {ISBN: bookISBN};
    return(Book.findOneAndUpdate(query, {edition:edition,url:url},callback));
};