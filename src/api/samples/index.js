import express from 'express'
import all from './all';
import single from './single';

const samples = express.Router();


samples.get('/', all);
samples.get('/:emotionId', single);

export default samples;