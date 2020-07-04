$('.js-open-login-form').on('click', function () {

  $('#login-form').addClass('--open')
});

$('.js-order-call').on('click', function () {
  $('#order-call').addClass('--open')
});

$('.js-open-type-filter').on('click', function () {
  $('body').css('overflow','hidden');
  $('#tire-filter').addClass('--open')
});

$('.js-all-brands').on('click', function () {
  const brandType = $(this).data('brand-type');
  $(`[data-tab="${brandType}"]`).click();
  $('#all-brands').addClass('--open')
});

$('.modal')
  .on('click', '.js-close-modal', function () {
    $('body').css('overflow','');
    $(this).parents('.modal').removeClass('--open')
  });
