import vec2 from "../utils/Vec2.js";

//By default draw circles
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
        if(this.position.x<-p5.windowWidth/2 || this.position.x>p5.windowWidth/2 || this.position.y<-p5.windowHeight/2 || this.position.y>p5.windowHeight/2)
            return true;
        return false;
    }

    draw(p5){
        p5.fill(this.color);
        p5.noStroke();
        p5.circle(this.position.x+p5.windowWidth/2, this.position.y+p5.windowHeight/2, this.size);
    }

};

export default Primitive;