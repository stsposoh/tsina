$(window).on('resize', function() {
  if ($(window).width() < 768) {
    $('.listing-grid__cards').removeClass('--horizontal-cards');
    $('.toggle-view__btn[data-listing-view="list"]').removeClass('--active');
    $('.toggle-view__btn[data-listing-view="tile"]').addClass('--active');
  }

  // if ($(window).width() < 992) {
  //   $(window).on('scroll', toggleHeader);
  // } else {
  //   $(window).off('scroll', toggleHeader)
  // }
});

//fixed header for mob
// if($(window).width() < 992) {
//   $(window).on('scroll', toggleHeader);
// }

// var pos = $(window).scrollTop();
// var up = false;
// var newscroll;

// function toggleHeader () {
//   newscroll = $(window).scrollTop();
//
//   if (pos > 100 && newscroll > pos && !up) {
//     $('.header').addClass('--hide-controls');
//     up = !up;
//   } else if(pos > 100 && newscroll < pos && up) {
//     $('.header').removeClass('--hide-controls');
//     up = !up;
//   }
//   pos = newscroll;
// }


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

//toggle stars in rating
$('.js-rating').on('click', '.rating__star', function () {
  var selectedRatingNum = $(this).find('input[type=radio]').val();

  $(this).parents('.rating').find('.rating__star').removeClass('--filled');

  $(this).parents('.rating').find('.rating__star').each(function (i) {
    $(this).addClass('--filled');

    if(++i >= parseInt(selectedRatingNum)) return false;
  })
});


//gallery
const centerGallery = {
  container: '',
  mainPhoto: '',
  setConnectionWithElements() {
    this.container = $('.center-gallery');
    this.mainPhoto = this.container.find('.center-gallery__main-img-photo');
  },
  showMainPhoto(elem) {
    this.mainPhoto.attr('src', elem.attr('href'))
  }
};

centerGallery.setConnectionWithElements();

$('.center-gallery').on('click', '.center-gallery__previews-item', function (e) {
  e.preventDefault();
  $('.center-gallery').find('.center-gallery__previews-item').each(function () {
    $(this).removeClass('--active');
  });
  $(this).addClass('--active');
  centerGallery.showMainPhoto($(this))
});

//centers
const tireCenters = $('.js-centers');
const recordSect = $('#record');
const recordByDate = $('.js-record-by-date');
const recordByCenterBtn = $('.js-record-by-center');
const recordDateSect = $('#record-date');
const tireCentersSect = $('#tire-centers');
const tireStorageModal = $('#tire-storage');
const timepickerSect = $('#timepicker');
const selectedCenterSect = $('#selected-center');
const selectedCenterEl = $('.js-selected-center');
const selectedDateEl = $('.js-selected-date');
const selectedTimeEl = $('.js-selected-time');
const recordOrderCommentBtn = $('.js-record-order-comment');
const recordOrderStorageTip = $('.record-order__storage-tip');
const recordOrder = $('#record-order');
const recordSuccessSect = $('#record-success');
const recordStepsSect = $('#record-steps');

//mobile
const datePickerModal = $('#datepicker-modal');
const timePickerModal = $('#timepicker-modal');
const recordInfoMob = $('#record-info-mob');

$('[name="selected-city"]').on('change', function () {
  record.tireStorage = 0;
  record.selectedCity = $(this).val().toLowerCase();

  if(recordSect.hasClass('--hidden')) {
    $('#record-bot').addClass('--hidden');
  }
  tireCentersSect.removeClass('--hidden');
});

$('.js-show-datepicker-modal').on('click', function () {
  datePickerModal.addClass('--open');
  record.initCalendarMob();
  record.selectedCenter = $(this).parents('.tire-center-card-small').data('center');
});

$('.js-show-change-date-modal').on('click', function () {
  datePickerModal.addClass('--open');
});

$('.js-show-timepicker-modal').on('click', function () {
  timePickerModal.addClass('--open');
});

