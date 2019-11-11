var coin = 'BTC';
var ticker = 'ticker';

fetchWithParameters(coin, ticker);

//#region http calls
function fetchWithParameters(coin, ticker) {
  fetch('https://www.mercadobitcoin.net/api/' + coin + '/' + ticker + '/', { method: 'GET' })
    .then(function (response) {
      response.json().then(function (data) {
        getHighAndLowerValue(data);
      });
    })
    .catch(function (err) {
      console.error('Failed retrieving information', err);
    });
}

function calulateBitcoin() {
  fetch('https://www.mercadobitcoin.net/api/' + coin + '/trades/', { method: 'GET' })
    .then(function (response) {
      response.json().then(function (data) {
        returnValueCalulateBitcoin(data);
      });
    })
    .catch(function (err) {
      console.error('Failed retrieving information', err);
    });
}

//#endregion

//#region functions with data parameter
function getHighAndLowerValue(data) {
  var $myDivHigh = $("#high");
  var $myDivLow = $("#low");

  var h4_high = "<h6>Maior Cotação: " + data.ticker.high + "</h6>";
  var h4_low = "<h6>Menor Cotação: " + data.ticker.low + "</h6>";

  $myDivHigh.html(h4_high);
  $myDivLow.html(h4_low);
}

function returnValueCalulateBitcoin(data) {
  var $myDivValueInReal = $("#valueInReal");
  console.log(data[0].price);
  var h6_valueInReal = "<h6>Quatidade que pode ser comprada: " + document.getElementById('valueRS').value / data[0].price + "</h6>";

  $myDivValueInReal.html(h6_valueInReal);
}

//#endregion