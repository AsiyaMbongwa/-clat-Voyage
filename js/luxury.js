


window.addEventListener('load', function () {
    const luxuryLoader = document.getElementById('luxuryLoader');

   
    setTimeout(() => {
        luxuryLoader.style.opacity = '0';
        luxuryLoader.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            luxuryLoader.style.display = 'none';

            
            triggerLuxuryEntrance();
        }, 500);
    }, 2000);
});


function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.luxury-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

              
                if (this.classList.contains('footer-link')) {
                    document.querySelectorAll('.footer-link').forEach(link => {
                        link.style.color = '';
                    });
                    this.style.color = 'var(--gold) !important';
                }
            }
        });
    });
}



// Luxury Property Details Modal
function initializePropertyModals() {
    const viewDetailsButtons = document.querySelectorAll('.btn-view-details');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const propertyId = this.getAttribute('data-property');
            showPropertyModal(propertyId);
        });
    });
}

function getPropertyName(propertyId) {
    const properties = {
        'bali-villa': 'Bali Paradise Villa',
        'santorini-residence': 'Santorini Elite Residence',
        'swiss-alpine': 'Swiss Alpine Retreat'
    };
    return properties[propertyId] || 'Luxury Villa';
}

function getPropertyPrice(propertyId) {
    const prices = {
        'bali-villa': '$1,500 / night',
        'santorini-residence': '$2,200 / night',
        'swiss-alpine': '$2,800 / night'
    };
    return prices[propertyId] || '$2,000 / night';
}


function initializeSearchButton() {
    const curateBtn = document.getElementById('curateEscapeBtn');

    if (curateBtn) {
        curateBtn.addEventListener('click', function () {
            
            const destination = document.querySelector('.search-item input[placeholder="Destination"]').value;
            const checkin = document.querySelector('.search-item input[placeholder="Check-in"]').value;
            const checkout = document.querySelector('.search-item input[placeholder="Check-out"]').value;
            const guests = document.querySelector('.search-item select').value;

            
            curateBtn.innerHTML = 'Curating Your Escape...';
            curateBtn.style.background = 'var(--dark-gold)';

          
            setTimeout(() => {
                
                showSearchResults({
                    destination: destination,
                    checkin: checkin,
                    checkout: checkout,
                    guests: guests
                });

                
                curateBtn.innerHTML = 'Curate My Escape';
                curateBtn.style.background = 'var(--gold)';
            }, 1500);
        });
    }
}

