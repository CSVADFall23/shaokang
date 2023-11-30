import Particle from "./Particle.js";
import vec2 from "../utils/Vec2.js";

class CircularParticle extends Particle{
    //a circular distribution of particles, random size,
    //random speed, random color
    constructor(radius, deg, trackIdx, speed_scale=5e-3,size=5, color=[255,255,255]){
        super();
        this.position = vec2.fromDegree(deg).scalar_mul(radius);
        this.velocity = new vec2(0,0);
        this.acceleration = this.position.copy().scalar_mul(Math.random()*speed_scale);
        this.size = size;
        this.trackIdx = trackIdx;
        this.color = color;
    }

}

export default CircularParticle;