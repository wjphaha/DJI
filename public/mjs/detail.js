(function(){
    //左侧的点击btn 更换相对应的图片
    var div=document.getElementById("btns");
    // console.log(btns);
    var btns=div.querySelectorAll("div>div>[data-click=tab]");
    // console.log(btns);
    //1.获得触发事件的元素   ---btn元素
    //2.绑定事件触发处理函数
    //定义一个zIndex值为10
    var zIndex=20;
    //遍历btns集合，给每一个元素绑定函数
    for(var btn of btns){
        btn.onclick=function(){
            var btn=this;
             //3.查找修改元素
             var id=btn.getAttribute("data-img");
             console.log(id);
             var div=document.getElementById(id);
             console.log(div);
            //4.修改元素
            div.style.zIndex=zIndex;
            console.log(zIndex);
            zIndex++;
        }
    }
    //获取要定位元素距离浏览器顶部的距离
    //得到定位元素
    var div=document.getElementById("top-left");
    // console.log(div); 
    // var navH=window.offset(div).top;
    var navH=$(div).offset().top;
    // var footH=$(div).offset().bottom;
    console.log(navH);
    // console.log(footH);
    //滚动条事件
    $(window).scroll(function(){
        //获取滚动条的滑动距离
        var scroH =$(this).scrollTop();
        console.log(scroH);
        if(scroH>=186){
            $(div).css({"position":"relative","top":scroH-186});
            if(scroH>=1450){
                $(div).css({"position":"static"});
            }
        }
    })
    // (navH);


})()