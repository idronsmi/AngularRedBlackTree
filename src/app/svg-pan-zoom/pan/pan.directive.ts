import { Directive, HostListener, Host, ElementRef } from '@angular/core';

@Directive({
  selector: '[svgPan]'
})
export class PanDirective {

  private panning = false;

  constructor(private element: ElementRef) {
    console.log(element);
  }

  @HostListener('mousedown') onMouseDown() {
    this.panning = true;
  }

  @HostListener('mousemove') onMouseMove() {
    if (this.panning) {

    }
  }

  @HostListener('mouseup') onMouseUp() {
    this.panning = false;
  }

}
