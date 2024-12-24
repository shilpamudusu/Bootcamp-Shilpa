import { WeatherData } from '../types/weather';

const API_KEY = '82eb99ff9d8862d05147ae6283d90480';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const iconMap: Record<string, string> = {
  clear: '/assets/clear-icon.png',
  clouds: '/assets/cloudy-icon.png',
  rain: '/assets/rain-icon.png',
  snow: '/assets/snow-icon.png',
  thunderstorm: '/assets/thunderstorm-icon.png',
  mist: '/assets/mist-icon.png',
};

export const bgMap: Record<string, string> = {
  clear: '/assets/clear-bg.jpg',
  clouds: '/assets/cloudy-bg.jpg',
  rain: '/assets/rain-bg.jpg',
  snow: '/assets/snow-bg.jpg',
  thunderstorm: '/assets/thunderstorm-bg.jpg',
  mist: '/assets/mist-bg.jpg',
};

export async function fetchWeather(city: string): Promise<WeatherData> {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('City not found');
  }

  return await response.json();
}

