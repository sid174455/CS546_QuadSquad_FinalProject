var express = require('express');
var router = express.Router();
var Book = require("../data/books");
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('user/index',{user:req.user.username});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;