class Collection{
    collection;
    onNotePlayed;

    constructor(){
        this.collection = [];
        this.onNotePlayed = (detail)=>{

        };
    }

    add(item){
        this.collection.push(item);
    }

    remove(idx){
        this.collection.splice(idx,1);
    }

    get(){
        return this.collection;
    }

    get(idx){
        return this.collection[idx];
    }

    getLength(){
        return this.collection.length;
    }

    clear(){
        this.collection = [];
    }

    forEach(callback){
        this.collection.forEach(callback);
    }

    map(callback){
        return this.collection.map(callback);
    }

    filter(callback){
        return this.collection.filter(callback);
    }

    //each item in the collection advance one timestep (only change data, not draw to the canvas)
    advance(){
        this.collection.forEach(item=>item.advance());
    }

    //check if the unit is out of the screen, if so, remove it from the collection
    checkBoundary(p5){
        this.collection.forEach(item=>{
            if(item.checkBoundary(p5)){
                this.collection.splice(this.collection.indexOf(item),1);
            }
        });
    }

    //use p5 to draw
    draw(p5){
        this.collection.forEach(item=>item.draw(p5));
    }

    //aggregate call for each timestep, including advance, checkBoundary, draw
    step(p5){
        this.advance();
        this.checkBoundary(p5);
        this.draw(p5);
    }

    //set event listener for note played
    setOnNotePlayed(callback){
        this.onNotePlayed = callback;
        document.addEventListener("notePlayed", (e)=>this.onNotePlayed(e.detail));
    }
};

export default Collection;