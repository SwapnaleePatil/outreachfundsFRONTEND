var Student=require('../models/student').student;
var SchoolOrganisation=require('../models/schoolOrganisation').schoolOrganisation;
exports.registerStudent=(req,res)=>{
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
         let sample = req.files.photo;
        sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
            if (err) {
                console.log(err);
            }
        });

    var body=JSON.parse(req.body.data);
    let student=new Student(body);
    student.photo=sample.name;
    student.schoolId=req.body.schoolId;
        student.save().then(() => {
            return student.generateAuthToken(student);
        }).then((student) => {
            res.status(200).send(student);
        }).catch((err) => {
            res.status(401).send({"message": "Error in Registration of Student.", "err": err})
        })
}

exports.registerSchoolOrganisation=(req,res)=>{
    console.log("school - ",req.body);
    var schoolOrganisation=new SchoolOrganisation(req.body);
    schoolOrganisation.save().then((school)=>{
        res.status(200).send({"school":school});
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Registration of School Organisation.","error":err})
    })
}

exports.fetchAllStudents=(req,res)=>{
    console.log(req.stud);
    Student.find().then((students)=>{
        res.status(200).send({"students":students});
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Retrieving list of Students.","err":err})
    })
}
exports.fetchStudent=(req,res)=>{
    Student.find().then((students)=>{
        res.status(200).send({"students":students});
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Retrieving Student.","err":err})
    })
};

exports.fetchAllSchools=(req,res)=>{
    SchoolOrganisation.find().then((schools)=>{
        res.status(200).send(schools);
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Retrieving list of Schools.","err":err})
    })
};
exports.authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    Student.findByToken(token).then((stud)=>{
        if(!stud)
            return Promise.reject();
        console.log(token);
        req.stud=stud;
        req.token=token;
        next();
    }).catch((err)=>{
        res.status(401).send({"message":"Please Login First.","error":err});
    })
};