function makeSpace( len) {
  let str = '';
  for (let i = 0; i < len; i++) str += " ";
  return str;
}

function drawTringle(len) {
  let str = '';
  for (let i = 0; i < len / 2; i++) {
  str += makeSpace( Math.floor(len / 2) - i);
    str += makeLine( i * 2 + 1);
    str += '\n';
  }
  return str;
}

console.log(drawTringle(1));
console.log('___________________________');
console.log(drawTringle(3));
console.log('___________________________');
console.log(drawTringle(5));
console.log('___________________________');
console.log(drawTringle(7));
console.log('___________________________');
console.log(drawTringle(9));
console.log('___________________________');
console.log(drawTringle(11));
console.log('___________________________');
console.log(drawTringle(13));
console.log('___________________________');
console.log(drawTringle(15));
console.log('___________________________');
