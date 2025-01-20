"use client"

import React, { useState, useEffect, useRef } from "react"
import { Chart, type ChartType, type ChartData, type ChartOptions, type ScatterDataPoint } from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchDepMapData } from "../utils/fetchDepMapData"

Chart.register(annotationPlugin)

type DepMapData = {
  tissueName: string
  screens: {
    depmapId: string
    cellLineName: string
    diseaseFromSource: string
    geneEffect: number
    expression: number
  }[]
}

type ChartDataType = {
  labels: string[]
  datasets: {
    label: string
    data: any[]
    backgroundColor: string | string[]
    borderColor: string | string[]
    borderWidth: number
  }[]
}

export default function GeneEssentialityMap() {
  const [ensemblId, setEnsemblId] = useState("ENSG00000012048")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chartType, setChartType] = useState<ChartType>("scatter")
  const [essentialityData, setEssentialityData] = useState<DepMapData[]>([])
  const [geneInfo, setGeneInfo] = useState<{ ensemblId: string; approvedSymbol: string } | null>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchDepMapData(ensemblId)
      setEssentialityData(result.depMapEssentiality)
      setGeneInfo({ ensemblId: result.ensemblId, approvedSymbol: result.approvedSymbol })
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setEssentialityData([])
      setGeneInfo(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (essentialityData.length > 0) {
      displayChart()
    }
  }, [essentialityData, chartType])

  const getChartData = (): ChartData => {
    const labels = essentialityData.map((item) => item.tissueName)
    if (chartType === "bar") {
      const geneEffects = essentialityData.map(
        (item) => item.screens.reduce((avg, screen) => avg + screen.geneEffect, 0) / item.screens.length,
      )
      return {
        labels,
        datasets: [
          {
            label: "Average Gene Effect",
            data: geneEffects,
            backgroundColor: geneEffects.map((effect) =>
              effect < -1 ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)",
            ),
            borderColor: geneEffects.map((effect) => (effect < -1 ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)")),
            borderWidth: 1,
          },
        ],
      }
    } else {
      const scatterData = essentialityData.flatMap((tissue, index) =>
        tissue.screens.map((screen) => ({
          x: screen.geneEffect,
          y: index,
          cellLineName: screen.cellLineName,
          diseaseFromSource: screen.diseaseFromSource,
          tissueName: tissue.tissueName,
          expression: screen.expression,
        })),
      )
      return {
        labels,
        datasets: [
          {
            label: "Gene Effect by Cell Line",
            data: scatterData,
            backgroundColor: scatterData.map((d: ScatterDataPoint) =>
              (d.x as number) < -1 ? "rgba(255, 99, 132, 0.8)" : "rgba(0, 114, 178, 0.8)",
            ),
            borderColor: scatterData.map((d: ScatterDataPoint) =>
              (d.x as number) < -1 ? "rgba(255, 99, 132, 1)" : "rgba(0, 114, 178, 1)",
            ),
            borderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      }
    }
  }

  const getChartOptions = (): ChartOptions => {
    const baseOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            title: (context) => {
              const data = context[0].raw as any
              return `Tissue: ${data?.tissueName || "Unknown"}`
            },
            label: (context) => {
              const data = context.raw as any
              if (!data) return []
              return [
                `Disease: ${data.diseaseFromSource || "Unknown"}`,
                `Gene effect: ${typeof data.x === "number" ? data.x.toFixed(3) : "Unknown"}`,
                `Expression: ${data.expression || "N/A"}`,
              ]
            },
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "rgba(255, 255, 255, 1)",
          bodyColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
        },
        annotation: {
          annotations: {
            line1: {
              type: "line",
              xMin: -1,
              xMax: -1,
              borderColor: "rgba(255, 99, 132, 0.8)",
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: "Essentiality Threshold",
                enabled: true,
                position: "start",
                backgroundColor: "rgba(255, 99, 132, 0.8)",
                color: "white",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
          },
        },
        legend: {
          labels: {
            color: "rgba(0, 0, 0, 0.8)",
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: chartType === "bar" ? "Gene Effect" : "Tissue",
            color: "rgba(0, 0, 0, 0.8)",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            color: "rgba(0, 0, 0, 0.6)",
            padding: 10, // Add padding for better readability
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          title: {
            display: true,
            text: chartType === "bar" ? "Tissue" : "Gene Effect",
            color: "rgba(0, 0, 0, 0.8)",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          min: -3,
          max: 3,
          ticks: {
            color: "rgba(0, 0, 0, 0.6)",
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
    }

    if (chartType === "scatter") {
      baseOptions.scales!.y!.type = "category"
      baseOptions.scales!.y!.labels = essentialityData.map((item) => item.tissueName)
      // Ensure enough height for all categories
      baseOptions.maintainAspectRatio = false
    }

    return baseOptions
  }

  const displayChart = () => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: getChartData(),
      options: getChartOptions(),
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto backdrop-blur-md bg-white/30 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Gene Essentiality Map</CardTitle>
        <CardDescription className="text-gray-100">
          Visualizing gene essentiality across different tissues
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            type="text"
            value={ensemblId}
            onChange={(e) => setEnsemblId(e.target.value)}
            placeholder="Enter Ensembl ID"
            aria-label="Ensembl ID"
            className="flex-grow bg-white/50 border-2 border-purple-300 focus:border-purple-500 rounded-md"
          />
          <Button
            onClick={fetchData}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? "Loading..." : "Fetch Data"}
          </Button>
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <SelectTrigger className="w-[180px] bg-white/50 border-2 border-purple-300 focus:border-purple-500 rounded-md">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="scatter">Scatter Plot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {geneInfo && (
          <p className="mb-6 text-lg font-semibold text-gray-800 bg-yellow-100 p-3 rounded-md shadow">
            Showing data for <span className="text-purple-600">{geneInfo.approvedSymbol}</span> (Ensembl ID:{" "}
            {geneInfo.ensemblId})
          </p>
        )}
        <div
          className="w-full bg-white rounded-lg shadow-md p-4"
          style={{ height: `${Math.max(800, essentialityData.length * 30)}px` }}
        >
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}

