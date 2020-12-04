"use strict"

class Entity {

    constructor(x, y, width, height) {

        this.ctx = document.querySelector("canvas").getContext("2d");

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.draw();
    }
}