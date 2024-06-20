'use strict'

function gatherEqual(someAnagrams) {
    const obj = {};
    for (let i = 0; i < someAnagrams.length; i++) {
        const word = someAnagrams[i];
        const arr = word.split('');
        arr.sort();
        const key = arr.join('');
        if (key in obj) {
            obj[key].push(word);
        }
        else {
            obj[key] = [word];
        }
    }
    return Object.values(obj);
}
