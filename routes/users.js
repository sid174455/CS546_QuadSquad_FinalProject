var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require("path");
var User = require('../data/users');
var Book = require('../data/books');
var Comments = require('../data/comments');
var userBook = require('../data/userBooks');

let a;

router.get('/register', function(req, res){
	res.render('user/register');
});


router.get('/login', function(req, res){
	res.render('user/login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
    var password2 = req.body.password2;
    var contactNumber = req.body.contactNumber;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('contactNumber', 'Contact Number is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('user/register',{
			errors:errors
		});
    } 
    else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
            password: password,
            mobile: contactNumber
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
        });

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Login

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

// Logout

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


router.get('/books',function(req,res){
    res.render('user/books');
});


router.get('/booksDetails',function(req,res){
    res.render('user/booksDetails');
});

//Add books to Public Library

router.post('/books', async function(req, res){
    var bookISBN = req.body.isbn;
    var bookName = req.body.bookName;
    var bookAuthor = req.body.author;
    var bookEdition = req.body.edition;
    var bookCategory = req.body.cat;
    var url = req.body.url;

    req.checkBody('isbn', 'ISBN is required').notEmpty();
    req.checkBody('bookName', 'Name of the book is required').notEmpty();
    req.checkBody('author', 'Auhtor of the book is required').notEmpty();
    req.checkBody('edition', 'Edition of the book is required').notEmpty();
    req.checkBody('cat', 'Category of the book is required').notEmpty();
    req.checkBody('url', 'URL of the book is required').notEmpty();

    var errors = req.validationErrors();
    
    if(errors) {
    	res.render("user/books",{
            errors:errors
        });
    }
    
    else{
        try{
            await Book.getBookByISBN(bookISBN, function(err,book){
                if(err) throw err;
                if(book!=null){
                res.render("user/books",{error:"Book with ISBN '"+bookISBN+ "' already exists in public library."});
                }
                else if(bookISBN<=0){
                    res.render("user/books",{error:"Book ISBN cannot be negative or zero."});
                }
                else if(bookEdition<=0){
                    res.render("user/books",{error:"Book edition cannot be negative or zero."});
                } 
                else{
            
                    var newBook = new Book({
                    ISBN: bookISBN,
                    name: bookName,
                    author: bookAuthor,
                    edition: bookEdition,
                    category: bookCategory,
                    url: url
                    });

                    Book.createBook(newBook, function(err, book){
                    if(err) throw err;
                    });
  
                    res.render('user/books',{success:"Book with ISBN '"+bookISBN +"' is added to public library."});
                }
            })
        }catch(e){
            console.log(e);
        }
    }
}); 

//Search Books from Public Library

router.post("/booksDetails", async function(req,res){
    var bookISBN = req.body.bookISBN;

	req.checkBody("bookISBN", "Book ISBN is required").notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render("user/booksDetails",{
			errors:errors
        });
	}
	else{
        try{
		    await Book.getBookByISBN(bookISBN, function(err,book){
                if(err) throw err;
                if(book==null){
                    res.render("user/booksDetails",{error:"Book with ISBN '"+bookISBN+"' not found."})
                }
                else{
                    Comments.find({ISBN:bookISBN}, function(err,comment){
                        if(err) throw err
                        res.render('user/search', {book:book,comment:comment,success:"Book with ISBN '"+bookISBN+"' found."});    
                        a=book;
                    })   
                }
            });
        }catch(e){
            console.log(e);
        }
    }
	
});

//Add book to User Library

router.post("/users/search", async function(req,res){
    
    var userName=req.user.username;
    userBook.getBookByISBN(a.ISBN,userName, function(err,book){
        if(err) throw err;
        if(book!==null){
            res.render("user/booksDetails",{error:"Book with ISBN '"+a.ISBN+"' already exists in your library."});
        }
        else{
            try{    
            var newBook = new userBook({
            ISBN: a.ISBN,
            name: a.name,
            author: a.author,
            edition: a.edition,
            category: a.category,
            url: a.url,
            userName: userName
            });
            
            userBook.createBook(newBook, function(err, book){
            if(err) throw err;
            });
            res.render('user/booksDetails',{success:"Book with ISBN '"+a.ISBN +"' is added to your library"});
            }catch(e){
                console.log(e);
            }
        }
    })
});


