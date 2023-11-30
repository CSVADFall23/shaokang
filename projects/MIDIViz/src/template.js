import CircularParticles from "./collections/CircularParticles.js";
import NotePlayer from "./midi_player/NotePlayer.js";
//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    const particles = new CircularParticles(100,0,5e-3);
    const player = new NotePlayer();
    
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        const url = "../assets/bodyAndSoul.mid"        
        await player.load(url);
        player.setAllSustain(0.5);
        player.play();
    }

    //called on each frame
    p5.draw = function() {
        p5.background(0);
        p5.stroke(255);
        p5.noFill();
        particles.step(p5);
    }

    //on note played, generate 10 particles
    particles.setOnNotePlayed(function(detail){
        let minPitch = player.getMinMaxPitch(detail.trackNum).minPitch;
        let maxPitch = player.getMinMaxPitch(detail.trackNum).maxPitch;
        let deg = p5.map(detail.note.midi,minPitch,maxPitch,0,360);
        for(let i=0;i<10;i++)
            particles.add(deg,Math.random()*5+1,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
        }
    )
});