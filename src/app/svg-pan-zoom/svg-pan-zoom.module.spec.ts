import { SvgPanZoomModule } from './svg-pan-zoom.module';

describe('SvgPanZoomModule', () => {
  let svgPanZoomModule: SvgPanZoomModule;

  beforeEach(() => {
    svgPanZoomModule = new SvgPanZoomModule();
  });

  it('should create an instance', () => {
    expect(svgPanZoomModule).toBeTruthy();
  });
});
