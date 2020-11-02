const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/User')
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
    Task.find({}, (err, task) => {
        res.render('projects', {
            task: task
        })
    })
})

//get single task
router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        User.find({}, (err, user) => {
            res.render('project', {
                task: task,
                name: user.name
            }) 
        })                                                      
    })
})

//update single question post route
router.post('/:id', (req, res) => {
    let task = {};
    task.report = req.body.report;

    let query = { _id: req.params.id }

    Task.updateOne(query, task, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success_msg', 'report sent successfully')
            res.redirect('/');
        }
    })
});

module.exports = router;