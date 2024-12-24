// document.addEventListener("DOMContentLoaded",async()=>{
//     await fetch("./sample.csv")
//         .then(response => response.text()) // Convert the response to text
//         .then(data => {
//             Papa.parse(data, {
//                 complete: function(results) {
//                     console.log("Parsed CSV:", results);
//                     console.log("Data:", results.data); // Parsed CSV rows
//                     console.log("Errors:", results.errors); // Any errors during parsing
//                     const papers = results.data;
//                     const itemsPerPage = 10;
//                     let currentPage = 1;
//                     function renderPage(page) {
//                         const startIndex = (page - 1) * itemsPerPage;
//                         const endIndex = page * itemsPerPage;
//                         const dataSubset = papers.slice(startIndex, endIndex);

//                         renderCards(dataSubset);
//                         renderPagination(papers.length, page, itemsPerPage);
//                     }
//                     renderPage(currentPage);
//                     window.changePage = (page) => {
//                         currentPage = page;
//                         renderPage(currentPage);
//                     };
                   
//                 },
//                 header: true // Optionally, set this to true if the first row contains headers
//             });
//         })
//         .catch(error => {
//             console.error("Error loading CSV:", error); // Handle errors
//         });
// })

// function renderCards(data) {
//     const container = document.getElementById("card-container");
//     container.innerHTML = ''; // Clear the container first

//     data.forEach(item => {
//         const card = document.createElement("div");
//         card.classList.add("card");

//         card.innerHTML = `
//             <h3 class="card-title">${item.title || 'No Title'}</h3>
//             <p class="card-authors">Authors: ${item.authors ? item.authors[0] : 'N/A'}</p>
//             <p class="card-detail"><strong>Abstract:</strong> ${item.abstract || 'No abstract available'}</p>
//             <p class="card-citations"><strong>Citations:</strong> ${item.n_citation || '0'}</p>
//             <p class="card-references"><strong>References:</strong> ${item.references ? item.references[0] : 'N/A'}</p>
//         `;

//         container.appendChild(card); // Append card to the container
//     });
// }

// function renderPagination(totalItems, currentPage, itemsPerPage) {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const paginationContainer = document.getElementById("pagination");

//     let paginationHTML = '';

//     if (currentPage > 1) {
//         paginationHTML += `<button onclick="changePage(${currentPage - 1})">Previous</button>`;
//     }

//     for (let page = 1; page <= totalPages; page++) {
//         paginationHTML += `<button onclick="changePage(${page})" ${page === currentPage ? 'class="active"' : ''}>${page}</button>`;
//     }

//     if (currentPage < totalPages) {
//         paginationHTML += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
//     }

//     paginationContainer.innerHTML = paginationHTML;
// }
let papers = [];
let currentPage = 1;
let itemsPerPage = 50;
let filteredPapers = [];

document.addEventListener("DOMContentLoaded", async () => {
    await fetchPapers();
    setupEventListeners();
    renderPapers();
    updatePagination();
});

async function fetchPapers() {
    try {
        const response = await fetch("./sample.csv");
        const data = await response.text();
        papers = Papa.parse(data, { header: true }).data.map(paper => ({
            ...paper,
            authors: (paper.authors).replace("[","").replace("]","").replace("'","").replace("'",""),
            references:(paper.references).replace("[","").replace("]","").replace("'","").replace("'","")
        }));
        filteredPapers = [...papers];
        console.log(filteredPapers);
        
    } catch (error) {
        console.error("Error fetching papers:", error);
    }
}

function setupEventListeners() {
    document.getElementById("title").addEventListener("input", applyFilters);
    document.getElementById("min-citations").addEventListener("input", applyFilters);
    document.getElementById("start-year").addEventListener("input", applyFilters);
    document.getElementById("end-year").addEventListener("input", applyFilters);
    document.getElementById("clear-filters").addEventListener("click", clearFilters);
    document.getElementById("rows-select").addEventListener("change", handleRowsPerPageChange);
    document.getElementById("prev-page").addEventListener("click", () => changePage(-1));
    document.getElementById("next-page").addEventListener("click", () => changePage(1));
    document.getElementById("export-data").addEventListener("click", exportFilteredData);
}

function applyFilters() {
    const titleFilter = document.getElementById("title").value.toLowerCase();
    const minCitations = parseInt(document.getElementById("min-citations").value) || 0;
    const startYear = parseInt(document.getElementById("start-year").value) || 0;
    const endYear = parseInt(document.getElementById("end-year").value) || 9999;

    filteredPapers = papers.filter(paper => {
        const paperYear = parseInt(paper.year) || 0;
        const paperCitations = parseInt(paper.citations) || 0;
        
        return paper.title.toLowerCase().includes(titleFilter) &&
               paperCitations >= minCitations &&
               paperYear >= startYear &&
               paperYear <= endYear;
    });

    currentPage = 1;
    renderPapers();
    updatePagination();
}

function clearFilters() {
    document.getElementById("title").value = "";
    document.getElementById("min-citations").value = "";
    document.getElementById("start-year").value = "";
    document.getElementById("end-year").value = "";
    
    filteredPapers = [...papers];
    currentPage = 1;
    renderPapers();
    updatePagination();
}

function handleRowsPerPageChange(e) {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPapers();
    updatePagination();
}

function renderPapers() {
    const container = document.getElementById("papers-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredPapers.slice(start, end);

    pageItems.forEach(paper => {
        const card = document.createElement("div");
        card.className = "paper-card";
        card.innerHTML = `
            <h2>${paper.title}</h2>
            <div class="paper-authors">
                <strong>Authors:</strong> ${paper.authors}
            </div>
            <div class="paper-meta">
                <span><strong>Year:</strong> ${paper.year}</span>
                <span><strong>Venue:</strong> ${paper.venue || 'N/A'}</span>
                <span><strong>Citations:</strong> ${paper.citations || '0'}</span>
            </div>
            <p class="paper-abstract">${paper.abstract}</p>
            <div class="paper-references">
                <strong>References:</strong>
                <ul>
                    <li>${paper.references[0]}</li>
                </ul>
            </div>
        `;
        container.appendChild(card);
    });
}

function updatePagination() {
    const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
    document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage === totalPages;
}

function changePage(direction) {
    currentPage += direction;
    renderPapers();
    updatePagination();
}

function exportFilteredData() {
    const csvContent = Papa.unparse(filteredPapers.map(paper => ({
        ...paper,
        authors: JSON.stringify(paper.authors),
        references: JSON.stringify(paper.references)
    })));
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "filtered_papers.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}






