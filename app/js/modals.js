$('.js-open-login-form').on('click', function () {
  $('#login-form').addClass('--open')
});

$('.js-order-call').on('click', function () {
  $('#order-call').addClass('--open')
});

$('.js-open-tire-filter').on('click', function () {
  $('html').css('overflow','hidden');
  $('#tire-filter').addClass('--open')
});

$('.js-open-sort-modal').on('click', function () {
  $('html').css('overflow','hidden');
  $('#sort-modal').addClass('--open')
});

$('.js-open-disks-filter').on('click', function () {
  $('html').css('overflow','hidden');
  $('#disk-filter').addClass('--open')
});

$('.js-all-brands').on('click', function () {
  const brandType = $(this).data('brand-type');
  $(`[data-tab="${brandType}"]`).click();
  $('#all-brands').addClass('--open')
});

$('.modal').on('click', '.js-close-modal', function () {
  $('html').css('overflow','');
  $(this).parents('.modal').removeClass('--open')
});


