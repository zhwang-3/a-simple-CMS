const {ALLOW_APP} = require('../config/app')
let redis = require("../util/redisDB")
const util = require('./common')

exports.checkAPP = (req, res, next) => {
    console.log(req.headers)
    if(!ALLOW_APP.includes(req.headers.fapp)) {
        res.json(util.getReturnData(500, "来源不正确"))
    } else {
        next()
    }
}

exports.checkUser = (req, res, next) => {
    console.log("检测用户登录情况")
    if('token' in req.headers) {
        let key = req.headers.fapp + ":user:token:" + req.headers.token
        redis.get(key).then((data) => {
            if(data) {
                // 保存用户名称
                req.username = data.username
                next()
            } else {
                // key 值错误或登录过期被删除
                res.json(util.getReturnData(403, "登录已过期，请重新登录"))
            }
        })
    } else {
        res.json(util.getReturnData(403, "请登录"))
    }
}

exports.checkAdmin = (req, res, next) => {
    console.log("检测管理员用户")
    if(req.username == 'admin') {
        // 如果是管理员，则在 Redis 中增加一个 power
        let key = req.headers.fapp + ":user:power:" + req.headers.token
        redis.set(key, 'admin')
        next()
    } else {
        res.json(util.getReturnData(403, "权限不足"))
    }
}