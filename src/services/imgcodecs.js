const pngPrefix = 'data:image/jpeg;base64,';
const jpgPrefix = 'data:image/png;base64,';

export const decodeFromBase64 = (base64DataString) => {
  const base64Data = base64DataString.replace(pngPrefix, '').replace(jpgPrefix, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const img = global.cv.imdecode(buffer);
  return img;
};

export const encodeJpgBase64 = (img) => {
  return global.cv.imencode('.jpg', img).toString('base64');
}