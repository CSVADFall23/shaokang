import PianoRollWithPrimitives from "../collections/PianoRollWithPrimitives.js";
import NotePlayer from "../midi_player/NotePlayer.js";
import vec2 from "../utils/Vec2.js";

new p5(function(p5){
    const roll = new PianoRollWithPrimitives(p5);
    const player = new NotePlayer();

    //alias for quick access
    const keys = roll.collections[0];
    const quads = roll.collections[1];
    
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background(255);
        const url = "../../assets/bodyAndSoul.mid"        
        await player.load(url);
        player.setAllSustain(0.7);
        player.play();
        roll.setSpeedScale(5e-2);
    }

    //called on each frame
    p5.draw = function() {
        roll.step(p5);
    }

    //on note played, generate some notes
    // quads.setOnNotePlayed((detail)=>{
    //     let pitch = detail.note.midi;
    //     let duration = detail.note.duration;
    //     let pos = keys.getNoteByPitch(pitch).position;

    //     quads.add(pos,new vec2(0,-1),12.5,80*duration,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    //     }
    // )
});