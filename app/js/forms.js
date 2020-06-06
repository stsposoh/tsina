$(document).ready(function () {
  Inputmask({
    "mask": "+380(99) 999-99-99",
    showMaskOnHover: false
  }).mask($('input[type="tel"]'));

  $('.js-sumo-select').SumoSelect();
});
