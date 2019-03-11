const BLACKLIST_TAGS = [
  'iframe',
  'script',
];

const WHITELIST_ATTRS = [
  'src',
  'alt',
];

const R_TAG = /<(\w+)\s?(.*?)>.*?(<\/(.*?)>)?/;
const R_ATTRIBUTES = /(\w+\s*)=(\s*".*?")/g;
	/**
     * Функция защиты от XSS
	 * @param unsafeString - Входная априори небезопасная строка
     * @return  Строка, очищенная от небезопасных элементов
     */
export function makeSafe(unsafeString = '') {
  return unsafeString
    .replace(R_TAG, (match, g1) => (BLACKLIST_TAGS.includes(g1) ? '' : match))
    .replace(R_ATTRIBUTES, (match, g1) => (WHITELIST_ATTRS.includes(g1) ? match : ''));
}
