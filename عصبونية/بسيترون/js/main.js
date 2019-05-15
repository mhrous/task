$('.add').on('click', function() {
  const str = `<div class="b" style="background:${
    COLORS[index]
  }" data-id="${index}"></div>`;

  $('.b-container').append(str);
  index++;
  if (index == COLORS.length) $(this).addClass('hide');
});

$('.b-container').on('click', '.b', function(params) {
  $('.b').text('');
  $(this).text('select');
  selectedId = $(this).data('id');
});

$('.accuracy').on('change', function() {
  ACCURACY = $(this).val();
});
