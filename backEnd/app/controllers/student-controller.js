var Student=require('../models/student').student;
var SchoolOrganisation=require('../models/schoolOrganisation').schoolOrganisation;

exports.registerStudent=(req,res)=>{
    if(!req.files)
        return res.status(400).send('No files were uploaded.');


    let sample=req.files.profileImage;
    sample.mv(__dirname + '../../../uploads/' + sample.name,(err)=>{
        if(err) {
            console.log(err);
        }
    });
    var student=new Student(req.body);
    student.photo=req.files.profileImage.name;
    student.save().then(()=>{
        return student.generateAuthToken(student);
    }).then(()=>{
        res.status(200).send({"stud":student});
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Registration of Student.","err":err})
    })
}

exports.registerSchoolOrganisation=(req,res)=>{
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
   // console.log(req.stud);
    Student.find().then((students)=>{
        res.status(200).send({"students":students});
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Retrieving list of Students.","err":err})
    })
}

exports.authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    Student.findByToken(token).then((stud)=>{
        if(!stud)
            return Promise.reject();
        req.stud=stud;
        req.token=token;
        next();
    }).catch((err)=>{
        res.status(401).send({"message":"Please Login First."});
    })
}