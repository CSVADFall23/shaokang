import Collection from "./BaseCollection";
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

    step(){
        this.collections.forEach(collection=>{
            collection.step();
        });
    }

    draw(){
        this.collections.forEach(collection=>{
            collection.draw(this.p5);
        });
    }

    advance(){
        this.collections.forEach(collection=>{
            collection.advance();
        });
    }

    checkBoundary(){
        this.collections.forEach(collection=>{
            collection.checkBoundary(this.p5);
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
};