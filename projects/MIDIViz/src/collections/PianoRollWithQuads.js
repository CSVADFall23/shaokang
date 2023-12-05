import CompoundCollection from './CompoundCollection.js';
import PianoRoll from './PianoRoll.js';
import Quads from './Quads.js';

class PianoRollWithQuads extends CompoundCollection{

    //index 0 for pianoroll, 1 for quads
    constructor(p5){
        super();
        this.collections.push(new PianoRoll(p5));
        this.collections.push(new Quads());
    }

    //add quads
    add(position, acceleration=new vec2(0, 1), sizeX = 10, sizeY=10, color = [255, 255, 255]) {
        this.collections[1].add(position, acceleration, sizeX, sizeY, color);
    }

    setQuadsSpeedScale(speed_scale){
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
        var quads = this.collections[1];
        p5.background(255);

        quads.advance();
        quads.checkBoundary(p5);
        quads.draw(p5);
        pianoroll.step(p5);
    }

};

export default PianoRollWithQuads;