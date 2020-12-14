class Terrain {
    constructor(backgroundImg, groundImg) {
        this.backgroundImg = backgroundImg;
        this.groundImg = [];
        for(let i=0; i<500; i++) {
            this.groundImg.push(groundImg);
        }
    }
}