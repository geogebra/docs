module.exports = (enPage, { data }) => {
  const { contentCatalog, site } = data.root
  const pages = contentCatalog.getPages(({ asciidoc, out }) => {
    if (!out || !asciidoc || !enPage) return false;
    return asciidoc.attributes['page-en'] == enPage;
  })
  const { buildPageUiModel } = require.main.require('@antora/page-composer/build-ui-model')
  return pages.map((page) => buildPageUiModel(site, page, contentCatalog))
}