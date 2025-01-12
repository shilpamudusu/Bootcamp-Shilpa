import { CodeBlock } from "./CodeBlock"

export default function CompositeWidgetsIllustration() {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Composite Widgets and Base Component Structure</h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        <div className="flex-1">
          <svg viewBox="0 0 800 600" className="w-full h-auto border border-gray-300 rounded-lg bg-white shadow-lg">
            {/* Base Component Structure */}
            <rect x="50" y="50" width="300" height="200" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
            <text x="200" y="80" textAnchor="middle" className="text-lg font-semibold">Base Component Structure</text>
            <text x="60" y="110" className="text-sm">• Unique identifiers</text>
            <text x="60" y="140" className="text-sm">• Data types (CSV, text, graph)</text>
            <text x="60" y="170" className="text-sm">• Display types (table, graph)</text>
            <text x="60" y="200" className="text-sm">• Display options (pagination, colors)</text>
            <text x="60" y="230" className="text-sm">• Hierarchical JSON content</text>

            {/* Composite Widgets */}
            <rect x="400" y="50" width="350" height="250" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="575" y="80" textAnchor="middle" className="text-lg font-semibold">Composite Widget</text>
            
            {/* Graph Widget */}
            <rect x="420" y="100" width="150" height="180" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <text x="495" y="125" textAnchor="middle" className="text-sm font-semibold">Graph Widget</text>
            <path d="M440 250 L470 200 L500 220 L530 180 L560 230" fill="none" stroke="#0284c7" strokeWidth="2" />
            
            {/* Summary Widget */}
            <rect x="580" y="100" width="150" height="180" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
            <text x="655" y="125" textAnchor="middle" className="text-sm font-semibold">Summary Widget</text>
            <text x="590" y="155" className="text-xs">Data points: 5</text>
            <text x="590" y="175" className="text-xs">Trend: Upward</text>
            <text x="590" y="195" className="text-xs">Avg: 42.5</text>

            {/* Arrows */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
              </marker>
            </defs>
            <line x1="350" y1="150" x2="400" y2="150" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="375" y="140" textAnchor="middle" className="text-xs">Composes</text>
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Example JSON Configuration</h2>
          <CodeBlock
            code={`
{
  "id": "composite-widget-001",
  "type": "composite",
  "createdAt": "2023-06-15T10:30:00Z",
  "components": [
    {
      "id": "graph-widget-001",
      "type": "graph",
      "displayType": "line-chart",
      "dataSource": {
        "type": "csv",
        "url": "https://example.com/data.csv"
      },
      "preferences": {
        "colorScheme": "blue",
        "showLegend": true,
        "xAxis": "date",
        "yAxis": "value"
      }
    },
    {
      "id": "summary-widget-001",
      "type": "text",
      "displayType": "card",
      "content": {
        "title": "Data Summary",
        "body": "This graph shows the trend of values over time. The average value is 42.5, with an upward trend observed."
      },
      "preferences": {
        "backgroundColor": "#fff7ed",
        "textColor": "#ea580c"
      }
    }
  ]
}
            `}
          />
          <h2 className="text-xl font-semibold mt-8 mb-4">Base Component JSON Example</h2>
          <CodeBlock
            code={`
{
  "id": "table-widget-001",
  "type": "table",
  "createdAt": "2023-06-15T11:00:00Z",
  "displayType": "data-table",
  "dataSource": {
    "type": "json",
    "data": [
      {"name": "Alice", "age": 30},
      {"name": "Bob", "age": 25},
      {"name": "Charlie", "age": 35}
    ]
  },
  "preferences": {
    "pagination": true,
    "rowsPerPage": 10,
    "columns": [
      {"key": "name", "label": "Name"},
      {"key": "age", "label": "Age"}
    ]
  }
}
            `}
          />
        </div>
      </div>
    </div>
  )
}

