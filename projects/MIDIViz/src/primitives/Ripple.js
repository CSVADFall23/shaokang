import Primitive from "./Primitive.js";

class Ripple extends Primitive{

    currSize = 0;

    advance(){
        this.velocity.add(this.acceleration);
        this.currSize += this.velocity.length();
    }

    checkBoundary(p5){
        if(this.currSize>this.size)
            return true;
        return false;
    };

    draw(p5){
        p5.noFill();
        p5.stroke(this.color);
        p5.circle(this.position.x, this.position.y, this.currSize);
    }
};

export default Ripple;