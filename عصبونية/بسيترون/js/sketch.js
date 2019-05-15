let canvas;
let train;
let drowPerspetron = false;

function setup() {
  const canvasParent = select('.canvas');

  canvas = createCanvas(500, 500);
  canvas.parent(canvasParent);

  for (let i = 0; i < MAX_PERCEPTRON; i++) {
    perceptron.push(new Perceptron(input, learning_rate));
  }
  train = select('.train');
  train.mousePressed(trainPerceptron);
  noLoop();
}

function mousePressed(e) {
  if (e.target == canvas.elt) {
    addPoint(mouseX, mouseY);
  }
}
function draw() {
  background('#19a7bd');
  strokeWeight(4);
  stroke(255);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);

  for (let point of dataSet) {
    noStroke();
    fill(COLORS[point.id]);
    ellipse(point.x, point.y, 10, 10);
  }

  if (drowPerspetron) {
    for (let i = 0; i < index; i++) {
      stroke(COLORS[i]);
      perceptron[i].draw();
    }
  }
}

function addPoint(x, y) {
  dataSet.push({ x, y, id: selectedId });
  redraw();
}

function trainPerceptron() {
  const acc = [];
  const { inputs, outputs } = createDateset();
  if (inputs.length == 0) {
    return;
  }

  for (let i = 0; i < index; i++) {
    acc.push(perceptron[i].train(inputs, outputs[i]));
  }
  drowPerspetron = true;
  let str = '';
  for (let i in acc) {
    str += `           <div class="fall">
    <div class="part" style="background:${COLORS[i]}"></div>
    ${Math.floor(acc[i])}
  </div>`;
  }
  $('.res').html(str);
  redraw();
}
