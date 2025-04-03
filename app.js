var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
let { CreateErrorRes, CreateSuccessRes } = require('./utils/responseHandler');

const categoryModel = require('./schemas/category');
const productModel = require('./schemas/products');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect("mongodb://localhost:27017/S5");
mongoose.connection.on('connected',()=>{
  console.log("connected");
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', require('./routes/roles'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/menu', require('./routes/menu'));

// Route bắt slug: /:categorySlug/:productSlug
app.get('/:categorySlug/:productSlug', async (req, res, next) => {
  try {
    const { categorySlug, productSlug } = req.params;

    const category = await categoryModel.findOne({ slug: categorySlug });
    if (!category) return CreateErrorRes(res, "Category not found", 404);

    const product = await productModel.findOne({
      slug: productSlug,
      category: category._id,
      isDeleted: false
    }).populate("category");

    if (!product) return CreateErrorRes(res, "Product not found", 404);

    return CreateSuccessRes(res, product, 200);
  } catch (error) {
    next(error);
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  CreateErrorRes(res,err.message,err.status||500);
});

module.exports = app;
