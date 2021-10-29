function getPrices() {
  return {
    priceIphone: [69990, 99990, 139990],
    amountIphonePrice: {
      option2: 1000,
      option3: 30000,
    },
    addPrice: {
      prop1: 16990,
      pro2: 1000,
    },
  };
}

function updatePrice() {
  var select = document.getElementsByName('selectIphone')[0];
  var price = 0;
  var prices = getPrices();
  var priceIndex = parseInt(select.value) - 1;
  var quantity = document.getElementsByName('quantity-name');
  if (priceIndex >= 0) {
    price = prices.priceIphone[priceIndex];
  }

  var radioDiv = document.getElementById('radios');
  if (select.value == '1' || select.value == '3') {
    radioDiv.style.display = 'none';
  } else {
    radioDiv.style.display = 'block';
  }

  var radios = document.getElementsByName('amountIphone');
  radios.forEach(function (radio) {
    if (radio.checked) {
      var optionPrice = prices.amountIphonePrice[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  document.getElementsByName(
    'quantity-name'
  )[0].value = document
    .getElementsByName('quantity-name')[0]
    .value.replace(/[^0-9]/g, '');
  if (
    /^[0-9]+$/.test(quantity[0].value) &&
    /^[0-9]+$/.test(quantity[0].value)
  ) {
    price *= quantity[0].value;
  }

  var checkDiv = document.getElementById('checkboxes');
  if (select.value == '1' || select.value == '2') {
    checkDiv.style.display = 'none';
  } else {
    checkDiv.style.display = 'block';
  }

  var checkboxes = document.querySelectorAll('#checkboxes input');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      var propPrice = prices.addPrice[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });

  var inputPrice = document.getElementById('prodPrice');
  inputPrice.innerHTML = price + ' рублей';
}

window.addEventListener('DOMContentLoaded', function (event) {
  var radioDiv = document.getElementById('radios');
  radioDiv.style.display = 'none';

  var quantityPrice = document.getElementsByName('quantity-name')[0];
  quantityPrice.addEventListener('input', function () {
    updatePrice();
  });

  var select = document.getElementsByName('selectIphone')[0];
  select.addEventListener('change', function () {
    var checkboxes = document.querySelectorAll('#checkboxes input');
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
    var radios = document.getElementsByName('amountIphone');
    radios.forEach(function (radio) {
      if (radio.checked) {
        radio.checked = false;
      }
    });
    document.getElementsByName('quantity-name')[0].value = 1;
    updatePrice();
  });

  document.getElementsByName('amountIphone').forEach(function (radio) {
    radio.addEventListener('change', function () {
      updatePrice();
    });
  });

  document.querySelectorAll('#checkboxes input').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      updatePrice();
    });
  });

  updatePrice();
});
