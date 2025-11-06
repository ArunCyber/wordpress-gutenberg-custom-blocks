/**
 * JavaScript functionality for the Post Block
 * Handles slider functionality and other interactive features
 */

/**
 * Initialize all post block sliders when the DOM is loaded
 * Searches for all slider elements and sets up their functionality
 */
document.addEventListener('DOMContentLoaded', function() {
	// Initialize all post block sliders
	const sliders = document.querySelectorAll('.post-layout-slider .post-slider');
	
	sliders.forEach(function(slider) {
		initializeSlider(slider);
	});
});

/**
 * Initialize a single slider with all its functionality
 * Sets up navigation, touch controls, dots, and responsive behavior
 * 
 * @param {HTMLElement} sliderContainer - The main slider container element
 */
function initializeSlider(sliderContainer) {
	const track = sliderContainer.querySelector('.slider-track');
	const cards = track.querySelectorAll('.blog-card');
	const prevBtn = sliderContainer.querySelector('.slider-prev');
	const nextBtn = sliderContainer.querySelector('.slider-next');
	const dotsContainer = sliderContainer.querySelector('.slider-dots');
	
	if (!track || cards.length === 0) return;
	
	let currentIndex = 0;
	const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
	const visibleCards = Math.floor(sliderContainer.offsetWidth / cardWidth);
	const maxIndex = Math.max(0, cards.length - visibleCards);
	
	// Create dots
	createDots();
	
	// Event listeners
	if (prevBtn) {
		prevBtn.addEventListener('click', function() {
			moveSlider(-1);
		});
	}
	
	if (nextBtn) {
		nextBtn.addEventListener('click', function() {
			moveSlider(1);
		});
	}
	
	// Touch/swipe support
	let startX = 0;
	let isDragging = false;
	
	track.addEventListener('touchstart', function(e) {
		startX = e.touches[0].clientX;
		isDragging = true;
	});
	
	track.addEventListener('touchmove', function(e) {
		if (!isDragging) return;
		e.preventDefault();
	});
	
	track.addEventListener('touchend', function(e) {
		if (!isDragging) return;
		
		const endX = e.changedTouches[0].clientX;
		const diffX = startX - endX;
		
		if (Math.abs(diffX) > 50) { // Minimum swipe distance
			if (diffX > 0) {
				moveSlider(1); // Swipe left - next
			} else {
				moveSlider(-1); // Swipe right - previous
			}
		}
		
		isDragging = false;
	});
	
	// Auto-slide (optional)
	let autoSlideInterval;
	
	/**
	 * Start automatic sliding functionality
	 * Moves to the next slide every 5 seconds, loops back to start when reaching the end
	 */
	function startAutoSlide() {
		autoSlideInterval = setInterval(function() {
			if (currentIndex < maxIndex) {
				moveSlider(1);
			} else {
				currentIndex = -1;
				moveSlider(1);
			}
		}, 5000); // 5 seconds
	}
	
	/**
	 * Stop the automatic sliding functionality
	 * Clears the interval to prevent further automatic movement
	 */
	function stopAutoSlide() {
		clearInterval(autoSlideInterval);
	}
	
	// Uncomment the next line to enable auto-slide
	// startAutoSlide();
	
	// Pause auto-slide on hover
	sliderContainer.addEventListener('mouseenter', stopAutoSlide);
	sliderContainer.addEventListener('mouseleave', startAutoSlide);
	
	/**
	 * Move the slider to a new position
	 * Handles boundary checks and updates all related UI elements
	 * 
	 * @param {number} direction - Direction to move (-1 for previous, 1 for next, 0 for direct positioning)
	 */
	function moveSlider(direction) {
		currentIndex += direction;
		
		// Boundary checks
		if (currentIndex < 0) {
			currentIndex = 0;
		} else if (currentIndex > maxIndex) {
			currentIndex = maxIndex;
		}
		
		// Move the track
		const translateX = -currentIndex * cardWidth;
		track.style.transform = `translateX(${translateX}px)`;
		
		// Update dots
		updateDots();
		
		// Update button states
		updateButtonStates();
	}
	
	/**
	 * Create navigation dots for the slider
	 * Generates clickable dots based on the number of slide positions
	 */
	function createDots() {
		if (!dotsContainer) return;
		
		dotsContainer.innerHTML = '';
		
		for (let i = 0; i <= maxIndex; i++) {
			const dot = document.createElement('div');
			dot.className = 'dot';
			if (i === 0) dot.classList.add('active');
			
			dot.addEventListener('click', function() {
				currentIndex = i;
				moveSlider(0); // Move without changing index
			});
			
			dotsContainer.appendChild(dot);
		}
	}
	
	/**
	 * Update the active state of navigation dots
	 * Highlights the current dot and removes highlight from others
	 */
	function updateDots() {
		if (!dotsContainer) return;
		
		const dots = dotsContainer.querySelectorAll('.dot');
		for (const [index, dot] of dots.entries()) {
			dot.classList.toggle('active', index === currentIndex);
		}
	}
	
	/**
	 * Update the state of previous/next navigation buttons
	 * Disables and dims buttons when they reach their boundaries
	 */
	function updateButtonStates() {
		if (prevBtn) {
			prevBtn.disabled = currentIndex === 0;
			prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
		}
		
		if (nextBtn) {
			nextBtn.disabled = currentIndex === maxIndex;
			nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
		}
	}
	
	/**
	 * Handle window resize events
	 * Recalculates slider dimensions and updates controls accordingly
	 * Ensures the slider remains functional on different screen sizes
	 */
	window.addEventListener('resize', function() {
		// Recalculate visible cards and max index
		const newVisibleCards = Math.floor(sliderContainer.offsetWidth / cardWidth);
		const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
		
		if (newMaxIndex !== maxIndex) {
			currentIndex = Math.min(currentIndex, newMaxIndex);
			createDots();
			updateButtonStates();
		}
	});
	
	// Initialize button states
	updateButtonStates();
}
