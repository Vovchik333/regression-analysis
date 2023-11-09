export const linearRegression = (x, y) => {
    const xy = [];
    const x2 = [];
    const n = x.length;
    let sumX = 0, sumY = 0, sumXy = 0, sumX2 = 0;
    for(let i = 0; i < n; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        sumX += x[i];
        sumY += y[i];
        sumXy += xy[i];
        sumX2 += x2[i];
    }
    
    // calculating the angle of inclination
    let a = (n * sumXy - sumX * sumY) / (n * sumX2 - (sumX * sumX));
    a = Math.round(a * 1000) / 1000;
    // calculating the intersection of the regression line with the y-axis
    let b = (sumY - a * sumX) / n;
    b = Math.round(b * 1000) / 1000;
    
    if(Number.isNaN(a) || a === null) {
        a = 0;
    }
    if(Number.isNaN(b) || b === null) {
        b = 0;
    }

    // calculating the sum of squares of the deviation
    const arrSigma = [];
    let sigma = 0;
    for(let i = 0; i < n; i++) {
        arrSigma.push(Math.pow((y[i] - (a * x[i] + b)), 2));
        sigma += arrSigma[i];
    }
    sigma = Math.round(sigma * 100000) / 100000;

    return {
        a, b, sigma
    };
}

export const predictValue = (x, a, b) => {
    return Math.round((a * x + b) * 1000) / 1000;
}