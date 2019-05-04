const drawPoint = (points, layer = LAST_LAYER.graphics) => {
  if (points.length == 0) return;
  else if (points.length == 1) layer.point(points[0].x, points[0].y);
  else {
    layer.beginShape();
    _.range(0, points.length).map(index => {
      layer.vertex(points[index].x, points[index].y);
    });
    layer.endShape();
  }
};
const addImageLayer = ({
  img,
  x = 0,
  y = 0,
  w = WIDTH,
  h = HEIGHT,
  option = {}
}) => {
  STACK_HISTORY = [];
  const imageLayer = {
    graphics: img,
    x,
    y,
    w,
    h,
    ...option,
    type: 'img'
  };
  if (LAST_LAYER && LAST_LAYER.type == 'paint' && LAST_LAYER.steps.length == 0)
    LAYER.pop();
  LAYER.push(imageLayer);
  LAST_LAYER = imageLayer;
};
const addLayerForPaint = (type = 'paint') => {
  const newPaintLayer = {
    graphics: createGraphics(WIDTH, HEIGHT),
    steps: [],
    x: 0,
    y: 0,
    w: WIDTH,
    h: HEIGHT,
    type: 'paint'
  };
  LAYER.push(newPaintLayer);
  newPaintLayer.graphics.clear();
  LAST_LAYER = newPaintLayer;
};

const updateHistory = () => {
  // while (NONE_SHOW_HISTORY) {
  //   LAYER.pop();
  //   NONE_SHOW_HISTORY--;
  // }
  // Histroy.attr('max', LAYER.length);
  // Histroy.val(LAYER.length);
};

const applyOnPixel = (pixels, func) => {
  _.range(0, pixels.length, 4).map(index => {
    const [r, g, b, a] = func(
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3]
    );

    pixels[index] = r;
    pixels[index + 1] = g;
    pixels[index + 2] = b;
    pixels[index + 3] = a;
  });
};

const getImage = ({
  pixels,
  width = WIDTH,
  height = HEIGHT,
  startWidth = 0,
  startHeight = 0
}) => {
  const img = createImage(width, height);
  img.loadPixels();
  _.range(startWidth, width).map(i => {
    _.range(startHeight, height).map(j => {
      const index = (j * width + i) * 4;

      img.set(i, j, [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3]
      ]);
    });
  });

  img.updatePixels();
  return img;
};
const getNeighbours = (x, y) => {
  const res = [];
  if (x > 0) res.push([x - 1, y]);
  if (x < WIDTH - 1) res.push([x + 1, y]);
  if (y > 0) res.push([x, y - 1]);
  if (y < HEIGHT - 1) res.push([x, y + 1]);
  return res;
};

const backHistory = () => {
  let _end = false;
  while (!_end) {
    if (!LAYER.length) return;
    if (LAST_LAYER.type != 'paint') {
      STACK_HISTORY.push(LAYER.pop());
      LAST_LAYER = _.last(LAYER);
      _end = true;
    } else if (LAST_LAYER.steps.length) {
      console.log(8);
      STACK_HISTORY.push(LAST_LAYER.steps.pop());
      _end = true;
      reDrawLast();
    } else {
      STACK_HISTORY.push(LAYER.pop());
      LAST_LAYER = _.last(LAYER);
    }
  }
};
const frontHistory = () => {
  let _end = false;
  while (!_end) {
    if (!STACK_HISTORY.length) return;
    const _Last = STACK_HISTORY.pop();
    if (_Last.step) {
      LAST_LAYER.steps.push(_Last);
      _end = true;
      reDrawLast();
    } else {
      LAYER.push(_Last);
      LAST_LAYER = _Last;
      if (_Last.type != 'paint') _end = true;
    }
  }
};

const markerSelect = () => {
  const [r, g, b, a] = get(mouseX, mouseY);

  const color = new iro.Color(`rgb(${r}, ${g}, ${b})`);
  colorPicker.emit('color:change', color);
  $(`.image-container img[data-type="${OPTION.TOOL.type}"]`).addClass("active")

};
