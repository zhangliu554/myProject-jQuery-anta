$(function () {
  // 加入购物车
  let s = window.localStorage;
  for(let i=0;i<s.length;i++){
    let json = JSON.parse(s.getItem(s.key(i)));
    let oGoodsPrice = parseFloat(json.oGoodsPrice).toFixed(2);
    let str ="";
    str += `
    <tr class="cart-item">
    <td width="25">
      <input type="checkbox" class="check-item j-checkbox">
    </td>
    <td width="60">
      <a href="mask.html" target="_blank" class="right-sidebar-img">
        <img src="${json.oGoodsImg}" alt="小白鞋男鞋板鞋2019春夏季">
      </a>
    </td>
    <td width="70">
      <span class="right-sidebar-title">${json.oGoodsName}</span>
    </td>
    <td width="65">
      <div class="num-box">
        <a class="num-op decrement">-</a>
        <span class="little-num">${json.oGoodsNumber}</span>
        <a class="num-op increment">+</a>
      </div>
    </td>
    <td width="60">
      <a class="cart-remove" index="${s.key(i)}" >x</a>
      <span class="num-price">${oGoodsPrice}</span>
    </td>
  </tr>`
    $(".tip-text-cart").stop().hide();
    $(".cartBox").stop().show();
    $("tbody").append(str);
  }
  // 商品数量
  function getsum(){
    let count = 0;
    $(".little-num").each(function(i,ele){
      let checkbox = $(ele).parent().parent().parent().find(".j-checkbox");
      if(checkbox.prop("checked")){
        count += parseInt( $(ele).text());
      }else{
        count = count;
      }
    })
    $(".total-num").text(count);
  } 
  function getprice(){
    let money = 0;
    let num = $(".little-num");
    $(".num-price").each(function(i,ele){
      let checkbox = $(ele).parent().parent().find(".j-checkbox");
      if(checkbox.prop("checked")){
        money += parseInt($(ele).text()*num.eq(i).text());
      }
    }) 
    $(".total-price").text(money);
  }
  // 全选按钮
  $("#checkAll").change(function () {
    $(".j-checkbox").prop("checked", $(this).prop("checked"));
    getprice();
    getsum();
  })
  $(".j-checkbox").change(function(){
    getsum();
    getprice();
    if($(this).prop("checked") == false){
      $("#checkAll").prop("checked",false)
    }
  })
  // 增加商品数量
  $(".increment").click(function () {
    let num = $(this).siblings(".little-num").text();
    num++;
    $(this).siblings(".little-num").text(num);
    getsum();
    getprice();
  })
  // 减少商品数量
  $(".decrement").click(function () {
    let num = $(this).siblings(".little-num").text();
    if ($(this).siblings(".little-num").text() == 1) {
      return;
    }
    num--;
    $(this).siblings(".little-num").text(num);
    getsum();
    getprice();
  })
  // 删除商品
  $(".cart-remove").click(function(){
    let tr= $(this).parents("tr");
    let j = $(this).attr("index");
    $(".anta-confirm").show();
    $(".ensure").click(function(){
      $(".anta-confirm").hide();
      tr.remove();
      window.localStorage.removeItem(j);
      getsum(); 
      getprice();
    })
   $(".cancel").click(function(){
    $(".anta-confirm").hide();
   })
  })
  getprice();
  getsum();
  $(".cart-item").hover(function(){
    $(this).find(".num-op").css({display:"block"});
    $(this).find(".cart-remove").css({display:"block"});
  },function(){
    $(this).find(".num-op").css({display:"none"});
    $(this).find(".cart-remove").css({display:"none"});
  })
})