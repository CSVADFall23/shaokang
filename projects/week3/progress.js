class Progress{
    progress = 0;
    currRayIdx = 0;
    intersections = [];
    lengths = [];
    isFreeze = true;
    hue = 100;
    speed = 5;

    getSubpathLength(){
        for(var i = 0; i < this.intersections.length-1; i++){
            this.lengths.push(this.intersections[i].point.sub(this.intersections[i+1].point).length());
        }
    };

    constructor(intersections,speed){
        this.progress = 0;
        this.intersections = intersections;
        this.currRayIdx = 0;
        this.isFreeze = true;
        this.hue = Math.random()*360;
        this.speed = speed;
        for(var i = 0; i < this.intersections.length-1; i++){
            this.lengths.push(this.intersections[i].point.sub(this.intersections[i+1].point).length());
        }
    }

    advance(){

        if(this.isFreeze){
            return;
        }

        this.progress += this.speed;
        if(this.progress > this.lengths[this.currRayIdx]){
            this.progress = 0;
            this.currRayIdx++;
            //observer pattern here
            var event = new CustomEvent("playSound");
            document.dispatchEvent(event);
        }

        if(this.currRayIdx>=this.lengths.length){
            this.isFreeze = true;
            return;
        }

        var currPoint = this.intersections[this.currRayIdx].point;
        var nextPoint = this.intersections[this.currRayIdx+1].point;
        var currDir = nextPoint.sub(currPoint).normalize();
        stroke(this.hue,50,this.currRayIdx*5);
        line(currPoint.x, currPoint.y, currPoint.x+currDir.x*this.progress, currPoint.y+currDir.y*this.progress);
    }

    unfreeze(){
        this.isFreeze = false;
    }

    freeze(){
        this.isFreeze = true;
    }
    
}