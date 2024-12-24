import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PaperCard from './components/PaperCard';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';

const App = () => {
  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Function to load the CSV file from public folder
  const loadCSVFile = () => {
    fetch('/sample.csv')  // Fetch the CSV from public directory
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            const data = result.data;
            setPapers(data);

            // Dynamically set filters based on CSV data
            const newFilters = {};
            data.forEach((paper) => {
              Object.keys(paper).forEach((key) => {
                if (!newFilters[key]) newFilters[key] = [];
                if (!newFilters[key].includes(paper[key])) {
                  newFilters[key].push(paper[key]);
                }
              });
            });
            setFilters(newFilters);
          },
          header: true, // Assuming the CSV file has headers
        });
      })
      .catch((error) => console.error('Error fetching CSV:', error));
  };

  // Optionally load the CSV on component mount
  useEffect(() => {
    loadCSVFile();
  }, []);

  // Filter papers based on search and selected filters
  const filteredPapers = papers.filter((paper) => {
    const matchSearch = searchQuery
      ? paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchFilters = Object.keys(filters).every((key) =>
      !filters[key].length || filters[key].includes(paper[key])
    );
    return matchSearch && matchFilters;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Research Papers</h1>

      {/* Button to load CSV data manually */}
      <button
        onClick={loadCSVFile}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Load CSV Data
      </button>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filter filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPapers.map((paper, index) => (
          <PaperCard key={index} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default App;
