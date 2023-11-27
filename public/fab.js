/**
 * Hides the specified elements by setting their display property to 'none'.
 * Also sets the overflow property of the document body to 'auto'.
 * @param {...HTMLElement} elements - The elements to hide.
 */
function hideElements(...elements) {
    for (let element of elements) {
        element.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
}

/**
 * Shows the specified elements by setting their display property to 'block'.
 * Also sets the overflow property of the document body to 'hidden'.
 * @param {...HTMLElement} elements - The elements to be shown.
 */
function showElements(...elements) {
    for (let element of elements) {
        element.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
}

// Get the 'overlay' and 'newArtworkForm' elements
const overlay = document.getElementById('overlay');
const newArtworkForm = document.getElementById('new-artwork-form');

// Get the 'fab' element and add a click event listener to show the overlay and newArtworkForm
const fab = document.getElementById('fab');
fab.addEventListener('click', () => showElements(overlay, newArtworkForm));

// Get the 'close' button element and add a click event listener to hide the overlay and newArtworkForm
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => hideElements(overlay, newArtworkForm));

// Add a click event listener to the overlay element, if the click target is the overlay, hide the overlay and newArtworkForm
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        hideElements(overlay, newArtworkForm);
    }
});
