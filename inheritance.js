/**
 * Created by User on 11.04.2017.
 */

/*
Дана иерархия классов животного мира: Царство  -> Класс -> Вид.
Царство(Kingdom):
Содержит в себе информацию о названии царства, и информацию о том, простые эти организмы и питаются ли они автотрофным способом.

    Содержит в себе методы:
    getKingdom – возвращает имя царства.
    getInfo – возвращает всю необходимую информацию о царстве.

Класс (Class):
Содержит в себе информацию о названии класса.

    Содержит в себе методы:
    getClass – возвращает имя класса.
    getInfo – возвращает всю необходимую информацию о класс (Имя класса, к какому царству относиться и т.д.).

Вид (Species):
Содержит в себе информацию о имени вида, ареале обитания, продолжительности жизни, является ли данный вид хищным.
    Содержит в себе методы:
    getSpecies – возвращает имя вида.
    getInfo – возвращает всю необходимую информацию о виде (Имя вида, к какому классу относиться и т.д.).
setLifespan – установить продолжительность жизни вида.
    getLifespan – получить продолжительность жизни вида.

    Необходимо реализовать данную иерархию тремя способами:
    - Функциональным способом
- Прототипным способом
- Используя class
Реализовать приватные приватные свойства, защищённые свойства, переопределение метода.*/

function Kingdom(kingdomName, isSimple, isAutotrophic){
    this._kingdomName = kingdomName;
    this._simple = isSimple;
    this._autotrophic = isAutotrophic;
    
    this.getKingdom = function () {
        return this._kingdomName;
    };

    Kingdom.toString = function (booleanValue) {
        return !!booleanValue ? 'Да' : 'Нет';
    };

    this.getInfo = function () {
        console.log('Царство: ' + this.getKingdom() + '\n' +
            'Простой: ' + Kingdom.toString(this._simple) + '\n' +
            'Автотрофный: ' + Kingdom.toString(this._autotrophic) + '\n');
    }
}

function Class(kingdomName, isSimple, isAutotrophic, className) {
    Kingdom.call(this, kingdomName, isSimple, isAutotrophic);

    this._className = className;

    this.getClass = function () {
        return this._className;
    };

    const parentGetInfo = this.getInfo;
    this.getInfo = function () {
        parentGetInfo.call(this);
        console.log('Класс: ' + this.getClass() + '\n');
    }
}

function Species(kingdomName, isSimple, isAutotrophic, className, speciesName, habitat, isPredatory) {
    Class.call(this, kingdomName, isSimple, isAutotrophic, className);
    this._speciesName = speciesName;

    this._habitat = habitat;
    this._predatory = isPredatory;
    let lifeSpan;

    this.setLifeSpan = function (value) {
        lifeSpan = value;
    };

    this.getLifeSpan = function () {
        return lifeSpan;
    };

    this.getSpicies = function () {
        return this._speciesName;
    };

    const parentGetInfo = this.getInfo;
    this.getInfo = function () {
        parentGetInfo.call(this);
        console.log('Вид: ' + this.getSpicies() + '\n' +
        'Место обитания: ' + this._habitat + '\n' +
        'Хищник: ' + Kingdom.toString(this._predatory) + '\n' +
        'Цикл жизни: ' + lifeSpan + '\n');
    }
}


let human = new Species('животные', false, true, 'млекопитающие', 'человек разумный', 'везде', true);

human.setLifeSpan(80);
human.getKingdom();
human.getInfo();