var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// IMPORT ROUTES
var auth = require('./routes/auth');
var indexRouter = require('./routes/index');
var superheroRouter = require('./routes/superhero');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: "heros" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.passport.initialize());
app.use(auth.passport.session());

app.use(express.static(path.join(__dirname, '../client/build')));

// USE ROUTES
app.use('/', indexRouter);
app.use('/superhero', superheroRouter);
app.use('/auth', auth.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
