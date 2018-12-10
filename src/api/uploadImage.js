import fs from 'fs';
import {TEMP_IMAGE_NAME} from '../constants';

export default (req, res) => {
    const image = req.body.image;
    if (!image) {
      return res.status(422).send('No image was uploaded.');
    }
    
    var data = image.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFileSync(TEMP_IMAGE_NAME, buf);
  
    return res.status(200).send(image);
};