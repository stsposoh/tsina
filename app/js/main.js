$('.tabs').on('click', '.tabs__controls-btn', function () {
  var tabId = $(this).data('tab');
  var parentEl = $(this).parents('.tabs');
  var btns = parentEl.find('.tabs__controls-btn');
  var content = parentEl.find('.tabs__content-item');

  btns.removeClass('--active');
  content.removeClass('--active');
  $(this).addClass('--active');
  parentEl.find(`#${tabId}`).addClass('--active');
});

