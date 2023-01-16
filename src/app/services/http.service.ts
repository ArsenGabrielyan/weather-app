import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  getWeatherDetails = (loc:string) => this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${loc}`).pipe(map((val:any)=>{
    const {latitude, longitude} = val.results[0];
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_120m,relativehumidity_2m,windspeed_120m,weathercode`)
  }));
  getWeatherFrom = (pos:GeolocationPosition) => this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&hourly=temperature_120m,relativehumidity_2m,windspeed_120m,weathercode`);
  getPlaceFrom = (lat:number,lng:number):Observable<any> => this.http.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`)
}