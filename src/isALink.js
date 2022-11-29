const isALink = (element) => {
  return tagSatisfying(["a"], element) && element.hasAttribute("href")
}