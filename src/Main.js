"use strict"

class Main {
    
    static engine = new Engine();
    
    static Run() {
        Main.engine.loop();
        requestAnimationFrame(Main.Run);
    }
}

Main.Run();