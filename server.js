var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db;
console.log('Hello');
if(process.env.ENV == 'Test'){

    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}

else{
    db= mongoose.connect('mongodb://MongoLab-j:LXjht..8LGeoqAEbVMzcZCAKNru2nXbxHLuZH7GjvSM-@ds035747.mongolab.com:35747/MongoLab-j');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api/books', bookRouter); 
app.use(express.static(__dirname + '/app'));

//app.get('/', function(req, res){
//    res.sendfile('index.html' );
//});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;