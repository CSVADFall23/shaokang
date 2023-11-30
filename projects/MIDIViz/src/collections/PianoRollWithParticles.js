import CompoundCollection from './CompoundCollection.js';
import PianoRoll from './PianoRoll.js';
import Particles from './Particles.js';

class PianoRollWithParticles extends CompoundCollection{

    //index 0 for pianoroll, 1 for particles
    constructor(p5){
        super();
        this.collections.push(new PianoRoll(p5));
        this.collections.push(new Particles());
    }

    //add particles
    add(position, init_dir = new vec2(0, 1), size = 10, color = [255, 255, 255]) {
        this.collections[1].add(position, init_dir, size, color);
    }

    setParticleSpeedScale(speed_scale){
        this.collections[1].setSpeedScale(speed_scale);
    };

    setKeyHeight(height){
        this.collections[0].setHeight(height);
    }

    setKeyColor_1(color){
        this.collections[0].setColor_1(color);
    }

    setKeyColor_2(color){
        this.collections[0].setColor_2(color);
    }

    //custom step function, since the draw order might be important
    step(p5){
        var pianoroll = this.collections[0];
        var particles = this.collections[1];
        p5.background(255);

        particles.advance();
        particles.checkBoundary(p5);
        particles.draw(p5);
        pianoroll.step(p5);
    }

};

export default PianoRollWithParticles;