## Project 5 MIDIViz Library

This library is a web-based MIDI player & visualizer (with particles). It includes a wrapper layer over `smplr` library and a `Particle` class for visualization.

![image-20231107021554556](https://s2.loli.net/2023/11/07/ROFeCU3uWi9cLY5.png)



### Examples:

```js
import NotePlayer from "../src/NotePlayer.js";

//this example plays a midi song with default settings (piano for all tracks)
new p5(function(p5){

    p5.setup = async function() {
        const url = "../assets/dailyLife.mid"
        const player = new NotePlayer();
        await player.load(url);
        player.defaultPlay();
    }

});
```

```js
new p5(function(p5){
    let particles = [];

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        
    }

    //this example shows the basic particle animation
    p5.draw = function() {
        p5.background(0);
        p5.stroke(255);
        p5.noFill();

        particles.push(new Particle(100, Math.random()*360,0));
        particles.forEach(p=>{
            if(p.checkBoundary(p5)){
                particles.splice(particles.indexOf(p),1);
                return;
            }

            p.advance();
            p.draw(p5);
        })
        
    }

});
```



### Setup

* Usage from the browser, all of the dependencies are either in ES6 module or vanilla js. Migration to package manager is on the TODO List.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>playMusic</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/addons/p5.sound.min.js"></script>
  <script src="https://unpkg.com/@tonejs/midi"></script>
  <script type="module" src="../src/FileHandler.js"></script>
  <script src="../src/Vec2.js"></script>
  <script src="../src/Particle.js"></script>
  <script src="../src/Instruments.js"></script>
  <script type="module" src="../src/NotePlayer.js"></script>
  
  <!-- <script type="module" src="./unit_test/SoundFontTest.js"></script> -->
  <!-- <script src="./unit_test/FileHandlerTest.js"></script> -->
</head>
```



### Usage

#### Load & Play

* Load and play from MIDI

```js
import NotePlayer from "../src/NotePlayer.js";   

const player = new NotePlayer();
await player.load(url);
player.defaultPlay();
//by default, all the notes will be played with Piano
```



#### Play Settings

* Shift overall note pitch

```js
//shift the first track with 1 octave above
player.shiftNotes(12,1);
```

* Change instrument

```js
player.setInstrument("piano",0);
//all available instruments are listed in Instruments.js
```

* Change reverb

```js
player.setReverb(.3);
```



#### Custom Event (Refactor required)

* Custom event with `onStart()` and `onEnded()` from `smplr` library

```js
piano.loaded().then(() => {
                for(let i=0;i<this.tracks.length;i++){
                    this.tracks[i].notes.forEach(note => {
                        piano.start({ note: note.midi+this.trackSettings[i].shift, velocity: note.velocity, duration: note.duration, time: note.time + now, onStart: () => {
                            var e = new CustomEvent("notePlayed",{bubbles: true, detail:{pitch:note.midi, trackNum:i }});
                            document.dispatchEvent(e);
                          }});
                    });
                }
            });
```





### Data Structures

* tracks

  * Array of track information, each track is as below

    `{instrument: "name of instrument", notes = []}`

  * Each note is a JSON object with below entries

    ` {midi: 0-127, velocity: 0-127, time: the time the note start to play in second, duration: note duration in second, noteName: (e.g. C4)}`

* trackSettings

  * Array of tracks’ play settings

    * Each element is as below

      ` instrument:, reverb: time in second, minPitch: 0-127, maxPitch:0-127`

  * By default, the instrument will be set to the one specified in the MIDI file, if the specified one is not available in the sound font, the track’s instrument will be set to piano.



### Goals

* A easy to use Load and Play MIDI player
* A visualizer with customizable settings and different looks
* Corresponding interface with `smplr` library

#### 
