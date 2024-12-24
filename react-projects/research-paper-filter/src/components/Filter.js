import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-2 mb-4">
      {filters && Object.keys(filters).map((key) => (
        <div key={key} className="flex items-center">
          <label htmlFor={key} className="mr-2">{key}</label>
          <select
            name={key}
            id={key}
            value={filters[key]}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="">All</option>
            {filters[key].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Filter;
