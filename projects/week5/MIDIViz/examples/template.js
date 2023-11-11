import NotePlayer from "../src/NotePlayer.js";
//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    let particles = [];
    const player = new NotePlayer();
    
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        const url = "../assets/dailyLife.mid"        
        await player.load(url);

        player.setReverb(.3);
        player.setInstrument("piano",0);
        player.play();

        this.trackNum = player.tracks.length;
        //resize list_of_particles
        for(let i=0;i<this.trackNum;i++){
            list_of_particles.push([]);
        }

    }

    //called on each frame
    p5.draw = function() {
        p5.background(0);
        p5.stroke(255);
        p5.noFill();

        particles.push(new Particle(100, Math.random()*360,0));
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
    document.addEventListener("notePlayed", (e)=>{
        //e.detail.trackNum
        //e.detail.pitch


    });

});