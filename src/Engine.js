"use strict";

class Engine {

    #ctx;
    #MenusList;
    #Menus;
    #gameStates;
    #ctrlObj;

    constructor() {
        
        document.querySelector("canvas").width = window.innerWidth;
        document.querySelector("canvas").height = window.innerHeight;

        this.#ctx = document.querySelector("canvas").getContext("2d");

        // Database
        let request = indexedDB.open("Database", 1);
    
        request.onerror = (e) => {
            console.error(e.target.error);
        }

        request.onupgradeneeded = () => {
            console.info("Upgrading Database...");
            this.database = request.result;
            console.info("Database Upgraded!");
            this.objectStore = this.database.createObjectStore("AotRM", {keyPath: "Key"});
        }

        request.onsuccess = () => {
            console.info("Opening Database...");
            this.database = request.result;
            console.info("Database Opened!");
        }

        this.save = () => {
            let transaction = this.database.transaction(["AotRM"], "readwrite");

            transaction.onerror = (e) => {
                console.error(e.target.error);
            } 
            transaction.oncomplete = () => {
                console.info("Finished Saving to Local Database!");
            }
            let objStore = transaction.objectStore("AotRM");

            let request = objStore.add(this.player);
        }  

        this.load = () => {

        }

        this.deleteSave = () => {

        }
        
        // Menus

        this.#MenusList = {
            SourceMenu: document.getElementById("MainMenu"), 
            MainMenu: document.getElementById("MainMenu"),
            Settings: document.getElementById("Settings"),
            Controls: document.getElementById("Controls"),
            AudioMenu: document.getElementById("AudioMenu"),
            ClassSelection: document.getElementById("ClassSelection"),
            CreditsMenu: document.getElementById("CreditsMenu"),
        }

        this.#Menus = {
            MainMenu: true,
            Settings: false,
            Controls: false,
            AudioMenu: false,
            ClassSelection: false,
            CreditsMenu: false,
        }

        this.openSettings = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#MenusList.SourceMenu = this.#MenusList[menu];
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.Settings.style.display = "block";
            this.#Menus.Settings = true;
        }

        this.exitSettings = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.SourceMenu.style.display = "block";
            if(this.#MenusList.SourceMenu == this.#MenusList.MainMenu){
                this.#Menus.MainMenu = true;
            }else if(this.#MenusList.SourceMenu == this.#MenusList.Settings){
                this.#Menus.Settings = true;
            }
        }

        this.openControls = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.Controls.style.display = "block";
            this.#Menus.Controls = true;
        }

        this.exitControls = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.Settings.style.display = "block";
            this.#Menus.Settings = true;
        }
        this.openAudio = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.AudioMenu.style.display = "block";
            this.#Menus.AudioMenu = true;
        }
        this.exitAudio = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.Settings.style.display = "block";
            this.#Menus.Settings = true;
        }
        this.openMainMenu = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.MainMenu.style.display = "block";
            this.#Menus.MainMenu = true;
        }
        this.openClassSelection = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.ClassSelection.style.display = "block";
            this.#Menus.ClassSelection = true;
        }
        this.openCreditsMenu = () => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            this.#MenusList.CreditsMenu.style.display = "block";
            this.#Menus.CreditsMenu = true;
        }
        // variable init and def

        this.#gameStates = {
            menu: true,
            game: false,
            pause: false,
        }

        //this.player;

        // functions
        

        //start new game

        this.setMage = () => {
            document.getElementById("currentClass").innerHTML = "Mage";
        }

        this.setArcher = () => {
            document.getElementById("currentClass").innerHTML = "Archer";
        }

        this.setKnight = () => {
            document.getElementById("currentClass").innerHTML = "Knight";
        }
        
        this.newGame = () => {
            this.openClassSelection();
            document.getElementById("currentClass").innerHTML = "None";
        }
        //load game

        //controls

        this.#ctrlObj = {
            w: false,
            a: false,
            s: false,
            d: false,
            e: false,
            Escape: false,
            "space" : false,
            "1" : false,
            "2" : false,
            "3" : false,
            "4" : false,
        };
        window.addEventListener("keydown",(e) => {
;            for(let key in this.#ctrlObj) {
                if(key.toString() == e.key){
                    this.#ctrlObj[key] = true;
                    console.log(this.#ctrlObj);
                    break;
                }else if(e.key == " "){
                    this.#ctrlObj.space = true;
                    console.log(this.#ctrlObj);
                    break;
                }else if(key.toString() != e.key){
                    continue;
                }
            }
        });
        window.addEventListener("keyup",(e) => {
            for(let key in this.#ctrlObj) {
                if(key.toString() == e.key){
                    this.#ctrlObj[key] = false;
                    break;
                }else if(e.key == " "){
                    this.#ctrlObj.space = false;
                    console.log(this.ctrlObj);
                    break;
                }else if(key.toString() != e.key){
                    continue;
                }
            }
        });
    }

    controls(){
        if((this.#ctrlObj.w || this.#ctrlObj.space) && this.#gameStates.game){
            //jump

            if(!this.player.airborne){
                this.player.dy -= 30 + this.player.STR;
                this.player.airborne = true;
                this.player.updateDY = true;
            }
        }
        if(this.#ctrlObj.a && this.#gameStates.game){
            //go left
            this.player.dx -= 3;
        }
        if(this.#ctrlObj.s && this.#gameStates.game){
            //crouch
        }
        if(this.#ctrlObj.d && this.#gameStates.game){
            //go right
            this.player.dx += 3;
        }
    }

    start(){
        let x = document.getElementById("currentClass").innerHTML;
        if(x == "None"){
            alert("Please select a class.");
            return;
        }
        this.player = new Player(x);
        this.openCreditsMenu();
        setTimeout(() => {
            for(var menu in this.#Menus) {
                if(this.#Menus[menu]){
                    this.#Menus[menu] = false,
                    this.#MenusList[menu].style.display = "none";
                }
            }
            document.querySelector("canvas").style.display = "block";
            this.#gameStates.menu = false;
            this.#gameStates.pause = false;
            this.#gameStates.game = true;
        }, 5000)
    }

    loop() {
        document.querySelector("canvas").width = window.innerWidth;
        document.querySelector("canvas").height = window.innerHeight;
        this.#ctx.clearRect(0,0,document.querySelector("canvas").width, document.querySelector("canvas").height);
        this.controls();
        if(this.#gameStates.game){
            TerrainManager.loadTerrain(TerrainManager.PHTerrain);
            this.player.update();
        }
    }
}