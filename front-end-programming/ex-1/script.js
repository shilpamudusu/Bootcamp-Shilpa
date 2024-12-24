// Add student row dynamically
function addStudent() {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert cells and populate them
    newRow.insertCell(0).innerText = 2;  // ID
    newRow.insertCell(1).innerText = 'Jane Smith';  // Name
    newRow.insertCell(2).innerText = 19;  // Age
    newRow.insertCell(3).innerText = 'B';  // Grade

    // Highlight the newly added row
    newRow.classList.add('highlight');
}

// Change font of the table using Google Fonts
function changeFont() {
    const link = document.getElementById('google-font-link');
    link.href = 'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap';
    document.getElementById('studentTable').style.fontFamily = "'Varela Round', sans-serif";
}

// Display browser information
window.onload = function() {
    const browserInfo = document.getElementById('browserInfo');
    document.getElementById('browserName').innerText = navigator.appName;
    document.getElementById('browserVersion').innerText = navigator.appVersion;
    document.getElementById('windowDimensions').innerText = `${window.innerWidth} x ${window.innerHeight}`;
    document.getElementById('userAgent').innerText = navigator.userAgent;

    // Render table with initial data (from data-loader.js)
    const data = loadData();
    renderTable(data);
};

// Render AG Grid with data from CSV using PapaParse
Papa.parse('./students.csv', {
    download: true,
    header: true,
    complete: function(results) {
        renderAGGrid(results.data);
    }
});

// Render the grid with AG Grid
function renderAGGrid(data) {
    const gridOptions = {
        columnDefs: [
            { headerName: "ID", field: "ID", sortable: true, filter: true },
            { headerName: "Name", field: "Name", sortable: true, filter: true },
            { headerName: "Age", field: "Age", sortable: true, filter: true },
            { headerName: "Grade", field: "Grade", sortable: true, filter: true, 
              cellClass: params => params.value === 'A' ? 'highlight' : '' }
        ],
        rowData: data,
        defaultColDef: { resizable: true },
    };

    new agGrid.Grid(document.getElementById('studentGrid'), gridOptions);
}
