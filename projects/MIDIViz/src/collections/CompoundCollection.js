//an array of collections
class CompoundCollection{
    //collections
    collections;
    //p5 instance

    constructor(){
        this.collections = [];
    }

    add(collection){
        this.collections.push(collection);
    }

    remove(idx){
        this.collections.splice(idx,1);
    }

    get(){
        return this.collections;
    }

    get(idx){
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