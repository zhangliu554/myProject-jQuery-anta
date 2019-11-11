// 引入公共样式
$("header").load("public.html header",function(){
  $.getScript("js/public.js")
})
$("footer").load("public.html footer")
  // 懒加载图片
	function imgOnload(){
    let img = document.querySelectorAll(".loading");
    for(let i=0;i<img.length;i++){
        // console.log(img[i].dataset.src);
        if(img[i].getBoundingClientRect().top < window.innerHeight){
            img[i].src = img[i].dataset.src;
        }   
    }
}
function scollImg(fn){
    let time = null;
    let context = this;
    let arge = arguments;
    return function(){
        clearInterval(time);
        setInterval(function(){
            fn.apply(context,arge)
        },100)
    }
}
window.onload = imgOnload();
window.onload =  scollImg( imgOnload);
$(function(){
    function wrapperPlay(obj,time,btnR,btnL,btn,active){
    var timer = null; //声明一个全局定时器
    var index = 0;	
    let iX = $(obj).find("li").width();
    // console.log(iX);
    // let iY = $(obj).children();
    $(btnR).click(function(){ //下一张
      next();
    });
    $(btnL).click(function(){ //上一张
      prev();
    })
    function next(){
      index++;
      if(index > 2){
        /*
        当图片到最后一张时跳回第一张，在最后一张中放入了第一张的图片，为实现无缝切换图片的效果。
        */
        $(obj).animate({left:-(index)*iX},300); 
        index = 0;
        $(obj).animate({left:0},0); //
      }
      $(obj).animate({left:-index*iX},300);
      play(index);
    }
    function prev(){
      index--;
      if(index < 0 ){
        index = 2;
        $(obj).animate({left:-(index+1)*iX},0);
      }
      $(obj).animate({left:-index*iX},300);
      play(index);
    }
    function auto(){ 
      timer = setInterval(function(){ //设置自动播放的定时器
        next();
        play(index);
    },time) 
    }
    auto();
    $(obj).parent().parent().hover(function(){
      $(btnL).show();
      $(btnR).show();
      clearInterval(timer);
    },function(){
      $(btnL).hide();
      $(btnR).hide();
      auto();
    })
    //鼠标点击圆点图标实现图片左右轮播
    $(btn).click(function(){ 
      let index = $(this).index();
      console.log(index);
      $(obj).animate({left:-index*iX},300);
      play(index);
    })
    //实现被选图片对应圆点图标索引更新
    function play(index){
      $(btn).eq(index).addClass(active).siblings().removeClass(active);
    }
  }
  wrapperPlay(".swiper-wrapper ul",5000,".btn-right",".btn-left",".banner-text span","banner-active");
  wrapperPlay(".swiper-container-1 ul",3000,".next",".prev",".swiper-btn1 span","swiper-button-active");
  wrapperPlay(".swiper-container-2 ul",4000,".next2",".prev2",".swiper-btn2 span","swiper-button-active");
})
// 立即购买商品
$(".produ-box2").hover(function(){
  $(this).find(".buy-now").show();
  $(this).find(".produ-box2-content .produ-classes").stop().animate({
    height:32
  })
  $(this).stop().animate({ top:-2}).siblings().stop().animate({ top:0})
  $(this).find(".produ-img .overburden").css({opacity:.5}).siblings().css({opacity:1})
  $(this).css({ zIndex:11,boxShadow:" 0px 50px 100px 1px rgba(96,96,96,0.4)"})
},function(){
  $(this).find(".buy-now").hide();
  $(this).find(".produ-box2-content .produ-classes").stop().animate({
    height:0
  })
  $(this).stop().animate({top:0}).siblings().stop().animate({top:0})
  $(this).find(".produ-img .overburden").css({opacity:1}).siblings().css({opacity:1})
  $(this).css({ zIndex:10,boxShadow:"none"})
})
  $(".buy-more-btn,.buy-now-btn").hover(function(){
    $(this).find(".over").stop().animate({
      width: "100%"
    }),
    $(this).css({color:"#fff"})
  },function(){
    $(this).find(".over").stop().animate({
      width: ""
    }),
    $(this).css({color:""})
  })
  $(".overburden-btn").hover(function() { 
    $(this).find(".color-opa").stop().animate({
      width:"100%"
    }),
    $(this).css({color:"#000",zIndex:1})
   },function () { 
    $(this).find(".color-opa").stop().animate({
      width:""
    })
    $(this).css({color:""})
})

