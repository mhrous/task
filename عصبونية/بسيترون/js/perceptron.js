class Perceptron {
  constructor(n, c) {
    this.weights = new Array(n);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
    this.c = c;
  }

  accuracy(inputs, outputs) {
    let count = 0;
    for (let i = 0; i < inputs.length; i++) {
      const in_ = inputs[i];
      const out_ = outputs[i];
      let guess = this.feedforward(in_);
      if (guess == out_) count++;
    }
    return (count / inputs.length) * 100;
  }

  train(inputs, outputs) {
    let i = 0,
      accuracy;

    while (true) {
      for (let j = 0; j < inputs.length; j++) {
        const in_ = inputs[j];
        const out_ = outputs[j];
        let guess = this.feedforward(in_);

        let error = out_ - guess;
        for (let i = 0; i < this.weights.length; i++) {
          this.weights[i] += this.c * error * in_[i];
        }
      }
      i++;
      accuracy = this.accuracy(inputs, outputs);
      if (accuracy >= ACCURACY) break;
      if (i > MAX_EPOCE) {
        swal(
          `The number of great EPOCE has exceeded Please reduce accuracy\nEPOCE = ${MAX_EPOCE}\nAccuracy = ${accuracy}`,
          '',
          'error'
        );
        break;
      }
    }
    return accuracy;
  }

  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return this.activate(sum);
  }

  activate(sum) {
    if (sum > 0) return 1;
    else return -1;
  }

  getWeights() {
    return this.weights;
  }
  draw() {
    let x1 = 0;
    let x2 = 500;
    let y1 = (-this.weights[2] - this.weights[0] * x1) / this.weights[1];
    let y2 = (-this.weights[2] - this.weights[0] * x2) / this.weights[1];
    strokeWeight(4);
    line(x1, y1, x2, y2);
  }
}
