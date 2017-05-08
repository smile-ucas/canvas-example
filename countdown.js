/**
 * Created by xiaoxiao on 2017/3/29.
 */
var cWidth=1024;
var cHeight=550;
var r=5;
var margin_top=60;
var margin_left=30;

const endTime=new Date(2017,4,12,20,39,30);
var curShowTimeSeconds=0;


var balls=[];
var colors=["#ffee22","#caffee","#ffee33","#ffaaee","#ff4422","#ff28f8","#caff22","#ca22ee","red","blue"];

window.onload=function () {
    cWidth=document.body.clientWidth;
    cHeight=document.body.clientHeight;
    margin_left=Math.round(cWidth/10);
    r=Math.round(cWidth*4/5/108)-1;
    margin_top=Math.round(cHeight/5);



    var canvas=document.getElementById('canvas');
    var context=canvas.getContext("2d");

    canvas.width=cWidth;
    canvas.height=cHeight;

    curShowTimeSeconds=getCurShowTimeSeconds();

    // render(context);
    setInterval(function () {
        render(context);
        update();
    },50);

}



function addBalls(x,y,num) {
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(r+1)+(r+1),
                    y:y+i*2*(r+1)+(r+1),
                    g:1.5+Math.random(),//加速度
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//取4或-4
                    vy:-5,//y方向的负速度让小球有向上抛的动作
                    color:colors[Math.floor(Math.random()*colors.length)]//下取整
                }

                balls.push(aBall);
            }
        }
    }
}

function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        if(balls[i].y>=cHeight-r){
            balls[i].y=cHeight-r;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }


    //性能优化  对在画面外的小球在数组balls中进行删除
    var cnt=0;//有几个小球还在画面中
    for(var i=0;i<balls.length;i++){
        if(balls[i].x+r>0 && balls[i].x-r<cWidth){
            balls[cnt++]=balls[i];//保证了balls[0到cnt-1]在画面内，balls[cnt到length-1]不在画面内
        }
    }

    // while(balls.length>cnt){
    //     balls.pop();//pop删除数组末尾的那一个
    // }
    while(balls.length>Math.min(300,cnt)){//再接着优化，如果当前计算机所能承担的是300个小球
        balls.pop();//pop删除数组末尾的那一个
    }
}
function update() {

    var nextShowTimeSeconds=getCurShowTimeSeconds();
    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds%60;

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds=curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( margin_left + 0 , margin_top , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( margin_left + 15*(r+1) ,margin_top , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( margin_left + 39*(r+1) , margin_top, parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls(margin_left + 54*(r+1) , margin_top , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( margin_left+ 78*(r+1) , margin_top , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( margin_left + 93*(r+1) , margin_top , parseInt(nextSeconds%10) );
        }




        curShowTimeSeconds=nextShowTimeSeconds;



    }
    updateBalls();



}

function getCurShowTimeSeconds() {
    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();

    ret=Math.round(ret/1000); //把毫秒化成秒

    return ret>0 ? ret : 0;
}


function render(cxt) {

    cxt.clearRect(0,0,cWidth,cHeight);

    var hours=parseInt(curShowTimeSeconds/3600);
    // console.log(hours);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit(margin_left,margin_top,parseInt(hours/10),cxt);
    renderDigit(margin_left+15*(r+1),margin_top,parseInt(hours%10),cxt);
    renderDigit(margin_left+30*(r+1),margin_top,10,cxt);//第三个参数是对象digit的索引，这里表示：
    renderDigit(margin_left+39*(r+1),margin_top,parseInt(minutes/10),cxt);
    renderDigit(margin_left+54*(r+1),margin_top,parseInt(minutes%10),cxt);
    renderDigit(margin_left+69*(r+1),margin_top,10,cxt);//第三个参数是对象digit的索引，这里表示：
    renderDigit(margin_left+78*(r+1),margin_top,parseInt(seconds/10),cxt);
    renderDigit(margin_left+93*(r+1),margin_top,parseInt(seconds%10),cxt);


    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,r,0,2*Math.PI);
        cxt.closePath();

        cxt.fill();
    }



}

function renderDigit(x,y,num,cxt) {
    cxt.fillStyle="blue";

    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,2*Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }

}
