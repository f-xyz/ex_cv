// https://www.npmjs.org/package/opencv

/// <reference path='node.d.ts' />

declare module "opencv" {

    interface TMatricToBufferParam {
        ext: string; // .jpg or .png
        jpegQuality?: number;
        pngCompression?: number;
    }

    interface TPoint {
        x: number;
        y: number;
    }

    interface TSize {
        width: number;
        height: number;
    }

    interface TRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface TMinAreaRect {
        angle: number;
        size: TSize;
        points: TPoint[];
    }

    interface TMoments {
        m00: number;
        m10: number;
        m01: number;
        m11: number;
    }

    interface IContour {
        point(pos: number, index: number): TPoint;
        size(): number;
        cornerCount(pos: number): number;
        area(pos: number): number;
        arcLength(pos: number, isClosed: boolean): number;
        approxPolyDP(pos: number, epsilon: number, isClosed: boolean);
        convexHull(pos: number, clockwise: boolean);
        boundingRect(pos: number): TRect;
        minAreaRect(pos: number): TMinAreaRect;
        isConvex(pos: number): boolean;
        moments(pos: number): TMoments;
    }

    interface IMatrix {
        row(y: number): number[]; // [] length of width
        col(x: number): number[]; // [] length of height

        pixelRow(y: number): number[]; // [] length of width * 3, order of r, g, b
        pixelCol(x: number): number[]; // [] length of height * 3, order of r, g, b

        empty(): boolean;
        get(i: number, j: number): number;
        set(i: number, j: number, val: number, val2?: number);
        pixel(y: number, x: number, color?: number[]): number[]; // [r, g, b]
        width(): number;
        height() : number;
        size(): number[]; // [height, width]
        clone(): IMatrix;

        // SergeMv changes
        // img.toBuffer({ext: ".png", pngCompression: 9}); // default png compression is 3
        // img.toBuffer({ext: ".jpg", jpegQuality: 80});
        // img.toBuffer(); // creates Jpeg with quality of 95 (Opencv default quality)
        // via the ext you can do other image formats too (like tiff), see
        // http://docs.opencv.org/modules/highgui/doc/reading_and_writing_images_and_video.html#imencode
        //---------------------------
        // Provide default value
        toBuffer(param?: TMatricToBufferParam): NodeBuffer;
        toBufferAsync(cb: (err: Error, buf: NodeBuffer) => void, param?: TMatricToBufferParam);
        ellipse(x: number, y:number, width: number, height: number);
        rectangle(xy: number[], width_height: number[]);
        line(xy1: number[], xy2: number, thickness?: number); // default thickness = 1
        save(filename: string, cb?: (err: Error, res: number) => void): number;
        saveAsync(filename: string, cb: (err: Error, res: number) => void);
        resize(x: number, y: number, interpolation?: number);
        rotate(angle: number, x?: number, y?: number);
        copyTo(dest: IMatrix, x: number, y: number);
        pyrDown();
        pyrUp();
        channels(): number;

        convertGrayscale();
        convertHSVscale();
        gaussianBlur(xy: number[]); // 2 double array
        copy(): IMatrix;
        flip(flipCode: number): IMatrix;
        roi(x: number, y: number, w: number, h: number): IMatrix;
        ptr(line: number): NodeBuffer;
        absDiff(src1: IMatrix, src2: IMatrix);
        addWeighted(src1: IMatrix, src2: IMatrix); // cv::addWeighted(src1->mat, alpha, src2->mat, beta, gamma, self->mat);
        bitwiseXor(src1: IMatrix, src2: IMatrix); // cv::bitwise_xor(src1->mat, src2->mat, self->mat);
        countNonZero(): number;
        canny(lowThresh: number, highThresh: number); // cv::Canny(self->mat, self->mat, lowThresh, highThresh);
        dilate(niters: number); // cv::dilate(self->mat, self->mat, cv::Mat(), cv::Point(-1, -1), niters);
        erode(niters: number); // cv::erode(self->mat, self->mat, cv::Mat(), cv::Point(-1, -1), niters);

        findContours(): IContour;
        drawContour(cont: IContour, pos: number); // cv::drawContours(self->mat, cont->contours, pos, color, 1);
        drawAllContours(cont: IContour);

        goodFeaturesToTrack(): number[][]; // array of [x, y]
        houghLinesP(rho: number, theta: number, threshold: number, minLineLength: number, maxLineGap: number): number[][]; // array of lines [x1, y1, x2, y2]

