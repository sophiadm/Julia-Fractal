function init(){
  var canvas = document.getElementById("myCanvas");
  height = canvas.height;
  width = canvas.width; 

  maxIterations = 20;

  ctx = canvas.getContext("2d");
}
function start(){
  ctx.clearRect(0,0,height,width)
  var sliders = document.getElementsByTagName("input");

  cRe = -2.5;
  cIm = -2.5;

  zoom = sliders[0].value / 10;
  if (zoom == 0){
    zoom = 0.1;
  }
 
  moveX = sliders[1].value / 50 - 1;
  moveY = sliders[2].value / 50 - 1;

  hueRange = sliders[3].value * 3.6;
  hues = sliders[4].value / 100 * (360 - hueRange);
  sat = sliders[5].value.toString(10);
  lit = sliders[6].value.toString(10);
  
  window.requestAnimationFrame(draw);
}

function draw(){
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
  cIm += 0.05
  cRe += 0.05
  if (cRe < 2.5){
    window.requestAnimationFrame(draw, '100');
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

