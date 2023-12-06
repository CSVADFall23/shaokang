import CircularParticleSet from "../collections/CircularParticleSet.js";
import LineSet from "../collections/LineSet.js";
import ParticleSet from "../collections/ParticleSet.js";
import PianoRollWithPrimitives from "../collections/PianoRollWithPrimitives.js";
import QuadSet from "../collections/QuadSet.js";
import RippleSet from "../collections/RippleSet.js";
import NotePlayer from "../midi_player/NotePlayer.js";
import vec2 from "../utils/Vec2.js";
import Histogram from "../collections/Histogram.js";

//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    const roll = new PianoRollWithPrimitives(p5,null,true);
    const player = new NotePlayer();
    
    //set up the play settings and particle speed
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background(255);
        const url = "../../assets/alleycat.mid"        
        await player.load(url);
        player.setSustain(0.1,0);
        player.setSustain(0.1,1);
        player.setReverb(0.5,1);

        player.setInstrument("electric_piano",0);
        player.setInstrument("oboe",1);
        player.setInstrument("bass",2);
        player.setInstrument("bass",3);
        await player.play();

        roll.setSpeedScale(5e-2);
        roll.addCollection(new QuadSet(1,5e-2,false));
        roll.addCollection(new ParticleSet(0,5e-2,false));
        roll.addCollection(new RippleSet(2,5e-2,false));
        roll.addCollection(new RippleSet(3,5e-2,false));


        roll.setColorGenerator(0,(detail)=>{
            return [255,255,255];
        })

        roll.setColorGenerator(1,(detail)=>{
            return [255,255,255];
        })
    }

    //called on each frame, the draw call loop
    p5.draw = function() {
        roll.step(p5);
    }
});