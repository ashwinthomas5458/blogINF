const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');


dotenv.config();

const app = express();

//DB connection
mongoose.connect(process.env.DB_LOC, { useNewUrlParser: true },
()=>console.log('DB connected'));

//routes
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const adminHome = require('./routes/home');
const posts = require('./routes/posts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({extname:'hbs', partialsdir:__dirname+'views/partials'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: process.env.SESSION_KEY, cookie:{maxAge:1800000}}));
app.use(fileUpload());

app.use('/', usersRouter);
app.use('/admin', adminRouter);
app.use('/home', adminHome);
app.use('/posts', posts);

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
