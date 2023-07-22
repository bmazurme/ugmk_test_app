const BASE_URL = 'http://localhost:3001';
const CULTURE = 'ru';
const UNIT = 0.001;
const COLORS = ['green', 'orange', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const options = [
  { value: '0', label: 'Все продукты' },
  { value: '1', label: 'Продукт 1' },
  { value: '2', label: 'Продукт 2' },
];

const productTypes = ['Продукт 1', 'Продукт 2'];

const bars = [
  {
    dataKey: 'factory_1', fill: 'red', name: 'Фабрика А', barSize: 20,
  },
  {
    dataKey: 'factory_2', fill: 'blue', name: 'Фабрика Б', barSize: 20,
  },
];

export {
  BASE_URL, CULTURE, UNIT, COLORS, options, bars, productTypes,
};
