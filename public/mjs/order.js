$(function(){
  // var $orderName=$("#name");
  // console.log($orderName);
  // // var $orderName=$("#name");
  // function getFouce(){
  //   $(this).prev().addClass("smaller")
  // }
  // $orderName.click(function(){
  //   getFouce.call(this);
  // })
  // $txtPwd.focus(function(){
  //   getFouce.call(this);
  // })
  //
  var $input=$("input");
  console.log($input)
  //遍历spans集合，给每个元素绑定事件处理函数
  $input.each(function(i,elem){
    var $elem=$(this); 
    console.log($elem); 
    $elem.click(function(){
      $elem.prev().addClass("smaller")
    })
    $elem.focus(function(){
      $elem.prev().addClass("smaller")
    })
    $elem.blur(function(){
      if($elem.val()==""){
        $elem.prev().removeClass("smaller")
      }
    })
  })
  // $spans.click(function(e){
  //   var $span=e.target;
  //   console.log($span);
  //   getFouce.call($span);
  // })
})