import { AfterViewInit, Component } from '@angular/core';
import { finalize, map } from 'rxjs';
import { HttpService } from './http.service';
import { OtherFeaturesService } from './other-features.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  tab = "weather";input = "";
  isShown = false;city = "";
  temp = 0;windspd = 0;
  humid = 0;code = 0;
  current!:string;
  constructor(private httpreq: HttpService, private other: OtherFeaturesService){}
  ngAfterViewInit(): void {this.isShown = false;window.onkeydown = (e)=>{if(e.key === "Enter") this.searchWeather(); else return;}}
  switchTab = (tab:string) => this.tab = tab
  getWeather(val:any){
    this.httpreq.getPlaceFrom(val.latitude,val.longitude).pipe(map((place:any)=>this.getPlace(place))).subscribe()
    const {temperature_120m,windspeed_120m,relativehumidity_2m,weathercode} = val.hourly;
    this.isShown = true;
    this.temp = temperature_120m[temperature_120m.length-1];
    this.windspd = windspeed_120m[windspeed_120m.length-1];
    this.humid = relativehumidity_2m[relativehumidity_2m.length-1];
    this.code = weathercode[weathercode.length-1];
    this.current = this.other.getWeatherFromCode(this.code)!;
  }
  searchWeather(){if(this.input.trim() === "") {alert("Enter City or Location");this.input = ""} else this.httpreq.getWeatherDetails(this.input).subscribe(val=>val.pipe(map((res:any)=>this.getWeather(res)),finalize(()=>this.input="")).subscribe());}
  showWeatherFromPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos:GeolocationPosition)=>{
        this.httpreq.getPlaceFrom(pos.coords.latitude,pos.coords.longitude).pipe(map((val:any)=>this.getPlace(val))).subscribe();
        this.httpreq.getWeatherFrom(pos).pipe(map(val=>this.getWeather(val))).subscribe()})
    } else return;
  }
  getPlace(place:any){const {city,village,town,municipality, country, state, hamlet} = place.address, mentionedCommunity = city || village || town || municipality || state || hamlet;this.city = `${mentionedCommunity || ""}${mentionedCommunity ? ", " : ""} ${country}`}
}