timePickerModal.find('.timepicker').on('click', function (e) {
  if($(e.target).hasClass('timepicker__day-time')) {
    record.selectedTime = $(e.target).text();
    timePickerModal.find('.timepicker__day-time').each(function () {
      $(this).removeClass('--checked');
    });
    $(e.target).addClass('--checked');
    timePickerModal.removeClass('--open');

    recordInfoMob.find('.js-chosen-center').text(record.selectedCenter);
    recordInfoMob.find('.js-chosen-date').text(record.selectedDate);
    recordInfoMob.find('.js-chosen-time').text(record.selectedTime);
    tireCenters.addClass('--hidden');
    tireCentersSect.addClass('--hidden');
    recordInfoMob.removeClass('--hidden');
    recordOrder.removeClass('--hidden');
    $('html, body').animate({scrollTop: '0px'}, 300);
  }
});

$('.js-record-back').on('click', function () {
  recordOrder.addClass('--hidden');
  recordInfoMob.addClass('--hidden');
  tireCenters.removeClass('--hidden');
  $('#record-bot').removeClass('--hidden');
});

//desktop
tireCenters.on('click', '.tire-center-btn', function () {
  record.tireStorage = null;
  tireCenters.find('.tire-center-btn').each(function () {
    $(this).removeClass('--active');
  });
  $(this).addClass('--active');
  record.selectedCity = $(this).text().toLowerCase();

  if(recordSect.hasClass('--hidden')) {
    $('#record-bot').addClass('--hidden');
    recordSect.removeClass('--hidden')
  } else {
    recordByDate.removeClass('record-active');
    recordByCenterBtn.removeClass('record-active');
    recordDateSect.addClass('--hidden');
    tireCentersSect.addClass('--hidden');
    selectedCenterSect.addClass('--hidden');
  }
  recordOrder.addClass('--hidden');
});

recordByDate.on('click', function () {
  record.recordMethod = 1;
  $(this).addClass('record-active');
  recordStepsSect.removeClass('--record-by-city');
  recordByCenterBtn.removeClass('record-active');
  if(record.tireStorage === null) {
    tireStorageModal.addClass('--open');
  }
  recordDateSect.removeClass('--hidden');
  timepickerSect.addClass('--hidden');
  tireCentersSect.addClass('--hidden');
  selectedCenterSect.addClass('--hidden');
  recordOrder.addClass('--hidden');
  record.initCalendar();
});

recordByCenterBtn.on('click', function () {
  record.recordMethod = 2;
  $(this).addClass('record-active');
  recordStepsSect.addClass('--record-by-city');
  recordByDate.removeClass('record-active');
  if(record.tireStorage === null) {
    tireStorageModal.addClass('--open');
  }
  recordDateSect.addClass('--hidden');
  tireCentersSect.removeClass('--hidden');
  selectedCenterSect.addClass('--hidden');
  recordOrder.addClass('--hidden');
});

$('.js-tire-storage').on('click', function () {
  record.tireStorage = $(this).data('storage');
});

recordDateSect.find('.timepicker').on('click', function (e) {
  if($(e.target).hasClass('timepicker__day-time')) {
    $('.timepicker__day-time').each(function () {
      $(this).removeClass('--checked');
    });
    $(e.target).addClass('--checked');
    record.selectedDate = $(e.target).parents('.timepicker__day').data('date');
    record.selectedTime = $(e.target).text();
    record.calendar.setDate(new Date(record.selectedDate));

    if(record.recordMethod === 1) {
      tireCentersSect.removeClass('--hidden');
    } else if (record.recordMethod === 2) {
      record.setCheckedInfo();
    }
  }
});

tireCentersSect.on('click', '.js-check-tire-center', function () {
  tireCentersSect.find('.js-check-tire-center').each(function () {
    $(this).removeClass('--checked');
  });
  $(this).addClass('--checked');
  record.selectedCenter = $(this).parents('.tire-center-card-small').data('center');

  if(record.recordMethod === 1) {
    record.setCheckedInfo();
  } else if (record.recordMethod === 2) {
    recordDateSect.removeClass('--hidden');
    timepickerSect.addClass('--hidden');
    selectedCenterSect.addClass('--hidden');
    recordOrder.addClass('--hidden');
    record.initCalendar();
  }
});

recordOrderCommentBtn.on('click', function () {
  $(this).parents('.record-order__storage-footer').toggleClass('--comment-open');
});

