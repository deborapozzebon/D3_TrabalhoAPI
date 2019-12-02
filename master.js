var coin = 'BTC';
var ticker = 'ticker';
var dataChart = null;
var options = {
  hAxis: {
    title: 'Dia',
    format: 'MMM dd',
  },
  vAxis: {
    title: 'Valor'
  },
  backgroundColor: '#f1f8e9'
};

fetchWithParameters(coin, ticker);

function LoadChart() {
    dataChart = new google.visualization.DataTable();
    dataChart.addColumn('date', 'dias');
    dataChart.addColumn('number', 'Preço da moeda');
}

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

async function getMediumAverage() {
    LoadChart();

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

  for (var day = 0; day <= 7; day++) {
    var date = new Date();

    date.setDate(date.getDate() - day);

    var dayLocal = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var url = 'https://www.mercadobitcoin.net/api/' + coin + '/day-summary/' + year + '/' + month + '/' + dayLocal + '/';
    console.log(url.toString());
    
    var response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    var data = await response.json();
    
    if (data.error){
      console.log(data.error.toString());
      continue;
    }

    var averagePrice = parseFloat(data.avg_price);

    console.log(dayLocal.toString() + " - " + averagePrice.toString());

    dataChart.addRows([
      [date, averagePrice],
    ]);
      
    chart.draw(dataChart, options);
  }
}

function calulateBitcoinWithoutParamether() {
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
  if (isEmpty(coin)) {1
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
google.charts.setOnLoadCallback(getMediumAverage);

function drawChart(data) {
}
//#endregion