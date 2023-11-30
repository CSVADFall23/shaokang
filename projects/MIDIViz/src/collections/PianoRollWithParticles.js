import CompoundCollection from './CompoundCollection.js';
import PianoRoll from './PianoRoll.js';
import 

class PianoRollWithParticles extends CompoundCollection{
    constructor(){
        super();
    }

    add(collection){
        this.collection.push(collection);
    }

    draw(p5){
        super.draw(p5);
    }

};

export default PianoRollWithParticles;