'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Papa from 'papaparse'

interface Paper {
  title: string
  author: string
  year: string
  category: string
}

export default function ResearchPapersFilter() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([])
  const [filterText, setFilterText] = useState('')

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
            }))
            setPapers(parsedData)
            setFilteredPapers(parsedData)
          },
          header: false
        })
      })
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setFilterText(text)
    const filtered = papers.filter(paper => 
      paper.title.toLowerCase().includes(text.toLowerCase()) ||
      paper.author.toLowerCase().includes(text.toLowerCase()) ||
      paper.year.includes(text) ||
      paper.category.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredPapers(filtered)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Research Papers Filter</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter papers..."
          value={filterText}
          onChange={handleFilterChange}
          className="w-full"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPapers.map((paper, index) => (
            <TableRow key={index}>
              <TableCell>{paper.title}</TableCell>
              <TableCell>{paper.author}</TableCell>
              <TableCell>{paper.year}</TableCell>
              <TableCell>{paper.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

