$(function(){
    //ajax 向header.html发送请求
    $.ajax({
        url:"footer.html",
        type:"get",
        success:function(html){
            //把html动态替换掉原来的header
            $(html).replaceAll("#footer");
            //创建一个link 标签引入头的css文件
            $(`<link rel="stylesheet" href="../css/footer.css"/>`)
            .appendTo("header");
        }
    })
  })