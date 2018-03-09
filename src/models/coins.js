const fetch = require('node-fetch');

const CURRENT_PRICE_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const HISTORICAL_PRICE_URL = 'https://api.coindesk.com/v1/bpi/historical/close.json';

function getToday() {
  return new Promise((resolve, reject) => {
    fetch(CURRENT_PRICE_URL)
      .then(res => res.json())
      .then(json => resolve(json.bpi.USD.rate_float))
      .catch(err => reject(err));
  });
}

function getYesterday() {
  return new Promise((resolve, reject) => {
    fetch(`${HISTORICAL_PRICE_URL}?for=yesterday`)
      .then(res => res.json())
      .then(json => resolve(json.bpi))
      .catch(err => reject(err));
  });
}

module.exports = { getToday, getYesterday };