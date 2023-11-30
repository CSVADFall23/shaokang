import PianoRollWithQuads from "../collections/PianoRollWithQuads.js";
import NotePlayer from "../midi_player/NotePlayer.js";
import vec2 from "../utils/Vec2.js";

new p5(function(p5){
    const roll = new PianoRollWithQuads(p5);
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
        roll.setQuadsSpeedScale(5e-2);
    }

    //called on each frame
    p5.draw = function() {
        roll.step(p5);
    }

    //on note played, generate some particles
    keys.setOnNotePlayed((detail)=>{
        let pitch = detail.note.midi;
        let duration = detail.note.duration;
        keys.setNoteColor(pitch,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);

        let pos = keys.getNoteByPitch(pitch).position;
        quads.add(pos,new vec2(0,-1),12.5,120*duration,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    
        }
    )

    //on note ended, set key color to its original color
    keys.setOnNoteEnded((detail)=>{
        let pitch = detail.note.midi;
        if(keys.getNoteByPitch(pitch).isWhiteKey){
            keys.setNoteColor(pitch,[255,255,255]);
        }
        else{
            keys.setNoteColor(pitch,[0,0,0]);
        }
    });

});