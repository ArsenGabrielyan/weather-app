import { Component, OnInit } from '@angular/core';
import { ColorBox } from '../../interfaces/color-box';

@Component({
  selector: 'weather-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  styleDisplay = document.createElement("style");
  colorbox: ColorBox[] = [
    {colorId: "red", color: "#dc3545"},
    {colorId: "blue", color: "#19a5d8"},
    {colorId: "green", color: "#22b455"},
    {colorId: "yellow", color: "#FFBF00"},
    {colorId: "orange", color: "#FF6D28"},
    {colorId: "pink", color: "#F56EB3"},
    {colorId: "dark", color: "#2f2f2f"},
  ];
  brightness = localStorage.getItem("brightness") || 100;
  
  ngOnInit():void{localStorage.setItem("brightness",String(100));document.getElementsByTagName("head")[0].appendChild(this.styleDisplay)}
  changeBgColor(id:string){
    const selectedItem = document.getElementById(id)!;
    const applied = `#btn{border-color: ${selectedItem.innerHTML};color: ${selectedItem.innerHTML};}#btn:hover{background-color: ${selectedItem.innerHTML};color: white;}.brightness-box #range{background-color: ${selectedItem.innerHTML} !important;} #search-input:focus{border-color: ${selectedItem.innerHTML};}`;
    document.getElementById("app")!.style.backgroundColor = selectedItem.innerHTML;
    this.styleDisplay.appendChild(document.createTextNode(applied));
  }
  handleChangeBrightness = ()=> {localStorage.setItem('brightness',`${this.brightness}`);document.getElementById("app")!.style.filter = `brightness(${this.brightness}%)`}
}