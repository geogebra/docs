module.exports = (enPage, { data }) => {
  const { contentCatalog, site } = data.root
  const languages = Object.fromEntries(site.components.manual.versions.map(c => [c.version, c.displayVersion]));
  let docdir = '';
  contentCatalog.getPages(({asciidoc}) => {
    if (!asciidoc || !enPage) return false;
    if (asciidoc.attributes['page-en'] == enPage) {
      if (!docdir) {
        docdir = asciidoc.attributes['docdir'];
      }
      delete(languages[asciidoc.attributes['page-component-version']]);
    }
  })
  const { buildPageUiModel } = require.main.require('@antora/page-composer/build-ui-model')
  return Object.entries(languages).map(language => ({
    version: language[0],
    displayVersion: language[1],
    docdir
  }))
}