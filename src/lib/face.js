import * as tf from '@tensorflow/tfjs';
import _ from 'lodash';
import cv from 'opencv4nodejs';
import {getEmotionLabel} from './util'
import {FACE_MODEL_PATH} from '../constants';

const faceModel = new cv.CascadeClassifier(FACE_MODEL_PATH);

export const getFaces = async (image) => {
    const facesResult = await faceModel.detectMultiScaleAsync(image);

    const faces = facesResult.objects.map(function (face, i) {
        if (facesResult.numDetections[i] < 10) {
            return null;
        }

        return face;
    });   

    return faces.filter((face) => { 
        return face;
    });
}

export const preprocessToTensor = async (faceImage, targetSize) => {
    faceImage = await faceImage.resizeAsync(targetSize[0], targetSize[1]);
    faceImage = await faceImage.bgrToGrayAsync();

    let tensor = tf.tensor3d(_.flattenDeep(faceImage.getDataAsArray()), [64, 64, 1]);

    tensor = tensor.asType('float32');
    tensor = tensor.div(255.0);
    tensor = tensor.sub(0.5);
    tensor = tensor.mul(2.0);
    tensor = tensor.reshape([1, 64, 64, 1]);

    return tensor;
}

export const inferEmotion = async (tensor, model) => {
    const result = await model.predict(tensor)

    return getEmotionLabel(result);
}
