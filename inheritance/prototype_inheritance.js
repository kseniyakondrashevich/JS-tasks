/**
 * Created by User on 12.04.2017.
 */

'use strict';

function Kingdom(kingdomName, isSimple, isAutotrophic) {
    this._kingdomName = kingdomName;
    this._simple = isSimple;
    this._autotrophic = isAutotrophic;
}

    Kingdom.prototype.getKingdom = function () {
        return this._kingdomName;
    };

Class.prototype = Object.create(Kingdom.prototype);

    Kingdom.prototype.toString = function (booleanValue) {
        return !!booleanValue ? 'Да' : 'Нет';
    };

    Kingdom.prototype.getInfo = function () {
        console.log('Царство: ' + this.getKingdom() + '\n' +
            'Простой: ' + this.toString(this._simple) + '\n' +
            'Автотрофный: ' + this.toString(this._autotrophic) + '\n');
    };

function Class(kingdomName, isSimple, isAutotrophic, className) {
    Kingdom.call(this, kingdomName, isSimple, isAutotrophic);
    this._className = className;
}

Species.prototype = Object.create(Class.prototype);

    Class.prototype.getClass = function () {
        return this._className;
    };

    Class.prototype.getInfo = function () {
        Kingdom.prototype.getInfo.apply(this, arguments);
        console.log('Класс: ' + this.getClass() + '\n');
    };

function Species(kingdomName, isSimple, isAutotrophic, className, speciesName, habitat, isPredatory) {
    Class.call(this, kingdomName, isSimple, isAutotrophic, className);
    this._speciesName = speciesName;
    this._habitat = habitat;
    this._predatory = isPredatory;
    this._lifeSpan = 0;
}

    Species.prototype.setLifeSpan = function (value) {
        this._lifeSpan = value;
    };

    Species.prototype.getLifeSpan = function () {
        return this._lifeSpan;
    };

    Species.prototype.getSpicies = function () {
        return this._speciesName;
    };

    Species.prototype.getInfo = function () {
        Class.prototype.getInfo.apply(this, arguments);
        console.log('Вид: ' + this.getSpicies() + '\n' +
            'Место обитания: ' + this._habitat + '\n' +
            'Хищник: ' + this.toString(this._predatory) + '\n' +
            'Цикл жизни: ' + this._lifeSpan + '\n');
    };

let human = new Species('животные', false, true, 'млекопитающие', 'человек разумный', 'везде', true);

human.setLifeSpan(80);
human.getKingdom();
human.getInfo();