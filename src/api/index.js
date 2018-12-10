import express from 'express'
import faces from './faces';
import uploadImage from './uploadImage';
import samples from './samples';
import emotionsAPI from './emotions';
import emotion from './emotion';

const api = express.Router();

api.post('/faces', faces);
api.post('/facesAndEmotion', emotion);
api.post('/tempUploadImage', uploadImage);
api.use('/samples', samples);
api.get('/emotions', emotionsAPI);

export default api;