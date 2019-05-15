const newArray = n => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(-1);
  }
  return array;
};

const createDateset = () => {
  const inputs = [];
  const outputs = {};
  for (let i = 0; i < MAX_PERCEPTRON; i++) {
    outputs[i] = [];
  }

  for (let point of dataSet) {
    inputs.push([point.x, point.y, 1]);
    const array = newArray(MAX_PERCEPTRON);
    array[point.id] = 1;
    for (let i = 0; i < MAX_PERCEPTRON; i++) {
      outputs[i].push(array[i]);
    }
  }
  return { inputs, outputs };
};
