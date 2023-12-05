import Collection from "./BaseCollection.js";
import Ripple from "../primitives/Ripple.js";
import vec2 from "../utils/Vec2.js";

class RippleSet extends Collection{
    constructor(trackIdx = 0, speed_scale = 5e-3, listenToAll = false) {
        super(trackIdx, speed_scale, listenToAll);
        this.setOnNotePlayed(this.defaultOnNotePlayed);
    }
};

export default RippleSet;