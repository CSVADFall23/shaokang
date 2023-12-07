import Collection from "./BaseCollection.js";
import CircularParticle from "../primitives/CircularParticle.js";

class CircularParticleSet extends Collection {
    //circular radius
    radius;
    //size coefficient
    sizeCoeff;

    //default callback with no min max pitch info given
    defaultOnNotePlayed = (detail) => {
        let deg = detail.note.midi / 127 * 360;
        for (let i = 0; i < 10; i++)
            this.add(deg, Math.random() * this.sizeCoeff + 1, this.colorGenerator(detail));
    };

    //default callback with min max pitch info given, mapped pitch to 0 to 360
    defaultOnNotePlayedWithMinMax(detail, minPitch, maxPitch) {
        let pitch = detail.note.midi;
        //map the pitch to a degree in 0 to 360
        let deg = (pitch - minPitch) / (maxPitch - minPitch) * 360;
        for (let i = 0; i < 10; i++)
            this.add(deg, Math.random() * this.sizeCoeff + 1, this.colorGenerator(detail));
    };

    constructor(radius = 100, trackIdx = 0, speed_scale = 5e-3, listenToAll = true, colorGenerator = (detail) => { return [Math.random() * 55 + 200, Math.random() * 55 + 200, Math.random() * 55 + 200] }) {
        super(trackIdx, speed_scale, listenToAll, colorGenerator);
        this.radius = radius;
        this.setOnNotePlayed(this.defaultOnNotePlayed);
        this.sizeCoeff = 15;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    setSize(size) {
        this.sizeCoeff = size;
    }

    add(deg, size = 20, color = [255, 255, 255]) {
        this.collection.push(new CircularParticle(this.radius, deg, this.speed_scale, this.trackIdx, size, color));
    }

}

export default CircularParticleSet;