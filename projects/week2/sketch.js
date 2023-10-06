let objects = [];
let objIndex = 3;
let width = 800;
let height = 800;
let ray = new ray2D(new vec2(width/2, height/2), new vec2(Math.random(), Math.random()).normalize());
let tile_x = 10;
let tile_y = 10;
let minRadius = 10;
let maxRadius = 30;
let max_depth = 100;
let brightness = 100;
let circle_prob = 0.5;
let ray_stroke_factor = 0.5;

function addObjects(){
  //create random circles
  for(var i = 0; i < tile_x; i++){
    for(var j = 0; j < tile_y; j++){

      //divide the canvas into 10x10 grid
      let x = width/tile_x*i+random(-2,2);
      let y = height/tile_y*j;
      let r = random(minRadius,maxRadius);

      let isCenter = (i==tile_x/2 && j==tile_y/2);
      let c = new Circle(new vec2(x,y),r,0);

      if(Math.random()>circle_prob || isCenter){
        r = random(15);
        c = new Line(new vec2(x-r,y), new vec2(x+r,y));
        objects.push(c);
        objIndex++;
        objects[objIndex].draw();
        //make another line, perpendicular to the first line
        c = new Line(new vec2(x,y-r), new vec2(x,y+r));
      }

      objects.push(c);
      objIndex++;
      objects[objIndex].draw();
    }
  }
}

function setup() {
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
  trace(ray, objects, max_depth, intersections);

  //ray draw settings
  colorMode(HSB);
  drawRayPath(intersections);
}

//draw ray path
function drawRayPath(intersections){

  for(var i = 0; i < intersections.length; i++){
    strokeWeight(ray_stroke_factor);
    stroke(0,100,i*brightness);
      //draw line between adjacent intersections
    if(i > 0){
      line(intersections[i].point.x, intersections[i].point.y, intersections[i-1].point.x, intersections[i-1].point.y);
    }
  }

}