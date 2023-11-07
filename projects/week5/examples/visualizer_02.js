import NotePlayer from "../NotePlayer.js";
//a midi visualizer with Particle and NotePlayer class
new p5(function(p5){
    let list_of_particles = [];
    const player = new NotePlayer();

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        const url = "../assets/uneBarque.mid"        
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

        for(var i=0;i<this.trackNum;i++){
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

    //on note played, generate new particle
    document.addEventListener("notePlayed", (e)=>{
        let trackIdx = e.detail.trackNum;
        //used to normalize on a circle
        let minPitch = player.getMinMaxPitch(trackIdx).minPitch;
        let maxPitch = player.getMinMaxPitch(trackIdx).maxPitch;

        for(var i=0; i<5;i++)
            list_of_particles[trackIdx].push(new Particle(150*(trackIdx+1), p5.map(e.detail.pitch,minPitch,maxPitch,0,360),trackIdx));
    });

});