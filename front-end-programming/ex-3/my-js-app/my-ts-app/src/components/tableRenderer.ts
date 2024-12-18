import { GridOptions, Grid } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const renderTable = (data: any[]) => {
  const gridOptions: GridOptions = {
    columnDefs: Object.keys(data[0]).map(field => ({ field })),
    rowData: data,
  };

  const gridDiv = document.createElement('div');
  gridDiv.className = 'ag-theme-alpine';
  gridDiv.style.height = '500px';
  gridDiv.style.width = '100%';

  document.body.appendChild(gridDiv);
  new Grid(gridDiv, gridOptions);
};
