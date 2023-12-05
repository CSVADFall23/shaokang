import Collection from "./BaseCollection.js";
import CircularParticle from "../primitives/CircularParticle.js";

class CircularParticleSet extends Collection{
    //circular radius
    radius;
    //size coefficient
    sizeCoeff;

    //default callback with no min max pitch info given
    defaultOnNotePlayed= (detail)=>{
        let deg = detail.note.midi/127*360;
        for(let i=0;i<10;i++)
            this.add(deg,Math.random()*this.sizeCoeff+1,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    };

    //default callback with min max pitch info given, mapped pitch to 0 to 360
    defaultOnNotePlayedWithMinMax(detail, minPitch, maxPitch){
        let pitch = detail.note.midi;
        //map the pitch to a degree in 0 to 360
        let deg = (pitch-minPitch)/(maxPitch-minPitch)*360;
        for(let i=0;i<10;i++)
            this.add(deg,Math.random()*this.sizeCoeff+1,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    };
    
    constructor(radius=100, trackIdx=0, speed_scale=5e-3, listenToAll=true){
        super(trackIdx, speed_scale, listenToAll);
        this.radius = radius;
        this.setOnNotePlayed(this.defaultOnNotePlayed);
        this.sizeCoeff = 15;
    }

    setRadius(radius){
        this.radius = radius;
    }

    setSize(size){
        this.sizeCoeff = size;
    }

    add(deg, size=20 ,color=[255,255,255], speed_func=Math.random){
        this.collection.push(new CircularParticle(this.radius, deg, this.trackIdx, this.speed_scale, size, color, speed_func));
    }

}

export default CircularParticleSet;