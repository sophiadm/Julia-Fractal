
function init(){
  var canvas = document.getElementById("myCanvas");
  height = canvas.height;
  width = canvas.width; 

  maxIterations = 20;
  zoom = 1;
  moveX = 0;
  moveY = 0;  

  ctx = canvas.getContext("2d");
}

function start(){
  ctx.clearRect(0,0,height,width)
  var sliders = document.getElementsByTagName("input");

  cRe = sliders[0].value / 20 - 2.5; // -0.06
  cIm = sliders[1].value / 20 - 2.5; // -8.34

  zoom = sliders[2].value / 10;
  if (zoom == 0){
    zoom = 0.1;
  }
 
  moveX = sliders[3].value / 50 - 1;
  moveY = sliders[4].value / 50 - 1;

  var hueRange = sliders[5].value * 3.6;
  var hues = sliders[6].value / 100 * (360 - hueRange);
  var sat = sliders[7].value.toString(10);
  var lit = sliders[8].value.toString(10);

  for (var x=0; x<width; x++){
    for (var y=0; y<height; y++){

      var result = colourdeterminator(x, height - y);
      
      if (result == false){
        ctx.fillStyle = 'white'
      }
      else {
        var hue=((1-result)*hueRange + hues).toString(10);
        ctx.fillStyle = ["hsl(",hue,",",sat,"%,",lit,"%)"].join("");


        ctx.fillRect(x,y, 1,1); // Draw a pixel
      }
    }
  }
}

function colourdeterminator(x, y){
  var newRe = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
  var newIm = (y - height / 2) / (0.5 * zoom * height) + moveY;

  for(var i = 0; i < maxIterations; i++){

    var oldRe = newRe; //remembers value of previous iteration
    var oldIm = newIm;

    //the actual iteration, the real and imaginary part are calculated
    newRe = oldRe * oldRe - oldIm * oldIm + cRe;
    newIm = 2 * oldRe * oldIm + cIm;

    if((newRe * newRe + newIm * newIm) > 4){ //checks if point is inside circle
       return i / maxIterations;
     }
  }
  return false;
}

init();
