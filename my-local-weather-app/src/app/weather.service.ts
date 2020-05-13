import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrentWeather } from './icurrent-weather';
import { environment } from '../environments/environment';
import { getLocaleDayNames } from '@angular/common';
import {map} from 'rxjs/operators';

interface ICurrentWeatherData {
  weather: [
    {
      description: string,
      icon: string
    }
  ],
  main: {
    temp: number
  },
  dt: number,
  sys: {
    country: string,
  },
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(City: string, Country: string){
    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?q=${City},${Country}&appId=${environment.appId}`).pipe(
        map(data => this.tranformToICurrentWeather(data))
      );
  }

  tranformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather{
      return {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  convertKelvinToFahrenheit(kelvin: number): number{
    return kelvin * 9 / 5 - 459.67;
  }
}
