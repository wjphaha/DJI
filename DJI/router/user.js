/*所有有关用户的路由API */
const exprss=require('express');
const pool = require('../pool');
const router=exprss.Router();
module.exports=router;

/*
1.2用户登录
接口地址：http://127.0.0.1:8080/user/login
返回格式：json
请求方式：post
请求示例：http://127.0.0.1:8080/user/login
请求参数说明：
名称	必填	类型	说明
uname	是	String	用户名
upwd	是	String	密码
返回参数
名称	类型	说明
code	Int	返回码
200-注册成功
301-用户名或密码错误
401-用户名为空
402-密码为空
msg	string	返回说明
*/
router.post('/login',(req,res)=>{
    var phone=req.body.phone;
    var upwd=req.body.upwd;
    if(!phone){
        res.send({code:401,msg:"手机号为空"});
        return;
    }
    if(!upwd){
        res.send({code:402,msg:"密码为空"});
        return;
    }
    //sql语句去数据库查询
    var sql=`select uid from dj_user where phone=? && upwd=?`;
    pool.query(sql,[phone,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:200,msg:"登陆成功"});
        }else{
            res.send({code:301,msg:"用户名或密码错误"});
        }
    });

});
/*
1.1用户注册
接口地址：http://127.0.0.1:8080/user/register
返回格式：json
请求方式：post
请求示例：http://127.0.0.1:8080/user/register
请求参数说明：
名称	必填	类型	说明
uname	是	String	用户名
upwd	是	String	密码
email	是	String	邮箱
phone	是	string	电话
返回参数
名称	类型	说明
code	Int	返回码
200-注册成功
401-用户名为空
402-密码为空
403-邮箱为空
404-电话为空
msg	string	返回说明
*/
router.post('/register',(req,res)=>{
    // var uname=req.query.uname;
    var upwd=req.body.upwd;
    var email=req.body.email;
    var phone=req.body.phone;
    // if(!uname){
    //     res.send({code:401,msg:"用户名为空"});
    //     return;
    // }
    // if(email.value==undefined){res.send({code:403,msg:"邮箱为空"});return;}
    // console.log(email.value);
    // if(upwd.value==undefined){res.send({code:402,msg:"密码为空"});return;}
    // console.log(upwd.value);
    //  if(!upwd){res.send({code:402,msg:"密码为空"});return}
     if(!email){
        var sql=`insert into dj_user values (null,null,${upwd},null,${phone},null,null,null) `;
        console.log(sql);
        pool.query(sql,(err,result)=>{
            if(err) {throw err;}
            else{
                res.send({code:200,msg:"注册成功"})
            }
        });
        return;
     }
     if(!phone){
        var sql=`insert into dj_user values (null,null,"${upwd}","${email}",null,null,null,null) `;
        console.log(sql);
        pool.query(sql,(err,result)=>{
            if(err) {throw err;}
            else{
                res.send({code:200,msg:"注册成功"})
            }
        })
     }
    //sql语句在数据库去进行查询  
})
/*
1.3用户检索
接口地址：http://127.0.0.1:8080/user/detail
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/user/detail?uid=1
请求参数说明：
名称	必填	类型	说明
Uid	是	Int	用户编号
返回参数
名称	类型	说明
code	Int	返回码
301-未检索到用户
401-用户名为空
msg	string	返回说明
*/
router.get('/detail',(req,res)=>{
    var uid=req.query.uid;
    if(!uid){res.send({code:401,msg:"用户名为空"});return};
    var sql=`select * from dj_user where uid=${uid}`;
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            res.send({code:301,msg:"未检测到用户"});
        }else{
            res.send(result[0]); //检测到就把用户详细信息发给客户端；
            console.log(result[0]);
        }
    })
})
/*
1.4 删除用户
接口地址：http://127.0.0.1:8080/user/delete
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/user/delete?uid=1
请求参数说明：
名称	必填	类型	说明
Uid	是	Int	用户编号
返回参数
名称	类型	说明
code	Int	返回码
200-成功删除
301-删除失败
401-用户编号为空
msg	string	返回说明
 */