        inRange(args_lowerb: number[], args_upperb: number[]);
        adjustROI(dtop: number, dbottom: number, dleft: number, dright: number);
        locateROI(): number[]; // wholeSize.width, wholeSize.height, ofs.x, ofs.y

        // type: "Binary", "Binary Inverted", "Threshold Truncated", "Threshold to Zero", "Threshold to Zero Inverted"
        threshold(threshold: number, maxVal: number, type?: string): IMatrix;
        adaptiveThreshold(maxVal: number, adaptiveMethod: number, thresholdType: number, blockSize: number, C: number): IMatrix;
        meanStdDev(): { mean: IMatrix; stddev: IMatrix; };

        /*
         if (!strcmp(sTransform, "CV_BGR2GRAY")) { iTransform = CV_BGR2GRAY; }
         else if (!strcmp(sTransform, "CV_GRAY2BGR")) { iTransform = CV_GRAY2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BGR2XYZ")) { iTransform = CV_BGR2XYZ; }
         else if (!strcmp(sTransform, "CV_XYZ2BGR")) { iTransform = CV_XYZ2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BGR2YCrCb")) { iTransform = CV_BGR2YCrCb; }
         else if (!strcmp(sTransform, "CV_YCrCb2BGR")) { iTransform = CV_YCrCb2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BGR2HSV")) { iTransform = CV_BGR2HSV; }
         else if (!strcmp(sTransform, "CV_HSV2BGR")) { iTransform = CV_HSV2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BGR2HLS")) { iTransform = CV_BGR2HLS; }
         else if (!strcmp(sTransform, "CV_HLS2BGR")) { iTransform = CV_HLS2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BGR2Lab")) { iTransform = CV_BGR2Lab; }
         else if (!strcmp(sTransform, "CV_Lab2BGR")) { iTransform = CV_Lab2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BGR2Luv")) { iTransform = CV_BGR2Luv; }
         else if (!strcmp(sTransform, "CV_Luv2BGR")) { iTransform = CV_Luv2BGR; }
         //
         else if (!strcmp(sTransform, "CV_BayerBG2BGR")) { iTransform = CV_BayerBG2BGR; }
         else if (!strcmp(sTransform, "CV_BayerGB2BGR")) { iTransform = CV_BayerGB2BGR; }
         else if (!strcmp(sTransform, "CV_BayerRG2BGR")) { iTransform = CV_BayerRG2BGR; }
         else if (!strcmp(sTransform, "CV_BayerGR2BGR")) { iTransform = CV_BayerGR2BGR; }
         */
        cvtColor(type: string);
        split(): IMatrix[];
        merge(jsChannels: IMatrix[]);
        equalizeHist();
        /*	mat.floodFill( { seedPoint: [1,1]   ,
         newColor: [255,0,0] ,
         rect:[[0,2],[30,40]] ,
         loDiff : [8,90,60],
         upDiff:[10,100,70]
         } );*/
        floodFill();

        // Match Template filter
        // Usage: output = input.matchTemplate("templateFileString", method);
       /*
         TM_SQDIFF        =0
         TM_SQDIFF_NORMED =1
         TM_CCORR         =2
         TM_CCORR_NORMED  =3
         TM_CCOEFF        =4
         TM_CCOEFF_NORMED =5
         */
        matchTemplate(filename: string, method?: number);

        /*
         result->Set(String::NewSymbol("minVal"), v_minVal);
         result->Set(String::NewSymbol("maxVal"), v_maxVal);
         result->Set(String::NewSymbol("minLoc"), o_minLoc);
         result->Set(String::NewSymbol("maxLoc"), o_maxLoc);
         */
        minMaxLoc();

        Eye(w: number, h: number): IMatrix;

        detectObject(classifier, opts: TDetectOptions, cb);

        inspect(): string;

    }


    interface TDetectOptions {
        scale?: number;
        neighbors?;
        min?;
    }

    interface IVideoCapture {
        read(cb: (err: Error, mat: IMatrix) => void);
    }

    export interface ImageDataStream {
        write(buf);
        end(b);
    }

    export interface ImageStream {
        write(buf);
    }

    export interface ObjectDetectionStream {
        write(m);
    }

    export interface VideoStream {
        read();
        pause();
        resume();
    }

    export interface INamedWindow {
        show(im: IMatrix);
        destroy();
        blockingWaitKey(time: number): number;
    }

    export var NamedWindow: {
        new (name: string): INamedWindow;
    }

    export var VideoCapture: {
        new (device: number): IVideoCapture;
        new (filename: string): IVideoCapture;
    }
}