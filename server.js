const express = require('express');
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const app = express();
const port = 8001;

//password config
require('./config/passport')(passport);

//connect mongoose
mongoose.connect('mongodb://localhost/PMS',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then((res) => {
    console.log('connected to PMS database')
}).catch((err) => {
    console.log(err)
});

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express session midleware
app.use(session({
    secret: '({[<>}])',
    saveUninitialized: false, //if saved to true tis session will be saved on the server on each request no matter if something change or not
    resave: false,
    cookie: { maxAge:Date.now() + 3600000}
}));

//initiallize passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global variable
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
})

//static file
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req,res)=> res.render('index'))

app.get('/about', (req,res)=> res.render('about'))

app.get('/contact', (req,res)=> res.render('contact'))

app.use('/dashboard', require('./controllers/dashboard'));
app.use('/users', require('./controllers/user'));

app.listen(port, ()=>{console.log(`server listening on port ${port}`)});