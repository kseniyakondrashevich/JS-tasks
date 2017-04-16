
let Shower = function () {
    
    function showForm() {
        document.getElementsByTagName('body')[0].appendChild(Creater.createForm());
        document.getElementsByTagName('fieldset')[0].appendChild(Creater.costructForm());
    }
    
    function showButton() {
        Creater.initHtml();
        let button = Creater.createButton('Сгенерировать форму');
        document.getElementsByTagName('body')[0].appendChild(button);
        button.addEventListener('click', function () {
            document.getElementsByTagName('body')[0].removeChild(button);
            showForm();
        });
    }

    let Creater = function () {

        const bsuir =['ИЭФ','КСиС', 'ФИТиУ', 'ФРЭ', 'ФКП'];
        const bntu = ['АТФ', 'МСФ', 'ФТУГ', 'ЭФ', 'ПСФ'];
        const bsu = ['ММФ', 'ФФ', 'ВФ', 'БФ', 'ЮФ'];

        function initHtml() {
            const html = '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<link rel="stylesheet" href="style.css">' +
                '</head>' +
                '<body>' +
                '</body>' +
                '</html>';
            document.write(html);
        }

        function createForm() {
            let form = document.createElement('form');
            form.setAttribute('id', 'form');
            form.innerHTML+='<fieldset><legend align="center">Опрос студентов</legend></fieldset>';
            return form;
        }

        function createInput(name, type, className, value) {
            let input = document.createElement('input');
            input.setAttribute('name', name);
            input.setAttribute('type', type);
            if(value)
                input.setAttribute('value', value);
            input.classList.add(className);
            return input;
        }

        function createLabel(text) {
            let label = document.createElement('label');
            label.classList.add('labels');
            label.appendChild(document.createTextNode(text));
            return label;
        }

        function createButton(text, type) {
            let button = document.createElement('button');
            if(type)
                button.setAttribute('type', type);
            button.classList.add('buttons');
            button.appendChild(document.createTextNode(text));
            return button;
        }

        function createSelect(name, options, className) {
            let select = document.createElement('select');
            select.classList.add('selects');
            select.setAttribute('name', name);
            let array = createOptions(options, className);
            array.forEach(function (elem) {
                select.appendChild(elem);
            });
            return select;
        }

        function createOptions(options, className) {
            let optionsArray =[];
            let option;
            for(let i=0; i<options.length;i++) {
                option = document.createElement('option');
                option.setAttribute('value', options[i]);
                option.classList.add(className);
                option.appendChild(document.createTextNode(options[i]));
                optionsArray[i]=option;
            }
            return optionsArray;
        }

        function createTextArea(name, cols, rows) {
            let textArea = document.createElement('textArea');
            textArea.setAttribute('name', name);
            textArea.setAttribute('cols', cols);
            textArea.setAttribute('rows', rows);
            textArea.classList.add('textInputs');
            return textArea;
        }

        function costructForm() {

            let fragment = document.createDocumentFragment();

            let label = Creater.createLabel('Введите фамилию:');
            let input = Creater.createInput('surname', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Введите имя:');
            input = Creater.createInput('name', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Введите отчество:');
            input = Creater.createInput('lastName', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Мужской');
            input = Creater.createInput('pol', 'radio', 'radioInputs', 'Мужской');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Женский');
            input = Creater.createInput('pol', 'radio', 'radioInputs', 'Женский');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Выберите университет:');
            input = Creater.createSelect('university', ['', 'БГУиР', 'БНТУ', 'БГУ'], 'university');
            input.onchange = changeOptions;
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Выберите факультет:');
            input = Creater.createSelect('faculty', [], 'faculty');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Укажите курс:');
            input = Creater.createInput('course', 'number', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('Заочно');
            input = Creater.createInput('InAbsentia', 'checkbox', 'radioInputs', 'Да');
            label.appendChild(input);
            fragment.appendChild(label);

            label = Creater.createLabel('О себе...');
            input = Creater.createTextArea('about', 40, 4);
            label.appendChild(input);
            fragment.appendChild(label);

            input = Creater.createButton('Показать', 'submit');
            input.onclick = WorkerWithData.pickUpData;
            //input.addEventListener('click', WorkerWithData.pickUpData());
            fragment.appendChild(input);

            input = Creater.createButton('Очистить', 'reset');
            fragment.appendChild(input);

            return fragment;
        }

        function changeOptions() {
            const select = document.getElementsByTagName('select')[0];
            const options = document.getElementsByClassName('university');
            const index = select.selectedIndex;
            let nextSelect = document.getElementsByTagName('select')[1];
            let nextOptions = document.getElementsByClassName('faculty');

            for(let i=nextOptions.length-1; i>=0 ;i--){
                nextSelect.removeChild(nextOptions[i]);
            }
            let array = [];
            switch (index){
                case 1:
                    array = createOptions(bsuir, 'faculty');
                    break;
                case 2:
                    array = createOptions(bntu, 'faculty');
                    break;
                case 3:
                    array = createOptions(bsu, 'faculty');
                    break;
            }
            for(let i=0; i<array.length;i++)
                nextSelect.appendChild(array[i]);
        }

        return{
            initHtml : initHtml,
            createForm : createForm,
            createInput : createInput,
            createLabel : createLabel,
            createButton : createButton,
            createSelect : createSelect,
            createTextArea : createTextArea,
            costructForm : costructForm,
        }

    }();


    return{
        showButton : showButton
    }

}();


let WorkerWithData = function () {

    let textsValues = [];
    let checksValues = [];
    let selectValues = [];

    function pickUpData () {
        let texts = document.getElementsByClassName('textInputs');
        for(let i=0; i<texts.length;i++){
            textsValues[i]=texts[i].value;
        }

        let checks = document.getElementsByClassName('radioInputs');
        for(let i=0; i<checks.length; i++){
            if(checks[i].checked)
                checksValues.push(checks[i].value);
        }

        let options = document.getElementsByTagName('option');
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected)
                selectValues.push(options[i].value);
        }

        showData();
    }

    function showData() {
        const result = 'Фамилия: ' + textsValues[0] + '\n' +
            'Имя: ' + textsValues[1] + '\n' +
            'Отчество: ' + textsValues[2] + '\n' +
            'Пол: ' + checksValues[0] + '\n' +
            'Университет: ' + selectValues[0] +  '\n' +
            'Факультет: ' + selectValues[1] + '\n' +
            'Курс: ' + textsValues[3] + '\n' +
            'Заочно: ' + !!checksValues[1] + '\n' +
            'О себе: ' + textsValues[4];

        alert(result);
    }

    return{
        pickUpData : pickUpData
    }
}();

Shower.showButton();
