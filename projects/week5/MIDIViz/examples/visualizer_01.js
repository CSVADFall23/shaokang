import NotePlayer from "../src/NotePlayer.js";
//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    let list_of_particles = [];

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        const url = "../assets/dailyLife.mid"
        const player = new NotePlayer();
        
        await player.load(url);

        player.setReverb(.3);
        player.setInstrument("piano",0);
        player.shiftNotes(12,0);
        player.shiftNotes(12,1);
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

        for(var i=0;i<this.trackNum;i++){
            list_of_particles[i].push(new Particle(100*(i+1), Math.random()*360,i,5e-4));
            list_of_particles[i].forEach(p=>{
                if(p.checkBoundary(p5)){
                    list_of_particles[i].splice(list_of_particles[i].indexOf(p),1);
                    return;
                }

                p.advance();
                p.draw(p5);
            })
        };

    }

    //on note played, move particle group faster
    document.addEventListener("notePlayed", (e)=>{
        for(var i=0; i<20;i++)
            list_of_particles[e.detail.trackNum].forEach(p=> p.advance());
    });

});