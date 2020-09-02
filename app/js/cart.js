$('.js-open-mini-cart').on('click', function () {
  $('html').css('overflow','hidden');
  countProductsInMiniCart();
  $('#mini-cart').addClass('--open')
});

$('.mini-cart__footer-back').on('click', function () {
  $('html').css('overflow','');
  $('#mini-cart').removeClass('--open')
});

$('.js-mini-cart-amount').on('change', function () {
  countProductsInMiniCart();
});

$('.mini-cart__product-remove').on('click', function () {
  $(this).parents('.mini-cart__product').remove();
  countProductsInMiniCart();
});

function countProductsInMiniCart() {
  const miniCart = $('.mini-cart');
  const productCounter = $('.js-product-count');
  const productTotal = $('.js-mini-cart-total');
  let amount = 0;
  let total = 0;

  miniCart.find('.mini-cart__product').each(function () {
    let totalAmount = parseInt( $(this).find('.js-mini-cart-amount').val() );
    let totalPrice = totalAmount * parseInt( $(this).find('.js-mini-cart-price').val() );
    amount += totalAmount;
    total += totalPrice;
  });

  productCounter.text( declOfNum(amount,['товар','товара','товаров']) );
  productTotal.text(total);
}

//declension of numbers
function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
