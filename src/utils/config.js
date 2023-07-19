const BASE_URL = 'http://localhost:3001';

const options = [
  { value: '0', label: 'Все продукты' },
  { value: '1', label: 'Продукт 1' },
  { value: '2', label: 'Продукт 2' },
];

const bars = [
  { dataKey: 'factory_1', fill: 'red', name: 'Фабрика A' },
  { dataKey: 'factory_2', fill: 'blue', name: 'Фабрика B' },
];

export { BASE_URL, options, bars };
