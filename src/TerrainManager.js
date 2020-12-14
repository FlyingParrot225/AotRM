"use strict";

class TerrainManager{
    static ctx = document.querySelector("canvas").getContext("2d");
    static PHTerrain = new Terrain(document.getElementById("plainsBG"), document.getElementById("grass"));

    static loadTerrain = (terrain) => {
        TerrainManager.ctx.drawImage(terrain.backgroundImg, 0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
        for(let i=0;i<terrain.groundImg.length;i++) {
            TerrainManager.ctx.drawImage(terrain.groundImg[i], 50*i, document.querySelector("canvas").height - terrain.groundImg[i].height);
        }
    }
}