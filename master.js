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

function calulateBitcoin2() {
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

function calulateBitcoin(coin) {
  if (isEmpty(coin)) {
    coin = 'BTC';
  }

  console.log(coin);

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
function isEmpty(str) {
  return (!str || 0 === str.length);
}

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
  var h6_valueInReal = "<h6>Quatidade que pode ser comprada: " + document.getElementById('valueRS').value / data[0].price + "</h6>";

  $myDivValueInReal.html(h6_valueInReal);
}

function myFunction() {
  fetchWithParameters(document.getElementById("l").value, 'ticker');
  calulateBitcoin(document.getElementById("l").value);
}

function calulateNewValueFromCurrentCoin(data) {
  console.log(data.value);
}
//#endregion