'use strict'

const translations = {};

module.exports = (key, {data}) => {
  const lang = data.root.page.version || 'en';
  if (!translations[lang]) {
    translations[lang] = JSON.parse(require('fs').readFileSync(`ui-bundle/l10n/${lang}.json`));
  }
  return translations[lang][key] || key.replace(/([A-Z])/g,' $1').trim()
}