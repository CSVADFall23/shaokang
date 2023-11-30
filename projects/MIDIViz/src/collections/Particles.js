import Collection from "./BaseCollection.js";
import Particle from "../primitives/Particle.js";
import vec2 from "../utils/Vec2.js";

class Particles extends Collection {
    //track index
    trackIdx;
    //speed scale
    speed_scale;

    constructor(trackIdx = 0, speed_scale = 5e-3) {
        super();
        this.trackIdx = trackIdx;
        this.speed_scale = speed_scale;
    }

    setTrackIdx(trackIdx) {
        this.trackIdx = trackIdx;
    }

    setSpeedScale(speed_scale) {
        this.speed_scale = speed_scale;
    }

    add(position, init_dir = new vec2(0, 1), size = 10, color = [255, 255, 255]) {
        this.collection.push(new Particle(position, new vec2(0, 0), init_dir.scalar_mul(this.speed_scale), size, this.trackIdx, color));
    }

};

export default Particles;