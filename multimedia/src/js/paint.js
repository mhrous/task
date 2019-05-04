const eraserPaint = (width, points) => {
  LAST_LAYER.graphics.strokeWeight(width);
  LAST_LAYER.graphics.noFill();
  LAST_LAYER.graphics.stroke(BACKGROUND);

  drawPoint(points);
};
const pencilePaint = (width, points, color, opacity) => {
  opacity = Math.floor(map(opacity, 0, 100, 0, 255));
  LAST_LAYER.graphics.strokeWeight(width);
  LAST_LAYER.graphics.noFill();

  LAST_LAYER.graphics.stroke(color.r, color.g, color.b, opacity);
  drawPoint(points);
};

const pallPaint = (color, opacity, points) => {
  opacity = Math.floor(map(opacity, 0, 100, 0, 255));

  let _x = points[0].x;
  let _y = points[0].y;
  const selectColor = get(_x, _y);
  let _q = [
    [_x, _y]
  ];
  const _h = {};
 
  addLayerForPaint('pail');
  LAST_LAYER.graphics.strokeWeight(1);

  LAST_LAYER.graphics.stroke(color.r, color.g, color.b, opacity);
  while (_q.length) {
    const [x, y] = _q.pop();
    if (_h[`${x}_${y}`]) continue;
    _h[`${x}_${y}`] = true;
    const myColor = get(x, y);
    if (
      myColor[0] == selectColor[0] &&
      myColor[1] == selectColor[1] &&
      myColor[2] == selectColor[2] &&
      myColor[3] == selectColor[3]
    ) {
      LAST_LAYER.graphics.point(x, y, 1, 1);
      getNeighbours(x, y).forEach(([i, j]) => {
        if (!_h[`${i}_${j}`]) _q.push([i, j]);
      });
    }
  }
  addLayerForPaint();
};

const paint = ({
  type,
  width,
  points,
  color,
  opacity
}) => {
  switch (type) {
    case 'eraser':
      eraserPaint(width, points);
      break;
    case 'pencil':
      pencilePaint(width, points, color, opacity);
      break;
    case 'pail':
      pallPaint(color, opacity, points);
      break;
    default:
      break;
  }
};

const reDrawLast = () => {
  LAST_LAYER.graphics.clear();
  for (let step of LAST_LAYER.steps) paint(step);
};

const initForPaint = () => {
  if (!LAST_LAYER) addLayerForPaint();
  else if (LAST_LAYER.type != 'paint') {
    addLayerForPaint();
  }
  LAST_LAYER = _.last(LAYER);
};