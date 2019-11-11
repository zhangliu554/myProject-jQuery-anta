var oCodeBtn = document.querySelector(".code-num");
function codeNum(n){
    var str = "abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789";
    var t="";
    for(var i=0;i<n;i++){
      var index = Math.floor(Math.random()*62);
      t = str.charAt(index);
    }  
    return t;
}
function color(){
  return "#"+Math.random().toString(16).slice(2,8);
}
function deg(){
   return parseInt(Math.random()*90-45)+"deg" 
}
function show(){
  $(".code-num-r").css({
    color:color()
  })
  $(".code-num-r").each(function(i){
    $(this).html(codeNum(1));
    $(this).css({
      transform: "rotate("+deg()+")"
    })
  })

}
oCodeBtn.onclick = show;
window.onload = show;