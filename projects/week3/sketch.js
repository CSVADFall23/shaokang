let objects = [];
let objIndex = 3;
let width = 1100;
let height = 850;
let tile_x = 3;
let tile_y = 3;
let minRadius = 10;
let maxRadius = 1000;
let max_depth = 50;
let brightness = 10;
let circle_prob = 1.0;
let refractRatio = 0.05;
let ray_stroke_factor = 1;
let tile_offset = 5.0;
//path variables
let list_of_progress = [];
let speed = 5;
let notes = [];
let noteIdx = 0;
let song;
let canAddRay = true; 

//add objects to the scene
function addObjects(){
  //create random circles
  for(var i = 0; i < tile_x; i++){
    for(var j = 0; j < tile_y; j++){

      //divide the canvas into 10x10 grid
      let x = width/tile_x*i+random(-tile_offset,tile_offset);
      let y = height/tile_y*j;
      let r = random(minRadius,maxRadius);

      let isCenter = (i==tile_x/2 && j==tile_y/2);
      let c = new Circle(new vec2(x,y),r,refractRatio);

      push();
      //draw a cross (2 lines)
      if(Math.random() > circle_prob){
          
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
      pop();
    }
  }
}

//set up the scene
async function setup() {
  createCanvas(width,height,SVG);
  frameRate(40);
  background(240,220,221);
  //create borderline
  objects.push(new Line(new vec2(0,0), new vec2(width,0)));
  objects.push(new Line(new vec2(width,0), new vec2(width,height)));
  objects.push(new Line(new vec2(width,height), new vec2(0,height)));
  objects.push(new Line(new vec2(0,height), new vec2(0,0)));

  //objects draw settings
  stroke(0,0,0);
  strokeWeight(3);
  noFill();
  addObjects();

  colorMode(HSB);
  getAudioContext().resume();

  //parse song list
  fetch("./musiclist.json") 
          .then((res) => { 
          return res.json(); 
  }).then((data) => song = data["kaine"]); 

  serialSetup();
}


function preload() {
  // intialize sound settings
  for(var i = 3; i < 6; i++){
    notes.push(loadSound('./notes/C'+i+'.wav'));
    notes.push(loadSound('./notes/D'+i+'.wav'));
    notes.push(loadSound('./notes/E'+i+'.wav'));
    notes.push(loadSound('./notes/F'+i+'.wav'));
    notes.push(loadSound('./notes/G'+i+'.wav'));
    notes.push(loadSound('./notes/A'+i+'.wav'));
    notes.push(loadSound('./notes/B'+i+'.wav'));
  }
}


function draw(){
  colorMode(RGB);
  strokeWeight(ray_stroke_factor);
  colorMode(HSB);
  for(var i = 0; i < list_of_progress.length; i++){
    stroke(list_of_progress[i].hue,50,list_of_progress[i].currRayIdx*brightness);
    list_of_progress[i].advance(speed);
  }

  addRay();
}

//map note to index
function noteMapping(note){
  if(note%7==0)
    return 7 + (note/7-1)*7 - 1;

  let noteNum = note % 7;
  let octave = Math.floor((note-1)/7);
  return noteNum + octave*7 - 1;
}

//add event listener to play sound
document.addEventListener("playSound", function(e) {
  noteIdx = noteIdx%song.length;
  var mappedIndex = noteMapping(parseInt(song[noteIdx]));
  console.log(mappedIndex);
  notes[mappedIndex].play();
  noteIdx++;
});

function addRay(){

  if(mappedData[0] < 150 && mappedData[1] < 150)
  {
    canAddRay = true;
    return;
  }

  if(!canAddRay)
    return;

  canAddRay = false;
  let speed = map(mappedData[0] + mappedData[1],0,400,1,20);
  let intersections = [];

  console.log("Ray added");
  //initial ray settings
  let ray = new ray2D(new vec2(width/2, height/2), new vec2(mappedData[0]*0.5-50,mappedData[1]*0.5-50).normalize());
  intersections.push({point:ray.origin});
  trace(ray, objects, max_depth, intersections);
  let progress = new Progress(intersections,speed);
  progress.unfreeze();
  list_of_progress.push(progress);

};