router.get("/delete", function(req,res){
    res.render("user/delete");
});

//Delete book from User Library

router.post("/delete", async function(req,res){

    var bookISBN = req.body.bookISBN;
    
    req.checkBody("bookISBN", "ISBN is required").notEmpty();
    
    var errors = req.validationErrors();
    
        if(errors){
            res.render("user/delete",{
                errors:errors
            });
        }
        else{
            try{
            var userName= req.user.username;
            await userBook.removeBook(bookISBN,userName, function(err,book){
                if(err) throw err;
                if(book==null){
                    res.render("user/delete",{error:"Book with ISBN '"+bookISBN+"' not found."})
                }
                else {   
                    res.render('user/delete',{success:"Requested book with ISBN '"+bookISBN +"' is deleted."})
    
                }    

            })
            }catch(e){
                console.log(e);
            }
        }
});


router.get("/update", function(req,res){
    res.render("user/update");
});

//Update to newer edition of the book in Public Libarary

router.post("/update", async function(req,res){
    var bookISBN = req.body.bookISBN;
    var edition= req.body.edition;
    var url= req.body.url;

    req.checkBody("bookISBN", "ISBN is required").notEmpty();
    req.checkBody("edition", "Book edition is required").notEmpty();
    req.checkBody("url", "URL of the book is required").notEmpty();
        
    var errors = req.validationErrors();
        
        if(errors){
            res.render("user/update",{
            errors: errors
            });
        }
        else if(!errors){
            try{
            await Book.findOne({ISBN:bookISBN}, function(err,books){
                if(books==null){
                    res.render("user/update",{error:"Book with ISBN '"+bookISBN+"' not found."})
                }
                else{
                    let b=books["edition"];
                        if(b<edition){
                            Book.updateBook(bookISBN, edition, url, function(err,book){
                                if(err) throw err;
                                else {
                                res.render('user/update',{success:"Requested book with ISBN '"+bookISBN +"' is updated."})
                                } 
                            })
                        }
                        else{
                        res.render('user/update',{error:"Inputed book edition should be better than previous edition."})
                        }
                }   
    
            })
            }catch(e){
                console.log(e);
            }
        }
});


router.get("/commentsDetails", function(req, res){
	res.render('user/commentsDetails');
});

//Add comments on books

router.post("/commentsDetails", async function(req,res){
    var comment = req.body.comment;
    var ISBN = req.body.ISBN;

    req.checkBody('comment', 'Comment is required').notEmpty();
    req.checkBody('ISBN', 'ISBN of the book is required').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render("user/commentsDetails",{
            errors:errors
        });
    }
    else{
        try{
        await Book.getBookByISBN(ISBN, function(err,book){
            if(err) throw err;
            if(book==null){
                res.render("user/commentsDetails",{error:"No such book found"})
            }
            else{
                var newComment = new Comments({
                    comment: comment,
                    poster: req.user.username,
                    ISBN: ISBN
                });
                
                Comments.createComment(newComment, function(err, comment){
                    if(err) throw err;
                });
                res.render('user/commentsDetails',{
                    success:"Your comment is added"
                });
            }
        });
        }catch(e){
            console.log(e);
        }
    }
});


router.get("/allBooks", function(req,res){
    Book.find({}, function(err,books){
        res.render('user/allBooks', {book:books});        
    })
});


router.get("/userBooks", function(req,res){
    userBook.find({userName:req.user.username}, function(err,books){
        res.render('user/userBooks', {book:books});    
    })
});

module.exports = router;