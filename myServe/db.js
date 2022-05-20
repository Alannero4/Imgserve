// 数据库配置
module.exports = {
	mysqlInfo:{
		// 本地用这个
		// host:'127.0.0.1',
		// user:'root',
		// 线上切换成这个
		// host:'124.70.177.51',
		// user:'admin',
		password:'199756yu',
		port:'3306',
		database: 'wangba',
		connectTimeout: 5000, //连接超时
		multipleStatements: false //是否允许一个query中包含多条sql语句
	}
}