var studentController=require('../controllers/student-controller');
let businesscontroller=require('../controllers/businessController');
let eventcontroller=require('../controllers/eventController');
let donationController= require('../controllers/donationController');

module.exports=(app,passport)=>{

    //School Routes
    app.post('/api/school',studentController.registerSchoolOrganisation);
    app.get('/api/school',studentController.fetchAllSchools);

    //Student Routes
    app.post('/api/student/profile',studentController.registerStudent);
    app.post('/api/student/approve',studentController.approveStudent);
    app.post('/api/student/reject',studentController.rejectStudent);
    app.get('/api/students',studentController.authenticate,studentController.fetchAllStudents);
    app.get('/api/students/:schoolId',studentController.fetchAllStudentsRequest);
    app.get('/api/student',studentController.fetchStudent);
    app.post('/api/student/login',passport.authenticate('student',{
        successRedirect:'/success',
        failureRedirect:'/failure'
    }))
    app.get('/success',(req,res)=>{
        res.send({"message":"login successful","token":studentToken});
    })
    app.get('/failure',(req,res)=>{
        res.send({"message":"login failed"});
    })


    // Business Routes
    app.post('/api/businessOwner/loginPassport',
        passport.authenticate('businessOwner',{
            successRedirect:'/loginSuccess',
            failureRedirect:'/loginFailure'
        }));
    app.get('/loginSuccess',(req,res)=>{
        res.send({"message":"login successful","token":token});
    });
    app.get('/loginFailure',(req,res)=>{
        res.send("User Not Found");
    });
    app.post('/api/business/profile', businesscontroller.addBusinessOwner);
    app.delete('/api/business/profile', businesscontroller.deleteBusinessOwner);
    app.put('/api/business/profile',businesscontroller.updateBusinessOwner);
    app.get('/api/business/profile',businesscontroller.fetch);
    app.post('/api/business/profile/fetchById',businesscontroller.fetchById);
    app.get('/api/business/profile/fetchByToken',businesscontroller.fetchByToken);

    //Event Routes
    app.post('/api/event', eventcontroller.addeventSchedule);
    app.delete('/api/event', eventcontroller.deleteeventSchedule);
    app.put('/api/event',eventcontroller.updateeventSchedule);
    app.get('/api/event',eventcontroller.fetch);
    app.post('/api/eventBySponser',eventcontroller.fetchBySponser);

    //Donation Routes
    app.post('/addDonation',donationController.addDonation);
    app.get('/getDonationData',donationController.getDonation);
    app.patch('/approveDonation',donationController.approveDonation);
    app.patch('/updateDonation',donationController.updateDonation);
}