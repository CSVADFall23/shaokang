import CompoundCollection from './CompoundCollection.js';
import PianoRoll from './PianoRoll.js';
import Particles from './particles.js';

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

};

export default PianoRollWithParticles;