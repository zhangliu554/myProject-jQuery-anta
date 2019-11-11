$(".global").hover(function(){
  $(".global-info").stop().show()
},function(){
  $(".global-info").stop().hide()
})
$(".all-style-title,.all-styles-tab").hover(function () {
  $(".all-styles-tab").stop().show()
}, function () {
  $(".all-styles-tab").stop().hide()
})
$(".style-tab").hover(function () {
  $(this).find($(".style-tab-content")).stop().show()
}, function () {
  $(this).find($(".style-tab-content")).stop().hide()
})
$(".item").hover(function () {
  $(this).find($(".item-box")).stop().show();
  $(this).css({ background: "#000" }).siblings().css({ background: "#231f20" });
  $(".first-item").css({ background: "#000" });
}, function () {
  $(this).find($(".item-box")).stop().hide();
})
$(".nav-search-input").focus(function(){
  $(".suggestion").stop().show();
})
$(".nav-search-input").blur(function () {
  $(".suggestion").stop().hide();
})
$(".sidebar-logo,.sidebar-logo-text").hover(function(){
  $(this).next(".sidebar-logo-text").stop().show(function(){
    $(this).stop().animate({right:0})
  })
},function(){
  $(this).next(".sidebar-logo-text").stop().hide(function(){
    $(this).stop().animate({right:20})
  })
})
$(".sidebar-list .go-to-top").click(function(){
  $('body,html').animate({scrollTop:0},300);
})
function out(){
  $(".user-box").click(function(){
    let index = $(this).index()-1;
    $(".sidebar-box-item").eq(index).stop().show().siblings(".sidebar-box-item").stop().hide();
    $(".right-sidebar").stop().animate({right:0},800);
    $(this).click(function(){
      $(".right-sidebar").stop().animate({right:"-280px"},800);
      out();
    })
  })
}
out();
$(function(){
  var navOffset=$(".nav").offset().top;
  // console.log(navOffset);
  $(window).scroll(function(){
      var scrollPos=$(window).scrollTop();
        // console.log(scrollPos);
      if(scrollPos > navOffset){
        $(".right-sidebar").css({top: 0,height:"100%"})
        $(".nav").addClass("nav-active");
        $(".account-box").css({bottom:"0px"});
      }else{
        $(".right-sidebar").css({top: 52,height:"100%"});
        $(".nav").removeClass("nav-active");
        $(".account-box").css({bottom:""});
      }
  })
  $.getScript("js/littleCart.js");
  // console.log($.cookie('username'));
  if($.cookie('username') == "null" || $.cookie('username') == undefined){
		$(".login-box").stop().show();
    $(".login-box2").stop().hide();
	}else{
    $(".login-box").stop().hide();
		$(".login-box2").stop().show();
		$(".user-name").text($.cookie('username'));
		$(".user-id").text($.cookie('userID'));
		$(".out").click(function(){
			$.cookie('username', null, -1); 
			$.cookie('userID', null, -1);
			$(this).attr("href","index.html") 
		})
  }
  let s = window.localStorage;
  let s_number = 0;
  for(let i=0;i<s.length;i++){
    let json = JSON.parse(s.getItem(s.key(i)));
    if(json.oGoodsNumber){
      s_number += json.oGoodsNumber;
      $(".tip-text-cart").stop().hide();
      $(".cartBox").stop().show();
    }else{
      s_number = 0 ;
      $(".tip-text-cart").stop().show();
      $(".cartBox").stop().hide();
    }
  } 
  $(".goods-number").text(s_number);
})
