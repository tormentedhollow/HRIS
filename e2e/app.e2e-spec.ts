import { HrisPage } from './app.po';

describe('hris App', function() {
  let page: HrisPage;

  beforeEach(() => {
    page = new HrisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
