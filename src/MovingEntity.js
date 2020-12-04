"use strict"

class MovingEntity extends Entity {
    
    constructor(x, y, width, height) {

        super(x, y, width, height);

        this.gravityModifier = 10;
        this.frictionModifier = 0.8;
        this.dx = 0;
        this.dy = 0;
    }
    
    
    
    gravity = () => {
        this.dy += this.gravityModifier;
    }
    friction = () => {
        this.dx * this.frictionModifier;
    }

    draw() {
        //change to sprites in future
        this.ctx.fillStyle = "lime";
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.draw();
    }
}