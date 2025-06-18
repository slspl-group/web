document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        
        // Initially hide all answers
        if (answer) {
            answer.style.display = 'none';
        }
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle current answer
                const isOpen = answer.style.display === 'block';
                
                // Close all answers
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-toggle i');
                    
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                    }
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });
                
                // Open current answer if it was closed
                if (!isOpen) {
                    if (answer) {
                        answer.style.display = 'block';
                    }
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                }
            });
        }
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name && !name.value.trim()) {
                isValid = false;
                showError(name, 'Please enter your name');
            } else if (name) {
                removeError(name);
            }
            
            if (email && !email.value.trim()) {
                isValid = false;
                showError(email, 'Please enter your email');
            } else if (email && !validateEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            } else if (email) {
                removeError(email);
            }
            
            if (message && !message.value.trim()) {
                isValid = false;
                showError(message, 'Please enter your message');
            } else if (message) {
                removeError(message);
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        // Remove any existing error
        removeError(input);
        
        // Add error class
        formGroup.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function showSuccessMessage() {
        const formCard = document.querySelector('.contact-form-card');
        if (!formCard) return;

        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We will get back to you soon.';
        
        formCard.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
});