$("input[name='tire-storage']").on('click', function () {
  record.tireStorage = $(this).val();
  if($(this).val() === '1') {
    recordOrderStorageTip.removeClass('--hidden');
    $('[name="contract-number"]').attr('required', true);
  } else {
    recordOrderStorageTip.addClass('--hidden');
    $('[name="contract-number"]').attr('required', false);
  }
});

recordOrder.find("form").submit(function() {
  let data = {
    selectedCity: record.selectedCity,
    selectedCenter: record.selectedCenter,
    selectedDate: record.selectedDate,
    selectedTime: record.selectedTime,
    userName: $(this).find('[name="user-name"]').val(),
    userPhone: $(this).find('[name="user-phone"]').val(),
    userAuto: $(this).find('[name="user-auto"]').val(),
    carNumber: $(this).find('[name="car-number"]').val(),
    userComment: $(this).find('[name="user-comment"]').val(),
  };

  if(data.tireStorage === '1') data.contractNumber = $(this).find('[name="contract-number"]').val();

  console.log(data);

  recordSuccessSect.find('.js-user-name').text(data.userName);
  recordSuccessSect.find('.js-chosen-center').text(data.selectedCenter);
  recordSuccessSect.find('.js-chosen-date').text(data.selectedDate);
  recordSuccessSect.find('.js-chosen-time').text(data.selectedTime);

  recordStepsSect.hide();
  recordSuccessSect.show();
  $('html, body').animate({scrollTop: '0px'}, 300);
  return false;
});

const record = {
  selectedCity: null,
  selectedCenter: '',
  tireStorage: null,
  selectedDate: (new Date()),
  selectedTime: '',
  calendar: null,
  //1 - by date, 2 - by center
  recordMethod: 1,
  initCalendar() {
    this.calendar = $("#basic-date").flatpickr({
      locale: "ru",
      inline: true,
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: "today",
      //maxDate: new Date().fp_incr(40),
      disable: ["2020-07-30", "2020-07-29"],
      onChange: function(selectedDates, dateStr, instance) {
        if(record.tireStorage === null) {
          tireStorageModal.addClass('--open');
        }
        record.getTimesbyDate(dateStr);
      },
    });
  },
  initCalendarMob() {
    this.calendar = $("#basic-date-mob").flatpickr({
      locale: "ru",
      inline: true,
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: "today",
      //maxDate: new Date().fp_incr(40),
      disable: ["2020-07-30", "2020-07-29"],
      onChange: function(selectedDates, dateStr, instance) {
        record.selectedDate = dateStr;
        datePickerModal.removeClass('--open');
        timePickerModal.addClass('--open');
      },
    });

    record.calendar.setDate(record.selectedDate);
  },
  getTimesbyDate(dateStr) {
    //console.log(dateStr);
    timepickerSect.removeClass('--hidden')
  },
  setCheckedInfo() {
    if(this.tireStorage == 1) {
      $("#tire-storage-yes").attr('checked', true);
      $("#tire-storage-no").attr('checked', false);
      $('[name="contract-number"]').attr('required', true);
      recordOrderStorageTip.removeClass('--hidden');
    } else {
      $("#tire-storage-yes").attr('checked', false);
      $('[name="contract-number"]').attr('required', false);
      $("#tire-storage-no").attr('checked', true);
    }

    selectedCenterEl.text(this.selectedCenter);
    selectedDateEl.text(this.selectedDate);
    selectedTimeEl.text(this.selectedTime);
    selectedCenterSect.removeClass('--hidden');
    recordOrder.removeClass('--hidden');
  }
};

// tabs
$('.tabs-block')
  .on('click', '.tabs-block__btns-item', function () {
    $('.tabs-block__btns-item').removeClass('--active');
    $(this).addClass('--active');

    let tabIndex = $(this).data('tab-block');
    let tabContentBlock = $(`.tabs-block__content[data-tab-block-content="${tabIndex}"]`);

    if (!tabContentBlock.is(':visible')) {
      $('.tabs-block__content').removeClass('--active').fadeOut();
      tabContentBlock.fadeIn();
    }
  })

  $('.accordion-block__header').on('click', function () {
    const parent = $(this).parents('.accordion-block');
    parent.toggleClass('--opened');
    parent.find('.accordion-block__content').slideToggle('fast');
  })

