// Custom JavaScript for EduLearn

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavbar();
    initializeForms();
    initializeRatingSystem();
    initializeNewsletterForm();
    initializeScrollEffects();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

// Form validation and handling
function initializeForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle login form submission
function handleLoginSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const form = event.target;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (form.checkValidity()) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        showLoadingState(submitBtn);
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingState(submitBtn);
            showSuccessModal('Login Successful!', `Welcome back! You have been successfully logged in.`);
            form.reset();
        }, 2000);
    }
    
    form.classList.add('was-validated');
}

// Handle register form submission
function handleRegisterSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const form = event.target;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Check if passwords match
    const confirmPasswordField = document.getElementById('confirmPassword');
    if (password !== confirmPassword) {
        confirmPasswordField.setCustomValidity('Passwords do not match');
    } else {
        confirmPasswordField.setCustomValidity('');
    }
    
    if (form.checkValidity()) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        showLoadingState(submitBtn);
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingState(submitBtn);
            showSuccessModal('Registration Successful!', 'Your account has been created successfully. You can now log in.');
            form.reset();
            form.classList.remove('was-validated');
            
            // Switch to login tab
            const loginTab = document.getElementById('login-tab');
            if (loginTab) {
                loginTab.click();
            }
        }, 2000);
    }
    
    form.classList.add('was-validated');
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const form = event.target;
    
    if (form.checkValidity()) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        showLoadingState(submitBtn);
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingState(submitBtn);
            
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('contactSuccessModal'));
            modal.show();
            
            // Reset form
            form.reset();
            form.classList.remove('was-validated');
            
            // Reset rating
            const stars = document.querySelectorAll('.rating-stars i');
            stars.forEach(star => star.classList.remove('active'));
            document.getElementById('userRating').value = '0';
            document.querySelector('.rating-text').textContent = 'Click to rate';
        }, 2000);
    }
    
    form.classList.add('was-validated');
}

// Password toggle functionality
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(fieldId + 'Eye');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Rating system functionality
function initializeRatingSystem() {
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingText = document.querySelector('.rating-text');
    const ratingInput = document.getElementById('userRating');
    
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                
                // Update hidden input
                if (ratingInput) {
                    ratingInput.value = rating;
                }
                
                // Update star display
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
                
                // Update rating text
                if (ratingText) {
                    const ratingTexts = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
                    ratingText.textContent = ratingTexts[rating - 1];
                }
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.dataset.rating);
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.style.color = '#ffc107';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        });
        
        // Reset on mouse leave
        const ratingContainer = document.querySelector('.rating-stars');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', function() {
                const currentRating = parseInt(ratingInput ? ratingInput.value : 0);
                stars.forEach((s, i) => {
                    if (i < currentRating) {
                        s.style.color = '#ffc107';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        }
    }
}

// Newsletter subscription
function initializeNewsletterForm() {
    // This function can be called directly from the HTML
}

function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Show success message
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.classList.remove('btn-light');
            button.classList.add('btn-success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('btn-success');
                button.classList.add('btn-light');
                button.disabled = false;
                emailInput.value = '';
            }, 2000);
        }, 1000);
    } else {
        emailInput.classList.add('is-invalid');
        setTimeout(() => {
            emailInput.classList.remove('is-invalid');
        }, 3000);
    }
}

// Utility functions
function showLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoadingState(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

function showSuccessModal(title, message) {
    const modal = document.getElementById('successModal');
    if (modal) {
        document.getElementById('successModalTitle').textContent = title;
        document.getElementById('successModalMessage').textContent = message;
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.course-card, .card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Form validation helpers
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Real-time validation
document.addEventListener('input', function(e) {
    if (e.target.matches('.form-control')) {
        if (e.target.checkValidity()) {
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        } else {
            e.target.classList.remove('is-valid');
            e.target.classList.add('is-invalid');
        }
    }
});

// Password strength indicator (for register form)
document.addEventListener('input', function(e) {
    if (e.target.id === 'registerPassword') {
        const password = e.target.value;
        const strength = getPasswordStrength(password);
        // You can add visual feedback here
    }
});

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Export functionality for forms (if needed)
function exportFormData(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log('Form data:', data);
        // You can implement actual export functionality here
    }
}