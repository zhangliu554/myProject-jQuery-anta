// 封装放大镜
class Magnifier{
    constructor(newSmall,newMAsk,newBig){
        this.small = newSmall;
        this.mask = newMAsk;
        this.big = newBig;
    }
    // 鼠标移入 移出 mask 与 big  出现与消失  
    monthRemove(){
        let _this = this;
        this.small.onmouseover = function(){
            _this.mask.style.display = "block";
            _this.big.style.display = "block";
        }
        this.small.onmouseout = function(){
            _this.mask.style.display = "none";
            _this.big.style.display = "none";
        }
    }
    maskRemove(){
        let _this = this;
        this.small.onmousemove = function(evt){
            let e = evt ||event;
            let maskX = e.pageX-_this.small.offsetLeft-_this.mask.offsetWidth/2;
            let maskY = e.pageY-_this.small.offsetTop-_this.mask.offsetHeight/2;
            let x = _this.small.offsetWidth-_this.mask.offsetWidth;
            let y = _this.small.offsetHeight-_this.mask.offsetHeight;
            maskX = maskX < 0 ? 0 : maskX;
            maskY = maskY < 0 ? 0 : maskY;
            maskX = maskX > x ? x : maskX;
            maskY = maskY > y ? y : maskY;
            // console.log(maskX,maskY);
            
            _this.mask.style.left = maskX +"px";
            _this.mask.style.top = maskY +"px";

            let left = _this.big.offsetWidth * maskX / _this.mask.offsetWidth;
            let top = _this.big.offsetHeight * maskY / _this.mask.offsetHeight;

            _this.big.style.backgroundPositionX= -left+ "px";
            _this.big.style.backgroundPositionY = -top + "px";
        }
    }
    eventBind(){
        this.monthRemove();
        this.maskRemove();
    }
}

