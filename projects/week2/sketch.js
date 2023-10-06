let objects = [];
let objIndex = 3;
let ray = new ray2D(new vec2(50, 50), new vec2(1, 1).normalize());
let tile_x = 10;
let tile_y = 10;

function addObjects(){
  //create random circles
  for(var i = 0; i < tile_x; i++){
    for(var j = 0; j < tile_y; j++){
      //divide the canvas into 10x10 grid
      let x = width/tile_x*i+random(-5,5);
      let y = height/tile_y*j;
      let r = random(10,30);
      let c = new Circle(new vec2(x,y),r,0);
      objects.push(c);
      objIndex++;
      objects[objIndex].draw();
    }
  }
}

function setup() {
  let width = 800;
  let height = 800;
  createCanvas(width,height);
  background(244,220,221);

  //create borderline
  objects.push(new Line(new vec2(0,0), new vec2(width,0)));
  objects.push(new Line(new vec2(width,0), new vec2(width,height)));
  objects.push(new Line(new vec2(width,height), new vec2(0,height)));
  objects.push(new Line(new vec2(0,height), new vec2(0,0)));

  //objects draw settings
  stroke(0,0,0);
  strokeWeight(2);
  noFill();
  addObjects();

  let intersections = [];
  intersections.push({point:ray.origin})
  trace(ray, objects, 90, intersections);

  //ray draw settings
  stroke(255,0,0);
  strokeWeight(1);
  drawRayPath(intersections);
}

//draw ray path
function drawRayPath(intersections){

  for(var i = 0; i < intersections.length; i++){

      //draw line between adjacent intersections
    if(i > 0){
      line(intersections[i].point.x, intersections[i].point.y, intersections[i-1].point.x, intersections[i-1].point.y);
    }
  }

}