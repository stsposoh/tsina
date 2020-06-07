$('.js-toggle-mob-menu').on('click', function (e) {
  e.stopPropagation();
  $(this).toggleClass('--active');
  $(this).find('.burger').toggleClass('--open');
  $('.mob-menu').toggleClass('--open');
  $('.js-help-links').removeClass('--active');
});

$('.js-show-help-links').on('click', function (e) {
  e.stopPropagation();
  $('.js-toggle-mob-menu').removeClass('--active');
  $('.mob-menu').removeClass('--open');
  $('.burger').removeClass('--open');
  $('.js-help-links').addClass('--active');
});

$(document).on('click', function (e){
  const mobMenu = $(".mob-menu");
  if (!mobMenu.is(e.target) && mobMenu.has(e.target).length === 0) {
    mobMenu.removeClass('--open');
    $('.js-toggle-mob-menu').removeClass('--active');
    $('.burger').removeClass('--open');
  }

  const helpLinks = $(".js-help-links");
  if (!helpLinks.is(e.target) && helpLinks.has(e.target).length === 0) {
    helpLinks.removeClass('--active');
  }
});




