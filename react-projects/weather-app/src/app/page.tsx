import { WeatherWidget } from '../components/weather-widget'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-sky-200 transition-all duration-500">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Weather Widget</h1>
      <WeatherWidget />
    </main>
  )
}

