import { GitRepoVisualizationPage } from './app.po';

describe('git-repo-visualization App', () => {
  let page: GitRepoVisualizationPage;

  beforeEach(() => {
    page = new GitRepoVisualizationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
