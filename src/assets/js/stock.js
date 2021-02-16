import $ from 'jquery';

function onlyUnique(value, index, self) {
  let key = value.sku;
  let keyIndex = -1;

  for(let i =0; i < self.length; i++) {
    if(self[i].sku === key) {
      keyIndex = i;
      break;
    }
  }
  return keyIndex === index;
}

export function checkStock(baseUrl,cb) {

  var skus = [];
  $.each($('[data-sku]'), function () {
    skus.push({
      type: $(this).attr('data-skuType'),
      sku: $(this).attr('data-sku')
    });
  })
  
  var uniqueSkus = skus.filter(onlyUnique);
  
  var settings = {
    "url": "https://dev-ecomm.obagi.com/api/bigcommerce/v1/boxouthealth",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "skus": uniqueSkus
    })
  };
  if(uniqueSkus.length == 0){
    return;
  }
  $.ajax(settings).done(function (response) {
    for (var sku in response) {
      if (response.hasOwnProperty(sku)) {
        var skuNumber = response[sku];
        if (!skuNumber) {
          $.each($('[data-sku=' + sku + ']'), function () {
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

    if(cb){
      cb(response);
    }
  });
}
