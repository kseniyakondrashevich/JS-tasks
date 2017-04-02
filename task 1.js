'use strict';

function findUnique(objects, filterObjects){
    let checkEqualsArray;
    let uniqueObjects= [];
    uniqueObjects[0]=objects[0];
    for(let i=1; i<objects.length; i++){
        checkEqualsArray='';
        for(let k=0; k<uniqueObjects.length; k++){
            checkEqualsArray='';
            for(let j=0; j<filterObjects.length;j++){
                checkEqualsArray+=isEquals(objects[i], uniqueObjects[k], filterObjects[j]);
            }
            if(!isContain(checkEqualsArray))
                break;
        }
        if(isContain(checkEqualsArray))
            uniqueObjects.push(objects[i]);
    }
    return uniqueObjects;
}

function isContain(string) {
    return (~string.indexOf('false'));
}

function isEquals(currentObject, object, filterObject) {
    return currentObject[filterObject]===object[filterObject];
}

findUnique([{'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'b':2, 'c':0}, {'a':2}, {'a':1}], 'a');
findUnique([{'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'b':2, 'c':0}, {'a':2}, {'a':1}], ['a', 'b']);
findUnique([{'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'b':2, 'c':0}, {'a':2}, {'a':1}], ['f']);
findUnique([{'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'b':2, 'c':0}, {'a':2}, {'a':1}], ['c']);
findUnique([{'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'b':2, 'c':0}, {'a':2}, {'a':1}], []);
findUnique([{'a':4, 'c':0}, {'a':1,'b':2, 'c':3}, {'a':2}, {'a':1, 'b':2, 'c':3}, {'a':1}], ['a','b', 'c']);