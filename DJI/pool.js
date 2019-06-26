//整个项目的连接池
//引入数据库模块
const mysql=require('mysql');

//创建连接池
var pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'dj',
    connectionLimit:10,
    //设置可以执行多条查询语句
    multipleSatements:true
})
//冻结对象，更改所有的属性的writable为false！
// Object.freeze(pool);
//导出连接池模块
module.exports=pool;

    

