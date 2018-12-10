import {getSamplesByEmotionId} from '../database';

export default (req, res) => {
    getSamplesByEmotionId(req.params.emotionId)
    .then((result) => {
        res.status(200).json(result);
    })
};