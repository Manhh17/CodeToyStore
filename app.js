var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 1A. config location of routers
var toyRouter = require('./routes/toy');
var brandRouter = require('./routes/brand');

var app = express();

var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))

// 2. config 'mongoose' module
var mongoose = require('mongoose');
var uri = "mongodb+srv://anhsdgch210787:UgZrztcjeGVBq8i1@cluster0.ype2wlf.mongodb.net/Toy";
mongoose.set('strictQuery', true); //ignore mongoose warning
mongoose.connect(uri)
  .then(() => console.log('Connect DB Moogose succesfully'))
  .catch((err) => console.log(err));

// 3. config 'body-parser' module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 1B. config url path of routers
app.use('/users', usersRouter);
app.use('/toy', toyRouter);
app.use('/brand', brandRouter);

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
app.listen(process.env.PORT || 3000);

module.exports = app;
// const express = require('express');
// const path = require('path');

// const app = express();

// Thiết lập View Engine là Handlebars
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

// // Định nghĩa route
// app.get('/', (req, res) => {
//     res.render('index', { title: 'My Handlebars Page', message: 'Hello, Handlebars!' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
