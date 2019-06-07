/*
   plotting diagramm with chart.js
 */

//const CHART= document.getElementById("lineChart");
//console.log(CHART);
new Chart(document.getElementById("lineChart"), {
    type: 'line',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli"],
        datasets: [
            {
                label: "My first dataset",
                fill: false,
                lineTension: 0.1,
                backdropColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'mitter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    },
    options: {
        legend: { display: true },
        title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
        }
    }

});
