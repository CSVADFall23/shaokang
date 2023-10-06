function setup() {
  createCanvas(400, 400);
  background(244,220,221);

  let ray = new ray2D(new vec2(0,0), new vec2(1,1));
  let p1 = ray.pointAt(10);
  let p2 = ray.pointAt(100);


}

//called on each frame
function draw() {

}