const mirrorX = ({
  pixels,
  width = WIDTH,
  height = HEIGHT,
  startWidth = 0,
  startHeight = 0
}) => {
  const img = createImage(width, height);
  let x = width-1;
  let y = 0;
  img.loadPixels();
  _.range(startWidth, width).map(i => {
    _.range(startHeight, height).map(j => {
      const index = (i * width + j) * 4;

      img.set(x, y, [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3]
      ]);
      x--;
      if (x <0) {
        x = width-1;
        y++;
      }
    });
  });

  img.updatePixels();
  return img;
};

const mirrorY = ({
  pixels,
  width = WIDTH,
  height = HEIGHT,
  startWidth = 0,
  startHeight = 0
}) => {
  const img = createImage(width, height);
  let x = 0;
  let y = height - 1;
  img.loadPixels();
  _.range(startWidth, width).map(i => {
    _.range(startHeight, height).map(j => {
      const index = (i * width + j) * 4;

      img.set(x, y, [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3]
      ]);
      x++;
      if (x >= width) {
        x = 0;
        y--;
      }
    });
  });

  img.updatePixels();
  return img;
};

const rotateLaft = ({
  pixels,
  width = WIDTH,
  height = HEIGHT,
  startWidth = 0,
  startHeight = 0
}) => {
  const img = createImage(width, height);
  let x = 0;
  let y = height - 1;
  img.loadPixels();
  _.range(startWidth, width).map(i => {
    _.range(startHeight, height).map(j => {
      const index = (i * width + j) * 4;

      img.set(x, y, [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3]
      ]);
      y--;
      if (y < 0) {
        y = height - 1;
        x++;
      }
    });
  });

  img.updatePixels();
  return img;
};
const rotateRight = ({
  pixels,
  width = WIDTH,
  height = HEIGHT,
  startWidth = 0,
  startHeight = 0
}) => {
  const img = createImage(width, height);
  let x = width - 1;
  let y = 0;
  img.loadPixels();
  _.range(startWidth, width).map(i => {
    _.range(startHeight, height).map(j => {
      const index = (i * width + j) * 4;

      img.set(x, y, [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3]
      ]);
      y++;
      if (y >= height) {
        y = 0;
        x--;
      }
    });
  });

  img.updatePixels();
  return img;
};
