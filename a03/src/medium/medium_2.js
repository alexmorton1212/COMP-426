import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 * 
 */

export const allCarStats = {
    avgMpg: averageMPG(),
    allYearStats: allYearStats(),
    ratioHybrids: ratioHybrids(),
};

function averageMPG() {

    let city = 0;
    let highway = 0;

    for(let i = 0; i < mpg_data.length; i++) {
        city += mpg_data[i].city_mpg;
        highway += mpg_data[i].highway_mpg;
    }

    let obj = {
        city: city/mpg_data.length,
        highway: highway/mpg_data.length
    }

    return obj;
}

function allYearStats() {

    let years = [];

    for(let i = 0; i < mpg_data.length; i++) {
        years[i] = mpg_data[i].year;
    }

    return getStatistics(years);
}

function ratioHybrids() {

    let countHybrids = 0;

    for(let i = 0; i < mpg_data.length; i++) {
        if (mpg_data[i].hybrid) {
            countHybrids++;
        }
    }

    return (countHybrids/mpg_data.length);
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
*/

/*
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
*/

export const moreStats = {
    makerHybrids: makerHybrids(),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybrid()
};

function makerHybrids() {

    let makes = [];
    let hybrids = mpg_data.filter(car => car.hybrid);
    let makesArray = [];
    let objectArray = [];

    for(let i = 0; i < hybrids.length; i++) {
        if(!makes.includes(hybrids[i].make)) {
            makes.push(hybrids[i].make);
        }
    }

    for(let j = 0; j < makes.length; j++) {

        let tempArray = [];
        let m = 0;

        for(let k = 0; k < hybrids.length; k++) {
            if (makes[j] == hybrids[k].make) {
                tempArray[m] = hybrids[k].id;
                m++;
            }
        }
        makesArray[j] = tempArray;
    }

    for (let i = 0; i < makes.length; i++) {

        let obj = {
            make: makes[i],
            hybrids: makesArray[i]
        }
        objectArray[i] = obj;
    }

    objectArray.sort(function(a, b) {return b.hybrids.length - a.hybrids.length})
    return objectArray;
}

function avgMpgByYearAndHybrid() {

    let years = [];

    for (let i = 0; i < mpg_data.length; i++) { 
        if(!years.includes(mpg_data[i].year)) {
            years.push(mpg_data[i].year);
        }
    }
    years.sort();


    let arrayHybrids = [];
    let arrayNotHybrids = [];

    for(let i = 0; i < years.length; i++) {

        arrayHybrids[i] = mpg_data.filter(car => car.hybrid && car.year == years[i]);
        arrayNotHybrids[i] = mpg_data.filter(car => !car.hybrid && car.year == years[i]);
    }

    let averageHybridCity = [];
    let averageHybridHighway = [];
    let averageNotHybridCity = [];
    let averageNotHybridHighway = [];  
    
    for (let i = 0; i < years.length; i++) {

        let temp1 = arrayHybrids[i];
        let temp2 = arrayNotHybrids[i];

        let sumHybridCity = 0;
        let sumHybridHighway = 0;
        let sumNotHybridCity = 0;
        let sumNotHybridHighway = 0;

        for (let j = 0; j < arrayHybrids[i].length; j++) {
            sumHybridCity += temp1[j].city_mpg;
            sumHybridHighway += temp1[j].highway_mpg;
        }

        averageHybridCity[i] = sumHybridCity/arrayHybrids[i].length;
        averageHybridHighway[i] = sumHybridHighway/arrayHybrids[i].length;

        for (let j = 0; j < arrayNotHybrids[i].length; j++) {
            sumNotHybridCity += temp2[j].city_mpg;
            sumNotHybridHighway += temp2[j].highway_mpg;
        }
 
        averageNotHybridCity[i] = sumNotHybridCity/arrayNotHybrids[i].length;
        averageNotHybridHighway[i] = sumNotHybridHighway/arrayNotHybrids[i].length;
    }

    let outerObjects = {};
    let middleObjects = [];
    let innerHybridObjects = [];
    let innerNotHybridObjects = [];


    for (let i = 0; i < years.length; i++) {

        let tempHybridObject = {
            city: averageHybridCity[i],
            highway: averageHybridHighway[i]
        }

        let tempNotHybridObject = {
            city: averageNotHybridCity[i],
            highway: averageNotHybridHighway[i]
        }

        innerHybridObjects[i] = tempHybridObject;
        innerNotHybridObjects[i] = tempNotHybridObject;
    }

    for (let i = 0; i < years.length; i++) {

        let middleObject = {
            hybrid: innerHybridObjects[i],
            notHybrid: innerNotHybridObjects[i]
        }

        middleObjects[i] = middleObject;
    }

    for (let i = 0; i < years.length; i++) {

        outerObjects[years[i]] = middleObjects[i];
    }

    return outerObjects;
}


