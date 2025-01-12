import React from 'react'

interface DataTableProps {
  headers: string[]
  data: (string | number)[][]
}

export const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

