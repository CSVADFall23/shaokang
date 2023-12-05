import CompoundCollection from './CompoundCollection.js';
import PianoRoll from './PianoRoll.js';
import ParticleSet from './ParticleSet.js';
import QuadSet from './QuadSet.js';

class PianoRollWithPrimitives extends CompoundCollection{

    //index 0 for pianoroll, 1 for the other primitive
    constructor(p5, initType=QuadSet){
        super();
        this.collections.push(new PianoRoll(p5));
        switch(initType){
            case QuadSet:
                this.collections.push(new QuadSet());
                break;
            case ParticleSet:
                this.collections.push(new ParticleSet());
                break;
            default:
                console.log("Invalid initType");
                break;
        }
    }

    //get the pianoroll collection
    getPianoRoll(){
        return this.collections[0];
    };

    //get primitive collections, excluding pianoroll
    getPrimitiveCollections(){
        return this.collections.slice(1);
    }

    //add primitive
    addPrimitive(position, init_dir = new vec2(0, 1), sizeX = 10, sizeY=10, color = [255, 255, 255]) {
        this.collections[1].add(position, init_dir, sizeX, sizeY,color);
    }

    setSpeedScale(speed_scale){
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
        p5.background(255);

        this.getPrimitiveCollections().forEach((collection)=>{
            collection.advance();
            collection.checkBoundary(p5);
            collection.draw(p5);
        })

        pianoroll.step(p5);
    }

};

export default PianoRollWithPrimitives;