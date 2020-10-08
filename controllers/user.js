const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

//user model
const User = require('../models/User');

//login page
router.get('/login', (req,res) => res.render('login'));

//register page
router.get('/register', (req,res) => res.render('register'));


// register post route
router.post('/register', (req,res) =>{
    const { fullname, email, password, password2 } = req.body;
    let errors = [];

    //check require field
    if(!fullname || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' });
    }

    //check passwors match
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    //check passwords length
    if(password.length < 6){
        errors.push({ msg: 'Password should be atleast six characters' });
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            fullname,
            email,
            password,
            password2
        });
    }else{
        //validation pass
        User.findOne({ email:email })
        .then(user => {
            if(user){
                //user exist
                errors.push({ msg:' Email is registered'})
                res.render('register', {
                    errors,
                    fullname,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    fullname,
                    email,
                    password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=> {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg','registered')
                            res.redirect('/users/login')
                        }).catch(err => {
                            console.log(err)
                        });
                    })
                })
            }
        });
    }
});

// login post route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'loggout');
    res.redirect('/');
})


module.exports = router;