import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../icurrent-weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor(private weatherSevice: WeatherService){};

  ngOnInit(): void {
    this.weatherSevice.getCurrentWeather('Redmond', 'US')
      .subscribe((data) => this.current = data);
  }
}
