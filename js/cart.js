$(function () {
  // 加入购物车
  let s = window.localStorage;
  for(let i=0;i<s.length;i++){
    let json = JSON.parse(s.getItem(s.key(i)));
    let oGoodsTagPrice = parseFloat(json.oGoodsTagPrice).toFixed(2);
    let oGoodsPrice = parseFloat(json.oGoodsPrice).toFixed(2);
    // console.log(s.getItem(s.key(i)));
    let str ="";
    str += `
    <tr>
    <td><input class="j-checkbox" type="checkbox" name="checkItem" checked="" index="${s.key(i)}"></td>
    <td class="p-numbered">${json.oGoodsStyleNum}</td>
    <td class="p-img">
      <a href="#" class="in_b">
        <img src="${json.oGoodsImg}" idth="50" height="50" alt="跑鞋" class="vm">
      </a>
    </td>
    <td class="p-name">
      <h2>
        <a href="#" target="_blank" title="安踏女子2019春季新款正品网面透气运动跑鞋">${json.oGoodsName}</a>
      </h2>
      <span class="promise411">颜色:<span class="goodsColor">${json.oGoodsColor}</span> 尺码:<span class="goodsStock">${json.oGoodsSize}</span> </span>
    </td>
    <td class="p-price">
      <span class="u_price">￥${oGoodsTagPrice}</span>
      <span class="price">￥${oGoodsPrice}</span>
    </td>
    <td class="p-quantity">
      <div class="quantity-form" data-bind="">
        <a class="decrement">-</a>
        <input type="text" class="quantity-text" value="${json.oGoodsNumber}">
        <a class="increment">+</a>
      </div>
    </td>
    <td class="p-remove">
      <a class="cart-remove" index="${s.key(i)}" style="cursor: pointer;">删除</a>
    </td>
  </tr>`
    $("tbody").append(str);
    $(".w_cart_table").stop().show();
    $(".cart-coupons").css({display:"inline-block"});
    $(".cart-inner ").stop().hide();
  }
   // 获得商品总数量和总价格
   function getsum(){
    let count = 0;
    $(".quantity-text").each(function(i,ele){
      let checkbox = $(ele).parent().parent().parent().find(".j-checkbox");
      if(checkbox.prop("checked")){
        count += parseInt($(ele).val()) ;
      }else{
        count = count;
      }
    })
    $(".totle-num").text(count); 
  } 
  function getprice(){
    let money = 0;
    let num = $(".quantity-text");
    $(".price").each(function(i,ele){
      let checkbox = $(ele).parent().parent().find(".j-checkbox");
      if(checkbox.prop("checked")){
        money += parseInt($(ele).text().substr(1)*num.eq(i).val());
      }
    })
    $(".totle_price").text("￥"+money.toFixed(2));   
    $("#Jfinal").text("￥"+money.toFixed(2));  
  }
  // 选中
  // function selectCkeck(){
     // 全选按钮
    $("#checkAll").change(function(){
      $(".j-checkbox").prop("checked", $(this).prop("checked"));
      getsum();
      getprice();
    })
    $(".j-checkbox").change(function(){
      getsum();
      getprice();
      if($(this).prop("checked") == false){
        $("#checkAll").prop("checked",false)
      }
    })
  // }
  // 增加商品数量
  $(".increment").click(function () {
    let num = $(this).siblings(".quantity-text").val();
    num++;
    $(this).siblings(".quantity-text").val(num);
    getsum();
    getprice();
  })
  // 减少商品数量
  $(".decrement").click(function () {
    let num = $(this).siblings(".quantity-text").val();
    if ($(this).siblings(".quantity-text").val() == 1) {
      return;
    }
    num--;
    $(this).siblings(".quantity-text").val(num);
    getsum();
    getprice();
  })
  // 删除商品
  $(".cart-remove").click(function(){
    // 找到对应商品的localStorage 的 key值
    let j = $(this).attr("index");
    $(this).parents("tr").remove();
    window.localStorage.removeItem(j);
    getsum();
    getprice();
  })
  // 清空购物车
  $(".clear-cart").click(function(){
    window.localStorage.clear();
    $("tbody").remove();
    getsum();
    getprice();
    $(".w_cart_table").stop().hide();
    $(".cart-coupons").css({display:"none"});
    $(".cart-inner ").stop().show();
  })
  //删除选中商品
  $(".delete-check").click(function(){
    // $(".j-checkbox").each(function(i,ele){
      // if($(".j-checkbox").prop("checked")){
      //   $(".j-checkbox").parent().parent().remove();
      //   let j = $(this).attr("index");
      //   window.localStorage.removeItem(j);
      //   getsum();
      //   getprice();
      // }
    // })
    // console.log(1111);
    console.log($(".j-checkbox"));
  })
  // selectCkeck();
  getsum();
  getprice();
})