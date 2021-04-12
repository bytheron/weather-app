export interface Weather {
  coord: {
    lon: any;
    lat: any;
  };
  weather: [
		{
			id: any;
			main: string;
			description: string;
			icon: string;
		}
  ];
  base: string;
  main: {
    temp: any;
    feels_like: any;
    temp_min: any;
    temp_max: any;
    pressure: any;
    humidity: any;
  };
  visibility: any;
  wind: 
		{
			speed: any;
			deg: any;
			gust: any;
		};
  clouds: { all: any; };
  dt: any;
  sys: {
    type: any;
    id: any;
    country: string;
    sunrise: any;
    sunset: any;
  };
  timezone: any;
  id: any;
  name: string;
  cod: any;
}
