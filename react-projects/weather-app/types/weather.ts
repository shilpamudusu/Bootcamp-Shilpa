export interface WeatherData {
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
  };
  name: string;
}

