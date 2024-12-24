function renderTable(data) {
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    
    data.forEach(student => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = student.id;
        newRow.insertCell(1).innerText = student.name;
        newRow.insertCell(2).innerText = student.age;
        newRow.insertCell(3).innerText = student.grade;
    });
}
