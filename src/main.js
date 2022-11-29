const selection = window.getSelection()
if (selection.rangeCount >= 1) {
  const elements = document.createDocumentFragment()
  for (let i = 0; i < selection.rangeCount; i++) {
    elements.appendChild(window.getSelection().getRangeAt(i).cloneContents())
  }

  createPopup(cleanTags(elements))
}
