var express = require('express');
var router = express.Router();
// 获取数据
var {getNavMenu, getFooter, getLinks, getIndexPic, getHotArticle, getNewArticle, getArticle, getArticleTalk, getArticles, viewArticle} = require('../controller/getData')
const util = require('../util/common')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取页面导航栏数据
router.get('/getNavMenu', getNavMenu)
// footer显示内容
router.get('/getFooter', getFooter)
// 获取友情链接
router.get('/getLinks', getLinks)
// 获取首页轮播图片
router.get('/getIndexPic', getIndexPic)
// 获取热点文章列表
router.get('/getHotArticle', getHotArticle)
// 获取最新文章列表
router.get('/getNewArticle', getNewArticle)
// 获取文章详情
router.get('/getArticle/:id', getArticle)
// 获取文章评论
router.get('/getArticleTalk/:id', getArticleTalk)
// 获取小标签或者文章分类内容
router.post('/getArticles', getArticles)
// 文章被查看后浏览次数自动 + 1
router.get('/viewArticle/:id', viewArticle)
module.exports = router;
