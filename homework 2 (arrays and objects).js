'use strict';

function createObjectsArray(...objects){
    let objectsArray = [];
    for(let i=0; i<objects.length;i++){
        objectsArray[i]=objects[i];
    }
    return objectsArray;
}

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

findUnique(createObjectsArray({'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'a':2}, {'a':1}), 'a');
findUnique(createObjectsArray({'a':1, 'b':2, 'c':3}, {'a':4, 'c':0}, {'a':2}, {'a':1}), ['a', 'b']);