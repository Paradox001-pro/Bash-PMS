const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
    Task.find({}, (err, task) => {
        res.render('dashboard', {
            task: task
        })
    })
});

//get single task
router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) {
            console.log(err)
        } else {
            res.render('singleTask', {
                task: task,
            })
        }
    })
})

//save task
router.post('/', ensureAuthenticated, (req, res) => {

    const task = new Task();
    task.projectName = req.body.projectName;
    task.projectType = req.body.projectType;
    task.projectDescription = req.body.projectDescription;
    task.personsInvolved = req.body.personsInvolved;
    task.amountRequired = req.body.amountRequired;
    task.location = req.body.location;
    task.duration = req.body.duration;
    task.report = req.body.report;
    task.from = req.body.from;
    task.to = req.body.to;

    task.save().then(user => {
        req.flash('success_msg', 'New task listed')
        res.redirect('/dashboard')
    }).catch(err => {
        console.log(err)
    });
});

module.exports = router;