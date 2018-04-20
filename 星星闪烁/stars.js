/**
 * Created by xiaoxiao on 2018/4/19.
 */
var starObj = function () {
    this.x;
    this.y;
}
starObj.prototype.init = function () {
    this.x = Math.random()*400+100;
    this.y = Math.random()*600+100;
}
starObj.prototype.draw = function () {
    //drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
    //sx,sy,swidth,sheight是img上的,是选取img上从(sx,sy)开始的高为height 宽为width的部分
    //x,y,width,height是canvas上的，是要将选取的img的部分 绘制在canvas的（x,y）的位置上，绘制的img在canvas上可伸缩 高为height 宽为width
    ctx.drawImage(starPic,21,0,7,7,this.x,this.y,7,7)
}
function addStars() {
    for(var i=0;i<num;i++){
        stars[i].draw()
    }
}