function showSearchResults(searchData) {
    const resultsModal = document.createElement('div');
    resultsModal.className = 'luxury-modal';
    resultsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="luxury-gold-text"> Curated Escapes for You</h2>
            <div class="search-summary">
                <p><strong>Destination:</strong> ${searchData.destination}</p>
                <p><strong>Dates:</strong> ${searchData.checkin} to ${searchData.checkout}</p>
                <p><strong>Guests:</strong> ${searchData.guests}</p>
            </div>
            
            <div class="curated-results">
                <div class="curated-property">
                    <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3" alt="Luxury Villa">
                    <div class="curated-details">
                        <h3> Premium Villa Selection</h3>
                        <p class="curated-price">From R1,200 / night</p>
                        <p>We've curated 3 exceptional properties matching your preferences</p>
                      <button class="btn-luxury-primary" onclick="showPropertyModal('bali-villa')">View Curated Collection</button>
                    </div>
                </div>
            </div>
            
            <div class="concierge-offer">
                <h4> Personalized Concierge Service</h4>
                <p>Would you like our luxury concierge to create a fully customized itinerary?</p>
                <button class="btn-luxury-secondary" onclick="contactConcierge('search')">Speak with Concierge</button>
            </div>
        </div>
    `;

    document.body.appendChild(resultsModal);

    function showCuratedCollection() {
        
        document.querySelector('.luxury-modal').remove();

        
        const propertiesSection = document.querySelector('.signature-collection');
        const navbarHeight = document.querySelector('.luxury-nav').offsetHeight;
        const targetPosition = propertiesSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // luxury highlight effect
        propertiesSection.style.boxShadow = '0 0 50px rgba(201, 169, 110, 0.5)';
        setTimeout(() => {
            propertiesSection.style.boxShadow = 'none';
        }, 2000);
    }



   
    resultsModal.querySelector('.close-modal').addEventListener('click', () => {
        resultsModal.remove();
    });

    resultsModal.addEventListener('click', (e) => {
        if (e.target === resultsModal) {
            resultsModal.remove();
        }
    });
}


function showPropertyModal(propertyId) {
    const modal = document.createElement('div');
    modal.className = 'luxury-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Luxury Villa Details</h2>
            <div class="modal-gallery">
                <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3" alt="Property">
            </div>
            <div class="modal-details">
                <h3> ${getPropertyName(propertyId)}</h3>

<p class="modal-price">${getPropertyPrice(propertyId)}</p>
                <p class="modal-price">${propertyId === 'bali-villa' ? '$1,500 / night' : '$2,200 / night'}</p>
                <div class="modal-amenities">
                    <span> Infinity Pool</span>
                    <span> Private Chef</span>
                    <span> Spa</span>
                </div>
               <button class="btn-luxury-primary" onclick="showContactForm('${propertyId}')">Reserve This Sanctuary</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
//function helpers//
function getPropertyName(propertyId) {
    const properties = {
        'bali-villa': 'Bali Paradise Villa',
        'santorini-residence': 'Santorini Elite Residence',
        'swiss-alpine': 'Swiss Alpine Retreat'
    };
    return properties[propertyId] || 'Luxury Villa';
}

function getPropertyPrice(propertyId) {
    const prices = {
        'bali-villa': '$1,500 / night',
        'santorini-residence': '$2,200 / night',
        'swiss-alpine': '$2,800 / night'
    };
    return prices[propertyId] || '$2,000 / night';
}


function initializeVirtualTours() {
    const tourButtons = document.querySelectorAll('.btn-virtual-tour');

    tourButtons.forEach(button => {
        button.addEventListener('click', function () {
            const propertyId = this.getAttribute('data-property');
            launchVirtualTour(propertyId);
        });
    });
}

function launchVirtualTour(propertyId) {
    const tourModal = document.createElement('div');
    tourModal.className = 'virtual-tour-modal';
    tourModal.innerHTML = `
        <div class="tour-content">
            <span class="close-tour">&times;</span>
            <h2> Virtual Tour</h2>
            <p>Experience this luxury sanctuary in immersive 360°</p>
            <div class="tour-placeholder">
                <div class="loading-tour">Loading Premium Virtual Experience...</div>
            </div>
            <button class="btn-luxury-primary">Schedule Live Video Tour</button>
        </div>
    `;

    document.body.appendChild(tourModal);

    tourModal.querySelector('.close-tour').addEventListener('click', () => {
        tourModal.remove();
    });
}

// Luxury Entrance Animations
function triggerLuxuryEntrance() {
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
}


let lastScrollY = 0;
const navbar = document.querySelector('.luxury-nav');

window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 26, 47, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 26, 47, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

   
    const hero = document.querySelector('.cinematic-hero');
    if (hero && currentScrollY < window.innerHeight) {
        const scrolled = currentScrollY * 0.5;
        hero.style.transform = `translateY(${scrolled}px)`;
    }

    lastScrollY = currentScrollY;
});


function initializeLuxuryHovers() {
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        const image = card.querySelector('.property-image');
        const overlay = card.querySelector('.property-overlay');

        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.setProperty('--mouse-angle', `${angle}deg`);
        });

        
        card.addEventListener('mouseenter', () => {
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (overlay) {
                overlay.style.opacity = '0.9';
                overlay.style.transform = 'translateY(20px)';
            }
        });
    });
}


function initializeRippleButtons() {
    const luxuryButtons = document.querySelectorAll('.btn-luxury-primary, .btn-luxury-secondary, .nav-btn');

    luxuryButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(201, 169, 110, 0.6);
                transform: scale(0);
                animation: luxuryRipple 600ms linear;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;

           
            if (!document.querySelector('#luxury-ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'luxury-ripple-styles';
                style.textContent = `
                    @keyframes luxuryRipple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';

            
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}


