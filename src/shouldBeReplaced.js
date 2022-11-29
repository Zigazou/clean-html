const replaceTagBys = {
  "figcaption": "p",
  "div": "p"
}

function shouldBeReplaced(element) {
  return (element.nodeType == Node.ELEMENT_NODE)
      && (element.nodeName.toLowerCase() in replaceTagBys)
}