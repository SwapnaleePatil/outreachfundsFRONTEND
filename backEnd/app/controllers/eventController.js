let eventSchedule = require('../models/eventSchedule').eventSchedule;
exports.addeventSchedule = (req, res) => {
    let body = req.body;
    let neweventSchedule = new eventSchedule(body);
    neweventSchedule.save()
        .then(()=>{
           res.send({"message":'Inserted.', 'record': neweventSchedule})
        })
        .catch((e) => {
            console.log('error in inserting record.',e);
        })
}
exports.deleteeventSchedule = (req, res) => {
    eventSchedule.findByIdAndUpdate(req.body.id,{ $set:{status: 'true'}},{new:true}).then((result) => {
        if (result) {
            res.send({"message":'Deleted.', 'record': result});
        }
        else {
            res.send("User Not Found");
        }
    }).catch(() => {
        console.log('Error in deletion');
    })
}
exports.updateeventSchedule = (req, res) => {
    let body=req.body;
    eventSchedule.findByIdAndUpdate(req.body.id, {$set: body},{new:true}).then((result) => {
        res.send({"message": 'Updated.', 'record': result});
    }).catch((err) => {
        console.log('Error in record updation', err);
    })
}
exports.fetch = (req, res) => {
    eventSchedule.find().then((data) => {
        res.send({"message":'All Record.', 'record': data});
    }).catch((err) => {
        console.log('Error in retrieving data.', err);
    })
}
exports.fetchById = (req, res) => {
    eventSchedule.findById(req.body.id).then((data) => {
        res.send({"message":'Record By Id.', 'record': data});
    }).catch(() => {
        console.log('Error in retrieving data.');
    })
}
