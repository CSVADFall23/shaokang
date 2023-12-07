import LineSet from "./LineSet.js";
import vec2 from "../utils/Vec2.js";
import PianoRoll from "./PianoRoll.js";
import Line from "../primitives/Line.js";

class Histogram extends LineSet{
    noteCount = 0;
    noteFreq = {};
    points = [];

    //disable movement and boundary check
    advance() { }; //do nothing
    checkBoundary() { }; //do nothing

    constructor(keys, trackIdx = 0, speed_scale = 5e-3, listenToAll = true, colorGenerator = this.defaultColorGenerator) {
        console.assert((keys instanceof PianoRoll), { msg: "Invalid keys type, expected PianoRoll" });

        super(trackIdx, speed_scale, listenToAll,colorGenerator);
        let sorted = keys.sorted;
        this.noteCount = 0;
        this.noteFreq = {};
        this.points = [];

        for (let i = 0; i < sorted.length; i++) {
            this.points.push(sorted[i].position);
        }

        this.updateFromPoints();
    }

    updateFromPoints(){
        this.collection = [];
        for(let i=0;i<this.points.length-1;i++){
            let p1 = this.points[i];
            let p2 = this.points[i+1];
            this.collection[i] = new Line(p1, p2, vec2.zeros(), vec2.zeros(), this.trackIdx, this.colorGenerator({}));
        }
    }

    //the note being played will be raise the line a little higher
    defaultOnNotePlayedWithKeys = (detail, keys) => {
        console.assert((keys instanceof PianoRoll), { msg: "Invalid keys type, expected PianoRoll" });
        let pitch = detail.note.midi;

        this.noteCount++;
        if (this.noteFreq[pitch] === undefined) {
            this.noteFreq[pitch] = 0;
        }
        this.noteFreq[pitch]++;

        //update the points by its frequency
        for (let i = 0; i < keys.sorted.length; i++) {
            let p = keys.sorted[i].position;
            let freq = this.noteFreq[keys.sorted[i].pitch] ? this.noteFreq[keys.sorted[i].pitch]:0;
            this.points[i] = new vec2(p.x, p.y - freq/this.noteCount * 10000);
        }
        
        this.updateFromPoints();
    };
};

export default Histogram;