const modules = require('./db.js')
const mysql = require('mysql')
const multer = require('multer')
var url = require('url');
var fs = require('fs')
//const upload = multer({ dest:'upload'});
const express = require('express')
var router = express.Router()
var $mysql = require('./sqlMap.js')

// 连接数据库
 const conn = mysql.createConnection(modules.mysqlInfo)
conn.connect()
var jsonWrite = function (res, ret) {
   if (typeof ret === 'undefined') {
     res.json({
       code: '1',
       msg: '操作失败'
     })
   } else {
     res.json(ret)
   }
 }


let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../imgs/sy');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'_'+file.originalname;
            cb(null, changedName);
        }
    })
});

 // 文件上传并将路径保存到数据库
 router.post('/single', upload.any(), (req, res,next) => {
	let file = req.files
	let type = req.body.type
	let name = req.body.name
	let price = req.body.price
	for(let i = 0;i<file.length;i++){
		let path = file[i].path.replace(/\\/g,'/')
		let sql = `INSERT INTO staff (name,picname,path,type,price) VALUES ("${name}","${file[i].originalname}","${path}","${type}","${price}")`
		conn.query(sql,(err,result)=>{
			if(err) throw err
		})
	}
	res.json({
		name,
		type,
	    fileList: file
	});
 });
// 查询图片
router.get('/getSyImg',(req,res)=>{
	let type = req.query.type
	let sql = `SELECT * FROM staff WHERE name ="${type}"`
	// 拼接url
	conn.query(sql,(err,result)=>{
		if(err) throw err
		let url = '124.70.177.51:8081'
		//let url = '127.0.0.1:8081'
		result.forEach((item)=>{
			item.path = url+item.path.slice(2)
		})
		jsonWrite(res, result)
	})	
})

 
 // 查询所有用户接口
 router.get('/getUser',(req,res)=>{
	 // 传参 page  pageSize
	 let page = req.query.page
	 let pageSize = req.query.pageSize
	 let start = (page-1)*pageSize
	 let sql1 = $mysql.user.getUser.replace('start',start)
	 let sql2 = sql1.replace('end',pageSize)
	 let tolNum = 0
	 conn.query('SELECT * FROM user',(err,result)=>{
		 console.log(result)
		 tolNum = result.length // 查询所有数据量
		 conn.query(sql2,(err,result)=>{
		 		 if(err) throw err
		 		 let list = {
		 			 tolNum,
		 			 page,
		 			 pageSize,
		 			 data:result
		 		 }
		 		 jsonWrite(res, list)
		 })
	 })
	 
 })
 
 // 查询会员
 router.get('/getVip',(req,res)=>{
	 let sql = $mysql.user.isVip
	 conn.query(sql,(err,result)=>{
		 if(err) throw err
		 jsonWrite(res, result)
	 })
 })
 // 验证登录用户
 router.post('/login',(req,res)=>{
	 // 传参name   psw
	 let name = req.body.name
	 let psw = req.body.psw
	 let sql = $mysql.user.login.replace('?',name)
	 let results = {}
	 conn.query(sql,(err,result)=>{
		 if(err) throw err
		 if(result[0].psw === psw){
			 results = {
				 code:200,
				 data:'成功',
				 msg:'登陆成功'
			 }
		 }else{
			 results = {
				 code:-1,
				 data:'失败',
				 msg:'密码错误'
			 }
		 }
		jsonWrite(res, results)
	 })
 })
// 检测用户是否存在
router.post('/isExist',(req,res)=>{
	// 传参name
	let name = req.body.name
	let sql = $mysql.user.isExist.replace('?',name)
	conn.query(sql,(err,result)=>{
		if(err) throw err
		if(result.length === 0){
			res.json({
				code:200,
				msg:"姓名未存在",
			})
		}else{
			res.json({
				code:-1,
				msg:"姓名已存在",
				data:result[0].name
			})
		}
	})
})

// 添加新管理员
router.post('/regist',(req,res)=>{
	// 传参name   psw
	let getName = req.body.name
	let getPsw = req.body.psw
	console.log(getName)
	let sql = `INSERT INTO admin (name,psw) VALUES ("${getName}","${getPsw}")`
	conn.query(sql,(err,result)=>{
		if(err) throw err
		jsonWrite(res,result)
	})
})
module.exports = router