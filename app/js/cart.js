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

  productCounter.text( amount + ' ' + declOfNum(amount,['товар','товара','товаров']) );
  productTotal.text(total);
}


