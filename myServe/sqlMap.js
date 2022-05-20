var sqlMap = {
	user:{
		login:'SELECT psw FROM admin WHERE name = "?"',
		getUser:'SELECT * FROM user LIMIT start,end',
		isVip:'SELECT * FROM user WHERE isVip = 1',
		isExist:'SELECT name FROM admin WHERE name = "?"',
		regist:'INSERT INTO admin (name,psw) VALUES (?,?)',
		bannerImg:'SELECT * FROM img WHERE id = 1'
	}
}
module.exports=sqlMap