function initializeLuxuryForms() {
    const searchInputs = document.querySelectorAll('.search-item input, .search-item select');

    searchInputs.forEach(input => {
       
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-5px)';
            this.parentElement.style.boxShadow = '0 10px 30px rgba(201, 169, 110, 0.2)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.boxShadow = 'none';
        });
    });
}


function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

              
                if (entry.target.classList.contains('feature-card') ||
                    entry.target.classList.contains('testimonial-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .testimonial-card,
        .property-card,
        .section-header
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}


function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let charIndex = 0;
    const typingSpeed = 100; 

    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    
    setTimeout(typeWriter, 2200);
}

// Luxury Cursor Effect
function initializeLuxuryCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(201, 169, 110, 0.3);
        border: 1px solid var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background 0.2s;
        mix-blend-mode: difference;
    `;

    document.body.appendChild(cursor);
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

  
    const interactiveElements = document.querySelectorAll(`
        a, button, .property-card, .feature-card, .nav-btn
    `);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(201, 169, 110, 0.6)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'rgba(201, 169, 110, 0.3)';
        });
    });
}

// Luxury Background Particle Effect
function initializeParticles() {
    const hero = document.querySelector('.cinematic-hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    hero.appendChild(particlesContainer);

    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--gold);
            border-radius: 50%;
            animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
            opacity: ${0.3 + Math.random() * 0.7};
        `;

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }

   
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

 
function initializeLuxurySounds() {
    const hoverSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='); // Silent audio

    const interactiveElements = document.querySelectorAll(`
        .btn-luxury-primary, .btn-luxury-secondary, .nav-btn
    `);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            
            el.style.transition = 'all 0.2s ease';
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    console.log(' Initializing Éclat Voyage Luxury Features...');
    initializeSmoothScroll();
    initializePropertyModals();
    initializeVirtualTours();
    initializeSearchButton();

    
    initializeLuxuryHovers();
    initializeRippleButtons();
    initializeLuxuryForms();
    initializeScrollAnimations();
    initializeTypingEffect();
    initializeLuxuryCursor();
    initializeParticles();
    initializeLuxurySounds();

    
    document.documentElement.style.scrollBehavior = 'smooth';

    console.log(' Éclat Voyage Luxury Features Initialized!');
});


window.addEventListener('error', function (e) {
    console.log(' Luxury Error Handler: Gracefully handling issues...');
});


console.log(`

          Éclat Voyage               
     Luxury Travel Redefined         
     Where Dreams Find Their Address  

`);

function reserveProperty(propertyId) {
    const propertyName = getPropertyName(propertyId);
    const propertyPrice = getPropertyPrice(propertyId);

    
    document.querySelector('.luxury-modal').remove();

    
    const bookingModal = document.createElement('div');
    bookingModal.className = 'luxury-modal';
    bookingModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="luxury-gold-text"> Reserve Your Sanctuary</h2>
            
            <div class="booking-summary">
                <h3>${propertyName}</h3>
                <p class="booking-price">${propertyPrice}</p>
                <div class="booking-details">
                    <p><strong> Location:</strong> ${getPropertyLocation(propertyId)}</p>
                    <p><strong> Includes:</strong> ${getPropertyAmenities(propertyId)}</p>
                </div>
            </div>
            
            <div class="booking-form">
                <div class="form-group">
                    <label>Check-in Date</label>
                    <input type="date" class="luxury-input" value="2025-12-15">
                </div>
                <div class="form-group">
                    <label>Check-out Date</label>
                    <input type="date" class="luxury-input" value="2025-12-22">
                </div>
                <div class="form-group">
                    <label>Guests</label>
                    <select class="luxury-select">
                        <option>2 guests</option>
                        <option>4 guests</option>
                        <option>6+ guests</option>
                    </select>
                </div>
            </div>
            
            <div class="booking-actions">
                <button class="btn-luxury-primary" onclick="confirmBooking('${propertyId}')">
                     Confirm Reservation
                </button>
                <button class="btn-luxury-secondary" onclick="contactConcierge('${propertyId}')">
                     Speak with Concierge
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(bookingModal);

    
    bookingModal.querySelector('.close-modal').addEventListener('click', () => {
        bookingModal.remove();
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.remove();
        }
    });
}



