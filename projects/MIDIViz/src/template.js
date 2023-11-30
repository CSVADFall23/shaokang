import PianoRollWithParticles from "./collections/PianoRollWithParticles.js";
import NotePlayer from "./midi_player/NotePlayer.js";
import vec2 from "./utils/Vec2.js";

//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    const roll = new PianoRollWithParticles(p5);
    const player = new NotePlayer();

    //alias for quick access
    const keys = roll.collections[0];
    const particles = roll.collections[1];
    
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background(255);
        const url = "../assets/bodyAndSoul.mid"        
        await player.load(url);
        player.setAllSustain(0.7);
        player.play();
    }

    //called on each frame
    p5.draw = function() {
        roll.step(p5);
    }

    //on note played, generate 10 particles
    keys.setOnNotePlayed((detail)=>{
        let pitch = detail.note.midi;
        keys.setNoteColor(pitch,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);

        for(let i=0;i<100;i++)
            particles.add(new vec2(500,100),vec2.random2D());
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
    })
});