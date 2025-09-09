// Educational Platform interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeEducationalPlatform();
    setupAnimations();
    setupInteractiveElements();
    setupLearningProgress();
});

function initializeEducationalPlatform() {
    // Animate progress circle on load
    setTimeout(() => {
        animateProgressCircle();
    }, 1000);
    
    // Setup course enrollment tracking
    setupEnrollmentTracking();
    
    // Initialize community activity simulation
    setupCommunityActivity();
    
    // Setup achievement notifications
    setupAchievementSystem();
}

function animateProgressCircle() {
    const progressCircle = document.querySelector('.progress-circle circle:last-child');
    if (progressCircle) {
        const circumference = 2 * Math.PI * 25; // radius = 25
        const progress = 70; // 70%
        const offset = circumference - (progress / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            progressCircle.style.transition = 'stroke-dashoffset 2s ease-out';
            progressCircle.style.strokeDashoffset = offset;
        }, 500);
    }
}

function setupEnrollmentTracking() {
    // Simulate real-time enrollment updates
    const enrollmentCounters = document.querySelectorAll('.stat');
    
    setInterval(() => {
        enrollmentCounters.forEach(counter => {
            const text = counter.textContent;
            if (text.includes('enrolled')) {
                const currentNumber = parseInt(text.match(/\d+/)[0]);
                const newNumber = currentNumber + Math.floor(Math.random() * 3);
                counter.innerHTML = counter.innerHTML.replace(/\d+/, newNumber);
                
                // Add visual feedback
                counter.style.transform = 'scale(1.05)';
                counter.style.color = 'var(--success)';
                
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                    counter.style.color = 'inherit';
                }, 300);
            }
        });
    }, 10000); // Update every 10 seconds
}

function setupCommunityActivity() {
    const activities = [
        { name: 'Maria', action: 'completed Module 2', time: '2 min ago' },
        { name: 'James', action: 'shared a success story', time: '5 min ago' },
        { name: 'Sarah', action: 'earned AI Mastery badge', time: '8 min ago' },
        { name: 'David', action: 'started Module 1', time: '12 min ago' },
        { name: 'Lisa', action: 'joined the community', time: '15 min ago' },
        { name: 'Mike', action: 'completed a workshop', time: '18 min ago' },
        { name: 'Anna', action: 'posted in discussion', time: '22 min ago' }
    ];
    
    const activityList = document.querySelector('.community-activity');
    
    if (activityList) {
        setInterval(() => {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const activityItems = activityList.querySelectorAll('.activity-item');
            
            if (activityItems.length > 0) {
                const firstItem = activityItems[0];
                
                // Fade out
                firstItem.style.opacity = '0.5';
                firstItem.style.transform = 'translateX(-10px)';
                
                setTimeout(() => {
                    // Update content
                    const nameElement = firstItem.querySelector('strong');
                    const actionElement = firstItem.querySelector('.activity-text');
                    const timeElement = firstItem.querySelector('.activity-time');
                    
                    nameElement.textContent = randomActivity.name;
                    actionElement.innerHTML = `<strong>${randomActivity.name}</strong> ${randomActivity.action}`;
                    timeElement.textContent = randomActivity.time;
                    
                    // Fade in
                    firstItem.style.opacity = '1';
                    firstItem.style.transform = 'translateX(0)';
                    
                    // Highlight new activity
                    firstItem.style.background = 'rgba(37, 69, 255, 0.1)';
                    setTimeout(() => {
                        firstItem.style.background = 'transparent';
                    }, 2000);
                }, 300);
            }
        }, 7000); // Update every 7 seconds
    }
}

function setupAchievementSystem() {
    const achievements = [
        { icon: '🏆', title: 'Achievement Unlocked!', subtitle: 'Prompt Engineering Master' },
        { icon: '🎯', title: 'Milestone Reached!', subtitle: 'Data Analysis Expert' },
        { icon: '⚡', title: 'Skill Mastered!', subtitle: 'AI Implementation Pro' },
        { icon: '🌟', title: 'Badge Earned!', subtitle: 'Community Contributor' }
    ];
    
    // Show random achievement notification
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            showAchievementNotification(achievements[Math.floor(Math.random() * achievements.length)]);
        }
    }, 15000);
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="notification-icon">${achievement.icon}</div>
        <div class="notification-content">
            <div class="notification-title">${achievement.title}</div>
            <div class="notification-subtitle">${achievement.subtitle}</div>
        </div>
        <div class="notification-close">×</div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

