console.log("loaded");


var img= document.getElementById("madi");
var marginLeft=0;
function moveLeft(){
    marginLeft=marginLeft-1;
    img.style.marginLeft=marginLeft+"px";
}
img.onclick=function(){
    var interval=setInterval(moveLeft,50);
    
};