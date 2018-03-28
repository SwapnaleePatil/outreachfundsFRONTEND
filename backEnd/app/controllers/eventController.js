let eventSchedule = require('../models/eventSchedule').eventSchedule;
//Add New Event
exports.addeventSchedule = (req, res) => {
    let body = req.body;
    let neweventSchedule = new eventSchedule(body);
    neweventSchedule.save()
        .then(() => {
            res.send({"message": 'Inserted.', 'record': neweventSchedule})
        })
        .catch((e) => {
            res.send({'error in inserting record.': e});
        })
}
//Delete Event
exports.deleteeventSchedule = (req, res) => {
    eventSchedule.findByIdAndUpdate(req.body.id, {$set: {status: 'true'}}, {new: true}).then((result) => {
        if (result) {
            res.send({"message": 'Deleted.', 'record': result});
        }
        else {
            res.send("User Not Found");
        }
    }).catch((e) => {
        res.send({'Error in deletion': e});
    })
}
//Update Event
exports.updateeventSchedule = (req, res) => {
    let body = req.body;
    eventSchedule.findByIdAndUpdate(req.body.id, {$set: body}, {new: true}).then((result) => {
        res.send({"message": 'Updated.', 'record': result});
    }).catch((err) => {
        res.send({'Error in record updation': err});
    })
}
//Fetch All Record
exports.fetch = (req, res) => {
    eventSchedule.find({status: true}).then((data) => {
        res.send({"message": 'All Record.', 'record': data});
    }).catch((err) => {
        res.send({'Error in retrieving data.': err});
    })
}
//Fetch REcord By Id
exports.fetchById = (req, res) => {
    eventSchedule.findById(req.body.id).then((data) => {
        res.send({"message": 'Record By Id.', 'record': data});
    }).catch((e) => {
        res.send({'Error in retrieving data.': e});
    })
};
//Fetch Record By Sponser
exports.fetchBySponser = (req, res) => {
    let id = req.body.id;
    eventSchedule.find({businessSponsor: id}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({"Error": err});
    })
}