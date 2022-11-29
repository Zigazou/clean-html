/**
 * List of french typographic rules. Each element contains the regex search
 * string and the replacement string.
 * @constant
 * @type {Array}
 * @default
 */
const typographicRules = [
  [/ +/g, " "],
  [/'/g, "’"],
  [/ ([?!%€$»:;])/g, " $1"],
  [/« /g, "« "],
  [/\.\.\./g, "…"],
  [/([0-9]) ?([%€$£])/g, "$1 $2"],
  [/([0-9]{1,3})[ .]([0-9]{3})[ .]([0-9]{3})/g, "$1$2$3"],
  [/([0-9]{1,3}) ([0-9]{3})/g, "$1$2"],
]

/**
 * Apply french typography to a string.
 *
 * @param {string} str - String to apply french typography to
 * @return {string} - The string with french typography applied
 */
function applyTypography(str) {
  for ([regex, replacement] of typographicRules) {
    str = str.replace(regex, replacement)
  }

  return str
}