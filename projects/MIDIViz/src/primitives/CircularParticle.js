import Primitive from "./Primitive.js";
import vec2 from "../utils/Vec2.js";

class CircularParticle extends Primitive{
    //a circular distribution of particles, random size,
    //random speed, random color
    constructor(radius, deg, trackIdx, speed_scale=5e-3,size=5, color=[255,255,255], speed_func = Math.random){
        super();
        this.position = vec2.fromDegree(deg).scalar_mul(radius);
        this.velocity = new vec2(0,0);
        this.acceleration = this.position.copy().scalar_mul(speed_func()*speed_scale);
        this.size = size;
        this.trackIdx = trackIdx;
        this.color = color;
    }

}

export default CircularParticle;