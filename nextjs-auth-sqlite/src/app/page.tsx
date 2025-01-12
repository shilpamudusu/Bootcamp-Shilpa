"use client"
import { Dashboard } from '@/components/Dashboard'
import dashboardConfig from '../../dashboardConfig.json'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">Composable Dashboard</h1>
      <Dashboard config={dashboardConfig.dashboard.components} />
    </main>
  )
}

