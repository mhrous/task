int 


const convertToBinary = (int, dim) => {
  const array = [];
  for (let i = 0; i < dim; i++) {
    array.push(int % 2);
    int = Math.floor(int / 2);
  }
  return array.reverse();
};

const convertToInt = array => {
  let sum = 0;
  array = array.reverse();
  for (let i = array.length - 1; i >= 0; i--) {
    sum += Math.pow(2, i) * array[i];
  }
  return sum;
};

const createDataSet = n => {
  const trainInputs = [],
    trainOutputs = [],

  for (let i = 0; i < n; i++) {
    const int_a = Math.floor(Math.random() * (MAX_VAL / 2));
    const int_b = Math.floor(Math.random() * (MAX_VAL / 2));
    const int_c = int_a + int_b;
    if (i % 5) {
      trainInputs.push([
        convertToBinary(int_a, BINARY_DIM),
        convertToBinary(int_b, BINARY_DIM)
      ]);
      trainOutputs.push(convertToBinary(int_c, BINARY_DIM));
    } else {
      testInputs.push([
        convertToBinary(int_a, BINARY_DIM),
        convertToBinary(int_b, BINARY_DIM)
      ]);
      testOutput.push(convertToBinary(int_c, BINARY_DIM));
    }
  }
  return { trainInputs, trainOutputs};
};
