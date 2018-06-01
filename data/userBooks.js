var mongoose = require('mongoose');

//Book Schema
var userBookSchema = mongoose.Schema({
    ISBN:{ type: Number, index: true},
    name: { type: String},
    author: { type: String},
    edition: { type: Number},
    category: { type: String},
    userName: {type:String},
    url: {type:String}},
	{versionKey: false} 
);

var userBook = module.exports = mongoose.model('userBook', userBookSchema);

module.exports.createBook = async function(newBook, callback){
    newBook.save(callback);
};

module.exports.getBookByISBN = async function(bookISBN,userName, callback){
    var query = {ISBN: bookISBN,userName:userName};
    return(userBook.findOne(query, callback));
};

module.exports.removeBook = async function(bookISBN,userName, callback){
    var query = {ISBN: bookISBN, userName:userName};
    return(userBook.findOneAndRemove(query,callback));
};