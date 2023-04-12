var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
//thứ tự rất quan trọng
require('./commponent/category/CategoryModel');
require('./commponent/product/ProductModel');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//http://localhost:3000/product
const productRouter = require('./routes/product');
const dienTich = require('./routes/Lab/dienTich');
const chuVi = require('./routes/Lab/chuVi');

const userAPIRouter = require('./routes/api/user/UserAPI');
const productAPIRouter = require('./routes/api/product/ProductAPI');
const categoryAPIRouter = require('./routes/api/category/CategoryAPI');

const userCpanelRouter = require('./routes/cpanel/user/UserCpanle');
const productCpanelRouter = require('./routes/cpanel/product/ProductCpanle');
const categoryCpanelRouter = require('./routes/cpanel/category/CategoryCpanle');

const loginRouter = require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
mongoose.connect('mongodb://127.0.0.1:27017/MyDatabase?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));
// app.use('/cpanel/product',productCpanelRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/product', productRouter);
app.use('/dienTich', dienTich);
app.use('/chuVi', chuVi);

//http://localhost:3000/api/user
app.use('/api/user', userAPIRouter);
//http://localhost:3000/api/product
app.use('/api/product', productAPIRouter);
//http://localhost:3000/api/catagory
app.use('/api/category', categoryAPIRouter);

//http://localhost:3000/cpanle/user
app.use('/cpanel/user', userCpanelRouter);
//http://localhost:3000/cpanel/product
app.use('/cpanel/product', productCpanelRouter);
//http://localhost:3000/cpanle/catagory
app.use('/cpanel/category', categoryCpanelRouter);

//http://localhost:3000/login
app.use('/login', loginRouter)


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

//http://localhost:3000/