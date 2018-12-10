import path from 'path';

export const WORKING_DIR = `${process.cwd()}`;
export const TEMP_IMAGE_NAME = path.join(WORKING_DIR, 'temp','tempUpload.jpg');
export const RESULT_IMAGE_NAME = path.join(WORKING_DIR, 'temp','result.jpg');
export const MODELS_DIR = path.join(WORKING_DIR, 'src', 'lib', 'models' );
export const EMOTION_MODEL_PATH = path.join(MODELS_DIR, 'fer2013', 'model.json');
export const FACE_MODEL_PATH = path.join(MODELS_DIR, 'haarcascade_frontalface_default.xml');