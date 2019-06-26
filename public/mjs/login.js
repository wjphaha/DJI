
/*
//绑定焦点移除事件  去服务器查询输入用户名是否存在！！
function phone_blur(){
  //判断是否为空字符串
  if(phone.value==""){
    phone_tip.innerHTML="账号不能为空";
  }else{
    phone_tip.innerHTML="";
  }
};
//绑定焦点移除事件
function upwd_blur(){
  if(upwd.value==""){
    upwd_tip.innerHTML="密码不能为空";
  }else{
    upwd_tip.innerHTML="";
  } 
}
//ajax post 提交注册表单
function login(){
  //if条件判断
  if(phone.value=="" || upwd.value==""){
    alert("邮箱或密码为空");
    return;
  }
  //创建异步对象
  var xhr= new XMLHttpRequest();
  //创建异步请求
  xhr.open('post',"/user/login",true);
  //设置请求头
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  //发送请求
  var url=`phone=${phone.value}&upwd=${upwd.value}`;
  console.log(url);
  xhr.send(url);
  //接收响应数据，绑定监听事件
  xhr.onreadystatechange=()=>{
    if(xhr.readyState==4 && xhr.status==200){
      var result=xhr.responseText;
      var obj=JSON.parse(result);
      if(obj.code=="301"){
        alert(obj.msg);
      }else{
        alert("登录成功")
      }
    }
  }
}*/
//登陆功能
//1.点击input 框，label 中的字变小并且向上移
$(function(){
  //找到账号输入框
  var $txtName=$("#name");
  var $txtPwd=$("#upwd");
  // console.log($txtName,$txtPwd);
  //绑定事件处理函数 ----点击事件
  function getFouce(){
    $(this).prev().addClass("smaller")
  }
  $txtName.click(function(){
    getFouce.call(this);
  })
  $txtPwd.focus(function(){
    getFouce.call(this);
  })
//鼠标离开绑定事件 
  function vali(reg,msg){
    var $txt=$(this);
    // var reg=/^1[34578]\d{9}$/;
    // var reg=/\d{6}/;
    console.log($txt.val())
    if(reg.test($txt.val())==true){
      $txt.next().html(`<img src="./image/login/ok.png" alt="">`)
    }else{
      $txt.next().html(`<img src="./image/login/err.png" alt="">${msg}`)
    }
    if($txt.val()==""){
          $txt.prev().removeClass("smaller")
        }
    }
    $txtName.blur(function(){
      vali.call(this,/^1[34578]\d{9}$/,"请输入合法手机号/邮箱")
    })
    $txtPwd.blur(function(){
      vali.call(this,/^\d{6}$/,"6-8位密码")
    })
  //给登录按钮绑定 Ajax请求，验证登录是否成功
  var $btn=$("#signup");
  console.log($btn);
  $btn.click(function(){
    //ajax
    $.ajax({
      url:"http://localhost:3000/user/login",
      type:"post",
      data:{phone:$txtName.val(),upwd:$txtPwd.val()},
      success:function(result){
        // console.log(result)
        alert(result.msg);
        if(result.code==200){
          open("userdetail.html","_self");
        }
      }
    })
  })
  
})