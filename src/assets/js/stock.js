import $ from 'jquery';
export function checkStock () {
   
    var skus = []; 
   $.each($('button[data-sku]'),function () {
       skus.push($(this).attr('data-sku'));
   })
   console.log("hafezz stock",skus);
    var settings = {
        "url": "https://api-stage.boxouthealth.io/v1/getinventory?skus="+ skus.join(','),
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "X-Shop-Domain": "store-4bn9h0haxw.mybigcommerce.com",
          "X-Division-Account-Id": "1-TESTTEST",
          "x-api-key": "J7vrtXGbaXEMMyjYRcYV6TUZNSAEhHdmrzU22P70"
        },
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}
