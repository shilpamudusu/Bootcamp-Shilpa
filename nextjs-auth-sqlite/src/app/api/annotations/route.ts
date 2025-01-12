import { NextResponse } from 'next/server'
import { openDb } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { widgetId, annotation } = await req.json()
    const db = await openDb()

    await db.run(
      'INSERT INTO annotations (id, widget_id, text, x, y, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [annotation.id, widgetId, annotation.text, annotation.x, annotation.y, annotation.userId, annotation.createdAt]
    )

    return NextResponse.json({ message: 'Annotation added successfully' })
  } catch (error) {
    console.error('Error adding annotation:', error)
    return NextResponse.json(
      { message: 'An error occurred while adding the annotation' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const widgetId = searchParams.get('widgetId')

    if (!widgetId) {
      return NextResponse.json({ message: 'Widget ID is required' }, { status: 400 })
    }

    const db = await openDb()
    const annotations = await db.all(
      'SELECT * FROM annotations WHERE widget_id = ?',
      [widgetId]
    )

    return NextResponse.json(annotations)
  } catch (error) {
    console.error('Error fetching annotations:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching annotations' },
      { status: 500 }
    )
  }
}

