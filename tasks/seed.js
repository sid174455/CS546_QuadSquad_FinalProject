var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/library_management_system', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'data/books.js',
    'data/comments.js',
    'data/userBooks.js',
    'data/users.js',
  ]);
 
  // Clear specified collections
    seeder.clearModels(['publicBook','Comments','userBook','User'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'User',
        'documents': [
            {
                'username': 'sprabhu',
                'password': '$2a$10$5vFY/GG9.gDYsde2NpWz7O/el.vXlRvwN11f9ddlklc0QK76HBQLO',
                //plain password:sid29@P
                'email':'sprabhu2@stevens.edu',
                'name':'Siddhesh Prabhu',
                'mobile':2012383025
            },
            {
                'username': 'averade',
                'password': '$2a$10$MG6RZ1GI2fD1wz.rIxa5P.sq5DDRk5jiDxvvETAqwWzlCYTOue0NW',
                //plain password:Anu@2593
                'email':'averade@stevens.edu',
                'name':'Anushka Varade',
                'mobile':2019854822
            },
            {
                'username': 'msalunke',
                'password': '$2a$10$cBi3x7eLti5/MEycbjFQ..altCqwhycuQgrzJaDtmk7EXwFNxVY0C',
                //plain password:Mrunu12@
                'email':'msalunke@stevens.edu',
                'name':'Mrunmayee Salunke',
                'mobile':20198445987
            },
            {
                'username': 'stripathi',
                'password': '$2a$10$5mU9e8pMzLOlGQRQ9CvgkOqgMn04mx5/rYRRMTTdOgHgwYeuTDxyu',
                //plain password:Shru90@#
                'email':'stripathi@stevens.edu',
                'name':'Shruti Tripathi',
                'mobile':2019856987

            }
        ]
    },
    {
        'model': 'publicBook',
        'documents': [
            {
                'ISBN':'9780262533058',
                'name': 'Introduction to Algorithms',
                'author':'Thomas H. Cormen,Charles E. Leiserson,Ronald L. Rivest,Clifford Stein',
                'edition':'3',
                'category':'Data Structures and Algorithms',
                'url':'https://www.eecs.yorku.ca/~jeff/AIMS/introduction-to-algorithms-3rd-edition.pdf'
            },
            {
                'ISBN':'9781449355739',
                'name': 'Learning Python',
                'author':'Mark Lutz',
                'edition':'5',
                'category':'Python',
                'url':'https://github.com/MrAlex6204/Books/blob/master/Learning%20Python%2C%205th%20Edition.pdf'
            },
            {
                'ISBN':'9780071631778',
                'name':'Java The Complete Reference',
                'author':'Herbert Schildt',
                'edition':'7',
                'category':'Java',
                'url':'https://iamgodsom.files.wordpress.com/2014/08/java-the-complete-reference-7th-edition.pdf'
            },
            {
                'ISBN':'9780470908747',
                'name':'Discovering Knowledge in Data',
                'author':'Daniel T. Larose,Chantal D. Larose',
                'edition':'2',
                'category':'Data Mining',
                'url':'https://doc.lagout.org/Others/Data%20Mining/Discovering%20Knowledge%20in%20Data_%20An%20Introduction%20to%20Data%20Mining%20%282nd%20ed.%29%20%5BLarose%20%26%20Larose%202014-06-30%5D.pdf'
            },
            {
                'ISBN':'9780123838728',
                'name':'Computer Architecture A Quantitative Approach',
                'author':'John L. Hennessy,David A. Patterson',
                'edition':'5',
                'category':'Computer Architecture',
                'url':'https://aaddiii.files.wordpress.com/2016/02/computer-architecture-patterson-5th-edition.pdf'
            },
            {
                'ISBN':'9780073523323',
                'name':'Database System Concepts',
                'author':'Silberschatz,Korth,Sudarshan',
                'edition':'6',
                'category':'Database',
                'url':'https://github.com/QSCTech/zju-icicles/blob/master/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/%E6%95%99%E6%9D%90/Database%20System%20Concepts%20(Sixth%20Edition).pdf'
            }
        ]        
    },
    {
        'model': 'userBook',
        'documents': [
            {
                'ISBN':'9780262533058',
                'name': 'Introduction to Algorithms',
                'author':'Thomas H. Cormen,Charles E. Leiserson,Ronald L. Rivest,Clifford Stein',
                'edition':'3',
                'category':'Data Structures and Algorithms',
                'userName':'sprabhu',
                'url':'https://www.eecs.yorku.ca/~jeff/AIMS/introduction-to-algorithms-3rd-edition.pdf'
            },
            {
                'ISBN':'9781449355739',
                'name': 'Learning Python',
                'author':'Mark Lutz',
                'edition':'5',
                'category':'Python',
                'userName':'sprabhu',
                'url':'https://github.com/MrAlex6204/Books/blob/master/Learning%20Python%2C%205th%20Edition.pdf'
            },
            {
                'ISBN':'9780071631778',
                'name':'Java The Complete Reference',
                'author':'Herbert Schildt',
                'edition':'7',
                'category':'Java',
                'userName':'averade',
                'url':'https://iamgodsom.files.wordpress.com/2014/08/java-the-complete-reference-7th-edition.pdf'
            },
            {
                'ISBN':'9780470908747',
                'name':'Discovering Knowledge in Data',
                'author':'Daniel T. Larose,Chantal D. Larose',
                'edition':'2',
                'category':'Data Mining',
                'userName':'averade',
                'url':'https://doc.lagout.org/Others/Data%20Mining/Discovering%20Knowledge%20in%20Data_%20An%20Introduction%20to%20Data%20Mining%20%282nd%20ed.%29%20%5BLarose%20%26%20Larose%202014-06-30%5D.pdf'
            },
            {
                'ISBN':'9780123838728',
                'name':'Computer Architecture A Quantitative Approach',
                'author':'John L. Hennessy,David A. Patterson',
                'edition':'5',
                'category':'Computer Architecture',
                'userName':'msalunke',
                'url':'https://aaddiii.files.wordpress.com/2016/02/computer-architecture-patterson-5th-edition.pdf'
            },
            {
                'ISBN':'9780073523323',
                'name':'Database System Concepts',
                'author':'Silberschatz,Korth,Sudarshan',
                'edition':'6',
                'category':'Database',
                'userName':'stripathi',
                'url':'https://github.com/QSCTech/zju-icicles/blob/master/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/%E6%95%99%E6%9D%90/Database%20System%20Concepts%20(Sixth%20Edition).pdf'
            }
        ]
    },
    {
        'model': 'Comments',
        'documents': [
            {
                'ISBN':'9780262533058',
                'poster':'sprabhu',
                'comment':'An impressive volume that covers many many algorithmic strategies.'
            },
            {
                'ISBN':'9780262533058',
                'poster':'averade',
                'comment':'The material on dynamic programming and greedy algorithms was particularly enlightening.'
            },
            {
                'ISBN':'9781449355739',
                'poster':'msalunke',
                'comment':'The Definitive Python Bible. Its a basic-tutorial book, its an under-the-hood book, its an Object Oriented Programming Book and an advanced concepts book.'
            },
            {
                'ISBN':'9780470908747',
                'poster':'stripathi',
                'comment':'What a great introduction to Data Science! It provides insights that can only be gained from understanding the underlying mathematics behind Data Science.'
            }
        ]
    }            
];