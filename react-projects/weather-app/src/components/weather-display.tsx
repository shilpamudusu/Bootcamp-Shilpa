import { Card, CardContent } from "@/components/ui/card"
import { iconMap } from '../utils/weather'
import { WeatherData } from '../types/weather'

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export function WeatherDisplay({ weatherData, isLoading, error }: WeatherDisplayProps) {
  if (isLoading) {
    return <Card className="w-full max-w-sm"><CardContent className="p-6 text-center">Loading...</CardContent></Card>
  }

  if (error) {
    return <Card className="w-full max-w-sm"><CardContent className="p-6 text-center text-red-500">{error}</CardContent></Card>
  }

  if (!weatherData) {
    return null
  }

  const weatherCondition = weatherData.weather[0].main.toLowerCase()
  const iconPath = iconMap[weatherCondition] || '/assets/default-icon.png'

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6 text-center">
        <img src={iconPath} alt={weatherCondition} className="w-20 h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Weather in {weatherData.name}</h2>
        <p className="text-xl">{weatherData.weather[0].main}, {weatherData.main.temp.toFixed(1)} °C</p>
      </CardContent>
    </Card>
  )
}

