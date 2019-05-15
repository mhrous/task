const layers = [3, 3, 2];
const lastIndex = layers.length - 1;
const key = `${lastIndex - 1} ${lastIndex}`;
let r, g, b;
let brain3, brain2, brain1;
const dataSetSize = 5000,
  maxEpoch = 50,
  stopError = 0.015;

let brainNumber = 1;
let NAME = "Backpropagation";

const b_train = {
    type: 'scatter',
    label: 'Backpropagation train',
    data: [],

    backgroundColor: 'rgba(170, 0, 255, 0.2)',
    borderColor: 'rgba(170, 0, 255,1)',
    borderWidth: 1
  },
  b_test = {
    type: 'scatter',
    label: 'Backpropagation Test',
    data: [],

    backgroundColor: 'rgba(255, 23, 68, 0.2)',
    borderColor: 'rgba(255, 23, 68,1)',
    borderWidth: 1
  },
  m_train = {
    type: 'scatter',
    label: 'Momentum train',
    data: [],

    backgroundColor: 'rgba(41, 98, 255, 0.2)',
    borderColor: 'rgba(41, 98, 255,1)',
    borderWidth: 1
  },
  m_test = {
    type: 'scatter',
    label: 'Momentum test',
    data: [],

    backgroundColor: 'rgba(24, 255, 255, 0.2)',
    borderColor: 'rgba(24, 255, 255,1)',
    borderWidth: 1
  },
  l_train = {
    type: 'scatter',
    label: 'levenberg train',
    data: [],

    backgroundColor: 'rgba(118, 255, 3, 0.2)',
    borderColor: 'rgba(118, 255, 3,1)',
    borderWidth: 1
  },
  l_test = {
    type: 'scatter',
    label: 'levenberg test',
    data: [],

    backgroundColor: 'rgba(238, 255, 65, 0.2)',
    borderColor: 'rgba(238, 255, 65,1)',
    borderWidth: 1
  };





  Learning_rate=1
