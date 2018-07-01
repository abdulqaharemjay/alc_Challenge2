/*jshint esversion: 6 */

//init class from classes.js
const currency = new CurrencyL();

//store class names of both dropdown buttons
const ddb1 = 'dropdown-icon-1';
const ddb2 = 'dropdown-icon-2';

//collect Dom elements

//collect dropdown Dom elements
const adjDdb1 = document.querySelector(`.${ddb1}`);
const adjDdb2 = document.querySelector(`.${ddb2}`);

// Dom elements to house incoming list of countries from api
const fromCurrency = document.querySelector('.from-currency');
const toCurrency = document.querySelector('.to-currency'); 

// Dom elements to house from and to currency names
const fromOptions = document.getElementById('from-options');
const toOptions = document.getElementById('to-options');

// get result output Dom element
let output = document.getElementById('value');



// fetch data from api and polupate the currency options UI with currency names and Id
currency.getCurrencyList()

// collect response from promise and populate country list
    .then(data => {

        //collect response javascript object
        const CurrencyList = data;

        //convert and collect all currency ID
        let moneys = Array.from(Object.getOwnPropertyNames(CurrencyList.currencyList.results));

        //sort in alphabetical order
        moneys = moneys.sort();

        //wrap each array data in spans n serve to the DomElement
        moneys.forEach(money => {

            // collect countryname from api
            const countryName = CurrencyList.currencyList.results[money].currencyName;

            /// create Dom element
            const toOptionsElement = document.createElement('div');

            //add class 
            toOptionsElement.classList = 'options';

            //add new attribute
            toOptionsElement.setAttribute('data', money);

            //serve to currency option
            toOptionsElement.innerHTML = `${money} <span class="country-name countries">${countryName}</span>`;

            //apend currency option to dropdown container
            toOptions.appendChild(toOptionsElement);

            // second dropdown Dom element
            const optionsElement = document.createElement('div');
            optionsElement.classList = 'options';
            optionsElement.setAttribute('data', money);
            optionsElement.innerHTML = `${money} <span class="country-name countries">${countryName}</span>`;

            fromOptions.appendChild(optionsElement);

        });

    });


// Choose currency from and to
document.addEventListener("click", e => {

    //collect clicked element
    const target = e.target;

    //collect class name
    const targetClass = target.className;

    // enable dropdown
    if (target.classList.contains(ddb1)) {

        //remove any other dropdown instance
        removeAdjActiveClass(adjDdb2);

        //enable target dropdown
        toggleActiveClass(target);

    } else if (target.classList.contains(ddb2)) {

        //remove any other dropdown instance
        removeAdjActiveClass(adjDdb1);

        //enable target dropdown
        toggleActiveClass(target);

    } else {

        //disable dropdown instance
        removeActiveClass();

    }

});


/// calculate corresponding value on currency option change

document.addEventListener('click', e => {

    const clicked = e.target;
  
    //select currency
    if (clicked.classList.contains('options')) {

        const Input = document.getElementById('from-input').value;

        // collect inner Text and data attribute of the clicked currency option
        const clickedText = clicked.innerHTML;
        const clickedData = clicked.getAttribute('data');

        // set inner Text and data attribute value of clicked element's parent element
        const getDataAttr = clicked.parentElement.getAttribute('data');
        const currency = document.querySelector(`.${getDataAttr}`);

        //
        currency.innerHTML = clickedText;
        currency.setAttribute('data', clickedData);

        // calculate corresponding value on option change
        currencyValue(Input);
    }

});


const fromText = document.getElementById('from-input');
const errorMsg = document.querySelector('.error-msg');

// this event fires up when user type into the input field
fromText.addEventListener('keyup', e => {

    //remove any visible error msg
    errorMsg.classList.remove('display-err');

    //collect value from input field 
    const fromTextVal = e.target.value;

    // check if value in input field is not number
    if (isNaN(fromTextVal)) {

        //show error message 
        errorMsg.classList.add('display-err');

        //reset the input field
        fromText.value = '';

    } else {

        //hide error msg
        errorMsg.classList.remove('display-err');

        // calculate corresponding value on option change
        currencyValue(fromTextVal);
    
    }


});





// functions

//return corresponding value 
const currencyValue = (input) => {

    let outputValue;
    const fromCurrencyText = fromCurrency.getAttribute('data');
    const toCurrencyText = toCurrency.getAttribute('data');
    const toAccessValues = `${fromCurrencyText}_${toCurrencyText}`;

    const finalValue = currency.getValue(fromCurrencyText, toCurrencyText).then(data => {

        const value = data;
        const preciseValue = value.value[toAccessValues];
        outputValue = (input * preciseValue).toFixed(2);

        output.innerHTML = outputValue;
    });

    
    
};

// toggle dropdown
const toggleActiveClass = t => {
    const addClassTo = t.parentElement.parentElement.nextElementSibling;
    addClassTo.classList.toggle('active');
};

//remove dropdown
const removeActiveClass = () => {

    const activeElement = document.querySelector('.active');
    if (activeElement) {
        activeElement.classList.remove('active');
    }


};

// if other dropdown active, disable it
const removeAdjActiveClass = (t) => {

    const rmvClassfrom = t.parentElement.parentElement.nextElementSibling;
    if (rmvClassfrom) {
        rmvClassfrom.classList.remove('active');
    }


};