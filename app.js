var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//inbulid

var config = require('./config');//my 

const mongoose = require('mongoose');//install
var passport = require('passport');

var indexRouter = require('./routes/index');//Routers
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items/items');
var shopRouter = require('./routes/items/shopRouter');
var imageRouter = require('./routes/items/imageRouter');
var noticeRouter = require('./routes/notices');


const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



var app = express();  //define app


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //inbulid

app.use(passport.initialize());  //initalize passport

app.use('/', indexRouter);     //all path to router request
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/shops', shopRouter);
app.use('/images',imageRouter);
app.use('/notice',noticeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
