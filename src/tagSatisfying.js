function tagSatisfying(tags, element) {
  return (element.nodeType == Node.ELEMENT_NODE)
      && (tags.indexOf(element.nodeName.toLowerCase()) != -1)
}
