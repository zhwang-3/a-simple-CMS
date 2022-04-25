var express = require('express')
var router = express.Router()
// 引入处理逻辑的 js 文件
var {setArticle, showArticle, setArticleType, getAllUser, stopLogin, setIndexPic, setNavMenu, setFooter, setLinks} = require('../controller/admin')

// 发布文章
router.post('/setArticle', setArticle)
// 文章的发布和删除
router.post('/showArticle', showArticle)
// 分类的发布
router.post('/setArticleType', setArticleType)
// 获取所有的用户
router.get('/getAllUser', getAllUser)
// 用户封停或解封操作
router.get('/stopLogin/:id', stopLogin)
// 修改首页轮播图片
router.post('/setIndexPic', setIndexPic)
// 修改导航菜单
router.post('/changeNav', setNavMenu)
// 底部内容修改
router.post('/setFooter', setFooter)
// 修改友情链接
router.post('/setLinks', setLinks)
module.exports = router;