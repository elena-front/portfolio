'use strict'

function reverse(num) {

    if (typeof (num) !== 'number') {
        throw new Error('enter a number')
    }

    const reversedNum = Math.abs(num).toString().split('').reverse().join('');

    let i = 0;
    while (reversedNum[i] == 0) { i++; }

    const noZeroNum = Number(reversedNum.slice(i)) * Math.sign(num);

    if ((noZeroNum > (Math.pow(2, 31) - 1)) || (noZeroNum < Math.pow(-2, 31))) {
        return 0;
    } else {
        return noZeroNum;
    }
}
