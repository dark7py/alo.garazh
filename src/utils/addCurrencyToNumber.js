export const addCurrencyToNumber = function addCurrencyToNumberFromUtils(currency, number) {
  const validatedCurrency = currency ?? 'RUB';

  const options = {
    style: 'currency',
    currency: validatedCurrency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0
  };

  return new Intl.NumberFormat('ru-RU', options).format(number);
};
