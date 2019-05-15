class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(0));
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }

  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }

    return new Matrix(a.rows, a.cols).map(
      (_, i, j) => a.data[i][j] - b.data[i][j]
    );
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  randomize() {
    return this.map(e => Math.random() * 2 - 1);
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
      return this.map((e, i, j) => e + n.data[i][j]);
    } else {
      return this.map(e => e + n);
    }
  }

  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows).map(
      (_, i, j) => matrix.data[j][i]
    );
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) {
      console.log('Columns of A must match rows of B.');
      return;
    }

    return new Matrix(a.rows, b.cols).map((e, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }
      return sum;
    });
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      return this.map((e, i, j) => e * n.data[i][j]);
    } else {
      return this.map(e => e * n);
    }
  }

  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  static map(matrix, func) {
    return new Matrix(matrix.rows, matrix.cols).map((e, i, j) =>
      func(matrix.data[i][j], i, j)
    );
  }

  print() {
    console.table(this.data);
    return this;
  }
  static from2dArray(array) {
    const row = array.length;
    const col = array[0].length;
    const m = new Matrix(array.length, array[0].length);

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        m.data[i][j] = array[i][j];
      }
    }
    return m;
  }

  static I_Matrix(n) {
    const m = new Matrix(n, n);
    for (let i = 0; i < n; i++) {
      m.data[i][i] = 1;
    }
    return m;
  }

  static hessianMatrix(jacobian, learning_rate ) {
    const jacobian_T = Matrix.transpose(jacobian);
    const multiply = Matrix.multiply(jacobian, jacobian_T);
    const size = multiply.rows;
    const I = Matrix.I_Matrix(size);
    I.multiply(Learning_rate);
    multiply.add(I);
    const c = Matrix.matrix_invert(multiply.data);
    return Matrix.from2dArray(c);
  }

  static matrix_invert(M) {
    if (M.length !== M[0].length) {
      return;
    }

    let i = 0,
      ii = 0,
      j = 0,
      dim = M.length,
      e = 0,
      t = 0;
    let I = [],
      C = [];
    for (i = 0; i < dim; i += 1) {
      I[I.length] = [];
      C[C.length] = [];
      for (j = 0; j < dim; j += 1) {
        if (i == j) {
          I[i][j] = 1;
        } else {
          I[i][j] = 0;
        }

        C[i][j] = M[i][j];
      }
    }

    for (i = 0; i < dim; i += 1) {
      e = C[i][i];

      if (e == 0) {
        for (ii = i + 1; ii < dim; ii += 1) {
          if (C[ii][i] != 0) {
            for (j = 0; j < dim; j++) {
              e = C[i][j];
              C[i][j] = C[ii][j];
              C[ii][j] = e;
              e = I[i][j];
              I[i][j] = I[ii][j];
              I[ii][j] = e;
            }
            break;
          }
        }
        e = C[i][i];
        if (e == 0) {
          return;
        }
      }

      for (j = 0; j < dim; j++) {
        C[i][j] = C[i][j] / e;
        I[i][j] = I[i][j] / e;
      }

      for (ii = 0; ii < dim; ii++) {
        if (ii == i) {
          continue;
        }

        e = C[ii][i];

        for (j = 0; j < dim; j++) {
          C[ii][j] -= e * C[i][j];
          I[ii][j] -= e * I[i][j];
        }
      }
    }
    return I;
  }
}
