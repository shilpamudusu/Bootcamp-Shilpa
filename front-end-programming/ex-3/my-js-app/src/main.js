import './style.css';
import students from './data/students.json';

const renderTable = (data) => {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  // Create headers dynamically
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Populate rows
  data.forEach(student => {
    const row = document.createElement('tr');
    Object.values(student).forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  document.body.appendChild(table);
};

renderTable(students);
