class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(x => Math.tanh(x), y => 1 - y * y);

class N {
  constructor(obj) {
    this.array = [...obj];
    this.weight = {};
    this.previousWeight = {};
    this.previousBias = {};
    this.forWord = {};
    this.bias = {};
    this.initWeight();
    this.initBias();

    this.setLearningRate();
    this.setActivationFunction();
    this.setForgitFactor();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setForgitFactor(forgit_factor = 0.1) {
    this.forgit_factor = forgit_factor;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  initWeight() {
    for (let i = 1; i < this.array.length; i++) {
      let k = `${i - 1} ${i}`;
      let value = new Matrix(this.array[i], this.array[i - 1]);
      //  value.randomize();
      this.weight[k] = value;
      this.previousWeight[k] = new Matrix(this.array[i], this.array[i - 1]);
    }
  }

  initBias() {
    for (let i = 1; i < this.array.length; i++) {
      let k = `${i}`;
      let value = new Matrix(this.array[i], 1);
      // value.randomize();
      this.bias[k] = value;
      this.previousBias[k] = new Matrix(this.array[i], 1);
    }
  }

  predict(input_array) {
    let inputs = Matrix.fromArray(input_array);
    this.forWord[`-1 0`] = inputs.copy();
    let output = inputs.copy();
    for (let i = 1; i < this.array.length; i++) {
      let k = `${i - 1} ${i}`;
      output = Matrix.multiply(this.weight[k], output.copy());
      output.add(this.bias[i]);
      output.map(this.activation_function.func);
      this.forWord[k] = output.copy();
    }
  }

  error(inputs, targets) {
    const length = inputs.length;
    const size = this.array.length - 1;
    const key = `${size - 1} ${size}`;
    const totalError = new Matrix(2, 1);
    for (let i = 0; i < length; i++) {
      const target = Matrix.fromArray(targets[i]);
      this.predict(inputs[i]);
      const output = this.forWord[key].copy();

      let error = Matrix.subtract(target, output);
      error = Matrix.map(error, x => x * x);
      totalError.add(error);
    }

    return Matrix.map(totalError, x => x / length);
  }
  loss(inputs, targets) {
    const cost = this.error(inputs, targets).toArray();
    return cost[1] + cost[0];
  }

  Backpropagation({
    trainInputs,
    trainOutputs,
    testInputs,
    testOutput,
    maxEpoch,
    stopError
  }) {
    const trainCost = [];
    const testCost = [];
    for (let epoch = 0; epoch < maxEpoch; epoch++) {
      for (let j = 0; j < trainInputs.length; j++) {
        const input_array = trainInputs[j];
        const target_array = trainOutputs[j];

        this.predict(input_array);
        const size = this.array.length - 1;
        let key = `${size - 1} ${size}`;
        let output = this.forWord[key].copy();

        let targets = Matrix.fromArray(target_array);
        let er = Matrix.subtract(targets, output);
        for (let i = this.array.length - 1; i > 0; i--) {
          key = `${i - 1} ${i}`;
          const previousKey = `${i - 2} ${i - 1}`;
          const outputLayer = this.forWord[key].copy();
          const inputLayer = this.forWord[previousKey].copy();
          let gradients = Matrix.map(
            outputLayer,
            this.activation_function.dfunc
          );
          gradients.multiply(er);
          gradients.multiply(this.learning_rate);
          let inputLayer_T = Matrix.transpose(inputLayer);
          let weight_deltas = Matrix.multiply(gradients, inputLayer_T);
          this.weight[key].add(weight_deltas);
          this.bias[i].add(gradients);
          let weight_t = Matrix.transpose(this.weight[key]);
          er = Matrix.multiply(weight_t, er);
        }
      }
      const trainCostInThisEpoch = this.loss(trainInputs, trainOutputs);
      const testCostInThisEpoch = this.loss(testInputs, testOutput);
      trainCost.push({ y: trainCostInThisEpoch, x: epoch });
      testCost.push({ y: testCostInThisEpoch, x: epoch });
      if (trainCostInThisEpoch < stopError && testCostInThisEpoch < stopError)
        break;
    }

    return { trainCost, testCost };
  }

  BackpropagationWithMomentum({
    trainInputs,
    trainOutputs,
    testInputs,
    testOutput,
    maxEpoch,
    stopError
  }) {
    const trainCost = [];
    const testCost = [];
    for (let epoch = 0; epoch < maxEpoch; epoch++) {
      for (let j = 0; j < trainInputs.length; j++) {
        const input_array = trainInputs[j];
        const target_array = trainOutputs[j];

        this.predict(input_array);
        const size = this.array.length - 1;
        let key = `${size - 1} ${size}`;
        let output = this.forWord[key].copy();

        let targets = Matrix.fromArray(target_array);
        let er = Matrix.subtract(targets, output);
        for (let i = this.array.length - 1; i > 0; i--) {
          key = `${i - 1} ${i}`;
          const previousKey = `${i - 2} ${i - 1}`;
          const outputLayer = this.forWord[key].copy();
          const inputLayer = this.forWord[previousKey].copy();
          let gradients = Matrix.map(
            outputLayer,
            this.activation_function.dfunc
          );
          gradients.multiply(er);
          gradients.multiply(this.learning_rate);
          let inputLayer_T = Matrix.transpose(inputLayer);
          let weight_deltas = Matrix.multiply(gradients, inputLayer_T);
          this.weight[key].add(weight_deltas);
          //console.log(this.previousWeight, epoch);
          this.previousWeight[key].multiply(this.forgit_factor);
          // console.log(this.weight[key], this.previousWeight[key]);

          this.weight[key].add(this.previousWeight[key].copy());
          this.previousWeight[key] = weight_deltas.copy();

          this.bias[i].add(gradients);
          this.previousBias[i].multiply(this.forgit_factor);
          this.bias[i].add(this.previousBias[i].copy());
          this.previousBias[i] = gradients.copy();
          let weight_t = Matrix.transpose(this.weight[key]);
          er = Matrix.multiply(weight_t, er);
        }
      }
      const trainCostInThisEpoch = this.loss(trainInputs, trainOutputs);
      const testCostInThisEpoch = this.loss(testInputs, testOutput);
      trainCost.push({ y: trainCostInThisEpoch, x: epoch });
      testCost.push({ y: testCostInThisEpoch, x: epoch });
      if (trainCostInThisEpoch < stopError && testCostInThisEpoch < stopError)
        break;
    }

    return { trainCost, testCost };
  }

  levenbergMarquardt({
    trainInputs,
    trainOutputs,
    testInputs,
    testOutput,
    maxEpoch,
    stopError
  }) {
    const trainCost = [];
    const testCost = [];
    for (let epoch = 0; epoch < maxEpoch; epoch++) {
      for (let j = 0; j < trainInputs.length; j++) {
        const input_array = trainInputs[j];
        const target_array = trainOutputs[j];

        this.predict(input_array);
        const size = this.array.length - 1;
        let key = `${size - 1} ${size}`;
        let output = this.forWord[key].copy();

        let targets = Matrix.fromArray(target_array);
        let er = Matrix.subtract(targets, output);
        for (let i = this.array.length - 1; i > 0; i--) {
          key = `${i - 1} ${i}`;
          const previousKey = `${i - 2} ${i - 1}`;
          const outputLayer = this.forWord[key].copy();
          const inputLayer = this.forWord[previousKey].copy();
          let jacobian = Matrix.map(
            outputLayer,
            this.activation_function.dfunc
          );
          let hessian = Matrix.hessianMatrix(
            jacobian.copy(),
            this.learning_rate
          );
          hessian = Matrix.multiply(hessian, jacobian);

          hessian.multiply(er);

          jacobian.multiply(er);
          jacobian.multiply(this.learning_rate);
          let inputLayer_T = Matrix.transpose(inputLayer);
          let weight_deltas = Matrix.multiply(hessian, inputLayer_T);
          this.weight[key].add(weight_deltas);
          this.bias[i].add(hessian);
          let weight_t = Matrix.transpose(this.weight[key]);
          er = Matrix.multiply(weight_t, er);
        }
      }
      const trainCostInThisEpoch = this.loss(trainInputs, trainOutputs);
      const testCostInThisEpoch = this.loss(testInputs, testOutput);
      trainCost.push({ y: trainCostInThisEpoch, x: epoch });
      testCost.push({ y: testCostInThisEpoch, x: epoch });
      if (trainCostInThisEpoch < stopError && testCostInThisEpoch < stopError)
        break;
    }

    return { trainCost, testCost };
  }
}
