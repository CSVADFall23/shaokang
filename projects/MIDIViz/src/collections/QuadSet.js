import Collection from "./BaseCollection.js";
import Quad from "../primitives/Quad.js";
import vec2 from "../utils/Vec2.js";

class QuadSet extends Collection {
    //track index
    trackIdx;
    //speed scale
    speed_scale;

    /**
     * @param {number} trackIdx
     * @param {number} speed_scale
     * @returns {void}
     * @description constructor for a quads collection, given track index and speed scale
     */
    constructor(trackIdx = 0, speed_scale = 5e-3) {
        super();
        this.trackIdx = trackIdx;
        this.speed_scale = speed_scale;
        this.setOnNotePlayed(this.defaultOnNotePlayed);
    }

    setTrackIdx(trackIdx) {
        this.trackIdx = trackIdx;
    }

    setSpeedScale(speed_scale) {
        this.speed_scale = speed_scale;
    }

    /**
     * @param {vec2} position
     * @param {vec2} acceleration
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {number[]} color
     * @returns {void}
     * @description add particles given position, initial direction, size and color
     */
    add(position, acceleration = new vec2(0, -1), sizeX = 12.5, sizeY=10, color = [255,255,255]) {
        this.collection.push(new Quad(position, acceleration, this.trackIdx,this.speed_scale, sizeX, sizeY, color));
    }

    //no pianoroll info given
    //a simple mapping is given by scaling the pitch
    defaultOnNotePlayed=(detail)=>{
        let pitch = detail.note.midi;
        let duration = detail.note.duration;
        let pos = new vec2(pitch/127*1920,0);
        this.add(pos,new vec2(0,1),12.5, 80*duration,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    };

};

export default QuadSet;