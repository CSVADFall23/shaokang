import NotePlayer from "../NotePlayer.js";

new p5(function(p5){

    p5.setup = async function() {
        const url = "../assets/dailyLife.mid"
        const player = new NotePlayer();
        await player.load(url);
        player.playWith("acoustic_guitar_nylon");
    }

    //called on each frame
    p5.draw = function() {

    }
});