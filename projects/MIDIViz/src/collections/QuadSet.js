import Collection from "./BaseCollection.js";
import Quad from "../primitives/Quad.js";
import vec2 from "../utils/Vec2.js";
import PianoRoll from "./PianoRoll.js";

class QuadSet extends Collection {
    /**
     * @param {number} trackIdx
     * @param {number} speed_scale
     * @returns {void}
     * @description constructor for a quads collection, given track index and speed scale
     */
    constructor(trackIdx = 0, speed_scale = 5e-3, listenToAll = false) {
        super(trackIdx, speed_scale, listenToAll);
        this.setOnNotePlayed(this.defaultOnNotePlayed);
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
    add(position, acceleration = new vec2(0, -1), sizeX = 12.5, sizeY=10, color = [200+Math.random()*55,200+Math.random()*55,200+Math.random()*55]) {
        this.collection.push(new Quad(position, new vec2(0,0), acceleration.scalar_mul(this.speed_scale), this.trackIdx, sizeX, sizeY, color));
    }

    //no pianoroll info given
    //a simple mapping is given by scaling the pitch
    defaultOnNotePlayed=(detail)=>{
        let pitch = detail.note.midi;
        let duration = detail.note.duration;
        let pos = new vec2(pitch/127*1920,0);
        this.add(pos,new vec2(0,1),12.5, 80*duration,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    };

    //pianoroll info given, default mapping
    defaultOnNotePlayedWithKeys=(detail, keys)=>{
        console.assert((keys instanceof PianoRoll),{msg:"Invalid keys type, expected PianoRoll"});

        let pitch = detail.note.midi;
        let duration = detail.note.duration;
        let pos = keys.getNoteByPitch(pitch).position;
        this.add(pos,new vec2(0,-1),12.5,80*duration,[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200]);
    };

};

export default QuadSet;