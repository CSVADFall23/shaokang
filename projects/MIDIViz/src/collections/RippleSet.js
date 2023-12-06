import Collection from "./BaseCollection.js";
import Ripple from "../primitives/Ripple.js";
import vec2 from "../utils/Vec2.js";

class RippleSet extends Collection{
    constructor(trackIdx = 0, speed_scale = 5e-3, listenToAll = false) {
        super(trackIdx, speed_scale, listenToAll);
        this.setOnNotePlayed(this.defaultOnNotePlayed);
    }

    add(position, acceleration = new vec2(0, 1), sizeAccel = 0.1, size = 10, color = this.colorGenerator(detail)) {
        this.collection.push(new Ripple(position, new vec2(0, 0), acceleration.scalar_mul(this.speed_scale), sizeAccel, size, this.trackIdx, color));
    };

    defaultOnNotePlayed=(detail)=>{
        let duration = detail.note.duration
        let pos = new vec2(Math.random()*1920,Math.random()*1080);
        this.add(pos,vec2.zeros(), 1, 300*duration,this.colorGenerator(detail));
    };
};

export default RippleSet;