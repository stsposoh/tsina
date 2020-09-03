calcSum();

$('.js-input-minus').on('click', function () {
  const input = $(this).parents('.input-counter').find('.input-counter__field');
  let count = parseInt(input.val()) - 1;
  count = count < 1 ? 1 : count;
  input.val(count);
  input.change();
  calcSum();
});
$('.js-input-plus').on('click', function () {
  const input = $(this).parents('.input-counter').find('.input-counter__field');
  input.val(parseInt(input.val()) + 1);
  input.change();
  calcSum();
});

function calcSum() {
  let total = 0;
  let productAmount = 0;
  let productCost = 0;
  let delivery = 0;

  $('.order-card').each(function () {
    productAmount = $(this).find('.input-counter__field').val();
    productCost = $(this).find('.js-product-cost').text();
    delivery = $(this).find('.js-delivery').text();
    total += parseInt(productCost.replace(/\s+/g, ''),10) * parseInt(productAmount) + parseInt(delivery);

    $(this).find('.js-product-name').val($(this).find('.order-card__title').text());
    $(this).find('.js-product-cost').val(productCost);
    $(this).find('.js-product-delivery').val(delivery);
  });


  $('.js-products-total').val(total);
  $('.js-sum-total').text(total);
}

$('#order-form').on('submit', function () {
  console.log($(this).serialize())


  // $.ajax({
  //   url: '',
  //   type: 'POST',
  //   dataType: 'json',
  //   data: $(this).serialize(),
  //   success: function(response) {
  //     console.log(response)
  //   },
  //   error: function(response) {
  //     console.log(response)
  //   }
  // });

  return false;
});



$('.js-add-order-comment').on('click', function () {
  $(this).parents('.order__comment').find('.order__comment-sect').slideToggle();
});

$('input[name="delivery"]').on('change', function () {
  const pickup = $('.js-pickup-sect');
  const newPost = $('.js-new-post-sect');
  const pickupAddress = $('.js-pickup-address');

  if($(this).val() === 'pickup') {
    newPost.hide();
    pickup.show();
    pickupAddress.removeAttr("required");
  }
  if($(this).val() === 'new-post') {
    pickup.hide();
    newPost.show();
    pickupAddress.attr("required", 'required');
  }
});

$('input[name="payment"]').on('change', function () {
  $('.order__radio-payment-pats').each(function () {
    $(this).removeClass('--visible');
  });

  if($(this).val() === 'monobank' || $(this).val() === 'Payment by parts Privatbank') {
    $(this).parents('.order__radio').find('.order__radio-payment-pats').addClass('--visible');
  }
});

$('.js-num-of-month').on('change', function () {
  let amount = parseInt( $(this).val() );

  $('.js-num-of-payments').text( amount + ' ' + declOfNum(amount,['платеж','платежа','платежей']) );
  $('.js-num-of-month-text').text( declOfNum(amount,['месяц','месяца','месяцев']) );
});

$('.order-card__remove').on('click', function () {
  $(this).parents('.order-card').remove();
  calcSum();
});


//declension of numbers
function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
