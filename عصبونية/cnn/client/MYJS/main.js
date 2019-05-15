$(document).ready(function() {
  let id = 'c';
  const chart = $('#chart-container');
  const loader = $('#loader');
  const nav = $('.nav');
  const predict = $('#predict');

  const a = $('.a input');
  const b = $('.b input');
  const res = $('.res input');
  const aBinary = $('.a--b');
  const bBinary = $('.b--b');
  const resBinary = $('.res--b');

  $('input').val(0);

  $.ajax('http://localhost:4000/train/8/50000', {
    cache: false,
    type: 'get',
    contentType: false,
    processData: false,
    success: function(res) {
      res = res
        .split('[')[1]
        .split(']')[0]
        .split(',');
      let array = [];
      for (let i = 0; i < res.length; i++)
        array.push(parseFloat({ x: res[i], y: i }));

      train.data = res;
      CHART.update();
      loader.addClass('hide');
      chart.removeClass('hide');
      nav.removeClass('hide');
    },
    error: function(res) {
      console.log(res);
    }
  });

  $('.nav-link').on('click', function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    const id = $(this).data('id');
    console.log(id);
    if (id == 'c') {
      chart.removeClass('hide');
      predict.addClass('hide');
    } else {
      predict.removeClass('hide');
      chart.addClass('hide');
    }
  });

  function binaryHtml(array) {
    let str = '';
    array.forEach(element => {
      str += `<div>${element}</div>`;
    });
    return str;
  }

  function intToBinary(int) {
    let array = [];
    for (let i = 0; i < 32; i++) {
      array.push(int % 2);
      int = Math.floor(int / 2);
    }
    return array.reverse();
  }

  function updata() {
    const _a = a.val();
    const _b = b.val();
    const _a_binary = intToBinary(_a);
    const _b_binary = intToBinary(_b);

    aBinary.html(binaryHtml(_a_binary));
    bBinary.html(binaryHtml(_b_binary));

    $.ajax(`http://localhost:4000/${_a}/${_b}`, {
      cache: false,
      type: 'get',
      contentType: false,
      processData: false,
      success: function(result) {
        res.val(result.result);
        resBinary.html(binaryHtml(result.binary));
      },
      error: function(res) {
        console.log(res);
      }
    });
  }

  a.on('change', updata);
  b.on('change', updata);
});
