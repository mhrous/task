const mainHeaderRun = () => {
  const renderSitting = () => {
    $('.settings > div').addClass('hide');
    $(`.settings .${OPTION.ACTIVE}`).removeClass('hide');
  };

  $('.main-header').on('click', '.nav-link', function () {
    $('.main-header .active').removeClass('active');
    $(this).addClass('active');
    OPTION.ACTIVE = $(this).data('type');
    renderSitting();
  });

  const init = () => {
    renderSitting();
  };

  init();
};
const toolRun = () => {
  const header = $('.tool-header');
  const widthValueNode = $('.tool-width .value');
  const widthContinerNode = $('.tool-width');

  const opacityValueNode = $('.tool-opacity .value');
  const opacityContinerNode = $('.tool-opacity');
  const rInputNode = $('.R');
  const bInputNode = $('.B');
  const markerNode = $('.marker');

  const gInputNode = $('.G');
  const hexInputNode = $('.Hex');
  const colorPickerBtn = $('.colorPicker-btn');

  const renderColor = () => {
    let str = '';
    COLOR.forEach(c => {
      str += `<div style="background:${c}"  data-color="${c}"></div>`;
    });
    $('.tool-color-choice').append(str);
  };

  $('.image-container img').on('click', function () {
    OPTION.TOOL.type = $(this).data('type');
    if (OPTION.TOOL.type == 'pencil') {
      opacityContinerNode.removeClass('hide');
      widthContinerNode.removeClass('hide');
    } else if (OPTION.TOOL.type == 'eraser') {
      opacityContinerNode.addClass('hide');
      widthContinerNode.removeClass('hide');
    } else if (OPTION.TOOL.type == 'pail') {
      opacityContinerNode.removeClass('hide');
      widthContinerNode.addClass('hide');
    }
    $('.image-container .active').removeClass('active');
    $(this).addClass('active');
    header.text(OPTION.TOOL.type);
    OPTION.TOOL.marker = false;
    markerNode.removeClass('active');
  });
  $('.tool-opacity input').on('change', function () {
    OPTION.TOOL.opacity = parseInt($(this).val());
    opacityValueNode.text(`Opacity : ${OPTION.TOOL.opacity}%`);
    OPTION.TOOL.marker = false;
    markerNode.removeClass('active');
  });
  $('.tool-width input').on('change', function () {
    OPTION.TOOL.width = parseInt($(this).val());
    widthValueNode.text(`Thickness : ${OPTION.TOOL.width}px`);
    OPTION.TOOL.marker = false;
    markerNode.removeClass('active');
  });
  markerNode.on('click', function () {
    $(this).addClass('active');
    $('.image-container .active').removeClass('active');

    OPTION.TOOL.marker = true;
  });
  colorPicker = new iro.ColorPicker('.colorPicker', {
    width: 280,
    color: 'rgb(0,0,0 )'
  });

  colorPicker.on(['color:init', 'color:change'], function (color) {
    console.log(5);
    rInputNode.val(color.rgb.r);
    gInputNode.val(color.rgb.g);
    bInputNode.val(color.rgb.b);
    rInputNode.val(color.rgb.r);
    hexInputNode.val(color.hexString);
    OPTION.TOOL.marker = false;
    markerNode.removeClass('active');

    colorPickerBtn.css('background-color', color.hexString);
    $('.color-show').css('background-color', color.hexString);
    OPTION.TOOL.color = color;
  });

  $('.tool-color-choice').on('click', 'div', function () {
    const color = new iro.Color($(this).data('color'));

    colorPicker.emit('color:change', color);
  });

  renderColor();
};

const historyRun = () => {
  $('.back').on('click', () => backHistory());
  $('.front').on('click', () => frontHistory());
};
const imageUblode = () => {
  const handleImage = e => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const _width = img.width > WIDTH ? WIDTH : img.width;
        const _height = img.height > HEIGHT ? HEIGHT : img.height;
        const p5Img = createImage(_width, _height);

        p5Img.drawingContext.drawImage(img, 0, 0, _width, _height);
        addImageLayer({
          img: p5Img,
          w: _width,
          h: _height
        });
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0])
  };
  $('#image-input').on('change', e => handleImage(e));
};
const filterRun = () => {
  $('#GRAY_FILTER').on('click', () => grayFilter());
  $('#THRESHOLD_FILTER').on('click', () => thresholdFilter());
  $('#INVERT_FILTER').on('click', () => invertFilter());
};

const canvasRun = () => {
  $('#X_MIRROR').on('click', () => {
    loadPixels();
    const img = mirrorX({
      pixels
    });
    addImageLayer({
      img
    });
  });
  $('#Y_MIRROR').on('click', () => {
    loadPixels();
    const img = mirrorY({
      pixels
    });
    addImageLayer({
      img
    });
  });
  $('#LEFT_ROTATE').on('click', () => {
    loadPixels();
    const img = rotateLaft({
      pixels
    });
    addImageLayer({
      img
    });
  });
  $('#RIGHT_ROTATE').on('click', () => {
    loadPixels();
    const img = rotateRight({
      pixels
    });
    addImageLayer({
      img
    });
  });
};

const _2dRun = () => {
  const emojiRender = () => {
    let str = '';
    ALL_EMOJI_NAME.forEach(e => {
      str += `<icon class="twa twa-${e}" data-nameEmoji="${e}"></icon>`;
    });
    $('.emoji-container').append(str);

  };
  $(".emoji-container").on("click", "icon", function () {
    selectEmoji = $(this)[0].dataset.nameemoji
    console.log($(this))
    $(".main-emoji").html(`<icon class="twa twa-${selectEmoji}" data-nameEmoji="${selectEmoji}"></icon>`)

  })
  $(".main-emoji").html(`<icon class="twa twa-${selectEmoji}" data-nameEmoji="${selectEmoji}"></icon>`)

  emojiRender();
};

$(document).ready(() => {
  mainHeaderRun();
  toolRun();
  historyRun();
  imageUblode();
  filterRun();
  canvasRun();
  _2dRun();

  $('.save-btn').on('click', () => saveCanvas(CANVAS, 'canvas', 'jpg'));
});