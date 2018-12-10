import {getAllEmotions} from '../database';

export default (req, res) => {
    getAllEmotions()
    .then((result) => {
        res.status(200).json(result);
    })
};