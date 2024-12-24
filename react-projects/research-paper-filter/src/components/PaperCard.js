import React from 'react';

const PaperCard = ({ paper }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
      <h2 className="text-xl font-bold">{paper.title}</h2>
      <p className="text-sm text-gray-500">{paper.author}</p>
      <p className="mt-2">{paper.abstract}</p>
    </div>
  );
};

export default PaperCard;
