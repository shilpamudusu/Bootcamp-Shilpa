import { fetchData } from './components/dataLoader';
import { parseCSV } from './components/csvParser';
import { renderTable } from './components/tableRenderer';
import './style.scss';


fetchData('./data/students.csv')
  .then(parseCSV)
  .then(renderTable)
  .catch(console.error);