function getPropertyLocation(propertyId) {
    const locations = {
        'bali-villa': 'Ubud, Bali',
        'santorini-residence': 'Santorini, Greece',
        'swiss-alpine': 'Zermatt, Switzerland'
    };
    return locations[propertyId] || 'Exclusive Location';
}

function getPropertyAmenities(propertyId) {
    const amenities = {
        'bali-villa': 'Infinity Pool, Private Chef, Spa',
        'santorini-residence': 'Wine Cellar, Panoramic Views, Private Beach',
        'swiss-alpine': 'Private Ski Lift, Alpine Spa, Fireplace'
    };
    return amenities[propertyId] || 'Luxury Amenities';
}

function confirmBooking(propertyId) {
    const propertyName = getPropertyName(propertyId);

    
    const confirmModal = document.createElement('div');
    confirmModal.className = 'luxury-modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="luxury-gold-text"> Reservation Confirmed</h2>
            
            <div class="confirmation-content">
                <div class="confirmation-icon"></div>
                <h3>Your luxury escape is secured!</h3>
                <p><strong>${propertyName}</strong> has been reserved for your selected dates.</p>
                <p>Our concierge team will contact you within 24 hours to finalize details.</p>
                
                <div class="confirmation-details">
                    <p> Email confirmation sent</p>
                    <p> Personal concierge assigned</p>
                    <p> Luxury itinerary in preparation</p>
                </div>
                
                <button class="btn-luxury-primary" onclick="closeAllModals()">
                    Perfect! Continue Exploring
                </button>
            </div>
        </div>
    `;

    
    document.querySelector('.luxury-modal').remove();
    document.body.appendChild(confirmModal);

    confirmModal.querySelector('.close-modal').addEventListener('click', () => {
        confirmModal.remove();
    });
}

function contactConcierge(propertyId) {
    const propertyName = getPropertyName(propertyId);

    
    document.querySelector('.luxury-modal').remove();

    
    window.location.href = `mailto:concierge@eclatvoyage.com?subject=Concierge Inquiry - ${propertyName}&body=Hello, I'm interested in ${propertyName}. Please contact me to discuss details.`;
}

function closeAllModals() {
    document.querySelectorAll('.luxury-modal').forEach(modal => {
        modal.remove();
    });
}

//  CONTACT FORM SYSTEM

