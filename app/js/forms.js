$(document).ready(function () {
  Inputmask({
    "mask": "+380(99) 999-99-99",
    showMaskOnHover: false
  }).mask($('input[type="tel"]'));

  $('.js-sumo-select').SumoSelect();
});

$('.js-toggle-pass').on('click', function () {
  let input = $(this).prev('input');
  let inputType = input.attr('type');
  inputType = (inputType === 'password') ? 'text' : 'password';
  $(this).toggleClass('--open');
  input.attr('type', inputType);
});
