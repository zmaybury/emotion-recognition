
const detectKeyPoints = (img, detector) => {
  const keyPoints = detector.detect(img);
  const drawKeyPointsImg = global.cv.drawKeyPoints(img, keyPoints);
  return drawKeyPointsImg;
};

exports.detectKeyPointsORB = img => detectKeyPoints(img, new global.cv.ORBDetector());
exports.detectKeyPointsSURF = img => detectKeyPoints(img, new global.cv.SURFDetector());
exports.detectKeyPointsSIFT = img => detectKeyPoints(img, new global.cv.SIFTDetector());