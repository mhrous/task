
import copy
import numpy as np
import json

from train import *

binary_dim = 0
max_val = 0
rnn = 0


def sigmoid(z):
    return (1 / (1 + np.exp(-z)))


def sigmoidPrime(z):
    return z * (1-z)


def convertToBinary(int, dim):
    array = []
    array2 = []
    for i in range(dim):
        array.append(int % 2)
        int //= 2
    for i in reversed(array):
        array2.append(i)
    return np.array(array2)


def convertToInt(array):
    out = 0
    for index, x in enumerate(reversed(array)):
        out += x * pow(2, index)
    return out


def createDataSet(n):
    inputs = []
    outputs = []
    for i in range(n):
        b_int = np.random.randint(max_val/2)
        a_int = np.random.randint(max_val/2)
        c_int = a_int+b_int
        a = convertToBinary(a_int, binary_dim)
        b = convertToBinary(b_int, binary_dim)
        c = convertToBinary(c_int, binary_dim)
        inputs.append([a, b])
        outputs.append(c)
    return inputs, outputs


class Rnn:
    def __init__(self, inputLayerSize, hiddenLayerSize, outputLayerSize, learning_rate=0.1):
        self.inputLayerSize = inputLayerSize
        self.hiddenLayerSize = hiddenLayerSize
        self.outputLayerSize = outputLayerSize
        self.learning_rate = learning_rate

        self.W1 = 2 * np.random.random((inputLayerSize, hiddenLayerSize)) - 1
        self.W2 = 2 * np.random.random((hiddenLayerSize, outputLayerSize)) - 1
        self.W_h = 2 * np.random.random((hiddenLayerSize, hiddenLayerSize)) - 1

        self.W1_update = np.zeros_like(self.W1)
        self.W2_update = np.zeros_like(self.W2)
        self.W_h_update = np.zeros_like(self.W_h)

    def updateWeight(self):
        self.W1 += self.W1_update * self.learning_rate
        self.W2 += self.W2_update * self.learning_rate
        self.W_h += self.W_h_update * self.learning_rate

        self.W1_update *= 0
        self.W2_update *= 0
        self.W_h_update *= 0

    def train(self, size):
        inputs, outputs = createDataSet(size)
        errorList = []

        for item in range(size):
            a = inputs[item][0]
            b = inputs[item][1]
            c = outputs[item]
            d = np.zeros_like(c)
            overallError = 0

            output_layer_deltas = []
            hidden_layer_values = []
            hidden_layer_values.append(np.zeros(self.hiddenLayerSize))

            for position in range(binary_dim):
                X = np.array(
                    [[a[binary_dim - position - 1], b[binary_dim - position - 1]]])

                y = np.array([[c[binary_dim - position - 1]]]).T

                layer_1 = sigmoid(
                    np.dot(X, self.W1) + np.dot(hidden_layer_values[-1], self.W_h))

                layer_2 = sigmoid(np.dot(layer_1, self.W2))

                output_error = y - layer_2

                output_layer_deltas.append(
                    (output_error)*sigmoidPrime(layer_2))

                overallError += np.abs(output_error[0])

                d[binary_dim - position - 1] = np.round(layer_2[0][0])

                hidden_layer_values.append(copy.deepcopy(layer_1))

                future_layer_1_delta = np.zeros(self.hiddenLayerSize)

            for position in range(binary_dim):
                X = np.array([[a[position], b[position]]])
                layer_1 = hidden_layer_values[-position - 1]
                prev_hidden_layer = hidden_layer_values[-position-2]
                output_layer_delta = output_layer_deltas[-position-1]
                layer_1_delta = (future_layer_1_delta.dot(self.W_h.T) +
                                 output_layer_delta.dot(self.W2.T)) * sigmoidPrime(layer_1)

                self.W2_update += np.atleast_2d(
                    layer_1).T.dot(output_layer_delta)
                self.W_h_update += np.atleast_2d(
                    prev_hidden_layer).T.dot(layer_1_delta)
                self.W1_update += X.T.dot(layer_1_delta)

                future_layer_1_delta = layer_1_delta
            self.updateWeight()
            if (item % 1000 == 0):

                errorList.append(overallError[0])
        return errorList

    def predict(self, a, b):
        a = convertToBinary(a, binary_dim)
        b = convertToBinary(b, binary_dim)
        d = np.zeros_like(a)
        hidden_layer_values = []
        hidden_layer_values.append(np.zeros(self.hiddenLayerSize))

        for position in range(binary_dim):
            X = np.array(
                [[a[binary_dim - position - 1], b[binary_dim - position - 1]]])

            layer_1 = sigmoid(
                np.dot(X, self.W1) + np.dot(hidden_layer_values[-1], self.W_h))

            layer_2 = sigmoid(np.dot(layer_1, self.W2))

            d[binary_dim - position - 1] = np.round(layer_2[0][0])
            hidden_layer_values.append(copy.deepcopy(layer_1))

        return d

    def saveToFile(self):
        data = {}

        data["inputLayerSize"] = self.inputLayerSize
        data["hiddenLayerSize"] = self.hiddenLayerSize
        data["outputLayerSize"] = self.outputLayerSize
        data["learning_rate"] = self.learning_rate
        data["w1"] = self.W1.tolist()
        data["w2"] = self.W2.tolist()
        data["w_h"] = self.W_h.tolist()
        with open('data.json', "w") as f:
            json.dump(data, f)

    def bulidFromFile(self):
        with open('data.json') as f:
            data = json.load(f)
        self.inputLayerSize = data["inputLayerSize"]
        self.hiddenLayerSize = data["hiddenLayerSize"]
        self.outputLayerSize = data["outputLayerSize"]
        self.learning_rate = data["learning_rate"]
        self.W1 = np.array(data["w1"])

        self.W2 = np.array(data["w2"])
        self.W_h = np.array(data["w_h"])


def train(s, l):
    global binary_dim
    global max_val
    global rnn

    binary_dim = l
    max_val = (2**binary_dim)
    rnn = Rnn(2, l*2, 1)
    error = rnn.train(s)
    return error


def predict(a, b):
    global rnn
    global binary_dim
    global max_val
    binary_dim = 32
    max_val = (2**binary_dim)
    rnn = Rnn(2, binary_dim*2, 1)
    rnn.bulidFromFile()
    return rnn.predict(a, b)
