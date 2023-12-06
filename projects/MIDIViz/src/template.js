import PianoRollWithQuads from "./collections/PianoRollWithQuads.js";
import NotePlayer from "./midi_player/NotePlayer.js";
import vec2 from "./utils/Vec2.js";

new p5(function(p5){
    const roll = new PianoRollWithQuads(p5);
    const player = new NotePlayer();

    //alias for quick access
    const keys = roll.collections[0];
    const quads = roll.collections[1];
    
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

});