import Collection from "./BaseCollection.js";
import Quad from "../primitives/Quad.js";

class Quads extends Collection {
    //track index
    trackIdx;
    //speed scale
    speed_scale;

    constructor(trackIdx = 0, speed_scale = 5e-3) {
        super();
        this.trackIdx = trackIdx;
        this.speed_scale = speed_scale;
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
};

export default Quads;