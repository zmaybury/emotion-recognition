import fr from 'face-recognition';
import { createCanvas, loadImage } from 'canvas';

export const drawRect = (ctx, rect, color) => {
    ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    ctx.beginPath()
    ctx.moveTo(rect.left, rect.top);
    ctx.lineTo(rect.right, rect.top);
    ctx.lineTo(rect.right, rect.bottom);
    ctx.lineTo(rect.left, rect.bottom);
    ctx.lineTo(rect.left, rect.top);
    ctx.stroke();
}

export const draw5PointPrediction = (ctx, fpp, color) => {
    ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(fpp[0].x, fpp[0].y);
    ctx.lineTo(fpp[1].x, fpp[1].y);
    ctx.lineTo(fpp[4].x, fpp[4].y);
    ctx.lineTo(fpp[3].x, fpp[3].y);
    ctx.lineTo(fpp[2].x, fpp[2].y);
    ctx.stroke();
}

export const draw68PointPrediction = (ctx, sepp, color, strokeWidth) => {
    for(let i=0; i<sepp.length; i++) {
        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sepp[i].x, sepp[i].y, 5, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}

export const drawPredictions = (imagePath, image, faceRect, fivePointPrediction, sixtyEightPointPrediction) => {
    // Render image into canvas
    return loadImage(imagePath).then((loadedImage) => {
        const canvas = createCanvas(image.cols, image.rows);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(loadedImage, 0, 0, image.cols, image.rows);
        drawRect(ctx, faceRect, {r: 0, g: 0, b: 0, a: 1});
        draw5PointPrediction(ctx, fivePointPrediction, {r: 0, g: 0, b: 255, a: 1});
        draw68PointPrediction(ctx, sixtyEightPointPrediction, {r: 0, g: 255, b: 0, a: 1}, 1);
        return canvas.toDataURL();
    })
}