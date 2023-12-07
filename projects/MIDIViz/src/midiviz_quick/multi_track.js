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
        roll.addCollection(new QuadSet(1,5e-2,false,(detail)=>{return [240,34,12]}));
        roll.addCollection(new ParticleSet(2,5e-2,false,(detail)=>{return [12,240,34]}));
        roll.addCollection(new ParticleSet(0,5e-2,false,(detail)=>{return [12,34,240]}));
        roll.addCollection(new ParticleSet(3,5e-2,false,(detail)=>{return [240,12,34]}));

        //piano color settings
        roll.setColorGenerator(0,(detail)=>{
            if(detail.trackNum == 0)
                return [12,34,240];
            else if(detail.trackNum == 1)
                return [240,34,12];
            else if(detail.trackNum == 2)
                return [12,240,34];
            else if(detail.trackNum == 3)
                return [240,12,34];
        });

    }

    //called on each frame, the draw call loop
    p5.draw = function() {
        roll.step(p5);
    }
});