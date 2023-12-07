import Line from "../primitives/Line.js";
import Collection from "./BaseCollection.js";
import vec2 from "../utils/Vec2.js";
import PianoRoll from "./PianoRoll.js";

class LineSet extends Collection {

    constructor(trackIdx = 0, speed_scale = 5e-3, listenToAll = false,colorGenerator = (detail)=>{return [Math.random()*55+200,Math.random()*55+200,Math.random()*55+200]}) {
        super(trackIdx, speed_scale, listenToAll,colorGenerator);
        this.setOnNotePlayed(this.defaultOnNotePlayed);
        this.setOnNoteEnded(this.defaultOnNoteEnded);
    }

    add(p1, p2, velocity = vec2.zeros(), acceleration = vec2.zeros(), color = this.colorGenerator(detail)) {
        this.collection.push(new Line(p1, p2, velocity, acceleration, this.trackIdx, color));
    };

    defaultOnNotePlayed = (detail) => {
        let pos = new vec2(Math.random() * 1920, Math.random() * 1080);
        this.add(pos, vec2.zeros(), vec2.zeros(), vec2.zeros(), this.colorGenerator(detail));
    };

    defaultOnNoteEnded = (detail) => {
        if (this.collection.length > 0)
            this.collection.pop();
    };
};

export default LineSet;