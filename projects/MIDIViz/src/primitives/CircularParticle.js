import Particle from "./Particle.js";
import vec2 from "../utils/Vec2.js";

class CircularParticle extends Particle{
    //a circular distribution of particles, random size,
    //random speed, random color
    constructor(radius, deg, trackIdx, speed_scale=5e-3){
        super();
        this.position = vec2.fromDegree(deg).scalar_mul(radius);
        this.velocity = new vec2(0,0);
        this.acceleration = this.position.copy().scalar_mul(Math.random()*speed_scale);
        this.size = Math.random()*5;
        this.trackIdx = trackIdx;
        this.color = [200+55*Math.random(), 200+55*Math.random(), 200+55*Math.random()]
    }

}

export default CircularParticle;