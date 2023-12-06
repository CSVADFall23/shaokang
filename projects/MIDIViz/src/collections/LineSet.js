import Line from "../primitives/Line.js";
import Collection from "./BaseCollection.js";

class LineSet extends Collection{
    constructor(trackIdx = 0, speed_scale = 5e-3, listenToAll = false) {
        super(trackIdx, speed_scale, listenToAll);
        this.setOnNotePlayed(this.defaultOnNotePlayed);
    }

    fromKeys(keys){
        console.assert((keys instanceof PianoRoll), {msg:"Invalid keys type, expected PianoRoll"});

        
    }

};

export default LineSet;