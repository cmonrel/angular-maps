import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @Input() lnglat?: [number, number];

  @ViewChild('map') divMap?: ElementRef;

  public color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw "Map Div not found"
    if (!this.lnglat) throw "LngLat can't bew null"

    // Map
    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lnglat,
      zoom: 15,
      interactive: false,
    });

    // Marker
    new Marker ({
      color: this.color,
    }).setLngLat(this.lnglat)
      .addTo(map);
  }

}
