const EMOTION_LABELS = {
  0: 'angry',
  1: 'disgust',
  2: 'fear',
  3: 'happy',
  4: 'sad',
  5: 'surprise',
  6: 'neutral'
}

export const getEmotionLabel = (result) => {
  const labels = Array.from(result.dataSync()).slice(0, 7)

  let maxIdx = null
  let maxVal = null
  for (let i = 0; i < labels.length; i++) {
    const val = labels[i]
    if (maxVal === null || maxVal < val) {
      maxVal = val
      maxIdx = i
    }
  }

  return {label: EMOTION_LABELS[maxIdx], maxVal};
}
