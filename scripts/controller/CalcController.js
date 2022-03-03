class CalcController{

    constructor() {

        //A ideia do _ é para informar que é privado
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

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn,index) =>{

            this.addEventListenerAll(btn, 'click drag', e => {         //Evento Especifico
                console.log(btn.className.baseVal.replace("btn-", ""));     //Consegue pegar pelo fato de ser SVG
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