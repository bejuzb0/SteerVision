import Phaser from 'phaser';
var fs = require('browserify-fs');
import backgroundImg from './assets/background.png';
import car_objectImg from './assets/car_object.png';
import dot_objectImg from './assets/dot.png';

var quadrant = -1;
var movableobj;
var SLOWING_FACTOR = 40;
var dot;
var dotgroup;
var topleft_text;
var points = 0;

var spawn;




class MyGame extends Phaser.Scene {

    constructor () {
        super();
    }

    preload () {
        this.load.image('object', car_objectImg);
        this.load.image('background', backgroundImg);
        this.load.image('collectible', dot_objectImg);
    }
      
    create () {
        this.add.image(400,300,'background');
        movableobj = this.physics.add.image(350,350, 'object');
        console.log(movableobj);

        topleft_text = this.add.text(10,10,"0 points",{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' } );


        spawn = (spawnobjectname) => {
            dot = this.physics.add.sprite(Phaser.Math.Between(50, 750),Phaser.Math.Between(50, 550),spawnobjectname);
            this.physics.add.overlap(movableobj, dot, this.removeObj);
        } 

        spawn('collectible');
       // dot = this.physics.add.sprite(Phaser.Math.Between(50, 750),Phaser.Math.Between(50, 750),'collectible');
        /* dotgroup = this.physics.add.staticGroup({
            key : 'collectible',
            frameQuantity: 10,
            immovable: true,
        });

        var children = dotgroup.getChildren();

        for(var i = 0; i<children.length; i++) {
            var x = Phaser.Math.Between(50, 750);
            var y = Phaser.Math.Between(50, 550);
            children[i].setPosition(x, y);
        }

        dotgroup.refresh(); */
        //this.physics.add.existing(movableobj);
        //movableobj = this.add.sprite(350, 350, 'object');
       // dot = this.physics.add.sprite(300,300, 'collectible');
       // dot.setScale(0.02);

        

       /* spawn = (enemyName) => {
            dot = this.physics.add.sprite(Phaser.Math.Between(0,400), Phaser.Math.Between(0,600), enemyName);
        } */

       /* if(checkOverlap(movableobj, dot)) {
            console.log("Overlapped");
            dot.destroy();
            spawn('collectible');
        }  */

        //this.physics.overlap(movableobj,dot, callbackfn, null, this);
       // this.physics.collide(movableobj, dot, callbackfn, null, this);
    
       /* collectibles = this.physics.add.group({
            key : 'collectible',
            repeat : 0,
            setXY : {x: this, y :300},
            setScale : {x:0.02, y: 0.02}
        });   */

      //  this.physics.add.overlap(movableobj,);
    
       // this.physics.add.overlap(movableobj, collectibles, onOverlapFunction, null, this);
    
    
    }

    


    update() {
        
        if(distanceX > 0) {
            if(distanceY > 0) quadrant = 1;
            else quadrant = 4;
        } 
        else {
            if(distanceY > 0) quadrant = 2;
            else quadrant = 3;
        }
        
        var angleindegrees = angle*(180/Math.PI);
        
        
        //angle = Math.abs(angle);
    
        if(quadrant == 1) {
            movableobj.x = (movableobj.x + (magnitude/SLOWING_FACTOR)*Math.cos(angle));
            movableobj.y -= (magnitude/SLOWING_FACTOR)*Math.sin(angle);
            movableobj.angle = -angleindegrees;
            
            
        }
        else if(quadrant == 2) {
            movableobj.x = (movableobj.x + (magnitude/SLOWING_FACTOR)*Math.cos(angle));
            movableobj.y -= (magnitude/SLOWING_FACTOR)*Math.sin(angle);
            movableobj.angle = -angleindegrees;
    
        }
        else if(quadrant == 3) {
            movableobj.x = (movableobj.x + (magnitude/SLOWING_FACTOR)*Math.cos(angle));
            movableobj.y -= (magnitude/SLOWING_FACTOR)*Math.sin(angle);
            movableobj.angle = -angleindegrees;
        }
        else {
            movableobj.x = (movableobj.x + (magnitude/SLOWING_FACTOR)*Math.cos(angle));
            movableobj.y -= (magnitude/SLOWING_FACTOR)*Math.sin(angle);
            movableobj.angle = -angleindegrees;
        }
    
    
        if(movableobj.x > 800) {
            movableobj.x = 0;
        }
        else if(movableobj.x < 0) {
            movableobj.x = 800;
        }
        if(movableobj.y > 600) {
            movableobj.y = 0;
        }
        else if(movableobj.y < 0) {
            movableobj.y = 600;
        }


        
     /*   fs.writeFile(__dirname + '/../helloworld.txt', 'helloworld', function (err) {
        if (err) return console.log(err);
        console.log(__dirname);
        }); 

    */
    
        
        /*if (cursors.left.isDown) {
            movableobj.x -= magnitude/SLOWING_FACTOR;
        }
        else if (cursors.right.isDown) {
            movableobj.x += magnitude/SLOWING_FACTOR;
        }
    
        if (cursors.up.isDown){
            movableobj.y -= magnitude/SLOWING_FACTOR;
        }
        else if (cursors.down.isDown) {
            movableobj.y += magnitude/SLOWING_FACTOR;
        }*/
    }

    removeObj(movableobj, dotobj) {
             //  dotgroup.killAndHide(dotobj);
            console.log("Collided!");
            points += 10;
            topleft_text.setText(points + " points");
            dotobj.body.enable = false;
            dotobj.destroy();
            spawn('collectible');
    }

    render() {
        
    }
}


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'    
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
