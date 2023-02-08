import axios from 'axios';

async function getExchangeRate(symbol: string) {
  const response = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USDT`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_Pro_API_Key': process.env.CMC_API_KEY,
      },
    },
  );
  const { data } = response;
  const tokenData = data.data[symbol];
  return tokenData.quote.USDT.price;
}

export async function getBalanceInUSDT(balance: number, symbol: string) {
  const exchangeRate = await getExchangeRate(symbol);
  return balance * exchangeRate;
}
