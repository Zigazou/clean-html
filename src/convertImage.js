/**
 * Convert an image given its URL to a data-URL.
 * 
 * The image is converted to the PNG format.
 * 
 * @param {string} src - URL of the image to convert. 
 * @param {function} callback - Callback to call when image has been converted,
 *                              the parameters will be a string containing the
 *                              image encoded in data-URL and the dimensions of
 *                              the image.
 */
function convertImage(src, callback) {
  const image = new Image()
  image.crossOrigin = "Anonymous"
  image.onload = function () {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    canvas.width = this.naturalWidth
    canvas.height = this.naturalHeight
    context.drawImage(this, 0, 0)
    const dataURL = canvas.toDataURL("image/png")
    callback(dataURL, this.naturalWidth, this.naturalHeight)
  }

  image.src = src
}
