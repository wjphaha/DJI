//web服务器的入口文件——主模块
//引入express模块
const express=require("express");
const userRouter=require("./router/user");
const session = require("express-session");
// const cors=require("cors");
const cors=require("cors");
//路由&路由器。。

//创建服务器
const app = express();


//设置监听
app.listen(3000,()=>{
    console.log("正在监听3000端口");
});
//设置中间件cors伪装头部，实现跨域， cors 是个函数
app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true
}))
//前置中间件 --输出静态文件
app.use(express.static('./public'));
// app.use(express.static('./image'));
//session 设置

  /*使用路由器来管理路由*/
//前置中间件：将post请求主体数据解析封装入req.body对象
app.use(express.urlencoded({extended:false}));
//提示：选项extended：是否使用扩展的qs模块解析URL数据，如果不使用
//扩展的就使用官方的

//路由输出动态文件  由于路由较多，需要用路由器封装 ！！！引入路由器模块，进行挂载！！
//路由挂载
app.use('/user',userRouter);