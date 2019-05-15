var ctx = document.getElementById('myChart').getContext('2d');


const train = {
  type: 'scatter',
  label: 'RNN ERORR',
  data: [

  ],

  backgroundColor: 'rgba(170, 0, 255, 0.2)',
  borderColor: 'rgba(170, 0, 255,1)',
  borderWidth:1
};
var chartDefault = {
  type: 'bar',
  data: {
    labels: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50
    ],
    datasets: []
  },
  options: {
    scales: {
      xAxes: [
        {
          display: true,
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Epoch'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            suggestedMax: 50
          }
        }
      ],
      yAxes: [
        {
          display: false,
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Error'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 0.0001
          }
        }
      ]
    }
  }
};



var CHART = new Chart(ctx, chartDefault);

CHART.data.datasets=[train]

CHART.update();


