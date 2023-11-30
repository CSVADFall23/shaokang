import vec2 from "../utils/Vec2.js";
import Primitive from "./Primitive.js";

class Quad extends Primitive{
    constructor(position, trackIdx=0, speed_scale=5e-3, sizeX=5, sizeY=5, color=[255,255,255], speed_func = Math.random){
        super();
        this.position = position;
        this.velocity = new vec2(0,0);
        this.acceleration = new vec2(0,1).scalar_mul(speed_func()*speed_scale);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.trackIdx = trackIdx;
        this.color = color;
    }

    draw(p5){
        p5.fill(this.color);
        p5.rect(this.position.x, this.position.y, this.sizeX, this.sizeY);
    }
};

export default Quad;