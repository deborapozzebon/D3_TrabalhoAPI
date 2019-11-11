var coin = 'BTC';
var ticker = 'ticker';

fetchWithParameters(coin, ticker);

function fetchWithParameters(coin, ticker){
  fetch('https://www.mercadobitcoin.net/api/'+coin+'/'+ticker+'/', {
  method: 'GET'
})
  .then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      getHighAndLowerValue(data);
      calulateBitcoin(data);
    });
  })
  .catch(function (err) {
    console.error('Failed retrieving information', err);
  });

}

function getHighAndLowerValue(data){
  var $myDivHigh = $("#high");
  var $myDivLow = $("#low");

  var h4_high = "<h6>Maior Cotação: " + data.ticker.high + "</h6>";
  var h4_low = "<h6>Menor Cotação: " + data.ticker.low + "</h6>";

  $myDivHigh.html(h4_high);
  $myDivLow.html(h4_low);
}

function calulateBitcoin(data){
  var text = document.getElementById('valueRS').value;



  console.log(text);
}
