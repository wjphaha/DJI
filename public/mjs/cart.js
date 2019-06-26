(function(){
    var btns=document.querySelectorAll(".btns>button")
    console.log(btns);
    //给btn绑定事件，数量变化，小计变化，总计变化
    //1.找到触发事件元素
    //2. 绑定事件处理函数
    for(var btn of btns){
      btn.onclick=function(){
        var btn=this;  
      //3.查找修改元素
      var span=btn.parentNode.children[1];
      var n=span.innerHTML;
      //4.修改元素
      //判断，如果点的是+ span++ 
      //否则，就--；
      if(btn.innerHTML=="+"){
        n++;
      }else if(span.innerHTML>1){
        n--;
      }
      span.innerHTML=n;
      console.log(n);
      //找到小计，将其改变 btn的爹的下一个兄弟
      var div=btn.parentNode.nextElementSibling;
      // console.log(price);
      //获得单价
      var pre=btn.parentNode.previousElementSibling;
      var price=parseFloat(pre.innerHTML.slice(1));
      var subtotal=parseFloat(div.innerHTML.slice(1)) ;
      //小计 = 数量 * 单价
      var subtotal=price*n;
      //在拼回去
      div.innerHTML=`￥${subtotal.toFixed(2)}`
      var total=0;
      //找到总计 class为item 的第三个孩子
      var prices=document.querySelectorAll(".item>div:nth-child(4)");
      // console.log(prices);
      for(var k of prices){
        total+=parseFloat( k.innerHTML.slice(1));
      }
      // var n=parseFloat(prices.innerHTML.slice(1));
      //找到总计
      var tot=document.getElementById("total");
      //拼回去
      tot.innerHTML=`￥${total.toFixed(2)}`
      }
    }
})()