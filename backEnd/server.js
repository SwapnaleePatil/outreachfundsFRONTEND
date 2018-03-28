let express=require('express');
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
let fileUpload=require('express-fileupload');
let passport=require('passport');
const session=require('express-session');
let dbconfig=require('./app/config/dbconfig');
mongoose.connect(dbconfig.url);
let db=mongoose.connection;
global.studentToken='';
global.token=[];
let app=express();
app.use(passport.session());
app.use(session({secret:'outreachfund'}));
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/'))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});

require('./app/config/passport')(passport);
require('./app/routes/routes')(app,passport);

app.listen(3005);