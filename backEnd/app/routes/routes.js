let studentController=require('../controllers/student-controller');
let businesscontroller=require('../controllers/businessController');
let eventcontroller=require('../controllers/eventController');
let donationController= require('../controllers/donationController');
let fetchPassword = require('../controllers/forgotPassword');
let Student=require('../models/student').student;
let BusinessOwner = require('../models/businessOwner').businessOwner;

module.exports=(app,passport)=>{

    //School Routes
    app.post('/api/school',studentController.registerSchoolOrganisation);
    app.get('/api/school',isLoggedIn,studentController.fetchAllSchools);
    app.put('/api/school',isLoggedIn,studentController.updateSchool);

    //Student Routes
    app.post('/api/student/profile',studentController.registerStudent);
    app.put('/api/student/profile',isLoggedIn,studentController.UpdateStudent);
    app.post('/api/student/approve',isLoggedIn,studentController.approveStudent);
    app.post('/api/student/reject',isLoggedIn,studentController.rejectStudent);
    app.get('/api/students',isLoggedIn,studentController.fetchAllStudents);
    app.get('/api/students/:schoolId',isLoggedIn,studentController.fetchAllStudentsRequest);
    app.get('/api/student',studentController.fetchStudent);
    app.post('/api/student/login',passport.authenticate('student',{
        successRedirect:'/success',
        failureRedirect:'/failure'
    }))
    app.get('/success',(req,res)=>{
        res.send({"message":"login successful","userType":"S","token":token});
    })
    app.get('/failure',(req,res)=>{
        res.send({"message":"login failed"});
    })

    // Business Routes
    app.post('/api/businessOwner/loginPassport',passport.authenticate('businessOwner', {
            successRedirect:'/loginSuccess',
            failureRedirect:'/loginFailure'
        }));
    app.get('/loginSuccess',(req,res)=>{
        res.send({"message":"login successful","userType":"B","token":token});
    });
    app.get('/loginFailure',(req,res)=>{
        res.send({"message":"login failed"});
    });
    app.post('/api/business/profile', businesscontroller.authenticatee,businesscontroller.addBusinessOwner);
    app.delete('/api/business/profile',businesscontroller.authenticatee, businesscontroller.deleteBusinessOwner);
    app.put('/api/business/profile',isLoggedIn,businesscontroller.authenticatee,businesscontroller.updateBusinessOwner);
    app.get('/api/business/profile',isLoggedIn,businesscontroller.authenticatee,businesscontroller.fetch);
    app.post('/api/business/profile/fetchById',isLoggedIn,businesscontroller.authenticatee,businesscontroller.fetchById);
    app.get('/api/business/profile/fetchByToken',isLoggedIn,businesscontroller.fetchByToken);

    //Google Login
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',passport.authenticate('google', {
            successRedirect : 'http://localhost:3001/home',
            failureRedirect : '/'
        }));


    //Event Routes
    app.post('/api/event',isLoggedIn, eventcontroller.addeventSchedule);
    app.delete('/api/event',isLoggedIn, eventcontroller.deleteeventSchedule);
    app.put('/api/event',isLoggedIn,eventcontroller.updateeventSchedule);
    app.get('/api/event',isLoggedIn,eventcontroller.fetch);
    app.post('/api/eventBySponser',isLoggedIn,eventcontroller.fetchBySponser);

    //Donation Routes
    app.post('/addDonation',isLoggedIn,donationController.addDonation);
    app.get('/getDonationData',isLoggedIn,donationController.getDonation);
    app.patch('/approveDonation',isLoggedIn,donationController.approveDonation);
    app.patch('/updateDonation',isLoggedIn,donationController.updateDonation);

    //Forgot Password
    app.post('/studentforgotPassword',fetchPassword.StudentforgotPassword);
    app.post('/businessforgotPassword',fetchPassword.BusinessforgotPassword);
    app.post('/studentUpdatePassword',fetchPassword.GetStudentIdFromEmail);
    app.post('/businessUpdatePassword',fetchPassword.GetBusinessIdFromEmail);
    // app.post('/updatePassword',fetchPassword.updatePassword);
}
function isLoggedIn(req, res, next) {
    let token=req.headers['x-auth'];
    Student.findByToken(token).then((response)=>{
        if(response){
            next();
        }
        else
        {
            BusinessOwner.findByToken(token).then((response)=>{
                if(response) {
                    next();
                }
                else
                {
                    res.send("Invalid user");
                }
            })
        }
    }).catch((err)=>{
        res.send({"User Is Invalid":err});
    })
}