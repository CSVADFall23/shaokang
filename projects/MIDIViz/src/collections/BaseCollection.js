class Collection {
    collection;
    onNotePlayed;
    onNoteEnded;
    listenToAll;

    //track index, the collection is associated with a track
    trackIdx;
    //speed scale, the speed of the unit is multiplied by this value
    speed_scale;
    //how the color is determined, takes in note detail, returns the color
    colorGenerator;

    setTrackIdx(trackIdx) {
        this.trackIdx = trackIdx;
    }

    setSpeedScale(speed_scale) {
        this.speed_scale = speed_scale;
    }

    setListenToAll(listenToAll) {
        this.listenToAll = listenToAll;
    };

    constructor(trackIdx = 0, speed_scale = 5e-3, listenToAll = false, colorGenerator = (detail) => { return [Math.random() * 55 + 200, Math.random() * 55 + 200, Math.random() * 55 + 200] }) {
        this.collection = [];
        this.trackIdx = trackIdx;
        this.speed_scale = speed_scale;

        this.onNotePlayed = (detail) => {

        };

        this.onNoteEnded = (detail) => {

        };

        this.listenToAll = listenToAll;
        this.colorGenerator = colorGenerator;
    }

    add(item) {
        this.collection.push(item);
    }

    remove(idx) {
        this.collection.splice(idx, 1);
    }

    get() {
        return this.collection;
    }

    get(idx) {
        return this.collection[idx];
    }

    getLength() {
        return this.collection.length;
    }

    clear() {
        this.collection = [];
    }

    forEach(callback) {
        this.collection.forEach(callback);
    }

    map(callback) {
        return this.collection.map(callback);
    }

    filter(callback) {
        return this.collection.filter(callback);
    }

    sort(callback) {
        this.collection.sort(callback);
    }

    //each item in the collection advance one timestep (only change data, not draw to the canvas)
    advance() {
        this.collection.forEach(item => item.advance());
    }

    //check if the unit is out of the screen, if so, remove it from the collection
    checkBoundary(p5) {
        this.collection.forEach(item => {
            if (item.checkBoundary(p5)) {
                this.collection.splice(this.collection.indexOf(item), 1);
            }
        });
    }

    //use p5 to draw
    draw(p5) {
        this.collection.forEach(item => item.draw(p5));
    }

    //aggregate call for each timestep, including advance, checkBoundary, draw
    step(p5) {
        this.advance();
        this.checkBoundary(p5);
        this.draw(p5);
    }

    //set event listener for note played, only one event listener can be set at a time
    setOnNotePlayed(callback) {
        //remove previous event listener
        document.removeEventListener("notePlayed", (e) => {
            if (e.detail.trackNum === this.trackIdx || this.listenToAll)
                this.onNotePlayed(e.detail);
        });

        this.onNotePlayed = callback;
        //only handle the event when the trackIdx matches or listenToAll is true
        document.addEventListener("notePlayed", (e) => {
            if (e.detail.trackNum === this.trackIdx || this.listenToAll)
                this.onNotePlayed(e.detail);
        });
    }

    //set event listener for note ended, only one event listener can be set at a time
    setOnNoteEnded(callback) {
        //remove previous event listener
        document.removeEventListener("notePlayed", (e) => {
            if (e.detail.trackNum === this.trackIdx || this.listenToAll)
                this.onNoteEnded(e.detail);
        });

        this.onNoteEnded = callback;
        //only handle the event when the trackIdx matches or listenToAll is true
        document.addEventListener("noteEnded", (e) => {
            if (e.detail.trackNum === this.trackIdx || this.listenToAll)
                this.onNoteEnded(e.detail);
        });
    }

    //set how the color is determined in the default onNotePlayed and onNoteEnded callback, the color is determined by this function
    setColorGenerator(colorGenerator) {
        this.colorGenerator = colorGenerator;
    }

};

export default Collection;