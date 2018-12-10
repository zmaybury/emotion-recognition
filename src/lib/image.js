import cv from 'opencv4nodejs';

export const loadImage = async (path, grayscale) => {
  let image = await cv.imreadAsync(path)
  if (grayscale) image = await image.bgrToGrayAsync()

  return image
}
