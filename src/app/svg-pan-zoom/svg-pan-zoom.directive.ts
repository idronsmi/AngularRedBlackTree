import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[svgPanZoom]'
})
export class SvgPanZoomDirective implements OnInit {

  private panning = false;
  private originalCTM: SVGMatrix;
  private originalPoint: { x: number, y: number };
  private _viewBox = { x: 0, y: 0, width: 1750, height: 1000 };
  private ratio: number;

  private screenHeight: number;
  private screenWidth: number;

  @Input() wrapper: SVGGraphicsElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
    this.onResize();
  }



  ngOnInit() {
    const ctm = this.wrapper.getCTM();
    this.renderer.setAttribute(this.wrapper, 'transform', this.getTransformMatrix(ctm));
  }

  // @HostBinding('attr.viewBox') viewBox: string;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(evt: MouseEvent) {
    this.panning = true;
    this.originalCTM = this.wrapper.getCTM();
    this.originalPoint = this.createPoint(evt);
    // this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(evt) {
    this.panning = false;
    // this.renderer.setStyle(this.el.nativeElement, 'cursor', 'default');

  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(evt: MouseEvent) {
    if (this.panning) {

      // this._viewBox.x -= ((evt.clientX - this.originalPoint.x) * this.ratio);
      // this._viewBox.y -= ((evt.clientY - this.originalPoint.y) * this.ratio);
      // this.viewBox = this.getViewBox();
      console.log((evt.clientX - this.originalPoint.x), (evt.clientY - this.originalPoint.y));
      const point = this.createPoint(evt);
      console.log(point);
      const ctm = this.originalCTM.translate((point.x - this.originalPoint.x), (point.y - this.originalPoint.y));
      this.renderer.setAttribute(this.wrapper, 'transform', this.getTransformMatrix(ctm));
    }
  }

  @HostListener('mousewheel', ['$event'])
  onmousewheel(evt: WheelEvent) {
    console.log(evt);
  }

  // private getViewBox() {
  //   return `${this._viewBox.x} ${this._viewBox.y} ${this._viewBox.width} ${this._viewBox.height}`;
  // }

  private getTransformMatrix(ctm: SVGMatrix) {
    return `matrix(${ctm.a} ${ctm.b} ${ctm.c} ${ctm.d} ${ctm.e} ${ctm.f})`;
  }

  private createPoint(evt: MouseEvent): SVGPoint {
    const point = this.el.nativeElement.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point;
  }
}
