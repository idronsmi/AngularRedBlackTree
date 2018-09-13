import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[svgPanZoom]'
})
export class SvgPanZoomDirective implements OnInit {

  private panning = false;
  private originalCTM: SVGMatrix;
  private originalPoint: { x: number, y: number };

  private zoomDelta = 1;

  @Input() wrapper: SVGGraphicsElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    const ctm = this.wrapper.getCTM();
    this.setTransformMatrix(ctm);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(evt: MouseEvent) {
    this.panning = true;
    this.originalCTM = this.wrapper.getCTM();
    this.originalPoint = this.createSvgPoint(evt);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(evt) {
    this.panning = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(evt: MouseEvent) {
    if (this.panning) {
      const point = this.createSvgPoint(evt);
      const ctm = this.originalCTM.translate((point.x - this.originalPoint.x), (point.y - this.originalPoint.y));
      this.setTransformMatrix(ctm);
    }
  }

  @HostListener('mousewheel', ['$event'])
  onmousewheel(evt: WheelEvent) {

    // TODO: adde zoom to point functionality.
    const mousePoint = this.createSvgPoint(evt);

    if (evt.deltaY > 0) {
      this.zoomDelta = 1.03;
    } else {
      this.zoomDelta = .97;
    }

    let ctm = this.wrapper.getCTM();
    ctm = ctm.scale(this.zoomDelta);
    this.setTransformMatrix(ctm);

  }

  private setTransformMatrix(ctm: SVGMatrix) {
    const matrixString = `matrix(${ctm.a} ${ctm.b} ${ctm.c} ${ctm.d} ${ctm.e} ${ctm.f})`;
    this.renderer.setAttribute(this.wrapper, 'transform', matrixString);
  }

  private createSvgPoint(evt: MouseEvent): SVGPoint {
    const point = this.el.nativeElement.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point;
  }
}
