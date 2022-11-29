const badTags = [
  "script",
  "noscript",
  "style",
  "base",
  "head",
  "link",
  "title", 
  "source",
]

const isBadTag = (element) => tagSatisfying(badTags, element)
