/**
* Created by sungwoo on 14. 4. 10.
*/
///<reference path='def/node.d.ts' />
var cv = require('opencv');

var win = new cv.NamedWindow('cam', 1);

var capture = new cv.VideoCapture(0);

//var camera = new cv.VideoCapture(0);
setInterval(function () {
    var img = cv.QueryFrame(capture);
    cv.ShowImage("camera", img);
    if (cv.WaitKey(10) == 27) {
        process.exit(0);
    }
    //    camera.read(function(err, im) {
    //        console.log(err);
    //        console.log(im);
    //        im.save('cam.png');
    //    });
}, 1000);
//# sourceMappingURL=camera.js.map
