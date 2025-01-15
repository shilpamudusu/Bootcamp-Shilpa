'use client'

import React from 'react'
import { Card } from './Card'
import { Chart } from './Chart'
import { DataTable } from './DataTable'

interface ComponentConfig {
  type: 'card' | 'chart' | 'dataTable'
  title?: string
  data?: any
  headers?: string[]
}

interface DashboardProps {
  config: ComponentConfig[]
}

export const Dashboard: React.FC<DashboardProps> = ({ config }) => {
  const renderComponent = (component: ComponentConfig, index: number) => {
    switch (component.type) {
      case 'card':
        return (
          <Card key={index} title={component.title || ''}>
            {component.data}
          </Card>
        )
      case 'chart':
        return <Chart key={index} data={component.data} />
      case 'dataTable':
        return <DataTable key={index} headers={component.headers || []} data={component.data} />
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {config.map((component, index) => renderComponent(component, index))}
    </div>
  )
}

