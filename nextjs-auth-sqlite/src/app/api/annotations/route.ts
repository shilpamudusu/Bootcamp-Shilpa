import { NextResponse } from 'next/server'
import { openDb } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const widgetId = searchParams.get('widgetId')

  if (!widgetId) {
    return NextResponse.json({ error: 'Widget ID is required' }, { status: 400 })
  }

  const db = await openDb()
  const annotations = await db.all('SELECT * FROM annotations WHERE widget_id = ?', [widgetId])

  return NextResponse.json(annotations)
}

export async function POST(req: Request) {
  const { widgetId, annotation } = await req.json()

  if (!widgetId || !annotation) {
    return NextResponse.json({ error: 'Widget ID and annotation are required' }, { status: 400 })
  }

  const db = await openDb()
  await db.run(
    'INSERT INTO annotations (id, widget_id, text, x, y, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [annotation.id, widgetId, annotation.text, annotation.x, annotation.y, annotation.userId, annotation.createdAt]
  )

  return NextResponse.json({ message: 'Annotation added successfully' })
}

