"use strict";

class Player extends MovingEntity {

    #level = null;

    static #ctx = document.querySelector("canvas").getContext("2d");

    constructor(playerClass) {
        super(0,0,50,100);

        this.ctx = null;

        this.gravityModifier = 5;
        
        this.Key = "Player";

        this.sprite;
        this.backupColor = "lime";

        this.x;
        this.y;
        this.width;
        this.height;


        this.airborne = true;
        this.updateDY = true;



        this.playerClass = playerClass;
        switch (this.playerClass) {
            case "Mage":
                this.STR = 5;
                this.LUCK = 7;
                this.WILL = 10;
                
                break;
            case "Knight":
                this.STR = 10;
                this.LUCK = 5;
                this.WILL = 7;

                break;
            case "Archer":
                this.STR = 7;
                this.LUCK = 10;
                this.WILL = 5;
                
                break;
        }

        this.hp = 10 + this.STR;
        this.#level = 1;
        this.inventory = [];
        this.equipped = {};
    }

    draw() {
        try{
            Player.#ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
        }
        catch{
            
        }
        finally{
            Player.#ctx.fillStyle = this.backupColor;
            Player.#ctx.fillRect(this.x,this.y,this.width,this.height)
        }
    }

    setLevel(level){
        this.#level = level;
        //implement level features
    }

    groundCollision() {
        if(this.y >= document.querySelector("canvas").height - this.height - TerrainManager.PHTerrain.groundImg[0].height){
            this.airborne = false;
            this.y = document.querySelector("canvas").height - this.height - TerrainManager.PHTerrain.groundImg[0].height;
            if(this.updateDY){
                this.updateDY = false;
                this.dy = 0;
            }
        }
    }

    spriteanimation() {

    }

    update() {

        //test for ground
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
        if(this.airborne) {
            this.gravity(this.player);
            this.groundCollision();
        }
        this.friction(this.player);
    }
}