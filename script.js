const currencyEL_one = document.getElementById("currency-one");
const amountEL_one = document.getElementById("amount-one");
const currencyEL_two = document.getElementById("currency-two");
const amountEL_two = document.getElementById("amount-two");

const rateEL = document.getElementById("rate");
const swap = document.getElementById("swap");

////// const key = "57d8369a81a3254879d7502b";////////

// Fetch exchange rates
async function fetchCurrencyRates(currency) {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${key}/latest/${currency}`
  );
  const data = await res.json();
  return data.conversion_rates;
}

//  Update the DOM
async function calculate(e) {
  const currencyOne = currencyEL_one.value;
  const currencyTwo = currencyEL_two.value;

  if (e && e.target === amountEL_two) {
    const getExchangeRates = await fetchCurrencyRates(currencyTwo);

    const rate = getExchangeRates[currencyOne];

    amountEL_one.value = (amountEL_two.value * rate).toFixed(2);
  } else {
    const getExchangeRates = await fetchCurrencyRates(currencyOne);

    const rate = getExchangeRates[currencyTwo];

    rateEL.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

    amountEL_two.value = (amountEL_one.value * rate).toFixed(2);
  }
}
calculate();

// Event listener
currencyEL_one.addEventListener("change", calculate);
amountEL_one.addEventListener("input", calculate);
currencyEL_two.addEventListener("change", calculate);
amountEL_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEL_one.value;
  currencyEL_one.value = currencyEL_two.value;
  currencyEL_two.value = temp;
  calculate();
});
