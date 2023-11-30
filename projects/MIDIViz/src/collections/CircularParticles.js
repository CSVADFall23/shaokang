import Collection from "./BaseCollections.js";
import CircularParticle from "../primitives/CircularParticle.js";

class CircularParticles extends Collection{
    //circular radius
    radius;
    //track index
    trackIdx;
    //speed scale
    speed_scale;

    constructor(radius=100, trackIdx=0, speed_scale=5e-3){
        super();
        this.radius = radius;
        this.trackIdx = trackIdx;
        this.speed_scale = speed_scale;
    }

    setRadius(radius){
        this.radius = radius;
    }

    setTrackIdx(trackIdx){
        this.trackIdx = trackIdx;
    }

    setSpeedScale(speed_scale){
        this.speed_scale = speed_scale;
    }

    add(deg){
        this.collection.push(new CircularParticle(this.radius, deg, this.trackIdx, this.speed_scale));
    }

    advance(){
        this.collection.forEach(item=>item.advance());
    }

    checkBoundary(p5){
        this.collection.forEach(item=>item.checkBoundary(p5));
    }

    draw(p5){
        this.collection.forEach(item=>item.draw(p5));
    }
}

export default CircularParticles;