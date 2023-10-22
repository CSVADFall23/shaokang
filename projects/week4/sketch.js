function setup() {
  createCanvas(400, 400);
  background(244,220,221);
}

//called on each frame
function draw() {
  fill(174,217,221);
  //eyes and nose
  ellipse(100, 100, 50, 50);
  ellipse(250, 100, 50, 50);
  ellipse(175, 150, 25, 25);

  //mouth
  arc(175, 250, 75, 75, 0, PI);
  arc(175, 250, 75, 75, 0, PI, CHORD);
}