function showContactForm(propertyId) {
    const propertyName = getPropertyName(propertyId);
    const propertyPrice = getPropertyPrice(propertyId);

    
    closeAllModals();

    const contactModal = document.createElement('div');
    contactModal.className = 'luxury-modal';
    contactModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="luxury-gold-text"> Reserve Your Sanctuary</h2>
            
            <div class="property-summary">
                <h3>${propertyName}</h3>
                <p class="property-price">${propertyPrice}</p>
            </div>
            
            <form class="contact-form" onsubmit="submitReservationRequest(event, '${propertyId}')">
                <div class="form-section">
                    <h4> Your Information</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name *</label>
                            <input type="text" class="luxury-input" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label>Last Name *</label>
                            <input type="text" class="luxury-input" name="lastName" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input type="email" class="luxury-input" name="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" class="luxury-input" name="phone" placeholder="+1 (555) 123-4567">
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4> Stay Details</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Check-in Date *</label>
                            <input type="date" class="luxury-input" name="checkin" value="2025-12-15" required>
                        </div>
                        <div class="form-group">
                            <label>Check-out Date *</label>
                            <input type="date" class="luxury-input" name="checkout" value="2025-12-22" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Number of Guests *</label>
                        <select class="luxury-select" name="guests" required>
                            <option value="2">2 guests</option>
                            <option value="4">4 guests</option>
                            <option value="6">6 guests</option>
                            <option value="8">8+ guests</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4> Special Requests</h4>
                    <div class="form-group">
                        <textarea class="luxury-input" name="requests" placeholder="Any special requirements, preferences, or questions for our concierge..." rows="4"></textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-luxury-primary">
                         Submit Reservation Request
                    </button>
                    <button type="button" class="btn-luxury-secondary" onclick="closeAllModals()">
                        Maybe Later
                    </button>
                </div>
                
                <p class="form-note">Our concierge will contact you within 24 hours to confirm your reservation</p>
            </form>
        </div>
    `;

    document.body.appendChild(contactModal);

    
    contactModal.querySelector('.close-modal').addEventListener('click', () => {
        contactModal.remove();
    });

    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.remove();
        }
    });
}

function submitReservationRequest(event, propertyId) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    
    const reservationData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        checkin: formData.get('checkin'),
        checkout: formData.get('checkout'),
        guests: formData.get('guests'),
        requests: formData.get('requests'),
        property: getPropertyName(propertyId),
        propertyPrice: getPropertyPrice(propertyId)
    };

    
    const submitBtn = form.querySelector('.btn-luxury-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = ' Sending Request...';
    submitBtn.disabled = true;

    
    setTimeout(() => {
        
        sendReservationEmail(reservationData);

        
        showReservationConfirmation(reservationData, propertyId);
    }, 2000);
}

function sendReservationEmail(reservationData) {
    // THIS WILL OPEN GMAIL 
    const subject = ` Éclat Voyage - Reservation Request: ${reservationData.property}`;

    const body = `
Dear Éclat Voyage Concierge,

I would like to request a reservation with the following details:

PROPERTY: ${reservationData.property}
PRICE: ${reservationData.propertyPrice}

GUEST INFORMATION:
- Name: ${reservationData.firstName} ${reservationData.lastName}
- Email: ${reservationData.email}
- Phone: ${reservationData.phone}

STAY DETAILS:
- Check-in: ${reservationData.checkin}
- Check-out: ${reservationData.checkout}
- Guests: ${reservationData.gests}

SPECIAL REQUESTS:
${reservationData.requests || 'None'}

Please contact me to confirm availability and proceed with the booking.

Best regards,
${reservationData.firstName} ${reservationData.lastName}
    `.trim();

    
    const mailtoLink = `mailto:concierge@eclatvoyage.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

function showReservationConfirmation(reservationData, propertyId) {
    closeAllModals();

    const confirmModal = document.createElement('div');
    confirmModal.className = 'luxury-modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="luxury-gold-text"> Request Submitted!</h2>
            
            <div class="confirmation-content">
                <div class="confirmation-icon"></div>
                <h3>Check your email to complete the request</h3>
                
                <div class="confirmation-details">
                    <p><strong>What happens next:</strong></p>
                    <p>1.  Your email client opened with pre-filled request</p>
                    <p>2.  Click "Send" to submit to our concierge</p>
                    <p>3.  We'll contact you within 24 hours</p>
                    <p>4.  Your luxury escape will be confirmed!</p>
                </div>
                
                <div class="guest-info">
                    <p><strong>Request Summary:</strong></p>
                    <p>Property: ${reservationData.property}</p>
                    <p>Guest: ${reservationData.firstName} ${reservationData.lastName}</p>
                    <p>Email: ${reservationData.email}</p>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn-luxury-primary" onclick="closeAllModals()">
                        Perfect! I'll Send the Email
                    </button>
                    <button class="btn-luxury-secondary" onclick="showContactForm('${propertyId}')">
                        Edit Request
                    </button>
                </div>
                
                <p class="confirmation-note">If email didn't open automatically, please email: concierge@eclatvoyage.com</p>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);

    confirmModal.querySelector('.close-modal').addEventListener('click', () => {
        confirmModal.remove();
    });
}

console.log(' Éclat Voyage ready!');