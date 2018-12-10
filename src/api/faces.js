import fs from 'fs';
import fr from 'face-recognition';
import {TEMP_IMAGE_NAME, RESULT_IMAGE_NAME} from '../constants';
import {drawPredictions} from '../utils/imageUtils';

export default async (req, res) => {
    const img = fr.loadImage(TEMP_IMAGE_NAME);
    const detector = fr.FaceDetector();
    const predictorFive = fr.FaceLandmark5Predictor();
    const predictorSixtyEight = fr.FaceLandmark68Predictor()
    const faceRectangles = detector.locateFaces(img);
    const faceImages = detector.detectFaces(img);

    fr.tileImages(faceImages)

    const frontalFaceDetector = new fr.FrontalFaceDetector();
    const faceRects = frontalFaceDetector.detect(img);
    const faceShapesPredictorFive = faceRects.map(rect => predictorFive.predict(img, rect));
    const faceShapesPredictorSixtyEight = faceRects.map(rect => predictorSixtyEight.predict(img, rect));

    const faceShapesPredictorFivePoints = faceShapesPredictorFive.map(prediction => prediction.getParts());
    const faceShapesPredictorSixtyEightPoints = faceShapesPredictorSixtyEight.map(prediction => prediction.getParts());

    drawPredictions(TEMP_IMAGE_NAME, img, faceRects[0], faceShapesPredictorFivePoints[0], faceShapesPredictorSixtyEightPoints[0])
    .then((resultImage) => {
        var data = resultImage.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        fs.writeFileSync(RESULT_IMAGE_NAME, buf);
        
        res.status(200).json({
        img,
        resultImage,
        faceRectangles,
        faceRects,
        faceImages,
        predictorFive: {
            faceShapesPredictorFive,
            faceShapesPredictorFivePoints
        },
        predictorSixtyEight: {
            faceShapesPredictorSixtyEight,
            faceShapesPredictorSixtyEightPoints
        }
        });
    })
};