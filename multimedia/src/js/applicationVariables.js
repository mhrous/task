const COLOR = [
  '#ffffff',
  '#c3c3c3',
  '#585858',
  '#000000',
  '#88001b',
  '#ec1c24',
  '#ff7f27',
  '#ffca18',
  '#fdeca6',
  '#fff200',
  '#c4ff0e',
  '#0ed145',
  '#8cfffb',
  '#00a8f3',
  '#3f48cc',
  '#b83dba',
  '#ffaec8',
  '#b97a56'
];
const CANVAS_ID = 'canvasID';
const OPTION = {
  ACTIVE: 'tool',
  TOOL: {
    type: 'pencil',
    opacity: 100,
    width: 5,
    color: { hexString: '' },
    marker: false
  }
};
const LAYER = [];
let LAST_LAYER;
let selectEmoji = ALL_EMOJI_NAME[0];

let CANVAS;
const WIDTH =
  485 ||
  $('.canvas-container')
    .css('width')
    .slice(0, -2) - 10;

const HEIGHT =
  485 ||
  $('.canvas-container')
    .css('height')
    .slice(0, -2) - 10;

const BACKGROUND = '#fff';

let STACK_HISTORY = [];

let obj = { points: [] };
let colorPicker;
