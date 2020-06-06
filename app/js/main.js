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

