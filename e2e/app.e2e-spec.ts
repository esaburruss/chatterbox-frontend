import { ChatterboxFrontendPage } from './app.po';

describe('chatterbox-frontend App', () => {
  let page: ChatterboxFrontendPage;

  beforeEach(() => {
    page = new ChatterboxFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
