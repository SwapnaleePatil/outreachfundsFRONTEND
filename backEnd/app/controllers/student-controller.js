let Student=require('../models/student').student;
let SchoolOrganisation=require('../models/schoolOrganisation').schoolOrganisation;

//REGISTER STUDENT
exports.registerStudent=(req,res)=>{
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
         let sample = req.files.photo;
        sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
            if (err) {
                console.log(err);
            }
        });
    let body=JSON.parse(req.body.data);
    let student=new Student(body);
    student.photo=sample.name;
    if(req.body.schoolId!==undefined) {
        student.schoolId = req.body.schoolId;
    }
    student.save().then(() => {
            return student.generateAuthToken();
        }).then(() => {
            res.status(200).send(student);
        }).catch((err) => {
            res.status(401).send({"message": "Error in Registration of Student.", "err": err})
        })
}
//REGISTER SCHOOL ORGANISATION
exports.registerSchoolOrganisation=(req,res)=>{
    let schoolOrganisation=new SchoolOrganisation(req.body);
    schoolOrganisation.save().then((school)=>{
        res.status(200).send({"school":school});
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Registration of School Organisation.","error":err})
    })
}

//FETCH ALL STUDENTS LIST
exports.fetchAllStudents=(req,res)=>{
    Student.find().then((students)=>{
        res.status(200).send(students);
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Retrieving list of Students.","err":err})
    })
}

exports.fetchAllStudentsRequest=(req,res)=>{
    Student.find({schoolId:req.params.schoolId,roleStatus:false,role:'Member',status:false}).then((students)=>{
        res.status(200).send(students);
    }).catch((err)=>{
        res.status(401).send({"message":"Error in Retrieving list of Students.","err":err})
    })
}

exports.fetchStudent=(req,res)=>{
    let token=req.header('x-auth');
    Student.findByToken(token).then((student)=>{
        if(!student)
            res.status(401).send({"message":"Student Not Found."});
        res.status(200).send(student);
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
    let token=req.header('x-auth');
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
}
exports.approveStudent=(req,res)=>{
    let arr=req.body.arr;
    let l=arr.length;
    for(let i=0;i<l;i++) {
        Student.findById(arr[i]).then((stud)=>{
            if(stud) {
                stud.roleStatus=true;
                stud.save().then(()=>{
                    "use strict";
                    console.log("updated");
                })
            }
        }).catch(()=>{
            console.log('error in Approving.');
            res.status(201).send({"message":"error"});
        })
    }
    res.status(200).send({"message":"success"});
}
exports.rejectStudent=(req,res)=>{
    let arr=req.body.arr;
    let l=arr.length;
    for(let i=0;i<l;i++) {
        Student.findById(arr[i]).then((stud)=>{
            if(stud) {
                stud.status=true;
                stud.save().then(()=>{
                    "use strict";
                    console.log("updated");
                })
            }
        }).catch(()=>{
            console.log('error in Rejecting');
            res.status(201).send({"message":"error"});
        })
    }
    res.status(200).send({"message":"success"});
}
exports.UpdateStudent=(req,res)=>{
    let img = '';
    let body=JSON.parse(req.body.obj);
     if (req.files && req.files !== null) {
        img = req.files.photo.name;
        let sample = req.files.photo;
        sample.mv(__dirname + '../../../uploads/' + sample.name, (err) => {
            if (err) {
                console.log("Error",err);
            }
        });
    }
    else {
        img = req.body.photo;
    }
    body.photo=img;

    Student.findByIdAndUpdate(body.id,{$set:body},{new:true})
        .then((result) => {
            res.send({"message": 'Updated.', 'record': result});
        }).catch((err) => {
        console.log('Error in Update', err);
    })
}
exports.updateSchool=(req,res)=>{
    let body = req.body;
    SchoolOrganisation.findByIdAndUpdate(req.body.id, {$set: body}, {new: true}).then((result) => {
        res.send({"message": 'Updated.', 'record': result});
    }).catch((err) => {
        console.log('Error in record updation', err);
    })
}