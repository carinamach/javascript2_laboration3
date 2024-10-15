// Hämta elementen
const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');

async function loadRates(currency) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/4ec6280b69e5b33f98212f13/latest/${currency}`);
    const data = await response.json();
    return data.conversion_rates;
}

async function updateRate() {
    const baseCurrency = currencyOne.value;
    const targetCurrency = currencyTwo.value;
    const amount = parseFloat(amountOne.value);

    const rates = await loadRates(baseCurrency);
    const rate = rates[targetCurrency];

    rateElement.textContent = `1 ${baseCurrency} = ${rate} ${targetCurrency}`;
    amountTwo.value = (amount * rate).toFixed(2);
}

currencyOne.addEventListener('change', updateRate);
currencyTwo.addEventListener('change', updateRate);
amountOne.addEventListener('input', updateRate);
updateRate();