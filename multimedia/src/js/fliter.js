const grayFilter = () => {
  if (LAST_LAYER && LAST_LAYER.filter == 'gray') return;
  loadPixels();

  applyOnPixel(pixels, (r, g, b, a) => {
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return [gray, gray, gray, a];
  });
  const img = getImage({ pixels });

  addImageLayer({ img, option: { filter: 'gray' } });
};

const thresholdFilter = (level = 0.5) => {
  if (LAST_LAYER && LAST_LAYER.filter == 'threshold') return;
  const thresh = Math.floor(level * 255);
  loadPixels();

  applyOnPixel(pixels, (r, g, b, a) => {
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const val = gray > thresh ? 255 : 0;
    return [val, val, val, a];
  });
  const img = getImage({ pixels });

  addImageLayer({ img, option: { filter: 'threshold' } });
};

const invertFilter = () => {
  if (LAST_LAYER && LAST_LAYER.filter == 'invert') return;
  loadPixels();

  applyOnPixel(pixels, (r, g, b, a) => [255 - r, 255 - g, 255 - b, a]);
  const img = getImage({ pixels });

  addImageLayer({ img, option: { filter: 'invert' } });
};
