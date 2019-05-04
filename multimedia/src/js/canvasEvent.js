const PressedCanvas = () => {
  switch (OPTION.ACTIVE) {
    case 'tool':
      if (OPTION.TOOL.marker) {
        markerSelect();
     
        return;
      }

      initForPaint();
      let STACK_HISTORY = [];

      LAST_LAYER.steps.push({
        ...OPTION.TOOL,
        color: OPTION.TOOL.color.rgb,
        points: [{ x: mouseX, y: mouseY }],
        step: true
      });
      reDrawLast();
      break;

    default:
      break;
  }

  updateHistory();
};

const ReleasedCanvas = () => {
  switch (OPTION.ACTIVE) {
    case 'tool':
      break;

    default:
      break;
  }
};
