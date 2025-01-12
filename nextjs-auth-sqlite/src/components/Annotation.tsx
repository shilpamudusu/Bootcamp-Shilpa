import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

interface AnnotationProps {
  widgetId: string
  initialAnnotations: Array<{
    id: string
    text: string
    x: number
    y: number
    userId: string
    createdAt: string
  }>
}

export function Annotation({ widgetId, initialAnnotations }: AnnotationProps) {
  const [annotations, setAnnotations] = useState(initialAnnotations)
  const [newAnnotation, setNewAnnotation] = useState('')
  const [annotationPosition, setAnnotationPosition] = useState({ x: 0, y: 0 })
  const { data: session } = useSession()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setAnnotationPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const addAnnotation = async () => {
    if (newAnnotation && session?.user) {
      const annotation = {
        id: Date.now().toString(),
        text: newAnnotation,
        x: annotationPosition.x,
        y: annotationPosition.y,
        userId: session.user.id,
        createdAt: new Date().toISOString(),
      }

      const response = await fetch('/api/annotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widgetId, annotation }),
      })

      if (response.ok) {
        setAnnotations([...annotations, annotation])
        setNewAnnotation('')
      }
    }
  }

  return (
    <div className="relative" onClick={handleClick}>
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="absolute bg-yellow-200 p-2 rounded shadow"
          style={{ left: annotation.x, top: annotation.y }}
        >
          {annotation.text}
        </div>
      ))}
      <div
        className="absolute bg-white p-2 rounded shadow"
        style={{ left: annotationPosition.x, top: annotationPosition.y }}
      >
        <input
          type="text"
          value={newAnnotation}
          onChange={(e) => setNewAnnotation(e.target.value)}
          className="border rounded p-1"
        />
        <button onClick={addAnnotation} className="bg-blue-500 text-white rounded px-2 py-1 ml-2">
          Add
        </button>
      </div>
    </div>
  )
}

