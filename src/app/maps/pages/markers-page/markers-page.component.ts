import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 15;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-4.79, 37.87);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';

    console.log(this.divMap);
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter,
      zoom: this.zoom,
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Carlos Mon'

    // const marker = new Marker(
    //   {
    //     // color: 'red'
    //     element: markerHtml
    //   }
    // )
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map)
  }

  public createMarker(): void {
    if (!this.map) return

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();

    this.addMarker( lgnLat, color);
  }

  public deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  public addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker ({
      color: color,
      draggable: true
    }).setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color: color,
      marker: marker
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());

  }

  public flyTo( marker: Marker): void {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  public saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  public readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! Potencialmente inseguro

    plainMarkers.forEach( ({color, lngLat}) => {
      const [lng, lat] = lngLat
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    })
  }
}
