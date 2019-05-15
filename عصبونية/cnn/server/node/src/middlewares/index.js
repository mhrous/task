const path = require('path');

const { exec } = require('child_process');

const addTowNumber = async (req, res, next) => {
  try {
    const { a } = req.params;
    const { b } = req.params;

    exec(
      `python addtow.py --a ${a} --b ${b}`,
      {
        cwd: path.join(__dirname, '..', '..', '..', '/python')
      },
      (n, stdout, stderr) => {
        let x = stdout
          .split('[')[1]
          .split(']')[0]
          .split(' ');
        let y = stdout.split(']')[1].split('\r\n')[1];
        let array = [];
        for (let i of x) array.push(parseInt(i));

        res.send({ binary: array, result: parseInt(y) });

        next();
      }
    );
  } catch (e) {
    next(e);
  }
};

const train = async (req, res, next) => {
  try {
    const { l } = req.params;
    const { s } = req.params;

    exec(
      `python train.py --l ${l} --s ${s}`,
      {
        cwd: path.join(__dirname, '..', '..', '..', '/python')
      },
      (n, stdout) => {
        console.log(stdout);
        res.send(stdout);
        next();
      }
    );
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addTowNumber,
  train
};
