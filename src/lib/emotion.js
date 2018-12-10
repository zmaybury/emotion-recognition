import * as tf from '@tensorflow/tfjs';
require('@tensorflow/tfjs-node');
import {loadImage} from './image';
import {getFaces, preprocessToTensor, inferEmotion} from './face';
import {TEMP_IMAGE_NAME, EMOTION_MODEL_PATH} from '../constants';

const EMOTION_MODEL_FILE_PATH = `file://${EMOTION_MODEL_PATH}`;

export const getFacesAndEmotion = async () => {

    const emotionModel = await tf.loadModel(EMOTION_MODEL_FILE_PATH);

    const inputShape = [
        emotionModel.feedInputShapes[0][1],
        emotionModel.feedInputShapes[0][2]
    ]

    let imageRGB = await loadImage(TEMP_IMAGE_NAME, false);
    let imageGray = await loadImage(TEMP_IMAGE_NAME, true);

    const faces = await getFaces(imageGray);

    const results = [];

    for (const face of faces) {
        let faceImage = await imageRGB.getRegion(face);
        let tensor = await preprocessToTensor(faceImage, inputShape);

        results.push({
            face: { x: face.x, y: face.y, height: face.height, width: face.width },
            emotion: await inferEmotion(tensor, emotionModel),
        });
    }
    return results;
}