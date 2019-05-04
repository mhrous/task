let cursorCanvas;

function setup() {
  CANVAS = createCanvas(WIDTH, HEIGHT);
  CANVAS.id(CANVAS_ID);
  CANVAS.mousePressed(PressedCanvas);
  CANVAS.mouseReleased(ReleasedCanvas);
  cursorCanvas = createGraphics(WIDTH, HEIGHT);
  colorMode(RGB, 255, 255, 255, 1);
  background(BACKGROUND);

  $('.canvas-container').append(CANVAS.canvas);
}

const drawCursor = () => {
  cursorCanvas.clear();
  let _colorFill, _widthStroke, _colorStroke, _x, _y, _w, _h;

  switch (OPTION.ACTIVE) {
    case 'tool':
      if (OPTION.TOOL.type == 'pail') break;
      if (OPTION.TOOL.marker) {
        _colorFill = get(mouseX, mouseY);
        _widthStroke = 5;
        _colorStroke = '#555';
        _x = mouseX + 25;
        _y = mouseY - 25;
        _w = _h = 40;
      } else if (OPTION.TOOL.type == 'pencil' || OPTION.TOOL.type == 'eraser') {
        _colorStroke =
          OPTION.TOOL.type == 'eraser'
            ? BACKGROUND
            : OPTION.TOOL.color.hexString;
        _colorFill = BACKGROUND;
        _widthStroke = 3;
        _x = mouseX;
        _y = mouseY;
        _w = _h = OPTION.TOOL.width;
      }
      cursorCanvas.stroke(_colorStroke);
      cursorCanvas.fill(_colorFill);
      cursorCanvas.strokeWeight(_widthStroke);
      cursorCanvas.ellipse(_x, _y, _w, _h);

      break;
  }
};

function draw() {
  background(BACKGROUND);
  _.range(0, LAYER.length).map(index => {
    const { graphics: img, x, y, w, h } = LAYER[index];
    image(img, x, y, w, h);
  });

  drawCursor();
  image(cursorCanvas, 0, 0);
}

function mouseDragged(e) {
  if (e.target.id != CANVAS_ID) return;
  if (
    OPTION.ACTIVE == 'tool' &&
    !OPTION.TOOL.marker &&
    OPTION.TOOL.type != 'pail'
  ) {
    const LAST_STEPS = _.last(LAST_LAYER.steps);
    LAST_STEPS.points.push({ x: mouseX, y: mouseY });
    reDrawLast();
  }
}
