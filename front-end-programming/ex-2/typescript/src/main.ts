import data from './data.json';

const createTable = (data: any[]) => {
  const table = document.createElement('table');
  const header = document.createElement('tr');

  // Add headers dynamically
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    th.addEventListener('click', () => {
      data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      renderTable();
    });
    header.appendChild(th);
  });
  table.appendChild(header);

  // Add rows
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach((value:any) => {
      const td = document.createElement('td');
      td.textContent = value.toString();
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  document.body.innerHTML = ''; // Clear existing table
  document.body.appendChild(table);
};

const renderTable = () => createTable(data);
renderTable();
