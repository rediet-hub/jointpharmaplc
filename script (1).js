// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message
        alert('Thank you for your inquiry! We will contact you within 24 hours.');
        
        // Reset form
        this.reset();
        
        // In a real implementation, you would send this data to a server
        console.log('Form data:', data);
    });
}

// Handle product query parameter in contact form
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    
    if (product) {
        const productInput = document.getElementById('product');
        if (productInput) {
            productInput.value = product;
        }
        
        // Set inquiry type to product inquiry
        const inquiryType = document.getElementById('inquiryType');
        if (inquiryType) {
            inquiryType.value = 'quote';
        }
    }
});

// Product Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    // Only run if we're on a page with product cards
    if (productCards.length === 0) return;
    
    // Create modal HTML (only once)
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'productModal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeProductModal()">&times;</button>
            <img class="modal-image" src="" alt="">
            <div class="modal-body">
                <span class="modal-category"></span>
                <h2 class="modal-title"></h2>
                <p class="modal-description"></p>
                <div class="modal-actions">
                    <a href="#" class="modal-btn primary">Request Quote</a>
                    <button class="modal-btn secondary" onclick="closeProductModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add click event to each product card
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking the request quote button directly
            if (e.target.classList.contains('product-btn')) {
                return;
            }
            
            // Get product details from card
            const image = this.querySelector('.product-image img').src;
            const category = this.querySelector('.product-category-tag').textContent;
            const title = this.querySelector('.product-info h3').textContent;
            const description = this.querySelector('.product-info p').textContent;
            const quoteLink = this.querySelector('.product-btn').href;
            
            // Populate modal
            document.querySelector('.modal-image').src = image;
            document.querySelector('.modal-category').textContent = category;
            document.querySelector('.modal-title').textContent = title;
            document.querySelector('.modal-description').textContent = description;
            document.querySelector('.modal-btn.primary').href = quoteLink;
            
            // Show modal
            document.getElementById('productModal').classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });
});

// Close modal function (global scope so onclick works)
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});
