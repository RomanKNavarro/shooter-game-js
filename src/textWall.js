var canvas = document.getElementById("canvas1");
var cxt = canvas.getContext("2d", { alpha: false });

export default class TextWall {
    constructor(text, y) {
        // this.x = 30;
        // this.y = 30;

        this.text = text;
        //this.fontSize = fontSize;
        this.lineheight = 15;
        this.lines = this.text.split('\n');
        this.y = y;
        this.vanish = false;
    }

    draw() {
        // FONT CRAP:
        // cxt.fillStyle = "black";
        // var block_font = new FontFace('myFont', 'url(fonts/blockschrift.ttf)');
        // block_font.load().then(function(loaded_face) {
        //     document.fonts.add(loaded_face);
        //       //document.body.style.fontFamily = '"Junction Regular", Arial';
        //       document.body.style.fontFamily = '"blockschrift-f-regular", ans-serif';
        // }).catch(function(error) {
        //     // error occurred
        //     console.log("font download failed!!!")
        // });

        if (!this.vanish) {
            cxt.fillStyle = "black";
            cxt.fillRect(0, 0, canvas.width, canvas.height);
    
            cxt.fillStyle = "white";
            //cxt.fillStyle = "black";
            // cxt.font = "14px Permanent Marker";
            cxt.font = "17px Times New Roman";
            // cxt.font = "15px block_font";
            // cxt.font = "15px blockschrift-f-regular";
            for (let i = 0; i < this.lines.length; i++) {
                // cxt.fillText(this.lines[i], canvas.width / 2, canvas.height / 5 + (i * this.lineheight));
                cxt.fillText(this.lines[i], canvas.width / 2, this.y + (i * this.lineheight));
            }
        }
        // cxt.clearRect(0, 0, canvas.width, canvas.height);
    }
}