"use strict";
// Log Console Messages to Server File
var JFile = require("jfile");
let nxFile = new JFile(process.env.LOG_FILE_PATH);
global.logNginx = function logNginx(message) {
    let timestamp = Date();
    nxFile.text += "\n" + timestamp + ": " + message;
};
