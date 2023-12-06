import vec2 from "../utils/Vec2.js";
import Primitive from "./Primitive.js";

class Line extends Primitive{
    p1;
    p2;

    constructor(p1, p2, color=[255,255,255]){
        super();
        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
    }

    draw(p5){
        p5.stroke(this.color);
        p5.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }

    advance(){
        this.velocity = this.velocity.add(this.acceleration);
        this.p1 = this.p1.add(this.velocity);
        this.p2 = this.p2.add(this.velocity);
    }

    checkBoundary(p5){
        let p1Out = false;
        let p2Out = false;

        if(this.p1.x<0 || this.p1.x>p5.windowWidth || this.p1.y<0 || this.p1.y>p5.windowHeight)
            p1Out = true;
        if(this.p2.x<0 || this.p2.x>p5.windowWidth || this.p2.y<0 || this.p2.y>p5.windowHeight)
            p2Out = true;

        if(p1Out && p2Out)
            return true;
        return false;
    };
};

export default Line;