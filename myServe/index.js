const userApi = require('./myApi.js')
const bodyParser = require('body-parser')// 配置解析表单的中间件
const express = require("express")
const  cors = require('cors')// 一定在路由前配置cors这个中间件,用来解决跨域问题
const router = require('./sqlMap.js')// 导入路由
const app = express()// 创建express的服务器实例

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/imgs',express.static('../imgs'));
app.use('/api',userApi)// 把路由注册到app上
app.listen(8081,function(){
	console.log('服务启动')
})