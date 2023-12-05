import CircularParticleSet from "../collections/CircularParticleSet.js";
import ParticleSet from "../collections/ParticleSet.js";
import PianoRollWithPrimitives from "../collections/PianoRollWithPrimitives.js";
import NotePlayer from "../midi_player/NotePlayer.js";
import vec2 from "../utils/Vec2.js";

//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    const roll = new PianoRollWithPrimitives(p5,ParticleSet);
    const player = new NotePlayer();

    //alias for quick access
    const keys = roll.collections[0];
    const particles = roll.collections[1];
    
    //set up the play settings and particle speed
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background(255);
        const url = "../../assets/uneBarque.mid"        
        await player.load(url);
        player.setAllSustain(0.7);
        player.play();

        roll.setSpeedScale(5e-2);
        roll.addCollection(new CircularParticleSet(100,0,5e-3));
    }

    //called on each frame, the draw call loop
    p5.draw = function() {
        roll.step(p5);
    }

    // //on note played, generate some particles
    // keys.setOnNotePlayed((detail)=>{
    //     let pitch = detail.note.midi;
    //     keys.setNoteColor(pitch,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);

    //     let pos = keys.getNoteByPitch(pitch).position;
        
    //     //generate 10 particles on each note played, the particles are generated at the key position, 
    //     //with a up vector perturbed by a random vector
    //     for(let i=0;i<10;i++)
    //     {
    //         particles.add(pos,new vec2(0,-1).add(vec2.random2D().scalar_mul(0.1)),10,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    //     }
        
    //     }
    // )


});