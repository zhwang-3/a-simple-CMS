var express = require('express'); // 引用 express
var path = require('path'); // 服务器路径
var cookieParser = require('cookie-parser'); // 解析 cookie
var logger = require('morgan'); // 解析 request、respond 参数
var initData = require('./controller/initData'); //初始化数据
var {checkAPP, checkAdmin, checkUser} = require('./util/middleware');

var indexRouter = require('./routes/index'); // 注册路由位置
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin'); // 管理员路由

var app = express(); // 注册 express
// 使用app.use 来注册函数，可以简单的认为是向task的数组进行push操作
app.use(logger('dev')); // 设为开发者模式，输出信息
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态资源文件夹为 public

// 设置允许跨域访问该服务
// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.use('/', checkAPP, indexRouter); // 设置 url 为 / 引向 index 路由 
app.use('/users', checkAPP, usersRouter); // 设置 url 为 /users 引向 user 路由 
app.use('/admin', [checkAPP, checkUser, checkAdmin], adminRouter)

module.exports = app;