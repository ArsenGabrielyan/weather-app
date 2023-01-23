import { AfterViewInit, Component } from '@angular/core';
import { finalize, map } from 'rxjs';
import {HttpService} from "./services/http.service";
import {OtherFeaturesService} from "./services/other-features.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  tab = "weather";
  input = "";
  isShown = false;
  city = "";
  temp = 0;
  windspd = 0;
  humid = 0;
  code = 0;
  current!:string;
  constructor(private req: HttpService, private other: OtherFeaturesService){}
  ngAfterViewInit(): void {
    this.isShown = false;
    window.onkeydown = (e)=>{if(e.key === "Enter") this.searchWeather();}
  }
  switchTab(tab:string){this.tab = tab;}
  getWeather(val:any){
    this.req.getPlaceFrom(val.latitude,val.longitude).pipe(map((place:any)=>this.getPlace(place))).subscribe();
    const {temperature_120m,windspeed_120m,relativehumidity_2m,weathercode} = val.hourly;
    this.isShown = true;
    this.temp = temperature_120m[temperature_120m.length-1];
    this.windspd = windspeed_120m[windspeed_120m.length-1];
    this.humid = relativehumidity_2m[relativehumidity_2m.length-1];
    this.code = weathercode[weathercode.length-1];
    this.current = this.other.getWeatherFromCode(this.code)!;
  }
  searchWeather(){
    if(this.input.trim() === "") {alert("Enter City or Location");this.input = ""} 
    else this.req.getWeatherDetails(this.input).subscribe(val=>val.pipe(map((res:any)=>this.getWeather(res)),finalize(()=>this.input="")).subscribe());
  }
  showWeatherFromPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos:GeolocationPosition)=>{
        this.req.getPlaceFrom(pos.coords.latitude,pos.coords.longitude).pipe(map((val:any)=>this.getPlace(val))).subscribe();
        this.req.getWeatherFrom(pos).pipe(map(val=>this.getWeather(val))).subscribe();
      })
    }
  }
  getPlace(place:any){
    const {city,village,town,municipality, country, state, hamlet} = place.address,
    mentionedCommunity = city || village || town || municipality || state || hamlet;
    this.city = `${mentionedCommunity || ""}${mentionedCommunity ? ", " : ""} ${country}`
  }
}