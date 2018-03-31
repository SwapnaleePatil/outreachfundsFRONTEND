let express=require('express');
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
let cors=require('cors');
let fileUpload=require('express-fileupload');
let passport=require('passport');
let dbconfig=require('./app/config/dbconfig');
const session=require('express-session');
mongoose.connect(dbconfig.url);
let db=mongoose.connection;
global.studentToken='';
global.token='';
let app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret:'outreachfund',resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(fileUpload());
app.use(express.static(__dirname + '/'))

require('./app/config/passport')(passport);
require('./app/routes/routes')(app,passport);
app.listen(3005)