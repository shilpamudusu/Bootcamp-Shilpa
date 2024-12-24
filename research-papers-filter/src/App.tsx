import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PaperCard from './components/PaperCard';
import Input from './components/Input';

interface Paper {
  title: string;
  author: string;
  year: string;
  category: string;
}

function App() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetch('/sample.csv')
      .then(response => response.text())
      .then(csvString => {
        Papa.parse(csvString, {
          complete: (result) => {
            const parsedData = result.data.slice(1).map((row: any) => ({
              title: row[0],
              author: row[1],
              year: row[2],
              category: row[3]
            }));
            setPapers(parsedData);
            setFilteredPapers(parsedData);
          },
          header: false
        });
      });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFilterText(text);
    const filtered = papers.filter(paper => 
      paper.title.toLowerCase().includes(text.toLowerCase()) ||
      paper.author.toLowerCase().includes(text.toLowerCase()) ||
      paper.year.includes(text) ||
      paper.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPapers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Research Papers Filter</h1>
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search papers by title, author, year, or category..."
            value={filterText}
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <PaperCard
              key={index}
              title={paper.title}
              author={paper.author}
              year={paper.year}
              category={paper.category}
            />
          ))}
        </div>
        {filteredPapers.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No papers found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default App;

