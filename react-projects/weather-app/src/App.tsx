import { WeatherWidget } from './components/WeatherWidget'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-400 to-blue-600">
      <main className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Weather Widget</h1>
        <WeatherWidget />
      </main>
    </div>
  )
}

export default App

