/**
* Created by sungwoo on 14. 4. 10.
*/
///<reference path='def/node.d.ts' />
///<reference path='def/opencv.d.ts' />
var cv = require('opencv');

var win = new cv.NamedWindow('cam');

//var capture = new cv.VideoCapture('/dev/video0');
var capture = new cv.VideoCapture(0);

setInterval(function () {
    capture.read(function (err, im) {
        console.log(err);
        console.log(im);
        console.log(im.empty());
        if (!im.empty()) {
            win.show(im);
        }
    });
}, 1000);
//# sourceMappingURL=camera.js.map
