$(function(){
  //ajax 向header.html发送请求
  $.ajax({
      url:"header.html",
      type:"get",
      success:function(html){
          //把html动态替换掉原来的header
          $(html).replaceAll("#header");
          //创建一个link 标签引入头的css文件
          $(`<link rel="stylesheet" href="css/header.css"/>`)
          .appendTo("header");
      }

  })
})