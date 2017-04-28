let Shower = function () {
    
    function showForm() {
        document.getElementsByTagName('body')[0].appendChild(Creater.createForm());
        document.getElementsByTagName('fieldset')[0].appendChild(Creater.constructForm());
        Modifier.modifyControls();
    }
    
    function showButton() {
        $(document).ready(function () {
            let button = Creater.createButton('Сгенерировать форму');
            document.getElementsByTagName('body')[0].appendChild(button);
            Modifier.modifyControls();
            button.addEventListener('click', function () {
                document.getElementsByTagName('body')[0].removeChild(button);
                showForm();
            });
        });
    }

    let Modifier = function () {

        function modifyButtons() {
            $('button').addClass('ui-button ui-widget ui-corner-all').button();
        }
        
        function modifyInputToAutocomplete() {
            $('input[name = "university"]').on('change', Creater.changeOptions).autocomplete({
                source: ['БГУИР', 'БНТУ', 'БГУ']
            });
        }

        function modifySelects() {
            $('select').selectmenu();
        }

        function modifyRadioAndChecks() {
            $('.radioInputs').checkboxradio();
        }

        function modifyNumber() {
            let course =  $('input[name = "course"]');
            course.attr('readOnly', 'true');
            let slider = $('#slider');
            slider.slider({
                range: "max",
                min: 1,
                max: 5,
                value: 1,
                slide: function( event, ui ) {
                    course.val( ui.value );
                }
            });
            course.val( slider.slider( "value" ) );
        }

        function modifyInputToDatePicker() {
            $('input[name = "datePicker"]').datepicker();
        }

        function modifyControls() {
            modifyButtons();
            modifyInputToAutocomplete();
            modifySelects();
            modifyRadioAndChecks();
            modifyNumber();
            modifyInputToDatePicker();
        }

        return{
            modifyControls : modifyControls
        }
    }();

    let Creater = function () {

        const bsuir =['ИЭФ','КСиС', 'ФИТиУ', 'ФКП', 'ФТК'];
        const bntu = ['ФПМ', 'ЮФ', 'ФФ', 'АФ', 'ФММП'];
        const bsu = ['ФМП', 'ФТИ', 'ФФ', 'ФАТ', 'ФТИ'];

        function createForm() {
            let form = document.createElement('form');
            form.setAttribute('id', 'form');
            form.innerHTML+='<fieldset><legend align="center">Опрос студентов</legend></fieldset>';
            return form;
        }

        function createInput(name, type, className, value) {
            let input = document.createElement('input');
            input.setAttribute('name', name);
            if(type)
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

        function createDiv(id) {
            let div = document.createElement('div');
            div.setAttribute('id', id);
            return div;
        }

        function constructForm() {

            let fragment = document.createDocumentFragment();

            let label = createLabel('Фамилия');
            let input = createInput('surname', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Имя');
            input = createInput('name', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Отчество');
            input = createInput('lastName', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Мужской');
            input = createInput('sex', 'radio', 'radioInputs', 'Мужской');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Женский');
            input = createInput('sex', 'radio', 'radioInputs', 'Женский');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Университет');
            input = createInput('university', 'text', 'textInputs');
            input.addEventListener('change', changeOptions);
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Факультет');
            input = createSelect('faculty', [], 'faculty');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Курс');
            input = createInput('course', 'number', 'textInputs');
            label.appendChild(input);
            input = createDiv('slider');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Заочное');
            input = createInput('InAbsentia', 'checkbox', 'radioInputs', 'Да');
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('О себе...');
            input = createTextArea('about', 40, 4);
            label.appendChild(input);
            fragment.appendChild(label);

            label = createLabel('Дата рождения');
            input = createInput('datePicker', 'text', 'textInputs');
            label.appendChild(input);
            fragment.appendChild(label);

            input = createButton('Отправить', 'submit');
            input.addEventListener('click', WorkerWithData.pickUpData);
            fragment.appendChild(input);

            input = createButton('Очистить', 'reset');
            fragment.appendChild(input);

            return fragment;
        }

        function changeOptions() {
            const value = $('input[name = "university"]').val();
            let nextSelect = $('select')[0];
            let nextOptions = $('select > option');

            for(let i=nextOptions.length-1; i>=0 ;i--){
                nextSelect.removeChild(nextOptions[i]);
            }
            let array = [];
            switch (value){
                case 'БГУИР':
                    array = createOptions(bsuir, 'faculty');
                    break;
                case 'БНТУ':
                    array = createOptions(bntu, 'faculty');
                    break;
                case 'БГУ':
                    array = createOptions(bsu, 'faculty');
                    break;
            }
            for(let i=0; i<array.length;i++)
                nextSelect.appendChild(array[i]);
        }

        return{
            changeOptions : changeOptions,
            createForm : createForm,
            createInput : createInput,
            createLabel : createLabel,
            createButton : createButton,
            createSelect : createSelect,
            createTextArea : createTextArea,
            constructForm : constructForm,
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
        const result = 'Фамилия ' + textsValues[0] + '\n' +
            'Имя ' + textsValues[1] + '\n' +
            'Отчество ' + textsValues[2] + '\n' +
            'Пол: ' + checksValues[0] + '\n' +
            'Университет: ' + textsValues[3] +  '\n' +
            'Факультет: ' + selectValues[1] + '\n' +
            'Курс: ' + textsValues[4] + '\n' +
            'Заочное ' + !!checksValues[1] + '\n' +
            'О себе ' + textsValues[5] + '\n' +
            'Дата рождения ' +textsValues[6];

        alert(result);
    }

    return{
        pickUpData : pickUpData
    }
}();

Shower.showButton();
