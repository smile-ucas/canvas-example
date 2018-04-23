/**
 * Created by xiaoxiao on 2018/4/19.
 */
var starObj = function () {
    this.x;
    this.y;
    
    
    //星星动起来
    this.oicNo
}
starObj.prototype.init = function () {
    this.x = Math.random()*240+30;
    this.y = Math.random()*360+20;

    this.picNo = 0;
}
starObj.prototype.update = function () {
    //每一帧都加一
    this.picNo += 1;
    if(this.picNo>=7){
        this.picNo = 0;
    }
}
starObj.prototype.draw = function () {

    //drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
    //sx,sy,swidth,sheight是img上的,是选取img上从(sx,sy)开始的高为height 宽为width的部分
    //x,y,width,height是canvas上的，是要将选取的img的部分 绘制在canvas的（x,y）的位置上，绘制的img在canvas上可伸缩 高为height 宽为width
    ctx.drawImage(starPic,this.picNo*7,0,7,7,this.x,this.y,7,7)
    //this.picNo*7来判断选取star的img上的哪个star，img上一共挨着7个star，长49，所以每个star占长度7




}
function addStars() {
    for(var i=0;i<num;i++){
        stars[i].update()
        stars[i].draw()
    }
}