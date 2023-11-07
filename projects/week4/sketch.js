let img;
//pixels in rgba format
let pix = [];
//Combine topK if the colors are close enough
let threshold = 100;
let combined = [];
//kv: original color, mapped colors
let colorMapping = {};
//top K colors
let topK;
let destColor = {color:"rgb(0,0,0)"};
//most frequent color -> its distribution

let gui;
function preload(){
  img = loadImage('desert.png'); // Load the image
}

function setup() {
  createCanvas(720, 480 + 50);
  //setup gui
  gui = new dat.GUI();
  gui.addColor(destColor,"color").listen();

  image(img, 0, 0, 720, 480);
  let d = pixelDensity();
  let arrSize = 4 * (720 * d) * (480 * d);
  loadPixels();

  //get pixel values
  for (let i = 0; i < arrSize; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    let a = pixels[i + 3];
    pix.push([r, g, b, a]);
  }

  //calculate the most frequent color
  let colorCount = {};
  for (let i = 0; i < pix.length; i++) {
    let color = pix[i];
    let key = color.toString();
    if (colorCount[key]) {
      colorCount[key]++;
    } else {
      colorCount[key] = 1;
    }
  }

  //Sort the colors by frequency
  //Each element is a RGBA array
  topK = Object
  .entries(colorCount) // create Array of Arrays with [key, value]
  .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
  .map(([n])=> n.split(",").map(Number));

  //delete color 0,0,0,0
  for (let i = 0; i < topK.length; i++) {
    let c = topK[i];
    //delete item
    if (c[0] == 0 && c[1] == 0 && c[2] == 0 && c[3] == 0) {
      topK.splice(i, 1);
      i--;
    }
  }
  
  for (let i = 0; i < topK.length; i++) {
    let c1 = topK[i];
    let isCombined = false;
    for (let j = 0; j < combined.length; j++) {
      let c2 = combined[j];
      if (isCloseEnough(c1,c2,threshold)) {
        isCombined = true;
        colorMapping[c1] = c2; 
        break;
      }
    }

    if (!isCombined) {
      combined.push(c1);
      colorMapping[c1] = c1; 
    }
  }

}


function drawPalette(index){
  //draw the color palette
  let x = 0;
  let y = 480;
  let w = width / combined.length;
  let h = 50;
  for (let i = 0; i < combined.length; i++) {
    let c = combined[i];

    if (i == index) {
      stroke(255, 204, 0);
      strokeWeight(4);
    }

      fill(c);
      rect(x, y, w, h);
      x += w;

    if (i == index) {
      noStroke();
      strokeWeight(1);
    }

  }

}

function isMouseOverPalette(){
  let x = 0;
  let y = 480;
  let h = 50;
  return (mouseX > x && mouseX < 720 && mouseY > y && mouseY < y + h);
};


function mouseClicked(){
  if(!isMouseOverPalette()){
    return;
  }

  //get the index of the palette
  let x = 0;
  let w = width / combined.length;
  let index = Math.floor((mouseX - x) / w);

  //get the corresponding color
  let c = combined[index];
  destColor.color = color(c[0],c[1],c[2]);

}

function draw() {

  let currColor = get(mouseX,mouseY)
  if(currColor[3] == 0){
    return;
  }

  let key = currColor.toString();
  let mappedColor = colorMapping[key];

  //find index of mapped color
  let index = combined.indexOf(mappedColor);
  drawPalette(index);

  if(isMouseOverPalette()){
    
    //get the current palette color's corresponding pixels
    //deep copy is necessary here
    var corresPix = structuredClone(pix);
    for (let i = 0; i < pix.length; i++) {

      if(colorMapping[pix[i]] == mappedColor){
        //split destColor into r,g,b
        corresPix[i][0] = red(destColor.color);
        corresPix[i][1] = green(destColor.color);
        corresPix[i][2] = blue(destColor.color);
      }
    }
    //draw the original pixels
    let d = pixelDensity();
    let arrSize = 4 * (720 * d) * (480 * d);

    for (let i = 0; i < arrSize/4; i++) {
      let r = corresPix[i][0];
      let g = corresPix[i][1];
      let b = corresPix[i][2];
      let a = corresPix[i][3];

      pixels[4*i] = r;
      pixels[4*i + 1] = g;
      pixels[4*i + 2] = b;
      pixels[4*i + 3] = a;
    }

    updatePixels();

  }else{
    image(img, 0, 0, 720, 480);
  }

  drawPalette(index);
}
