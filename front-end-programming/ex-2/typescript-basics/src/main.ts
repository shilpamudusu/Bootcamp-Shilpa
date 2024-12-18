import Papa from 'papaparse';

fetch('./data/data.csv') // Adjust the path as needed
  .then(response => response.text())
  .then(csv => {
    Papa.parse(csv, {
      header: true,
      complete: (result) => {
        console.log(result.data); // Parsed CSV data
        createTableWithFilter(result.data as any[]);
      }
    });
  });

const createTableWithFilter = (data: any[]) => {
  const table = document.createElement('table');
  const input = document.createElement('input');
  input.placeholder = 'Filter by name';

  input.addEventListener('input', () => {
    const filteredData = data.filter(row =>
      row.name.toLowerCase().includes(input.value.toLowerCase())
    );
    renderTable(filteredData);
  });

  document.body.innerHTML = ''; // Clear previous table
  document.body.appendChild(input);

  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach((value:any) => {
      const td = document.createElement('td');
      td.textContent = value.toString();
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  document.body.appendChild(table);
};

const renderTable = (data: any[]) => {
  const table = document.createElement('table');
  document.body.appendChild(table);
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach((value:any) => {
      const td = document.createElement('td');
      td.textContent = value.toString();
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
};
