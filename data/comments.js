var mongoose = require('mongoose');

//Recipe Schema
var CommentsSchema = mongoose.Schema({
    poster:{type:String},
    comment:{type:String},
    ISBN: {type:String, index:true}},
	{versionKey: false} 
);

var Comments = module.exports = mongoose.model('Comments', CommentsSchema);

module.exports.createComment = async function(newComment, callback){
    newComment.save(callback);
};
/*
module.exports.getAllComments = async function(ISBN, callback){
    var query = {ISBN: ISBN};
    Comments.find({}, callback).where(query);
};

module.exports.deleteComments = async function(ISBN, callback){
    var query = {ISBN: ISBN};
    return(Comments.findOneAndRemove(query,callback));
};*/