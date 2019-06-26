#DJI数据库
SET NAMES UTF8;
DROP DATABASE IF EXISTS dj;
CREATE DATABASE dj CHARSET=UTF8;
USE dj;

#轮播图
DROP TABLE IF EXISTS dj_index_carousel;
CREATE TABLE dj_index_carousel(
	cid INT PRIMARY KEY auto_increment,
	img VARCHAR(128)default NULL,
	title VARCHAR(64) default NULL,
	href VARCHAR(128) default NULL
);
#向轮播图插入数据。。。

#首页产品表
DROP TABLE IF EXISTS dj_index_product;
CREATE TABLE dj_index_product(
	pid INT PRIMARY KEY auto_increment,
	title VARCHAR(64),
	details VARCHAR(128),
	pic VARCHAR(128),
	price DECIMAL(10,2),
	href VARCHAR(128),
	seq_recommended TINYINT,
	seq_new_arrival TINYINT,
	seq_top_sale TINYINT
);
#向首页产品表中插入数据

#产品家族表
CREATE TABLE dj_goods_family (
	fid INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(32)
);
#向产品家族表中插入数据

#产品表
DROP TABLE IF EXISTS dj_goods;
CREATE TABLE dj_goods (
	gid INT PRIMARY KEY AUTO_INCREMENT,
	family_id INT,
	FOREIGN KEY (family_id) REFERENCES dj_goods_family (fid),
	title VARCHAR(128),
	price DECIMAL(10,2),
	promise VARCHAR(64),
	spec VARCHAR(64),
	name VARCHAR(32),
	details VARCHAR(1024),
	shelf_time BIGINT,
	sold_count INT
);

#向产品表插入数据。。





#产品图片表
CREATE TABLE dj_goods_pic(
	pcid INT PRIMARY KEY AUTO_INCREMENT,
	goods_id INT ,
	FOREIGN KEY (goods_id) REFERENCES dj_goods(gid),
	sm	VARCHAR(128),
	md VARCHAR(128),
	lg VARCHAR(128)
);

#向产品图片表插入数据

#用户表
CREATE TABLE dj_user (
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16),
	avatar VARCHAR(128),
	user_name VARCHAR(32),
	gender INT
);
INSERT INTO dj_user VALUES (null,"king",md5('123456'),"291186144@qq.com",18270217842,null,null,1);

#接收地址
CREATE TABLE dj_receiver_address (
	aid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES dj_user(uid),
	receiver VARCHAR(16),
	province VARCHAR(16),
	city VARCHAR(16),
	county VARCHAR(16),
	address VARCHAR(128),
	cellphone VARCHAR(16),
	fixedphone VARCHAR(16),
	postcode CHAR(6),
	tag VARCHAR(16),
	is_default TINYINT
);
 
#购物车表
CREATE TABLE dj_shopping_cart(
	cid	INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES dj_user(uid),
	product_id INT,
	FOREIGN KEY (product_id) REFERENCES dj_goods(gid),
	count INT
);

#用户订单表
CREATE TABLE dj_order(
	oid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES dj_user(uid),
	address_id INT,
	FOREIGN KEY (address_id) REFERENCES dj_receiver_address(aid),
	status INT,
	order_time BIGINT,
	pay_time BIGINT,
	deliver_time BIGINT,
	receiver_time BIGINT
);

#订单详情页
CREATE TABLE dj_order_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	order_id INT,
	FOREIGN KEY (order_id) REFERENCES dj_order(oid),
	goods_id INT,
	FOREIGN KEY (goods_id) REFERENCES dj_goods(gid),
	count INT
);



