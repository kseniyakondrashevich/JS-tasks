/**
 * Created by User on 12.04.2017.
 */

class Kingdom {
    constructor(kingdomName, isSimple, isAutotrophic){
        this._kingdomName = kingdomName;
        this._simple = isSimple;
        this._autotrophic = isAutotrophic;
    };

    getKingdom () {
        return this._kingdomName;
    };

    getInfo () {
        console.log('Царство: ' + this.getKingdom() + '\n' +
            'Простой: ' + Kingdom.toString(this._simple) + '\n' +
            'Автотрофный: ' + Kingdom.toString(this._autotrophic) + '\n');
    };

    static toString(booleanValue) {
        return !!booleanValue ? 'Да' : 'Нет';
    };
}



class Class extends Kingdom {
    constructor(kingdomName, isSimple, isAutotrophic, className){
        super(kingdomName, isSimple, isAutotrophic);
        this._className = className;
    };

    getClass() {
        return this._className;
    };

    getInfo() {
        super.getInfo();
        console.log('Класс: ' + this.getClass() + '\n');
    }
}

class Species extends Class {
    constructor(kingdomName, isSimple, isAutotrophic, className, speciesName, habitat, isPredatory){
    super(kingdomName, isSimple, isAutotrophic, className);
    this._speciesName = speciesName;

    this._habitat = habitat;
    this._predatory = isPredatory;
    this._lifeSpan =0;
    };

    setLifeSpan(value) {
        this._lifeSpan = value;
    };

    getLifeSpan () {
        return this._lifeSpan;
    };

    getSpicies() {
        return this._speciesName;
    };

    getInfo() {
        super.getInfo();
        console.log('Вид: ' + this.getSpicies() + '\n' +
            'Место обитания: ' + this._habitat + '\n' +
            'Хищник: ' + Kingdom.toString(this._predatory) + '\n' +
            'Цикл жизни: ' + this._lifeSpan + '\n');
    }
}


let human = new Species('животные', false, true, 'млекопитающие', 'человек разумный', 'везде', true);

human.setLifeSpan(80);
human.getKingdom();
human.getInfo();