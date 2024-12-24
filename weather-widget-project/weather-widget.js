const iconMap = {
    clear: './assets/clear-icon.png',
    clouds: './assets/cloudy-icon.png',
    rain: './assets/rain-icon.png',
    snow: './assets/snow-icon.png',
    thunderstorm: './assets/thunderstorm-icon.png',
    mist: './assets/mist-icon.png',
  };
  
  const bgMap = {
    clear: './assets/clear-bg.jpg',
    clouds: './assets/cloudy-bg.jpg',
    rain: './assets/rain-bg.jpg',
    snow: './assets/snow-bg.jpg',
    thunderstorm: './assets/thunderstorm-bg.jpg',
    mist: './assets/mist-bg.jpg',
  };
  
  // Weather widget class
  class WeatherWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.city = this.getAttribute('city') || 'Los Angeles';
      this.render();
    }
  
    connectedCallback() {
      this.fetchWeather(this.city);
    }
  
    static get observedAttributes() {
      return ['city'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'city' && oldValue !== newValue) {
        this.city = newValue;
        this.fetchWeather(newValue);
      }
    }
  
    async fetchWeather(city) {
      const apiKey = '82eb99ff9d8862d05147ae6283d90480';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('City not found');
        }
  
        const weatherData = await response.json();
        this.updateWeatherWidget(weatherData);
      } catch (error) {
        console.error(error);
        this.shadowRoot.querySelector(
          '.weather-output'
        ).innerHTML = `<p>Error fetching weather: ${error.message}</p>`;
      }
    }
  
    updateWeatherWidget(weatherData) {
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
      const temperature = weatherData.main.temp;
      const cityName = weatherData.name;
  
      // Debugging output
      console.log('Weather Condition:', weatherCondition);
      console.log('Temperature:', temperature);
      console.log('City:', cityName);
  
      const iconPath = iconMap[weatherCondition];
      const bgPath = bgMap[weatherCondition];
  
      // Debugging paths
      console.log('Icon Path:', iconPath);
      console.log('Background Path:', bgPath);
  
      // Update DOM
      const weatherOutput = this.shadowRoot.querySelector('.weather-output');
      weatherOutput.innerHTML = `
        <img src="${iconPath || './assets/default-icon.png'}" alt="${weatherCondition}" class="weather-icon">
        <p>Weather in ${cityName}</p>
        <p>${weatherCondition}, ${temperature} °C</p>
      `;
  
      // Update background
      if (bgPath) {
        document.body.style.backgroundImage = `url(${bgPath})`;
      } else {
        console.warn('No background image found for:', weatherCondition);
      }
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .weather-output {
            text-align: center;
            padding: 10px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .weather-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 10px;
          }
          p {
            margin: 5px 0;
          }
        </style>
        <div class="weather-output">Loading...</div>
      `;
    }
  }
  
  // Define the custom element
  customElements.define('city-weather', WeatherWidget);
  
  // Add event listener for form submission
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('city-form');
    const cityInput = document.getElementById('city');
    const weatherWidget = document.querySelector('city-weather');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const newCity = cityInput.value.trim();
      if (newCity) {
        weatherWidget.setAttribute('city', newCity);
      }
    });
  });
  