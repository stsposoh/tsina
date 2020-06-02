$('.js-open-login-form').on('click', function () {
  $('#login-form').addClass('--open')
});

$('.modal')
  .on('click', '.js-close-modal', function () {
    $(this).parents('.modal').removeClass('--open')
  });
