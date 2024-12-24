import React from 'react';

interface PaperCardProps {
  title: string;
  author: string;
  year: string;
  category: string;
}

const PaperCard: React.FC<PaperCardProps> = ({ title, author, year, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">by {author}</p>
      <p className="text-sm text-gray-500 mb-2">{year}</p>
      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
        {category}
      </span>
    </div>
  );
};

export default PaperCard;

