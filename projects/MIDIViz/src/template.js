import CircularParticle from "./primitives/CircularParticle.js";
import NotePlayer from "./midi_player/NotePlayer.js";
//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    let particles = [];
    const player = new NotePlayer();

    const onNotePlayed = (detail)=>{
        let note = detail.note;
        let trackIdx = detail.trackNum;
        for(var i=0; i<10;i++)
            particles.push(new CircularParticle(100, Math.random()*360,trackIdx));
    }
    
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        const url = "../assets/dailyLife.mid"        
        await player.load(url);
        player.play();
    }

    //called on each frame
    p5.draw = function() {
        p5.background(0);
        p5.stroke(255);
        p5.noFill();

        // particles.push(new CircularParticle(100, Math.random()*360,0));
        particles.forEach(p=>{
            if(p.checkBoundary(p5)){
                particles.splice(particles.indexOf(p),1);
                return;
            }
            p.advance();
            p.draw(p5);
        })

    }

    //on note played
    document.addEventListener("notePlayed", (e)=>onNotePlayed(e.detail));
});