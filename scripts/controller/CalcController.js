class CalcController{

    constructor() {

        //A ideia do _ é para informar que é privado
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();

    }

    initialize(){

        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        /*
        setTimeout(() =>{

            clearInterval(interval); //Parar de Executar

        }, 10000);
        */
    }

    addEventListenerAll(element, events, fn){

        events.split(" ").forEach(event => {
           element.addEventListener(event, fn, false);  // O false é para garantir que seja disparado somente uma vez o evento
        });

    };

    clearAll(){
        this._operation = [];
    };

    clearEntry(){
        this._operation.pop();
    };

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    };

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    };

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value.toString();
    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            let last = this._operation.pop();

            this.calc();

        }

    }

    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));    //Comando Join é semente ao toString, porém, ele defini o delimitador na hora de converter para string

        this._operation = [result, last];
        console.log(this._operation);

    }

    setLastNumberToDisplay(){



    }

    addOperation(value){

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if (isNaN(value)){

                //Outra Coisa
                console.log('Outra Coisa', value);

            } else {

                this.pushOperation(value);

            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }
        console.log(this._operation);
    };

    setError(){
        this.displayCalc = 'ERROR';
    };

    execBtn(value){

        switch (value){

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation("+");
                break;

            case 'subtracao':
                this.addOperation("-");
                break;

            case 'divisao':
                this.addOperation("/");
                break;

            case 'multiplicacao':
                this.addOperation("*");
                break;

            case 'portenco':
                this.addOperation("%");
                break;

            case "ponto":
                this.addOperation(".");
                break;

            case 'igual':

                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    };

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn,index) =>{

            this.addEventListenerAll(btn, 'click drag', e => {          //Evento Especifico
                let textBtn = btn.className.baseVal.replace("btn-", "");           //Consegue pegar pelo fato de ser SVG

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {         //Evento Especifico
                btn.style.cursor = "pointer";
            });

        });

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
    
}