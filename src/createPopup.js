function createPopup(fragment) {
  const copyTab = window.open("", "_blank", "popup").document
  copyTab.title = "CleanHTML"
  copyTab.body.appendChild(fragment)
  copyTab.close()
}
