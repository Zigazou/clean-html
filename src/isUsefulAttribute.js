const usefulAttributes = ["href", "src", "alt"]
function isUsefulAttribute(attribute) {
  return (usefulAttributes.indexOf(attribute.name.toLowerCase()) != -1)
}
