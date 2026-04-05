/**
 * Processes an image by applying Grayscale and Thresholding transformations.
 * * @param {HTMLImageElement} img - The image loaded via canvas/JSDOM.
 * @param {object} cv - The OpenCV.js instance.
 * @returns {cv.Mat} - The processed OpenCV Matrix.
 */

// Export the function for use in the main script
export function processImage(img, cv) {
    // Read the image from the image element into an OpenCV Mat
    let src = cv.imread(img);
    let dst = new cv.Mat();

    // Transformation 1: Gray scale
    // cv.COLOR_RGBA2GRAY is used because JSDOM/Canvas typically provides RGBA
    cv.cvtColor(src, src, cv.COLOR_BGR2GRAY);

    // Transformation 2: Thresholding ADAPTIVE
    cv.adaptiveThreshold(src, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);

    // Clean up the source matrix to prevent memory leaks
    src.delete();

    return dst;
}