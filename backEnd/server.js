var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
//var cors=require('cors');
var fileUpload=require('express-fileupload');
var passport=require('passport');
var dbconfig=require('./app/config/dbconfig');
mongoose.connect(dbconfig.url);
var db=mongoose.connection;
global.studentToken='';
db.on('error',()=>{
    console.log('There is an error in connecting with database..');
})

db.once('open',()=>{
    console.log('Successfully connected to database.');
})
var app=express();
app.use(passport.initialize());
//app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/'))

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/');
// })


require('./app/config/passport')(passport);
require('./app/routes/routes')(app,passport);

app.listen(3000,()=>{
    console.log('server is started');
})
