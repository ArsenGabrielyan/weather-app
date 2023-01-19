import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtherFeaturesService {
  getWeatherFromCode(code: number){
    let val;switch (code) {
      case 0: val = "Clear Sky"; break;
      case 1: val = "Mainly Clear"; break;
      case 2: val = "Partly Cloudy"; break;
      case 3: val = "Overcast"; break;
      case 19: val = "Funnel Clouds"; break;
      case 32: val = "Sandstorm"; break;
      case 45: val = "Fog"; break;
      case 48: val = "Depositing rime fog"; break;
      case 53: val = "Drizzle"; break;
      case 61: val = "Light Rain"; break;
      case 63: val = "Moderate Rain"; break;
      case 65: val = "Heavy Rain"; break;
      case 71: val = "Slight Snow"; break;
      case 73: val = "Moderate Snow"; break;
      case 75: val = "Heavy Snow"; break;
      case 80: val = "Light Rain Showers"; break;
      case 81: val = "Moderate Rain Showers"; break;
      case 82: val = "Heavy Rain Showers"; break;
      case 95: val = "Thunderstorm"; break;
      case 96: val = "Moderate Thunderstorm"; break;
      case 99: val = "Heavy Thunderstorm"; break;
      default: break;
    }
    return val;
  }
}