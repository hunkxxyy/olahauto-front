import { OlahautoSrcPage } from './app.po';

describe('olahauto-src App', function() {
  let page: OlahautoSrcPage;

  beforeEach(() => {
    page = new OlahautoSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
