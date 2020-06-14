$(window).on('resize', function() {
  if ($(window).width() < 768) {
    $('.listing-grid__cards').removeClass('--horizontal-cards');
    $('.toggle-view__btn[data-listing-view="list"]').removeClass('--active');
    $('.toggle-view__btn[data-listing-view="tile"]').addClass('--active');
  }
});


$('.js-tabs').on('click', '[data-tab]', function () {
  let tabId = $(this).data('tab');
  let parentEl = $(this).parents('.js-tabs');
  let btns = parentEl.find('[data-tab]');
  let content = parentEl.find('[data-tab-content]');

  btns.removeClass('--active');
  content.removeClass('--active');
  $(this).addClass('--active');
  parentEl.find(`[data-tab-content="${tabId}"]`).addClass('--active');
});

$('.toggle-view__btn').on('click', function () {
  const parent = $(this).parents('.toggle-view');
  const listing = $('.listing-grid__cards');

  parent.find('.toggle-view__btn').removeClass('--active');
  $(this).addClass('--active');

  if($(this).data('listing-view') === 'list') {
    listing.addClass('--horizontal-cards');
  } else {
    listing.removeClass('--horizontal-cards');
  }
});
