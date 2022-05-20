// res.json 以json对象的形式返回去
// res.send 以页页面的形式返回去
// res.download以文件的方式返回去，前端请求会下载此文
一. cors的响应头
1.	Access-Control-Allow-Origin:<origin> | *
origin参数指定了允许访问的外域URL
*表通配符，所有域名都可以访问
例如：只允许来自http://liacs.cn的访问
res.setHeader('Access-Control=Allow-Origin','http://liacs.cn')
2. 	Access-Control-Allow-Headers
 默认情况下CORS仅支持客户端向服务器发送9个请求头。若发送额外请求头信息，则要在服务器用Access-Control=Allow-Headers
 对额外的请求头进行声明，否则会失败。多个请求头用,隔开
 res.setHeader('Access-Control=Allow-Headers','miniType','content-Type')
3.	Access-Control-Allow-Methods
默认情况，CORS仅支持客户端发起post,get,head请求，若客户端需要用put，delete发起请求，则要用
Access-Control=Allow-Methods来指明所使用的的方法
允许使用所有类型请求：
res.setHeader('Access-Control=Allow-Methods','*')

二. MySQL
 1.select
	查某一列：select 列名 from 表
 2.insert into  向数据表中插入新的数据行
	insert into 表名 (列名1,列名2) values (值1,值2)
 3.updata 更新数据
	updata 表名 set 列名 = 新值 where 列名(定位用的) = 具体搜索的那个值 

 4.delete 删除数据
	delete 表名 where 列名 = 某值
 查询出来的数据有RowDataPacket，解决办法：
	1.result[0].具体字段   就可以拿到值了
	2.const res = JSON.parse(JSON.stringify(result))
三.身份认证
	cookie：存储在用户浏览器中的一段不超过4kb的字符串，用户请求时会自动把未过期的cookie发送到服务器
		1.自动发送
		2.域名独立
		3.过期时限
		4.4kb限制