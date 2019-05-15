const loader = $('#loader');
const paeg = $('.page-content');
const header = $('.header');

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

function setup() {
  const colorPredictorContainer = select('#color_predictor_container');

  const cnv = createCanvas(700, 500);
  cnv.parent(colorPredictorContainer);
  cnv.mousePressed(pickColor);

  noLoop();
  brain1 = new N(layers);
  brain2 = new N(layers);
  brain3 = new N(layers);

  const { trainInputs, trainOutputs, testInputs, testOutput } = createDataSet(
    dataSetSize
  );
  const res1 = brain1.Backpropagation({
    trainInputs,
    trainOutputs,
    testInputs,
    testOutput,
    maxEpoch,
    stopError
  });
  b_train.data = res1.trainCost;
  b_test.data = res1.testCost;

  const res2 = brain2.BackpropagationWithMomentum({
    trainInputs,
    trainOutputs,
    testInputs,
    testOutput,
    maxEpoch,
    stopError
  });
  m_train.data = res2.trainCost;
  m_test.data = res2.testCost;
  const res3 = brain3.levenbergMarquardt({
    trainInputs,
    trainOutputs,
    testInputs,
    testOutput,
    maxEpoch,
    stopError
  });
  l_train.data = res3.trainCost;
  l_test.data = res3.testCost;

  loader.addClass('hide');
  paeg.removeClass('hide');
  header.removeClass('hide');

  pickColor();
}

// function mousePressed() {
//   pickColor();
// }

function colorPredictor(r, g, b) {
  let inputs = [r / 255, g / 255, b / 255];
  let brain;

  if (brainNumber == 1) {
    brain = brain1;
    NAME = 'Backpropagation';
  } else if (brainNumber == 2) {
    NAME = 'Momentum';
    brain = brain2;
  } else if (brainNumber == 3) {
    NAME = 'levenberg';
    brain = brain3;
  }

  brain.predict(inputs);
  let outputs = brain.forWord[key].toArray();
  console.log(outputs, trainColor(r, g, b), brainNumber);

  if (outputs[0] > outputs[1]) {
    return 'black';
  } else {
    return 'white';
  }
}

function draw() {
  background(r, g, b);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 100, width / 2, height);

  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text(NAME, (1 * width) / 2, 50);
  text('black', (1 * width) / 4, height / 2 - 25);
  fill(255);
  text('white', (3 * width) / 4, height / 2 - 25);

  let which = colorPredictor(r, g, b);
  if (which === 'black') {
    fill(0);
    ellipse((1 * width) / 4, height / 2 + 75, 60, 60);
  } else {
    fill(255);
    ellipse((3 * width) / 4, height / 2 + 75, 60, 60);
  }
}

$('.header a').on('click', function() {
  const colorContainer = $('#color_predictor_container');
  const ChartContainer = $('#chart-container');

  $('.nav-link.active').removeClass('active');
  $(this).addClass('active');
  const id = $(this).data('id');
  console.log(id);
  if (id == 1) {
    brainNumber = 1;
    colorContainer.removeClass('hide');
    ChartContainer.addClass('hide');
  } else if (id == 2) {
    colorContainer.removeClass('hide');
    ChartContainer.addClass('hide');

    brainNumber = 2;
  } else if (id == 3) {
    colorContainer.removeClass('hide');
    ChartContainer.addClass('hide');

    brainNumber = 3;
  } else {
    colorContainer.addClass('hide');

    ChartContainer.removeClass('hide');
  }

  colorPredictor()
  redraw()
});
