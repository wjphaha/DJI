

//  利用正则表达式来验证用户输入的邮箱是否合法
//^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$ 
//  var reg=new RegExp("正则","ig");
// var str=email.value;
// var reg=new RegExp("",)
 //获取邮箱焦点事件 ————————邮箱注册！！
//   function email_focus(){
//     email_tip.innerHTML="请输入合法邮箱";
//   }
  
//   //绑定焦点移除事件  去服务器查询输入用户名是否存在！！
//   function email_blur(){
//     //用str接收用户输入内容
//     var str=email.value; 
//     var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //定义规则 6位数字
//     //判断是否符合规则
//     //如果(用)规则验证用户输入的密码，通过
//     if(reg.test(str)!==true){
//       //在页面上显示，验证通过
//       alert("邮箱格式不正确!");
//       return;
//     }else{ 
//       //ajax 异步请求  4步
//       //1. 创建 异步 对象
//       var xhr=new XMLHttpRequest;
//       //2.创建异步连接
//       xhr.open('get',`/user/checkemail?email=${email.value}`,true)
//       //3.发送异步请求
//       xhr.send();
//       //4.绑定监听事件，接受响应数据
//       xhr.onreadystatechange=function(){
//         if(xhr.readyState==4 && xhr.status==200){
//           var result=xhr.responseText;
//           var obj= JSON.parse(result);
//           console.log(obj);
//           if(obj.code==201){
//             email_tip.innerHTML="该邮箱已被注册";
//           }else{
//             email_tip.innerHTML="该邮箱可以注册";
//           }
//         }
//       }
//     }
      
    
//     //判断是否为空字符串
//     // if(str==""){
//     //   email_tip.innerHTML="邮箱不能为空";
//     // }else{
//     //   //ajax 异步请求  4步
//     //   //1. 创建 异步 对象
//     //   var xhr=new XMLHttpRequest;
//     //   //2.创建异步连接
//     //   xhr.open('get',`/user/checkemail?email=${email.value}`,true)
//     //   //3.发送异步请求
//     //   xhr.send();
//     //   //4.绑定监听事件，接受响应数据
//     //   xhr.onreadystatechange=function(){
//     //     if(xhr.readyState==4 && xhr.status==200){
//     //       var result=xhr.responseText;
//     //       var obj= JSON.parse(result);
//     //       if(obj.code==201){
//     //         email_tip.innerHTML="该邮箱已被注册";
//     //       }else{
//     //         email_tip.innerHTML="该邮箱可以注册";
//     //       }
//     //     }
//     //   }
//     // }
//   };
//   //获取密码焦点事件
//   function upwd_focus(){
//     upwd_tip.innerHTML="请输入6-12密码";
//   }
//   //绑定焦点移除事件
//   function upwd_blur(){
//     if(upwd.value==""){
//       upwd_tip.innerHTML="密码不能为空";
//     }else{
//       upwd_tip.innerHTML="";
//     } 
//   }
//   //ajax post 提交注册表单
//   function register(){
//     //if条件判断
//     if(email.value=="" || upwd.value==""){
//       alert("邮箱或密码为空");
//       return;
//     }
//     //创建异步对象
//     var xhr= new XMLHttpRequest();
//     //创建异步请求
//     xhr.open('post',"/user/register",true);
//     //设置请求头
//     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     //发送请求
//     var url=`email=${email.value}&upwd=${upwd.value}`;
//     console.log(url);
//     xhr.send(url);
//     //接收响应数据，绑定监听事件
//     xhr.onreadystatechange=()=>{
//       if(xhr.readyState==4 && xhr.status==200){
//         // var result=xhr.responseText;
//         alert("注册成功")
//       }
//     }
//   }
//   //手机号注册 ————————尝试用jQuery !!!

// //1.点击input 框，label 中的字变小并且向上移
 $(function(){
 
  //找到账号输入框
  var $txtPhone=$("#phone");
  var $txtPwd=$("#upwd");
  var $txtPwd1=$("#upwd1");
  var $txtPwd2=$("#upwd2");
  var $txtEmail=$("#email");
  console.log($txtEmail);
  // console.log($txtName,$txtPwd);
  //绑定事件处理函数 ----点击事件
  function getFouce(){
    $(this).prev().addClass("smaller")
  }
  $txtPhone.click(function(){
    getFouce.call(this);
  })
  $txtPwd.focus(function(){
    getFouce.call(this);
  })
  $txtPwd1.focus(function(){
    getFouce.call(this);
  })
  $txtPwd2.focus(function(){
    getFouce.call(this);
  })
  $txtEmail.focus(function(){
    getFouce.call(this);
  })

  function vali(reg,msg){
    var $txt=$(this);
    // var reg=/^1[34578]\d{9}$/;
    // var reg=/\d{6}/;
    // console.log($txt.val())
    if(reg.test($txt.val())==true){
      $txt.next().html(`<img src="./image/login/ok.png" alt="">`)
    }else{
      $txt.next().html(`<img src="./image/login/err.png" alt="">${msg}`)
    }
    if($txt.val()==""){
          $txt.prev().removeClass("smaller")
        }
  }
  $txtPhone.blur(function(){
    vali.call(this,/^1[34578]\d{9}$/,"请输入合法手机号")
  })
  $txtPwd.blur(function(){
    vali.call(this,/^[a-z]\d{6}$/,"6-8位密码")
  })
  $txtPwd1.blur(function(){
    vali.call(this,/^[a-z]\d{6}$/,"6-8位密码")
  })
  $txtPwd2.blur(function(){
    vali.call(this,/^[a-z]\d{6}$/,"6-8位密码")
  })
  //邮箱失去焦点时，应该调用Ajax去后台数据库查看用户名是否被注册
  $txtEmail.blur(function(){
      var $txt=$(this);
      var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if(reg.test($txt.val())==true){
        //如果通过验证，就调用ajax，验证用户是否存在
        // console.log($txt.val())
        $.ajax({
          url:`http://localhost:3000/user/checkemail?email=${$txt.val()}`,
          type:"get",
          dataType:"json",
          success:function(result){
            console.log(result);
            if(result.code==200){
              $txt.next().html(`<img src="./image/login/ok.png" alt="">${result.msg}`)
            }else{
              $txt.next().html(`<img src="./image/login/err.png" alt="">${result.msg}`)
            }
          }
        })
      }else{
        $txt.next().html(`<img src="./image/login/err.png" alt="">请输入合法邮箱`)
      }
      if($txt.val()==""){
            $txt.prev().removeClass("smaller")
          }
  })
  //给#register 的按钮绑定一个单击事件，
  $("#register").click(function(){
    //ajax 异步请求后台数据 判断是否用户名已存在
    $.ajax({
      url:"http://localhost:3000/user/register",
      type:"post",
      data:{email:$txtEmail.val(),upwd:String($txtPwd1.val()) },
      success:function(result){
        alert(result.msg)
      }

    })
  })
})