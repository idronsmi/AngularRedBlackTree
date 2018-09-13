import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgPanZoomDirective } from './svg-pan-zoom.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SvgPanZoomDirective],
  declarations: [SvgPanZoomDirective]
})
export class SvgPanZoomModule { }
