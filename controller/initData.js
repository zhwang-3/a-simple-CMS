var redis = require('../util/redisDB')
const crypto = require('crypto') //内含MD5加密算法
const req = require('express/lib/request')

// 页面导航栏数据
var objNavMenu = [
    {
        "name":"主页",
        "src":"/"
    },
    {
        "name":"文章",
        "src":"/articles"
    }
]
// footer显示内容
var objFooter = [
    {
        "name":"版权所有",
        "src":"https://imgtu.com/i/LFPM28",
        "text":"南极兔"
    },
    {
        "name":"发送邮件",
        "src":"mailto:wangzihao123456@126.com",
        "text":"126邮箱"
    }
]
// 友情链接
var objLinks = [
    {
        "name":"baidu",
        "src":"http://baidu.com",
    }
]
// 首页轮播图片
var objIndexPic = [
    {
        "title":"1st",
        "src":"/",
        "img":"https://s1.ax1x.com/2022/04/09/LFPM28.jpg"
    }
]
// 文章内容与属性
var objArticle = [
    {
        "title": "测试文字3",
        "writer": "admin1",
        "text": "这是一篇测试文字，用于测试",
        "time": "1643530000000",
        "a_id": 4,
        "show": 0,
        "tags": []
    },
    {
        "title": "测试文字4",
        "writer": "admin1",
        "text": "这是一篇测试文字，用于测试",
        "time": "1643540000000",
        "a_id": 5,
        "show": 1,
        "tags": []
    },
    {
        "title": "测试文字5",
        "writer": "admin2",
        "text": "这是一篇测试文字，用于测试",
        "time": "1643550000000",
        "a_id": 6,
        "show": 1,
        "tags": []
    }
]
// 文章类型枚举
var objType = [
    {
        "uid": 1,
        "name": "Category1"
    },
    {
        "uid": 2,
        "name": "Category2"
    }
]
// 文章类型
var objArticleType = [
    {
        "uid": 1,
        "a_ids": [4, 5]
    },
    {
        "uid": 2,
        "a_ids": [6]
    }
]
// 文章标签
var objArticleTag = [
    {
        "name": "javascript",
        "a_ids": [4, 5, 6]
    },
    {
        "name": "golang",
        "a_ids": [5]
    }
]
// 文章评论
var objTalk = [
    {
        "a_id": 5,
        "talks": [
            {
                "talk": "这是第一条评论",
                "time": "1643540000000",
                "username": "admin1"
            },
            {   
                "talk": "这是第二条评论",
                "time": "1643550000000",
                "username": "admin2"
            }
        ]
    },
    {
        "a_id": 6,
        "talks": [
            {
                "talk": "这是第一条评论",
                "time": "1643550000000",
                "username": "admin1"
            }
        ]
    }
]
// 用户资料
var objUser = [
    {
        "username": "admin",
        "phone": "88122391",
        "nickname": "管理员",
        "age": "49",
        "sex": "0",
        "password": "123456",
        "ip": "::1",
        "login": 0
    },
    {
        "username": "admin2",
        "phone": "79201123",
        "nickname": "怪物猎人",
        "age": "26",
        "sex": "0",
        "password": "123456",
        "ip": "::2",
        "login": 0
    }
]

redis.set('book:nav_menu', objNavMenu) // 页面导航栏数据
redis.set('book:footer', objFooter) // footer显示内容
redis.set('book:links', objLinks) // 友情链接
redis.set('book:indexPic', objIndexPic) // 首页轮播图片
redis.set('book:a_type', objType) // 文章类型
redis.set('book:article:', 6) // 存储当前文章最大 id

// 文章类型初始化
for(let type of objArticleType) {
    let key = 'book:a_type:' + type.uid
    let list = type.a_ids.map((item) => {
        return 'book:article:' + item
    })
    for(let a_id of type.a_ids) {
        for(let art of objArticle) {
            if(art.a_id == a_id) {
                art.type = type.uid
            }
        }
    } // 添加每篇文章对应的标签
    redis.set(key, list) //存储按照类别的文章列表
}
// 文章标签初始化
for(let tag of objArticleTag) {
    let tKeyMd5 = crypto.createHash('md5').update(tag.name).digest("hex")
    let key = 'book:tag:' + tKeyMd5
    let list = tag.a_ids.map((item) => {
        return 'book:article:' + item
    })
    for(let a_id of tag.a_ids) {
        for(let art of objArticle) {
            if(art.a_id == a_id) {
                art.tags.push(tag.name) 
            }
        }
    } // 添加每篇文章对应的标签
    redis.set(key, list) //存储按照类别的文章列表
}
// 添加评论内容
for(let item of objTalk) {
    let key = 'book:article:' + item.a_id + ":talk"
    redis.set(key, item.talks); 
}
// 添加文章
for(let art of objArticle) {
    redis.set('book:article:' + String(art.a_id), art) // 按照 id 保存文章
    redis.zadd('book:a_view', 'book:article:' + String(art.a_id), 0) // 按照文章的阅读量存入有序集合
    redis.zadd('book:a_time', 'book:article:' + String(art.a_id), parseInt(art.time)) // 按照文章的发布时间存入有序集合
    redis.zadd('book:a_like', 'book:article:' + String(art.a_id), 0) // 按照文章的点赞量存入有序集合
}
// 添加用户信息
for(let user of objUser) {
    let key = 'book:user:info:' + user.username
    redis.set(key, user)
}
