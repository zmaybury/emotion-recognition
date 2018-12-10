import {getAllSamples} from '../database';

export default (req, res) => {
    getAllSamples()
    .then((result) => {
        res.status(200).json(result);
    })
};