// /**
//  *
//  * @param {number} a
//  * @param {number} b
//  * @returns {string} 'a + b = (a + b)'
//  *
//  * example: sumToString(3, 4)
//  * returns: '3 + 4 = 7'
//  * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//  */
// export function sumToString(a, b) {

//     let c = a+b;
//     let str = a + " + " + b + " = " + c;
//     return str;
// }

// /**
//  *
//  * @param {number} startNumber
//  * @param {number} endNumber
//  * @returns {number[]}
//  *
//  * example: getIncreasingArray(3, 7)
//  * returns: [ 3, 4, 5, 6, 7 ]
//  *
//  */
// export function getIncreasingArray(startNumber, endNumber) {

//     let array = [];
//     let length = endNumber - startNumber + 1;

//     if(startNumber <= endNumber) {
//         for(let i = 0; i < length; i++){
//             array[i] = startNumber + i;
//         }
//     }

//     return array;
// }


// /**
//  *
//  * @param {number[]} numbers
//  * @return {{min: number, max: number}}
//  * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
//  * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
//  */
// export function maxAndMin(numbers) {

//     let min = Math.min(...numbers);
//     let max = Math.max(...numbers);

//     return {min: min, max: max};
// }

// /**
//  *
//  * @param array - An array of any primitive type
//  * @returns {object} Object where the keys are the values that were passed in
//  * and the value was the number of times it occurred.
//  *
//  * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
//  * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
//  *
//  */
// export function countArray(array) {
    
//     let count = {};

//     for(let i = 0; i < array.length; i++) {

//         if(count[array[i]] == null) {
//             count[array[i]] = 1;
//         } else {
//             count[array[i]] += 1;
//         }
//     }

//     return count;
// }

function f() {
    console.log("I'm a tarheel born");
    return () => {
        console.log("I'm a tarheel bred");
    };
}
setTimeout(f, 10);
console.log("and when I die");
// setTimeout(f(), 20);
// console.log("im a tarheel dead");