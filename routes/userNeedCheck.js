var express = require('express');
var router = express.Router();

var {articleTalk, getUserInfo, changeUserInfo, sendMail, getMails, getUserMail, getArticleType, articleLike, articleCollection, getCollection} = require('../controller/userNeedCheck')

// 添加文章评论
router.post('/article/talk', articleTalk)
// 获取用户资料
router.get('/info/:username', getUserInfo)
// 修改用户资料
router.post('/changeInfo', changeUserInfo)
// 发送私信
router.post('/mail/:username', sendMail)
// 获取私信列表
router.get('/mailsGet', getMails)
// 根据私信 ID 获取私信详情
router.get('/mailsGet/:id', getUserMail)
// 获取所有文章分类
router.get('/articleType', getArticleType)
// 文章点赞或点踩
router.get('/like/:id/:like', articleLike)
// 文章收藏
router.get('/save/:id', articleCollection)
// 获取收藏列表
router.get('/saveList', getCollection)
module.exports = router;