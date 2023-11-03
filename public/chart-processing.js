import { linearRegression } from "./modules/linear-regression.js";

const chartInit = () => {
    const ctx = document.getElementById('chart').getContext('2d');

    return new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Points',
                backgroundColor: 'rgb(125, 67, 120)',
                data: []
            }, {
                label: 'Line of regression',
                borderColor: 'rgb(126, 237, 183)',
                fill: false,
                data: [],
                type: 'line'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelSting: '(x)'
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelSting: '(y)'
                    }
                }],
            }
        }
    });
}

const init = () => {
    const xData = [];
    const yData = [];
    const btnUpdateTable = document.querySelector('.btn-update-table');
    const btnUpdateChart = document.querySelector('.btn-update-chart');
    const formula = document.querySelector('.formula');
    const dataTable = document.querySelector('.data-table');

    const inputX = document.querySelector('.input-x');
    const inputY = document.querySelector('.input-y');

    const chart = chartInit();

    const updateTable = (x, y) => {
        const tr = document.createElement('tr');
        const tdX = document.createElement('td');
        const tdY = document.createElement('td');

        tdX.innerHTML = x;
        tdY.innerHTML = y;

        tr.appendChild(tdX);
        tr.appendChild(tdY);

        dataTable.querySelector('tbody').appendChild(tr);
    }

    btnUpdateTable.addEventListener('click', () => {
        const x = parseFloat(inputX.value);
        const y = parseFloat(inputY.value);
        xData.push(x);
        yData.push(y);
        
        updateTable(x, y);
    });

    const updateChart = (x, y, a, b) => {
        const points = [];
        const regressionLine = [];
        for(let i = 0; i < xData.length; i++) {
            let regressionY = a * x[i] + b;
            regressionY = Math.round(regressionY * 1000) / 1000;
            points.push({x: x[i], y: y[i]});
            regressionLine.push({x: x[i], y: regressionY});
        }
        console.log(points);
        console.log(regressionLine);

        chart.data.datasets[0].data = points;
        chart.data.datasets[1].data = regressionLine;

        chart.update();
    };

    btnUpdateChart.addEventListener('click', async () => {
        const {a, b, sigma} = linearRegression(xData, yData);
        formula.innerHTML = `Formula: y = ${a} * x + ${b}`;
        updateChart(xData, yData, a, b);
    });
}

document.addEventListener('DOMContentLoaded', init(), false);