/**
 * Created by xiaoxiao on 2018/4/19.
 */
var van
var ctx
var pic = new Image()
var starPic = new Image()
var num = 60;
var stars = []

function init() {
   can = document.getElementById("canvas")
    ctx = can.getContext("2d")
    w = can.width
    h = can.height

    pic.src = "picture.jpg"
    starPic.src = "star.png"

    for(i =0 ;i<num; i++){
       var obj = new starObj()
        stars.push(obj)
        stars[i].init()
    }


    gameloop()
}
function gameloop() {
    //每隔一段时间 刷新canvas画布  使其看起来动起来（序列帧，每隔一段时间刷新一帧）
    drawBackground()
    addImage()
    addStars()

    //循环调用 比setInterval、setTimeout好
    requestAnimationFrame(gameloop)//函数可以根据设备 代码性能决定每次调用的时间
}


function addImage() {
    ctx.drawImage(pic,100,100,400,600)
}
function drawBackground() {
    ctx.fillStyle = "#383838"
    ctx.fillRect(0,0,w,h)
}

document.body.onload = init;