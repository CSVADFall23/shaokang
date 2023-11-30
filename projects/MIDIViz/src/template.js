import PianoRoll from "./collections/PianoRoll.js";
//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    const roll = new PianoRoll(p5,100);
    
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background(255);
        roll.draw(p5);
        
    }

    //called on each frame
    p5.draw = function() {
        
    }

});