import React from 'react';
import Chart from "chart.js";
// import { Line } from 'react-chartjs-2';


const BarChart = () => {


  var ctx = document.getElementById('myChart').getContext('2d');
  console.log("🚀 ~ file: BarGraph.js ~ line 10 ~ BarChart ~ ctx", ctx)

  var gradientFill = ctx.createLinearGradient(0, 250, 0, 130);
  gradientFill.addColorStop(1, "rgba(56, 182, 53, 1)");
  gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");

  var gradientFill2 = ctx.createLinearGradient(0, 250, 0, 80);
  gradientFill2.addColorStop(1, "rgba(207, 238, 206, 1)");
  gradientFill2.addColorStop(0, "rgba(255, 255, 255, 0)");


  var myChart = new Chart(ctx, {
    type: 'line',
    fillOpacity: .8,
    data: {
      labels: ['04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'],
      datasets: [
        {
          label: "Payments",
          backgroundColor: gradientFill,
          borderColor: "#38B635",
          pointBorderColor: "#38B635",
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBackgroundColor: "#FFF",
          data: [2, 2.5, 1.5, 1.8, 2, 2.4, 2, 2.5, 1.5, 1.8, 2, 1.4, 1.5, 1.8]
        },
        {
          label: "Requests",
          backgroundColor: gradientFill2,
          borderColor: "#CFEECE",
          pointBorderColor: "#CFEECE",
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBackgroundColor: "#FFF",
          data: [3, 3.5, 2.5, 3, 3, 3.4, 3, 3.5, 2.5, 2.8, 3, 2.4, 2.5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      bezierCurve: false,
      elements: {
        line: {
          tension: 0
        }
      },
      scales: {
        xAxes: [{
          gridLines: { color: "rgba(0, 0, 0, 0)" }
        }],
        yAxes: [{
          ticks: { beginAtZero: true },
          gridLines: { color: "rgba(244, 244, 244, 1)" }
        }]
      },

      tooltips: {
        custom: function (tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
        },
        callbacks: {
          // use label callback to return the desired label
          label: function (tooltipItem, data) {
            return "$" + tooltipItem.yLabel;
          },
          // remove title
          title: function (tooltipItem, data) {
            return;
          }
        },
        backgroundColor: "#FFF",
        borderColor: "rgba(0, 0, 0, 0.09)",
        borderWidth: 1,
        bodyFontColor: "rgba(0, 0, 0, 1)",
        bodyAlign: 'center',
        bodyFontSize: 14,
        bodyFontStyle: 500
      },
      legend: {
        align: 'end',
        labels: {
          boxWidth: 12,
          fontColor: "#A4A7B0"
        }
      }
    }
  });
  return (
    <canvas id='myChart' width="400" height="400" />
  )
}
export default BarChart