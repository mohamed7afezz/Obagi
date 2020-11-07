import $ from 'jquery';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export function checkStock(baseUrl) {

  var skus = [];
  $.each($('[data-sku]'), function () {
    skus.push($(this).attr('data-sku'));
  })
  
  var uniqueSkus = skus.filter(onlyUnique);
  
  var settings = {
    "url": baseUrl+"bigcommerce/v1/boxouthealth?skus=" + uniqueSkus.join(','),
    "method": "GET"
  };
  if(uniqueSkus.length == 0){
    return;
  }
  $.ajax(settings).done(function (response) {
    for (var sku in response) {
      if (response.hasOwnProperty(sku)) {
        var skuNumber = response[sku];
        if (skuNumber < 100) {
          $.each($('button[data-sku=' + sku + ']'), function () {
            $(this).html('Temporarily out of stock');
            $(this).addClass('out-of-stock');
            this.onclick = function (e) { e.stopPropagation(); return false };
            this.disabled = true;
          })
        }
      }
    }
    
    $('[data-sku]').addClass('add-btn-ready');
    $('[data-sku]').removeAttr("data-sku");
  });
}
