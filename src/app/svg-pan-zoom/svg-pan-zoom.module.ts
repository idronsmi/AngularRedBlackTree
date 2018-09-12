import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomDirective } from './zoom/zoom.directive';
import { PanDirective } from './pan/pan.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ZoomDirective, PanDirective],
  declarations: [ZoomDirective, PanDirective]
})
export class SvgPanZoomModule { }
