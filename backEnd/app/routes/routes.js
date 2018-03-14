var studentController=require('../controllers/student-controller');
module.exports=(app,passport)=>{

    //School Routes
    app.post('/api/school',studentController.registerSchoolOrganisation);
    app.get('/api/school',studentController.fetchAllSchools);

    //Student Routes
    app.post('/api/student/profile',studentController.registerStudent);
    app.get('/api/student',studentController.authenticate,studentController.fetchAllStudents);
    app.get('/api/student',studentController.authenticate,studentController.fetchStudent);
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
}