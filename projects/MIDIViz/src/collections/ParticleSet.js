import Collection from "./BaseCollection.js";
import Particle from "../primitives/Particle.js";
import vec2 from "../utils/Vec2.js";

class ParticleSet extends Collection {

    constructor(trackIdx = 0, speed_scale = 5e-3) {
        super(trackIdx, speed_scale);
        this.setOnNotePlayed(this.defaultOnNotePlayed);
    }

    /**
     * @param {vec2} position
     * @param {vec2} acceleration
     * @param {number} size
     * @param {number[]} color
     * @returns {void}
     * @description add particles given position, initial direction, size and color
     */
    add(position, acceleration = new vec2(0, 1), size = 10, color = [0,0,0]) {
        this.collection.push(new Particle(position, new vec2(0, 0), acceleration.scalar_mul(this.speed_scale), size, this.trackIdx, color));
    }

    // no pianoroll info given,
    // a simple mapping is given by scaling the pitch
    defaultOnNotePlayed=(detail)=>{
        let pitch = detail.note.midi;
        let pos = new vec2(pitch/127*1920,0);
        for(let i=0;i<10;i++)
        {
            this.add(pos,new vec2(0,1).add(vec2.random2D().scalar_mul(0.1)),10,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
        }
    };
};

export default ParticleSet;