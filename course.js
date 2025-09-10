// Course functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCourse();
    setupProgressTracking();
    setupInteractiveElements();
    setupExercises();
});

function initializeCourse() {
    // Initialize progress circle animation
    animateProgressCircle();
    
    // Setup lesson navigation
    setupLessonNavigation();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Initialize exercise tracking
    initializeExerciseTracking();
}

function animateProgressCircle() {
    const progressCircle = document.getElementById('progress-circle');
    const progressText = document.querySelector('.progress-text');
    
    if (progressCircle && progressText) {
        const circumference = 2 * Math.PI * 25; // radius = 25
        let currentProgress = 0;
        
        // Calculate progress based on completed exercises
        const completedExercises = document.querySelectorAll('.exercise-complete.completed').length;
        const totalExercises = document.querySelectorAll('.exercise-complete').length;
        
        if (totalExercises > 0) {
            currentProgress = (completedExercises / totalExercises) * 100;
        }
        
        const offset = circumference - (currentProgress / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            progressCircle.style.transition = 'stroke-dashoffset 2s ease-out';
            progressCircle.style.strokeDashoffset = offset;
            
            // Animate progress text
            animateNumber(progressText, 0, Math.round(currentProgress), 2000);
        }, 500);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.round(start + (end - start) * progress);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function setupLessonNavigation() {
    const lessonItems = document.querySelectorAll('.lesson-item[data-lesson]');
    const navItems = document.querySelectorAll('.nav-item');
    
    lessonItems.forEach(item => {
        item.addEventListener('click', function() {
            const lessonNumber = this.dataset.lesson;
            const targetSection = document.getElementById(`lesson-${lessonNumber}`);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav item on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lessonId = entry.target.id;
                const lessonNumber = lessonId.replace('lesson-', '');
                
                // Update sidebar navigation
                navItems.forEach(nav => nav.classList.remove('active'));
                const activeNav = document.querySelector(`[href="#${lessonId}"]`);
                if (activeNav) {
                    activeNav.classList.add('active');
                }
                
                // Update lesson progress
                updateLessonProgress(lessonNumber);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });
    
    document.querySelectorAll('.lesson-section').forEach(section => {
        observer.observe(section);
    });
}

function updateLessonProgress(currentLesson) {
    const lessonItems = document.querySelectorAll('.lesson-item[data-lesson]');
    
    lessonItems.forEach(item => {
        const lessonNumber = parseInt(item.dataset.lesson);
        const currentLessonNumber = parseInt(currentLesson);
        
        item.classList.remove('completed', 'current', 'upcoming');
        
        if (lessonNumber < currentLessonNumber) {
            item.classList.add('completed');
            item.querySelector('.lesson-status').textContent = '✓';
        } else if (lessonNumber === currentLessonNumber) {
            item.classList.add('current');
            item.querySelector('.lesson-status').textContent = '▶';
        } else {
            item.classList.add('upcoming');
            item.querySelector('.lesson-status').textContent = '○';
        }
    });
}

function setupSmoothScrolling() {
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
}

function setupProgressTracking() {
    // Track video play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Playing...';
            this.style.background = 'var(--success)';
            
            // Simulate video completion
            setTimeout(() => {
                this.textContent = 'Completed ✓';
                this.style.background = 'var(--success)';
                updateProgress();
            }, 2000);
        });
    });
    
    // Track exercise completion
    const exerciseButtons = document.querySelectorAll('.exercise-complete');
    exerciseButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('completed')) {
                this.classList.add('completed');
                this.textContent = 'Completed ✓';
                this.style.background = 'var(--success)';
                updateProgress();
                
                // Show success animation
                showCompletionAnimation(this);
            }
        });
    });
    
    // Track download buttons
    const downloadButtons = document.querySelectorAll('.download-btn, .resource-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Downloaded ✓';
            this.style.background = 'var(--success)';
            updateProgress();
        });
    });
}

function updateProgress() {
    // Recalculate and update progress circle
    setTimeout(() => {
        animateProgressCircle();
    }, 100);
}

