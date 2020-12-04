"use strict"

class Engine {
    
    #canvas = document.querySelector("canvas");


    constructor() {

    // Database
    let request = indexedDB.open("AotRM", 1);
    
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

        let request = objStore.add(player)
    }  



    // Menus

        this.Menus = {
            "MainMenu" : document.getElementById("MainMenu"),
        }

    // variable init and def

    this.entity = new MovingEntity(0,0,50,100);

    // functions

    }

    loop() {
        //this.entity.update();
        console.log("loop");
    }
}