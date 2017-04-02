/**
 * Created by User on 02.04.2017.
 */

function findThirdMinElement(array){
    if(isNaN(Number(array[0])))
        return "Массив не числовой или числовой не полностью";
    else
        array.sort(sortNumeric);
    return array[2];
}

function sortNumeric(a, b){
    return a-b;
}

findThirdMinElement([1,7,4,8,3,5,3,2,7,7,7,6,3,8,6]);
findThirdMinElement([2.4,7.4,1.9,-4.8]);
findThirdMinElement([]);
findThirdMinElement({}, {'a':4, 'b':3}, {'b':3});
