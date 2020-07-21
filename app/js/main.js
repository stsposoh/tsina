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

$('.center-gallery__previews-item').on('click', function (e) {
  e.preventDefault();
  centerGallery.showMainPhoto($(this))
});

//centers
const tireCenters = $('.js-centers');
const recordSect = $('#record');
const recordByTimeBtn = $('.js-record-by-time');
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
    recordByTimeBtn.removeClass('record-active');
    recordByCenterBtn.removeClass('record-active');
    recordDateSect.addClass('--hidden');
    tireCentersSect.addClass('--hidden');
    selectedCenterSect.addClass('--hidden');
  }
});

recordByTimeBtn.on('click', function () {
  $(this).addClass('record-active');
  recordByCenterBtn.removeClass('record-active');
  if(record.tireStorage === null) {
    tireStorageModal.addClass('--open');
  }
  recordDateSect.removeClass('--hidden');
  timepickerSect.addClass('--hidden');
  tireCentersSect.addClass('--hidden');
  selectedCenterSect.addClass('--hidden');
  record.initCalendar();
});

recordByCenterBtn.on('click', function () {
  $(this).addClass('record-active');
  recordByTimeBtn.removeClass('record-active');
  recordDateSect.addClass('--hidden');
  tireCentersSect.addClass('--hidden');
  selectedCenterSect.addClass('--hidden');
});

$('.js-tire-storage').on('click', function () {
  record.tireStorage = $(this).data('storage');
});

$('.timepicker').on('click', function (e) {
  if($(e.target).hasClass('timepicker__day-time')) {
    $('.timepicker__day-time').each(function () {
      $(this).removeClass('--checked');
    });
    $(e.target).addClass('--checked');
    record.selectedDate = $(e.target).parents('.timepicker__day').data('date');
    record.selectedTime = $(e.target).text();
    record.calendar.setDate(new Date(record.selectedDate))
    tireCentersSect.removeClass('--hidden');
  }
});

tireCentersSect.on('click', '.js-check-tire-center', function () {
  tireCentersSect.find('.js-check-tire-center').each(function () {
    $(this).removeClass('--checked');
  });
  $(this).addClass('--checked');
  record.selectedCenter = $(this).parents('.tire-center-card-small').data('center');
  record.setCheckedInfo();
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

  $('#record-steps').hide();
  $('#record-success').show();

  return false;
});

const record = {
  selectedCity: null,
  selectedCenter: '',
  tireStorage: null,
  selectedDate: '',
  selectedTime: '',
  calendar: null,
  initCalendar() {
    this.calendar = $("#basicDate").flatpickr({
      locale: "ru",
      inline: true,
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: "today",
      maxDate: new Date().fp_incr(40),
      disable: ["2020-07-30", "2020-07-29"],
      onChange: function(selectedDates, dateStr, instance) {
        if(record.tireStorage === null) {
          tireStorageModal.addClass('--open');
        }
        record.getTimesbyDate(dateStr);
      },
    });
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
