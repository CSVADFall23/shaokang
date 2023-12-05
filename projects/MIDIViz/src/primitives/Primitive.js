import vec2 from "../utils/Vec2.js";

class Primitive{
    //position, vec2
    //velocity, vec2
    //acceleration, vec2
    //size, int
    //color, array of int
    //trackIdx, int
    position;
    velocity;
    acceleration;
    size;
    color;
    trackIdx;

    /** @param {vec2} position 
     * @param {vec2} velocity
     * @param {vec2} acceleration
     * @param {int} size
     * @param {int} trackIdx
     * @param {Array<int>} color
    */
    constructor(position, velocity, acceleration, size, trackIdx, color){
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.size = size;
        this.color = color;
        this.trackIdx = trackIdx;
    }

    //important API
    advance(){
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

    checkBoundary(p5){
        if(this.position.x<0 || this.position.x>p5.windowWidth || this.position.y<0 || this.position.y>p5.windowHeight)
            return true;
        return false;
    }

    draw(p5){
        p5.fill(this.color);
        p5.noStroke();
    }

    //setters
    setColor(color){
        this.color = color;
    }

    setTrackIdx(trackIdx){
        this.trackIdx = trackIdx;
    }

    setAcceleration(acceleration){
        this.acceleration = acceleration;
    }

    setVelocity(velocity){
        this.velocity = velocity;
    }

    setPosition(position){
        this.position = position;
    }

    setSize(size){
        this.size = size;
    }

};

export default Primitive;