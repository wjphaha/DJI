//向jQuery原型对象添加函数
//添加vali 函数 验证 后的span中的的内容
jQuery.fn.vali=function(reg){
    var $txt=this;
    // var reg=/^1[34578]\d{9}$/;
    // var reg=/\d{6}/;
    console.log($txt.val())
    if(reg.test($txt.val())==true){
      $txt.next().html(`<img src="./image/login/ok.png" alt="">`)
    }else{
      $txt.next().html(`<img src="./image/login/err.png" alt="">`)
    }
    if($txt.val()==""){
          $txt.prev().removeClass("smaller")
        }
}