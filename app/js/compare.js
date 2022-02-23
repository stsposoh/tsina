const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const compareGetParameter = urlParams.get('compare')

if (compareGetParameter === 'disks') {
  $('.tabs-block__btns-item[data-tab-block="2"]').click();
}

$('.compare__remove-btn').on('click', function () {
  const compareElem = $(this).parents('.compare');
  let index = $(this).data('compare-index');

  compareElem.find(`*[data-compare="${index}"]`).remove();

  const compareCardsLength = compareElem.find('.compare__cards').children().length;

  if (!compareCardsLength) {
    compareElem.find('.compare__empty').show();
    compareElem.find('.compare__content').remove();
  }

  $(this).parents('.compare__remove-item').remove();
})

// fix compare cards
const compareNodes = $('.compare');
const headerNode = $('.header');
let compareCardsBrmPos = null;
let headerHeight = headerNode.height();

compareNodes.each((index, node) => {
  const compareCardsElem = $(node).find('.compare__cards');

  if (compareCardsElem.length) {
    $(window).on('resize', function () {
      headerHeight = headerNode.height();
      compareCardsBrmPos = compareCardsElem.offset().top + compareCardsElem.height() - headerHeight;
    });

    $(window).on('scroll', function () {
      if (!compareCardsBrmPos) {
        compareCardsBrmPos = compareCardsElem.offset().top + compareCardsElem.height() - headerHeight;
      }

      if ($(window).scrollTop() > compareCardsBrmPos) {
        $(node).addClass('--cards-fixed');
      } else {
        $(node).removeClass('--cards-fixed');
      }
    });

    compareCardsElem.on('scroll', function () {
      let scrollLeft = $(this).scrollLeft()

      $(node).find('.compare__content').scrollLeft(scrollLeft)
    })
  }
})

$('.js-add-to-compare').on('click', function () {
  if ($(this).hasClass('--active')) {
    $(this).removeClass('--active')
  } else {
    $(this).addClass('--active')
  }
})

const compareListElem = $('.compare-list__links');
const compareListEmptyElem = $('.compare-list__empty');

$('.js-remove-compare-list').on('click', function () {
  $(this).parents('.compare-list__item').remove();

  if (!compareListElem.children().length) {
    compareListElem.remove();
    compareListEmptyElem.show();
  }
})
