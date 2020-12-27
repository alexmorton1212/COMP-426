import {variance} from "./data/stats_helpers.js";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {

    let sum = 0;
    var sumObj = {};

    for (let i = 0; i < array.length; i++) {
        sum = array[i] + sum;
    }

    sumObj = sum;
    // console.log(sumObj);
    return sumObj;
}

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {

    let middle = Math.ceil(array.length/2);
    var obj = {};

    if ((array.length % 2) !== 0) {
        obj = array[middle-1];
    } else {
        obj = ((array[middle]+array[middle-1])/2);
    }

    return(obj);
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {

    let length = array.length;
    let sum = getSum(array);
    let mean = sum/(length);
    let median = getMedian(array);
    let min = Math.min(...array);
    let max = Math.max(...array);
    let vari = variance(array, mean);
    let standard_deviation = Math.sqrt(vari);

    // console.log({length: length, sum: sum, mean: mean, median: median, min: min, max: max, variance: vari, standard_deviation: standard_deviation});
    return {length: length, sum: sum, mean: mean, median: median, min: min, max: max, variance: vari, standard_deviation: standard_deviation};
}
