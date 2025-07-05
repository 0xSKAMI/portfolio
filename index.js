document.addEventListener('DOMContentLoaded', function() {
	const menuLinks = document.querySelectorAll('.menu-column a');
	const contentSections = document.querySelectorAll('.content-section');
	let activeIndex = 0;

	// Function to switch tabs
	function switchTab(targetId) {
			// Update content sections
			contentSections.forEach(section => {
					section.classList.toggle('active', section.id === targetId);
			});

			// Update menu links and find the new active index
			menuLinks.forEach((link, index) => {
					const isActive = link.dataset.target === targetId;
					link.classList.toggle('active', isActive);
					if (isActive) {
							activeIndex = index;
					}
			});
	}

	// Add click event listeners to menu links
	menuLinks.forEach(link => {
			link.addEventListener('click', function(event) {
					event.preventDefault(); // Prevent default link behavior
					switchTab(this.dataset.target);
			});
	});

	// Add keyboard navigation
	document.addEventListener('keydown', function(event) {
			// Define the keys we want to handle
			const handledKeys = ['Tab', 'ArrowDown', 'ArrowUp'];
			if (!handledKeys.includes(event.key)) {
					return; // Exit if the key is not one we handle
			}

			event.preventDefault(); // Stop default browser action for these keys

			// Determine the new index
			if (event.key === 'ArrowUp') {
					activeIndex = (activeIndex - 1 + menuLinks.length) % menuLinks.length;
			} else { // 'Tab' or 'ArrowDown'
					activeIndex = (activeIndex + 1) % menuLinks.length;
			}
			
			// Switch to the new tab
			const newTargetId = menuLinks[activeIndex].dataset.target;
			switchTab(newTargetId);
	});

	// Set the initial active tab on page load
	if (menuLinks.length > 0) {
			switchTab(menuLinks[activeIndex].dataset.target);
	}
});
