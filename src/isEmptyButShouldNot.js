const shouldNotBeEmpty = [
  "ul",
  "ol",
  "li"
]

const isEmptyButShouldNot = (element) => {
  return tagSatisfying(shouldNotBeEmpty, element) && element.innerText == ""
}
