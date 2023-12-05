//an array of collections
class CompoundCollection{
    //collections
    collections;
    //p5 instance

    constructor(){
        this.collections = [];
    }

    addCollection(collection){
        this.collections.push(collection);
    }

    removeCollection(idx){
        console.assert(collectionIdx < this.collections.length && collectionIdx>=0,{msg:"Invalid collection index"});
        this.collections.splice(idx,1);
    }

    //set certain collection listen to all tracks or not
    setCollectionListenToAll(collectionIdx,listenToAll){
        console.assert(collectionIdx < this.collections.length && collectionIdx>=0,{msg:"Invalid collection index"});
        this.collections[collectionIdx].setListenToAll(listenToAll);
    };    

    //set certain collection listen to a certain track
    setCollectionListen(collectionIdx, trackIdx){
        console.assert(collectionIdx < this.collections.length && collectionIdx>=0,{msg:"Invalid collection index"});
        this.collections[collectionIdx].setTrackIdx(trackIdx);
    }

    get(){
        return this.collections;
    }

    get(idx){
        console.assert(collectionIdx < this.collections.length && collectionIdx>=0,{msg:"Invalid collection index"});
        return this.collections[idx];
    }

    getLength(){
        return this.collections.length;
    }

    step(p5){
        //custom step function, called on each frame
        this.collections.forEach(collection=>{
            collection.step(p5);
        });
    }

    draw(p5){
        this.collections.forEach(collection=>{
            collection.draw(p5);
        });
    }

    advance(){
        this.collections.forEach(collection=>{
            collection.advance();
        });
    }

    checkBoundary(p5){
        this.collections.forEach(collection=>{
            collection.checkBoundary(p5);
        });
    }

    clearAll(){
        this.collections.forEach(collection=>{
            collection.clear();
        });
    }

    //set event listener for note played
    setOnNotePlayed(idx,callback){
        this.collections[idx].setOnNotePlayed(callback);
    }

    //set event listener for note ended
    setOnNoteEnded(idx,callback){
        this.collections[idx].setOnNoteEnded(callback);
    }
};

export default CompoundCollection;