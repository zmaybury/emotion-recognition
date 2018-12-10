import {getFacesAndEmotion} from '../lib/emotion';

export default async (req, res) => {
    const results = await getFacesAndEmotion();
    return res.status(200).json(results);
};