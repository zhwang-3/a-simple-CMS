var express = require('express');
var router = express.Router();

// 引入用户处理逻辑的 js 文件
var {userLogin, userRegister} = require('../controller/user')
var {checkUser} = require('../util/middleware')
/* GET users listing. */
router.post('/login', userLogin); // 并返回一个 token 值
router.post('/register', userRegister);
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/user', checkUser, require('./userNeedCheck'));

module.exports = router;
