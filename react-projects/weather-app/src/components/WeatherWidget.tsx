import { useState, useEffect } from 'react'
import { CityForm } from './CityForm'
import { WeatherDisplay } from './WeatherDisplay'
import { fetchWeather, bgMap } from '../utils/weather'
import { WeatherData } from '../types/weather'

export function WeatherWidget() {
  const [city, setCity] = useState('Los Angeles')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getWeather = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(city)
        setWeatherData(data)
        updateBackground(data.weather[0].main.toLowerCase())
      } catch (err) {
        setError('Error fetching weather data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getWeather()
  }, [city])

  const updateBackground = (condition: string) => {
    const bgPath = bgMap[condition]
    if (bgPath) {
      document.body.style.backgroundImage = `url(${bgPath})`
    } else {
      console.warn('No background image found for:', condition)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <CityForm onCityChange={setCity} />
      <WeatherDisplay weatherData={weatherData} isLoading={isLoading} error={error} />
    </div>
  )
}

