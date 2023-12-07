import CompoundCollection from './CompoundCollection.js';
import PianoRoll from './PianoRoll.js';
import ParticleSet from './ParticleSet.js';
import QuadSet from './QuadSet.js';
import LineSet from './LineSet.js';
import Histogram from './Histogram.js';

class PianoRollWithPrimitives extends CompoundCollection {
    darkMode = false;

    //index 0 for pianoroll, 1,2,... for the other primitive sets
    constructor(p5, initType = QuadSet, darkMode = false, colorGenerator = (detail)=>{return [Math.random()*55+200,Math.random()*55+200,Math.random()*55+200]}) {
        super();
        this.darkMode = darkMode;
        this.collections.push(new PianoRoll(p5, 100, [0, 0, 0], [255, 255, 255], darkMode, colorGenerator));

        switch (initType) {
            case QuadSet:
                this.collections.push(new QuadSet(0,5e-3,true));
                break;
            case ParticleSet:
                this.collections.push(new ParticleSet(0,5e-3,true));
                break;
            case null:
                return;
            default:
                console.log("Invalid initType");
                break;
        }

        let keys = this.collections[0];
        let primitives = this.collections[1];
        //set default callback with keys
        primitives.setOnNotePlayed((detail) => {
            primitives.defaultOnNotePlayedWithKeys(detail, keys);
        });
    }

    setDarkMode(darkMode) {
        this.darkMode = darkMode;

        if (this.darkMode) {
            this.collections[0].setColor_1([0, 0, 0]);
            this.collections[0].setColor_2([255, 255, 255]);
        }
        else {
            this.collections[0].setColor_1([255, 255, 255]);
            this.collections[0].setColor_2([0, 0, 0]);
        }

        this.collections[0].recolor();
    };


    //rewrite the default onNotePlayed callback, since the keys info are given
    addCollection(collection) {
        super.addCollection(collection);
        let setsDepdendentOnKeys = [QuadSet, ParticleSet, Histogram];
        if (setsDepdendentOnKeys.includes(collection.constructor)) {
            let keys = this.collections[0];
            collection.setOnNotePlayed((detail) => {
                collection.defaultOnNotePlayedWithKeys(detail, keys);
            });
        }
    };

    //get the pianoroll collection
    getKeys() {
        return this.collections[0];
    };

    //get primitive collections, excluding pianoroll
    getPrimitiveCollections() {
        return this.collections.slice(1);
    }

    //add primitive
    addPrimitive(position, init_dir = new vec2(0, 1), sizeX = 10, sizeY = 10, color = [255, 255, 255]) {
        this.collections[1].add(position, init_dir, sizeX, sizeY, color);
    }

    setSpeedScale(speed_scale) {
        this.collections.forEach((collection) => {
            collection.setSpeedScale(speed_scale);
        });
    };

    setKeyHeight(height) {
        this.collections[0].setHeight(height);
    }

    setKeyColor_1(color) {
        this.collections[0].setColor_1(color);
    }

    setKeyColor_2(color) {
        this.collections[0].setColor_2(color);
    }

    //custom step function, since the draw order might be important
    step(p5) {
        var pianoroll = this.collections[0];

        if (this.darkMode)
            p5.background(0);
        else
            p5.background(255);

        this.getPrimitiveCollections().forEach((collection) => {
            collection.advance();
            collection.checkBoundary(p5);
            collection.draw(p5);
        })

        pianoroll.step(p5);
    }

};

export default PianoRollWithPrimitives;