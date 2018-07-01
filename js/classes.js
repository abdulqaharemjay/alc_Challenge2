/*jshint esversion: 6 */


class CurrencyL {

    constructor() {
        this.apiAddress= 'https://free.currencyconverterapi.com/api/v5/currencies';
        // this.converterApi = 'https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP&compact=ultra';
    }

    // fetch and return currenlist as javaScript objects
    async getCurrencyList() {

        //fetch currency list
        const currencyResponse = await fetch(this.apiAddress);

        //convert json to js object
        const currencyList= await currencyResponse.json();

        //return list 
        return {
            currencyList
        };
    }

    //fetch and return conversion rate for two currencies
    async getValue(from, to) {

        // fetch rate
        const currencyResponse = await fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=ultra`);

        //convert json to js object
        const value= await currencyResponse.json();

        //return value
        return {
            value
        };
    }

}