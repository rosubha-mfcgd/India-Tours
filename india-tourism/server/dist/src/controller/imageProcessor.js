"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
require("../logNginx");
const processImage = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { fileId, fileName, mimeType } = req.body;
    const imageData = {
        fileId: fileId, // Example: 1x1 transparent PNG
        fileName: fileName,
        mimeType: mimeType
    };
    try {
        const base64Data = imageData.fileId.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        if (imageBuffer && Buffer.isBuffer(imageBuffer)) {
            console.log(`Image data found, size: ${imageBuffer.length} bytes`);
            // Set the content type header for the response
            res.set('Content-Type', 'image/png');
            //  console.log("Image successfully saved as output_image.jpg");
            res.writeHead(200, {
                'Content-Type': 'image/png', // Adjust content type based on your image format
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Length': imageBuffer.length
            });
            // Send the image buffer as the response body
            res.end(imageBuffer);
            // Open a download stream and pipe it to the response
            const downloadStream = bucket.openDownloadStreamByName(filename);
            downloadStream.pipe(res);
        }
    }
    catch (error) {
        console.log("Error reading BSON file:", error);
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return doLogin(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
    }
});
module.exports = { processImage };
