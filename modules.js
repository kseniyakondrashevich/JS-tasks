/**
 * Created by User on 06.04.2017.
 */

'use strict';

function workWithLocalStorage(){

    function get(key){
        return localStorage[key]!==undefined ? JSON.parse(localStorage[key]) : undefined;
    }

    function getAll() {
        let objectsArray = {};
        for(let i=0; i<localStorage.length;i++){
            objectsArray[localStorage.key(i)]=get(localStorage.key(i));
        }
        return objectsArray;
    }
    
    function set(key, value) {
        if(value!=undefined && !isNaN(value)){
            localStorage[key] = JSON.stringify(value);
            return true;
        }
        return false;
    }
    
    function remove(key) {
        if(get(key)){
           delete localStorage[key];
           return true;
        }
        return false;
    }

    function clear() {
        localStorage.clear();
    }

    function add(objects) {
        if(objects.length!=0) {
            objects.forEach(function (element) {
                for (let key in element) {
                    set(key, element[key]);
                }
            })
        }
        else return false;
    }

    return{
        get : get,
        getAll: getAll,
        set: set,
        remove: remove,
        clear: clear,
        add: add
    }
}

let worker = workWithLocalStorage();

worker.set(1, 'string');
worker.set('boolean', false);
worker.set(2.1, []);
worker.set([], [1,2,3,4,5,6,'text','message']);
worker.set(3, {});
worker.set({}, {1: 'value', 'key':'value2'});
worker.set(undefined, undefined);
worker.set(NaN, NaN);

worker.add([{'Tom&Jerry': 'cartoon'}, {'Titanik': 'drama'}, {'ring': 'horror'}]);
worker.add([]);

worker.getAll();

worker.get(1);
worker.get(12345677788);
worker.get({});

worker.remove(1);
worker.remove(15234324);

worker.clear();