function setupLearningProgress() {
    // Simulate learning progress updates
    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-circle circle:last-child');
    
    if (progressText && progressFill) {
        setInterval(() => {
            const currentProgress = parseInt(progressText.textContent);
            if (currentProgress < 100) {
                const newProgress = Math.min(currentProgress + 1, 100);
                progressText.textContent = newProgress + '%';
                
                // Update circle
                const circumference = 2 * Math.PI * 25;
                const offset = circumference - (newProgress / 100) * circumference;
                progressFill.style.strokeDashoffset = offset;
                
                // Update lesson status if needed
                updateLessonStatus(newProgress);
            }
        }, 30000); // Update every 30 seconds
    }
}

function updateLessonStatus(progress) {
    const lessons = document.querySelectorAll('.lesson-item');
    
    if (progress >= 85 && lessons[2] && lessons[2].classList.contains('current')) {
        // Complete current lesson
        lessons[2].classList.remove('current');
        lessons[2].classList.add('completed');
        lessons[2].querySelector('.lesson-icon').textContent = '✓';
        
        // Start next lesson
        if (lessons[3]) {
            lessons[3].classList.remove('upcoming');
            lessons[3].classList.add('current');
            lessons[3].querySelector('.lesson-icon').textContent = '▶';
        }
    }
}

function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('course-card')) {
                    animateCourseCard(entry.target);
                }
                
                if (entry.target.classList.contains('path-step')) {
                    animatePathStep(entry.target);
                }
                
                if (entry.target.classList.contains('feature-item')) {
                    animateFeatureItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.course-card, .path-step, .feature-item, .benefit-item').forEach(el => {
        observer.observe(el);
    });
}

function animateCourseCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
    
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, delay);
}

function animatePathStep(step) {
    const delay = Array.from(step.parentNode.children).indexOf(step) * 300;
    
    setTimeout(() => {
        step.style.transform = 'scale(1)';
        step.style.opacity = '1';
    }, delay);
}

function animateFeatureItem(item) {
    const delay = Array.from(item.parentNode.children).indexOf(item) * 150;
    
    setTimeout(() => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '1';
    }, delay);
}

function setupInteractiveElements() {
    // Course card interactions
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('coming-soon')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        });
    });
    
    // Learning path step interactions
    const pathSteps = document.querySelectorAll('.path-step');
    pathSteps.forEach(step => {
        step.addEventListener('click', function() {
            if (this.classList.contains('completed') || this.classList.contains('current')) {
                // Show step details
                this.style.transform = 'scale(1.1)';
                this.style.zIndex = '10';
                
                setTimeout(() => {
                    this.style.transform = this.classList.contains('current') ? 'scale(1.05)' : 'scale(1)';
                    this.style.zIndex = '1';
                }, 500);
            }
        });
    });
    
    // Interface card interactions
    const interfaceCards = document.querySelectorAll('.interface-card');
    interfaceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        });
    });
    
    // Lesson item interactions
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('completed') || this.classList.contains('current')) {
                // Simulate lesson start/review
                this.style.background = 'rgba(37, 69, 255, 0.2)';
                
                setTimeout(() => {
                    if (this.classList.contains('completed')) {
                        this.style.background = 'rgba(34, 197, 94, 0.1)';
                    } else {
                        this.style.background = 'rgba(37, 69, 255, 0.1)';
                    }
                }, 1000);
            }
        });
    });
    
    // Button interactions with enhanced effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Special handling for enrollment buttons
            if (this.textContent.includes('Start Course') || this.textContent.includes('Enroll')) {
                this.textContent = 'Enrolling...';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.textContent = 'Enrolled ✓';
                    setTimeout(() => {
                        this.textContent = 'Continue Learning';
                    }, 2000);
                }, 1000);
            }
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Avatar interactions
    const avatars = document.querySelectorAll('.avatar, .activity-avatar');
    avatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    });
}

// Add CSS for animations and notifications
const additionalStyles = `
<style>
.animate-in {
    animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.course-card {
    transition: all 0.3s ease;
}

.path-step {
    transition: all 0.3s ease;
    cursor: pointer;
}

.interface-card {
    transition: all 0.3s ease;
    cursor: pointer;
}

.lesson-item {
    transition: all 0.2s ease;
    cursor: pointer;
}

.avatar, .activity-avatar {
    transition: all 0.5s ease;
    cursor: pointer;
}

.notification-icon {
    font-size: 24px;
}

.notification-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-900);
}

.notification-subtitle {
    font-size: 12px;
    color: var(--gray-600);
}

.notification-close {
    cursor: pointer;
    font-size: 18px;
    color: var(--gray-400);
    margin-left: auto;
}

.notification-close:hover {
    color: var(--gray-600);
}

/* Initial states for animated elements */
.course-card {
    opacity: 0;
    transform: translateY(20px);
}

.path-step {
    opacity: 0;
    transform: scale(0.9);
}

.feature-item {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

