import CircularParticleSet from "../collections/CircularParticleSet.js";
import ParticleSet from "../collections/ParticleSet.js";
import PianoRollWithPrimitives from "../collections/PianoRollWithPrimitives.js";
import QuadSet from "../collections/QuadSet.js";
import RippleSet from "../collections/RippleSet.js";
import NotePlayer from "../midi_player/NotePlayer.js";
import vec2 from "../utils/Vec2.js";

//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    const roll = new PianoRollWithPrimitives(p5,ParticleSet);
    const player = new NotePlayer();
    
    //set up the play settings and particle speed
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background(255);
        const url = "../../assets/bodyAndSoul.mid"        
        await player.load(url);
        player.setSustain(0.7,0);
        player.setSustain(0.3,1);
        player.setInstrument("bass",1);
        player.play();

        roll.setSpeedScale(5e-2);
        roll.addCollection(new QuadSet(1,5e-2,false));
        roll.addCollection(new RippleSet(1,5e-2,true));
    }

    //called on each frame, the draw call loop
    p5.draw = function() {
        roll.step(p5);
    }
});