function showCompletionAnimation(element) {
    // Create celebration effect
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉';
    celebration.style.cssText = `
        position: absolute;
        font-size: 24px;
        pointer-events: none;
        animation: celebrate 1s ease-out forwards;
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    celebration.style.left = rect.left + rect.width / 2 + 'px';
    celebration.style.top = rect.top + 'px';
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 1000);
}

function setupInteractiveElements() {
    // Prompt builder functionality
    setupPromptBuilders();
    
    // ROI calculator
    setupROICalculator();
    
    // Metrics builder
    setupMetricsBuilder();
    
    // Data simulator
    setupDataSimulator();
    
    // Roadmap builder
    setupRoadmapBuilder();
}

function setupPromptBuilders() {
    const promptBuilders = document.querySelectorAll('.prompt-builder');
    
    promptBuilders.forEach(builder => {
        const textarea = builder.querySelector('textarea');
        const testButton = builder.querySelector('.test-prompt');
        const sampleSolution = builder.parentElement.querySelector('.sample-solution');
        
        if (testButton) {
            testButton.addEventListener('click', function() {
                if (textarea.value.trim()) {
                    this.textContent = 'Testing...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.textContent = 'Great prompt! ✓';
                        this.style.background = 'var(--success)';
                        
                        if (sampleSolution) {
                            sampleSolution.style.display = 'block';
                        }
                    }, 1500);
                } else {
                    alert('Please write a prompt first!');
                }
            });
        }
    });
}

function setupROICalculator() {
    const calculateButton = document.querySelector('.calculate-roi');
    
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            const jobDescTime = parseFloat(document.getElementById('job-desc-time')?.value) || 0;
            const interviewTime = parseFloat(document.getElementById('interview-time')?.value) || 0;
            const reviewTime = parseFloat(document.getElementById('review-time')?.value) || 0;
            const policyTime = parseFloat(document.getElementById('policy-time')?.value) || 0;
            const analysisTime = parseFloat(document.getElementById('analysis-time')?.value) || 0;
            const hourlyRate = parseFloat(document.getElementById('hourly-rate')?.value) || 50;
            
            const totalWeeklyHours = jobDescTime + interviewTime + reviewTime + policyTime + analysisTime;
            const aiEfficiencyGain = 0.75; // 75% time savings
            const weeklySavings = totalWeeklyHours * aiEfficiencyGain;
            const annualSavings = weeklySavings * 52 * hourlyRate;
            const aiToolCost = 20 * 12; // $20/month
            const roi = ((annualSavings - aiToolCost) / aiToolCost) * 100;
            
            // Update results
            document.getElementById('weekly-savings').textContent = weeklySavings.toFixed(1) + ' hours';
            document.getElementById('annual-savings').textContent = '$' + annualSavings.toLocaleString();
            document.getElementById('roi-percentage').textContent = roi.toFixed(0) + '%';
            
            // Animate the results
            animateResults();
        });
    }
}

function animateResults() {
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            item.style.background = 'rgba(37, 69, 255, 0.1)';
            
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.background = 'var(--white)';
            }, 300);
        }, index * 200);
    });
}

function setupMetricsBuilder() {
    const metricOptions = document.querySelectorAll('.metric-options input[type="checkbox"]');
    const dashboardPreview = document.getElementById('dashboard-preview');
    
    metricOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateDashboardPreview();
        });
    });
    
    function updateDashboardPreview() {
        const selectedMetrics = Array.from(metricOptions)
            .filter(option => option.checked)
            .map(option => option.nextElementSibling.textContent);
        
        if (selectedMetrics.length === 0) {
            dashboardPreview.innerHTML = '<p class="placeholder">Select metrics to build your dashboard</p>';
        } else if (selectedMetrics.length > 5) {
            dashboardPreview.innerHTML = '<p class="warning">Please select only 5 metrics</p>';
        } else {
            dashboardPreview.innerHTML = selectedMetrics
                .map(metric => `<div class="selected-metric">${metric}</div>`)
                .join('');
        }
    }
}

function setupDataSimulator() {
    const analysisTextareas = document.querySelectorAll('.analysis-questions textarea');
    
    analysisTextareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            if (this.value.length > 50) {
                this.style.borderColor = 'var(--success)';
            } else {
                this.style.borderColor = 'var(--gray-300)';
            }
        });
    });
}

function setupRoadmapBuilder() {
    const roadmapCheckboxes = document.querySelectorAll('.roadmap-phase input[type="checkbox"]');
    
    roadmapCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const phase = this.closest('.roadmap-phase');
            const checkedItems = phase.querySelectorAll('input[type="checkbox"]:checked').length;
            const totalItems = phase.querySelectorAll('input[type="checkbox"]').length;
            
            if (checkedItems === totalItems) {
                phase.style.background = 'rgba(34, 197, 94, 0.1)';
                phase.style.borderColor = 'var(--success)';
            } else {
                phase.style.background = 'var(--white)';
                phase.style.borderColor = 'var(--gray-200)';
            }
        });
    });
}

function setupExercises() {
    // Challenge submission
    const submissionButtons = document.querySelectorAll('.submit-community, .submit-private');
    submissionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPublic = this.classList.contains('submit-community');
            const message = isPublic ? 
                'Solution shared with community! 🎉' : 
                'Solution saved privately ✓';
            
            this.textContent = message;
            this.style.background = 'var(--success)';
            this.disabled = true;
            
            // Show completion message
            setTimeout(() => {
                showCompletionMessage();
            }, 1000);
        });
    });
}

function showCompletionMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            text-align: center;
            max-width: 400px;
        ">
            <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
            <h3 style="font-size: 20px; font-weight: 600; color: var(--gray-900); margin-bottom: 8px;">
                Congratulations!
            </h3>
            <p style="font-size: 14px; color: var(--gray-600); margin-bottom: 24px;">
                You've completed this exercise. Keep up the great work!
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--primary-blue);
                color: var(--white);
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Continue</button>
        </div>
    `;
    
    document.body.appendChild(message);
}

// Add CSS for animations
const additionalStyles = `
<style>
@keyframes celebrate {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    50% {
        transform: translateY(-20px) scale(1.2);
        opacity: 1;
    }
    100% {
        transform: translateY(-40px) scale(0.8);
        opacity: 0;
    }
}

.selected-metric {
    background: var(--primary-blue);
    color: var(--white);
    padding: 8px 12px;
    border-radius: 6px;
    margin: 4px;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
}

.placeholder {
    color: var(--gray-500);
    font-style: italic;
    text-align: center;
    padding: 20px;
}

.warning {
    color: var(--error);
    font-weight: 500;
    text-align: center;
    padding: 20px;
}

.exercise-complete.completed {
    background: var(--success) !important;
    color: var(--white) !important;
}

.lesson-item {
    transition: all 0.3s ease;
}

.lesson-item:hover {
    transform: translateX(4px);
}

.nav-item {
    transition: all 0.2s ease;
}

.framework-item:hover {
    transform: translateY(-2px);
}

.metric-card {
    transition: all 0.3s ease;
}

.result-item {
    transition: all 0.3s ease;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

