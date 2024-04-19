import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidmlpY2ZkZXowMyIsImEiOiJjbHY0dnlzbWowZWlhMmtsYnFvYjgyN3FwIn0.waCOnGLmTjy5dmAm32CEhg';

import { MapsRoutingModule } from './maps-routing.module';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoomrange-page.component';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { AlonePageComponent } from '../alone/pages/alone-page/alone-page.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';



@NgModule({
  declarations: [
    FullScreenPageComponent,
    MapsLayoutComponent,
    MarkersPageComponent,
    MiniMapComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,

  ],
  imports: [
    AlonePageComponent,
    CommonModule,
    CounterAloneComponent,
    MapsRoutingModule,
    SideMenuComponent,
  ]
})
export class MapsModule { }
