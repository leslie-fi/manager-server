"use strict";
exports.__esModule = true;
var Server_1 = require("./Server");
var Launcher = /** @class */ (function () {
    function Launcher() {
        // instance vars
        this.name = 'jake';
        this.server = new Server_1.Server();
    }
    Launcher.prototype.launchApp = function () {
        console.log('started app');
        this.server.createServer();
    };
    return Launcher;
}());
new Launcher().launchApp();
