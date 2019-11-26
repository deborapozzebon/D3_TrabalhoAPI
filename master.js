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

function getAverage(coin, year, day, month) {
  console.log(coin);
  fetch('https://www.mercadobitcoin.net/api/'+coin+'/day-summary/'+year+'/'+month+'/'+day+'/', { method: 'GET' })
    .then(function (response) {
      response.json().then(function (data) {
        console.log(JSON.parse(data));
        //drawChart(data);
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

//#region chart
google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawChart(data){
}



function drawBackgroundColor() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'X');
  data.addColumn('number', 'Preço da moeda');

  var date = new Date();
  date.setDate(date.getDate() - 1);
  console.log(date.getFullYear());
  console.log(date.getMonth()+1);
  console.log(date.getDate()-1);

  var aaa = getAverage(coin, date.getFullYear(), date.getMonth()+1, date.getDate()-10)

  data.addRows([
    [new Date(date), 0],
    [new Date(date.setDate(date.getDate() - 1)), 15],
    [new Date(date.setDate(date.getDate() - 1)), 10],
    [new Date(date.setDate(date.getDate() - 1)), 15],
    [new Date(date.setDate(date.getDate() - 1)), 25],
    [new Date(date.setDate(date.getDate() - 1)), 15],
    [new Date(date.setDate(date.getDate() - 1)), 5],
  ]);

  var options = {
    hAxis: {
      title: 'Período',
      format: 'MMM dd',
    },
    vAxis: {
      title: 'Valor'
    },
    backgroundColor: '#f1f8e9'
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

//#endregion