const loss = (predict, target) =>
  Math.pow(predict[0] - target[0], 2) + Math.pow(predict[1] - target[1], 2);

const trainColor = (r, g, b) => {
  if (r + g + b > (255 * 3) / 2) {
    return [1, 0];
  } else {
    return [0, 1];
  }
};

const createDataSet = n => {
  const trainInputs = [],
    trainOutputs = [],
    testInputs = [],
    testOutput = [];
  for (let i = 0; i < n; i++) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    if (i % 3) {
      trainInputs.push([r / 255, g / 255, b / 255]);
      trainOutputs.push(trainColor(r, g, b));
    } else {
      testInputs.push([r / 255, g / 255, b / 255]);
      testOutput.push(trainColor(r, g, b));
    }
  }
  return { trainInputs, trainOutputs, testInputs, testOutput };
};
