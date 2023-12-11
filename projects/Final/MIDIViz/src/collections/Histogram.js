import LineSet from "./LineSet.js";
import vec2 from "../utils/Vec2.js";
import PianoRoll from "./PianoRoll.js";
import Line from "../primitives/Line.js";

class Histogram extends LineSet {
    /** 
     @description The current number of note being played
     */
    noteCount = 0;
    /** 
     @description How many time each note is being played
     */
    noteFreq = {};
    /** 
     @description The histogram is generated by a series of connected points
     */
    points = [];

    //disable movement and boundary check
    advance() { }; //do nothing
    checkBoundary() { }; //do nothing

    constructor(keys, trackIdx = 0, speed_scale = 5e-3, listenToAll = true, colorGenerator = (detail) => { return [Math.random() * 55 + 200, Math.random() * 55 + 200, Math.random() * 55 + 200] }) {
        console.assert((keys instanceof PianoRoll), { msg: "Invalid keys type, expected PianoRoll" });

        super(trackIdx, speed_scale, listenToAll, colorGenerator);
        let sorted = keys.sorted;
        this.noteCount = 0;
        this.noteFreq = {};
        this.points = [];

        for (let i = 0; i < sorted.length; i++) {
            this.points.push(sorted[i].position);
        }

        this.updateFromPoints({trackNum:-1});
    }

    /** 
     @description Update the Histogram with the points's position, since the histogram is a spcialization of LineSet
     */
    updateFromPoints(detail) {
        this.collection = [];
        for (let i = 0; i < this.points.length - 1; i++) {
            let p1 = this.points[i];
            let p2 = this.points[i + 1];
            this.collection[i] = new Line(p1, p2, vec2.zeros(), vec2.zeros(), this.trackIdx, this.colorGenerator(detail));
        }
    }

    /** 
     @description By default, the note being played will raise the corresponding part of the histogram a little
     bit higher
     */
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
            let freq = this.noteFreq[keys.sorted[i].pitch] ? this.noteFreq[keys.sorted[i].pitch] : 0;
            this.points[i] = new vec2(p.x, p.y - freq / this.noteCount * 4000);
        }

        this.updateFromPoints(detail);
    };
};

export default Histogram;