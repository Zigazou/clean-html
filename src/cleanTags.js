// Maximum width and height used to indicate dimensions in width and height
// attributes for wordprocessors working in A4 format.
const MAX_WIDTH = 600
const MAX_HEIGHT = 850

/**
 * Clean tags contained in a fragment or a node.
 *
 * @param {DocumentFragment} fragment - Fragment to clean.
 * @return {DocumentFragment} - A copy of the document fragment modified
 *                              according to the rules.
 */
function cleanTags(fragment) {
  // Keeps nothing a bad tags.
  if (isBadTag(fragment)) return document.createDocumentFragment()

  let cleaned
  if (isUsefulTag(fragment)) {
    // The tag must be preserved.
    cleaned = document.createElement(fragment.nodeName)
    for (const attribute of fragment.attributes) {
      if (!isUsefulAttribute(attribute)) continue
      cleaned.setAttributeNode(attribute.cloneNode())
    }

    if (isAnImage(fragment)) {
      // Images are converted to data image.
      convertImage(
        fragment.getAttribute("src"),
        (src, width, height) => {
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (MAX_WIDTH * height / width).toPrecision(5)
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (MAX_HEIGHT * width / height).toPrecision(5)
              height = MAX_HEIGHT
            }
          }
          cleaned.setAttribute("width", width)
          cleaned.setAttribute("height", height)
          cleaned.setAttribute("src", src)
        }
      )
    } else if (isALink(fragment)) {
      // Links are made absolute.
      cleaned.setAttribute(
        "href",
        new URL(fragment.getAttribute("href"), fragment.baseURI).href
      )

      // If link contains no text, try to replace it with the title attribute.
      if (fragment.innerText == "" && fragment.getAttribute("title") != "") {
        cleaned.innerText = fragment.getAttribute("title")
      }
    }
  } else if (fragment.nodeType == Node.TEXT_NODE) {
    // Any text node must be preserved.
    cleaned = document.createTextNode(applyTypography(fragment.data))
  } else if (shouldBeReplaced(fragment)) {
    // Some fragment have to be replaced.
    cleaned = document.createElement(
      replaceTagBys[fragment.nodeName.toLowerCase()]
    )
  } else {
    // Anything else is ignored but content is kept.
    cleaned = document.createDocumentFragment()
  }

  for (const child of fragment.childNodes) {
    cleaned.appendChild(cleanTags(child))
  }

  // Some nodes are kept only if they are not empty.
  if (isEmptyButShouldNot(cleaned)) return document.createDocumentFragment()
  return cleaned
}
