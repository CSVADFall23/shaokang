import Quad from "../primitives/Quad.js";
import Collection from "./BaseCollection.js";
import vec2 from "../utils/Vec2.js";

class PianoRoll extends Collection {
    //height of the piano roll, in pixels
    height;
    //color of the white keys
    color_1;
    //color of the black keys
    color_2;

    constructor(p5, height=100, color_1=[255,255,255], color_2=[0,0,0]){
        super();
        this.height = height;
        this.color_1 = color_1;
        this.color_2 = color_2;
        this.initCollection(p5);
    }

    //disable moving and boundary check
    advance(){}; //do nothing
    checkBoundary(){}; //do nothing

    draw(p5){ //draw the keys
        p5.stroke(1);
        this.collection.forEach(item=>item.draw(p5));
    }

    initCollection(p5){
        //draw the piano roll at the bottom of the screen
        const offset = p5.windowHeight-this.height;

        //calculate white keys first, 
        const whiteKeyWidth = p5.windowWidth/52;
        const blackKeyWidth = whiteKeyWidth/1.5;
        const whiteKeyHeight = this.height;
        const blackKeyHeight = this.height/1.6;

        //the first note is C1, which is 24 in MIDI
        let notePitch = 24;
        for(let i=0;i<52;i++){
            //the keys are all static because the speed scale is 0
            const key = new Quad(new vec2(i*whiteKeyWidth,offset), 0, 0, whiteKeyWidth, whiteKeyHeight, this.color_1);
            const steps = [2,2,1,2,2,2,1];
            key.pitch = notePitch;
            key.isWhiteKey = true;

            notePitch += steps[i%7];    
            this.collection.push(key);
        }

        //then calculate black keys, these are sharp notes
        const blackKeyIndices = [1,2,4,5,6];
        const blackKeyIndicesInHalf = [1,3,6,8,10];

        for(let i=0;i < 52;i++){

            if(blackKeyIndices.includes(i%7)){
                const key = new Quad(new vec2(i*whiteKeyWidth-blackKeyWidth/2,offset), 0, 0, blackKeyWidth, blackKeyHeight, this.color_2);
                var index = blackKeyIndices.indexOf(i%7);
                key.pitch = blackKeyIndicesInHalf[index]+12*Math.floor(i/7)+24;
                key.isWhiteKey = false;

                this.collection.push(key);
            }
        }
    }

    getNoteByPitch(pitch){
        return this.collection.find(key=>key.pitch===pitch);
    }

    setNoteColor(pitch, color){
        const key = this.getNoteByPitch(pitch);
        if(key){
            key.color = color;
        }
    }

    setHeight(height){
        this.height = height;
    }

    setColor_1(color_1){
        this.color_1 = color_1;
    }

    setColor_2(color_2){
        this.color_2 = color_2;
    }

    //debug purpose only
    // logKeys(){
    //     this.collection.forEach(key=>{
    //         console.log(key.pitch);
    //     })
    // }

};

export default PianoRoll;