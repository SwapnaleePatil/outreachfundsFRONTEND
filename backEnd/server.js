let express=require('express');
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
let cors=require('cors');
let fileUpload=require('express-fileupload');
let passport=require('passport');
let dbconfig=require('./app/config/dbconfig');
mongoose.connect(dbconfig.url);
let db=mongoose.connection;
global.studentToken='';
global.token='';
let app=express();


app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/'))

db.on('error',()=>{
    console.log('There is an error in connecting with database..');
})

db.once('open',()=>{
    console.log('Successfully connected to database.');
})

require('./app/config/passport')(passport);
require('./app/routes/routes')(app,passport);

app.listen(2525,()=>{
    console.log('server is started');
})