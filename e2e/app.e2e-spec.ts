import { Project002Page } from './app.po';

describe('project002 App', () => {
  let page: Project002Page;

  beforeEach(() => {
    page = new Project002Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
