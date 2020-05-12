import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { ICurrentWeather } from './icurrent-weather';
import { map } from 'rxjs/operators';

interface ICurrentWeatherData {
  weather: [
    {
      description: string,
      icon: string
    }
  ];
  main: {
    temp: number,
  };
  dt: number;
  sys: {
    country: string,
  };
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) {

  }
  getCurrentWeather(city: string, country: string){
    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${environment.appId}`).pipe(
        map(data => this.transformToICurrentWeather(data)));
   }

  transformToICurrentWeather(data: ICurrentWeatherData) : ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      image: 'http://openweathermap.org/img/w/${data.weather[0]/icon}.png',
      temperature: data.main.temp,
      description: data.weather[0].description
      };
  }
  convertKelvinToFaheith(kelvin: number): number{
    return kelvin * 9 / 5 - 459.67;
  }
}
