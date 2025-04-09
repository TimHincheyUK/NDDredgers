function initializeGalleryRotation() {
    const images = document.querySelectorAll('.gallery-img');
    const gallery = document.querySelector('.gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const close = lightbox.querySelector('.close');
    const prev = lightbox.querySelector('.prev');
    const next = lightbox.querySelector('.next');
    let currentIndex = 0;
    let rotationInterval;

    function rotateImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        images[nextIndex].classList.add('active');
        images[nextIndex].classList.remove('hidden');
        
        images[currentIndex].classList.remove('active');
        images[currentIndex].classList.add('hidden');
        
        currentIndex = nextIndex;
    }

    // Set initial state
    images.forEach((img, index) => {
        if (index === 0) {
            img.classList.add('active');
            img.classList.remove('hidden');
        } else {
            img.classList.add('hidden');
            img.classList.remove('active');
        }
    });

    // Start rotation
    rotationInterval = setInterval(rotateImage, 5000);

    // Lightbox handlers
    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-img')) {
            // Pause rotation when lightbox is open
            clearInterval(rotationInterval);
            
            // Find currently active image
            const activeImage = gallery.querySelector('.gallery-img.active');
            currentIndex = parseInt(activeImage.dataset.index);
            
            // Update lightbox and show active image
            lightbox.classList.add('active');
            lightboxImg.src = activeImage.src;
        }
    });

    close.addEventListener('click', () => {
        lightbox.classList.remove('active');
        // Resume rotation
        rotationInterval = setInterval(rotateImage, 5000);
    });

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            // Resume rotation
            rotationInterval = setInterval(rotateImage, 5000);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            // Resume rotation
            rotationInterval = setInterval(rotateImage, 5000);
        }
        if (e.key === 'ArrowLeft') prev.click();
        if (e.key === 'ArrowRight') next.click();
    });
}

document.addEventListener('DOMContentLoaded', initializeGalleryRotation);