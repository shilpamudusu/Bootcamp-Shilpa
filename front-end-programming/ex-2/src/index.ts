// Import the JSON data
import data from './data.json';

// Define the data structure
interface DataRow {
  name: string;
  age: number;
  job: string;
}

// Define the data type explicitly
const typedData: DataRow[] = data;

// Create a table
const table = document.createElement('table');
const headers = Object.keys(typedData[0]);

// Add table header
const thead = table.createTHead();
const headerRow = thead.insertRow();

headers.forEach(header => {
  const th = document.createElement('th');
  th.innerText = header;

  // Add sorting functionality
  let ascending = true;
  th.onclick = () => {
    typedData.sort((a, b) => {
      if (a[header as keyof DataRow] < b[header as keyof DataRow]) return ascending ? -1 : 1;
      if (a[header as keyof DataRow] > b[header as keyof DataRow]) return ascending ? 1 : -1;
      return 0;
    });
    ascending = !ascending;
    renderTableBody();
  };

  headerRow.appendChild(th);
});

// Add table body
const tbody = table.createTBody();

// Render table rows
const renderTableBody = () => {
  tbody.innerHTML = '';
  typedData.forEach(row => {
    const tr = tbody.insertRow();
    headers.forEach(key => {
      const td = tr.insertCell();
      td.innerText = row[key as keyof DataRow].toString();
    });
  });
};

// Render filter input
const filterInput = document.createElement('input');
filterInput.placeholder = 'Filter rows...';
filterInput.oninput = () => {
  const query = filterInput.value.toLowerCase();
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const isVisible = Array.from(row.cells).some(cell =>
      cell.innerText.toLowerCase().includes(query)
    );
    row.style.display = isVisible ? '' : 'none';
  });
};

// Add row highlighting
tbody.addEventListener('mouseover', (e) => {
  if (e.target instanceof HTMLTableCellElement) {
    const row = e.target.parentElement as HTMLTableRowElement;
    row.style.backgroundColor = 'lightblue';
  }
});

tbody.addEventListener('mouseout', (e) => {
  if (e.target instanceof HTMLTableCellElement) {
    const row = e.target.parentElement as HTMLTableRowElement;
    row.style.backgroundColor = '';
  }
});

// Append table and filter input to the DOM
document.body.appendChild(filterInput);
renderTableBody();
document.body.appendChild(table);
