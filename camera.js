/**
* Created by sungwoo on 14. 4. 10.
*/
///<reference path='def/node.d.ts' />
///<reference path='def/opencv.d.ts' />
var cv = require('opencv');

var capture = new cv.VideoCapture(0);

var win = new cv.NamedWindow('cam');

//var capture = new cv.VideoCapture('/dev/video0');
setInterval(function () {
    capture.read(function (err, im) {
        console.log(im);

        im.detectObject('./haarcascades/haarcascade_frontalface_alt.xml', {}, function (err, faces) {
            faces.forEach(function (face) {
                //im.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height], [0,255,0], 2);
                im.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height]);
            });
            win.show(im);
            var res = win.blockingWaitKey(1);
            console.log(res);
        });
        //        im.convertGrayscale();
        //        im.gaussianBlur([7,7]);
        //        im.canny(0, 30);
        //        win.show(im);
    });
}, 1000);
//# sourceMappingURL=camera.js.map
