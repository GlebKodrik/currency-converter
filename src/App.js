import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const rates = React.useRef({});

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://cdn.cur.su/api/latest.json');
        const json = await response.json();
        rates.current = json.rates;
        onChangeToPrice(1);
      } catch (error) {
        alert('Ошибка при получении данных!')
      }
    })()
  },[])

  const onChangeFromPrice = (value) => {
      const price = value / rates.current[fromCurrency];
      const result = price * rates.current[toCurrency];
      setFromPrice(value);
      setToPrice(result || 0);
  }

  const onChangeToPrice = (value) => {
      const result = (rates.current[fromCurrency] / rates.current[toCurrency]) * value;
      setFromPrice(result || 0);
      setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue={onChangeFromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice} onChangeValue={onChangeToPrice}  currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
