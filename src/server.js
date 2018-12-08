import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import fr from 'face-recognition';
import fs from 'fs';
import path from 'path';
import services from './services';
import {drawPredictions} from './utils/imageUtils';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server.use(require('body-parser').json({ limit: '10mb' }));

const tempDir = `${process.cwd()}`;
const tempImageName = path.join(tempDir, 'temp','tempUpload.jpg');
const resultImageName = path.join(tempDir, 'temp','result.jpg');

server.post('/faces', async (req, res) => {
  const img = fr.loadImage(tempImageName);
  const detector = fr.FaceDetector();
  const predictorFive = fr.FaceLandmark5Predictor();
  const predictorSixtyEight = fr.FaceLandmark68Predictor()
  const faceRectangles = detector.locateFaces(img);
  const faceImages = detector.detectFaces(img);

  fr.tileImages(faceImages)

  const frontalFaceDetector = new fr.FrontalFaceDetector();
  const faceRects = frontalFaceDetector.detect(img);
  const faceShapesPredictorFive = faceRects.map(rect => predictorFive.predict(img, rect));
  const faceShapesPredictorSixtyEight = faceRects.map(rect => predictorSixtyEight.predict(img, rect));

  const faceShapesPredictorFivePoints = faceShapesPredictorFive.map(prediction => prediction.getParts());
  const faceShapesPredictorSixtyEightPoints = faceShapesPredictorSixtyEight.map(prediction => prediction.getParts());

  drawPredictions(tempImageName, img, faceRects[0], faceShapesPredictorFivePoints[0], faceShapesPredictorSixtyEightPoints[0])
  .then((resultImage) => {
    var data = resultImage.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFileSync(resultImageName, buf);
    
    res.status(200).json({
      img,
      resultImage,
      faceRectangles,
      faceRects,
      faceImages,
      predictorFive: {
        faceShapesPredictorFive,
        faceShapesPredictorFivePoints
      },
      predictorSixtyEight: {
        faceShapesPredictorSixtyEight,
        faceShapesPredictorSixtyEightPoints
      }
    });
  })
});

server.post('/tempUploadImage', function(req, res) {
  const image = req.body.image;
  if (!image) {
    return res.status(422).send('No image was uploaded.');
  }
  
  var data = image.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFileSync(tempImageName, buf);

  return res.status(200).send(image);
});

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Emotion Recognition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
