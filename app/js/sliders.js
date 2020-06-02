$('.js-intro-actions').slick({
  infinite: false,
  arrows: false,
  dots: true,
  slidesToShow: 2,
  variableWidth: true,
  responsive: [{
    breakpoint: 1010,
    settings: { slidesToShow: 1 }
  }, {
    breakpoint: 768,
    settings: { slidesToShow: 3 }
  }, {
    breakpoint: 755,
    settings: { slidesToShow: 2 }
  }, {
    breakpoint: 515,
    settings: { slidesToShow: 1 }
  }]
});

$('.js-slider-producers').slick({
  slidesToShow: 1,
  prevArrow: '.js-slider-producers-prev',
  nextArrow: '.js-slider-producers-next',
  dots: true,
  fade: true
});

$('.js-slider-brands').slick({
  infinite: false,
  arrows: false,
  dots: true,
  slidesToShow: 3,
  variableWidth: true,
  responsive: [{
    breakpoint: 1010,
    settings: {
      slidesToShow: 1,
      centerMode: true,
      initialSlide: 1
    }
  }, {
    breakpoint: 768,
    settings: { slidesToShow: 2 }
  }, {
    breakpoint: 519,
    settings: { slidesToShow: 1 }
  }]
});

$('.js-slider-news').slick({
  infinite: false,
  arrows: false,
  dots: true,
  slidesToShow: 3,
  variableWidth: true,
  responsive: [{
    breakpoint: 1010,
    settings: {
      slidesToShow: 1,
      centerMode: true,
      initialSlide: 1
    }
  }, {
    breakpoint: 768,
    settings: { slidesToShow: 2 }
  }, {
    breakpoint: 519,
    settings: { slidesToShow: 1 }
  }]
});

$('.js-slider-reviews').slick({
  infinite: false,
  arrows: false,
  dots: true,
  slidesToShow: 3,
  variableWidth: true,
  responsive: [{
    breakpoint: 1005,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 768,
    settings: { slidesToShow: 2 }
  }, {
    breakpoint: 519,
    settings: { slidesToShow: 1 }
  }]
});
