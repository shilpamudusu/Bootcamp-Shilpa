import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface CityFormProps {
  onCityChange: (city: string) => void;
}

export function CityForm({ onCityChange }: CityFormProps) {
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onCityChange(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="city">Enter City Name:</Label>
        <Input
          id="city"
          placeholder="Los Angeles"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Update Weather</Button>
    </form>
  )
}