router.get('/delete',(req,res)=>{
    var uid=req.query.uid;
    if(!uid){res.send({code:401,msg:"用户编号为空"});return};
    var sql=`delete *from dj_user where uid=${uid}`;
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:"删除成功"})
        }else{
            res.send({code:301,msg:"删除失败"})
        }
    })
})
/*
1.5修改用户信息
接口地址：http://127.0.0.1:8080/user/update
返回格式：json
请求方式：post
请求示例：http://127.0.0.1:8080/user/update
请求参数说明：
名称	必填	类型	说明
ui	是	int	用户编号
email	是	String	邮箱
phone	是	string	电话
gender	是	Int	性别
1-男 0-女
user_name	是	String	真实姓名
返回参数
名称	类型	说明
code	Int	返回码
200-注册成功
301-更改失败
401-用户编号为空
402-邮箱为空
403-电话为空
404-性别为空
406-真姓实名为空
msg	string	返回说明*/
router.post('/update',(req,res)=>{
    var uid =req.body.uid;
    var email =req.body.email;
    var phone =req.body.phone;
    var gender=req.body.gender;
    var user_name=req.body.user_name;
    if(!uid){
        res.send({code:401,msg:"用户编号为空"});
        return;
    }
    if(!email){
        res.send({code:402,msg:"邮箱为空"});
        return;
    }
    if(!phone){
        res.send({code:403,msg:"手机号为空"});
        return;
    }
    if(!gender){
        res.send({code:404,msg:"性别为空"});
        return;
    }
    if(!user_name){
        res.send({code:406,msg:"真实姓名为空"});
        return;
    }
    var sql=`update dj_user set email=${email},phone=${phone},gender=${gender},user_name=${user_name} where uid=${uid}`;
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:"更改成功"});
        }else{
            res.send({code:301,msg:"更改失败"});
        }
    })
})
/*
1.6 用户列表
接口地址：http://127.0.0.1:8080/user/list
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/list/detail?pno=1&pageSize=10
请求参数说明：
名称	必填	类型	说明
pno	否	Int	页码
pageSize	否	Int	每页大小
 */
router.get('/list',(req,res)=>{
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    if(!pno){pno=1}
    if(!pageSize){pageSize=10}
    console.log(pageSize);
    var output={
        recordCount:0,
        pageSize:pageSize,
        pno:pno,
        data:[]
    }
    //在数据库查询信息  //查到的是数组
    pool.query("select count(*)as c from dj_user",(err,result)=>{
        if(err)throw err;
        else{
            console.log(result);
            output.recordCount=result[0].c;//得到总数量
        }
        //得到页数！！！页数上取整
        output.pageSize=Math.ceil(output.recordCount/output.pageSize);
        //获取指定页面的数据
        var sql=`select *from dj_user limit ${Number((output.pno-1)*output.pageSize)},${Number(output.pageSize)}`;
        pool.query(sql,(err,result)=>{
            if(err)throw err;
            else{
                output.data=result;
                res.send(output);
            }
        })
    })
})
/*
1.7检测邮箱
接口地址：http://127.0.0.1:8080/user/checkemail
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/user/checkemail?email=ya@qq.com
请求参数说明：
名称	必填	类型	说明
email	是	string	用户邮箱
返回参数
名称	类型	说明
code	Int	返回码
200-不存在
201-已存在
msg	string	返回说明
 */
router.get('/checkemail',(req,res)=>{
    var email=req.query.email;
    var sql=`select *from dj_user where email="${email}"`; //要加引号
    console.log(sql);
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:201,msg:"已存在"})
            // console.log("22222222222222222")
        }else{
            res.send({code:200,msg:"不存在"})
            // console.log("1111111111111111111")
        }
    })
})
/*
1.8检测手机
接口地址：http://127.0.0.1:8080/user/checkphone
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/user/checkphone?phone=18111111111
请求参数说明：
名称	必填	类型	说明
phone	是	string	用户电话
返回参数
名称	类型	说明
code	Int	返回码
200-不存在
201-已存在
msg	string	返回说明
 */
router.get('/checkphone',(req,res)=>{
    var phone=req.query.phone;
    var sql=`select uid from dj_user where phone=${phone}`;
    console.log(sql);
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:201,msg:"已存在"})
        }else{
            res.send({code:200,msg:"不存在"})
        }
    })
})
/*
1.9检测用户名
接口地址：http://127.0.0.1:8080/user/checkuname
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/user/checkuname?uname=jing
请求参数说明：
名称	必填	类型	说明
uname	是	string	用户邮箱
返回参数
名称	类型	说明
code	Int	返回码
200-不存在
201-已存在
msg	string	返回说明
 */
router.get('/checkuname',(req,res)=>{
    var uname=req.query.uname;
    var sql=`select uid from dj_user where uname="${uname}"`;
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:201,msg:"已存在"})
        }else{
            res.send({code:200,msg:"不存在"})
        }
    })
})
/*
1.10 退出登录
接口地址：http://127.0.0.1:8080/user/logout
返回格式：json
请求方式：get
请求示例：http://127.0.0.1:8080/user/logout

Json返回示例
{ “code”:”200”, “msg”:”logout succ” }
 */
 router.get('/logout',(req,res)=>{
     res.send({code:200,msg:"退出成功"});
 })