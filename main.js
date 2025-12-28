// NexGenFireSafety - Main JavaScript Functionality
// Handles all interactive components, animations, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeScrollAnimations();
    initializeCounters();
    initializeCharts();
    initializeDemo();
    initializeROI();
    initializeForms();
    initializeNavigation();
    initializeMobileMenu();
    initializeUseCasesTabs();
    
    console.log('NexGenFireSafety website initialized successfully');
});

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Chart Initialization
function initializeCharts() {
    // Market Growth Chart (Homepage)
    const marketChartElement = document.getElementById('marketChart');
    if (marketChartElement) {
        const marketChart = echarts.init(marketChartElement);
        
        const marketOption = {
            title: {
                text: 'Fire Protection Market Growth',
                textStyle: {
                    color: '#2C3E50',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['Total Market', 'Data Center Segment']
            },
            xAxis: {
                type: 'category',
                data: ['2024', '2025', '2026', '2027', '2028', '2029', '2030']
            },
            yAxis: {
                type: 'value',
                name: 'Market Size (Billions USD)'
            },
            series: [
                {
                    name: 'Total Market',
                    type: 'line',
                    data: [68.9, 71.97, 76.7, 81.9, 87.5, 93.6, 118.14],
                    smooth: true,
                    lineStyle: {
                        color: '#B7472A',
                        width: 3
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(183, 71, 42, 0.3)'
                            }, {
                                offset: 1, color: 'rgba(183, 71, 42, 0.1)'
                            }]
                        }
                    }
                },
                {
                    name: 'Data Center Segment',
                    type: 'line',
                    data: [1.4, 1.53, 1.67, 1.83, 2.0, 2.19, 3.4],
                    smooth: true,
                    lineStyle: {
                        color: '#8FBC8F',
                        width: 3
                    }
                }
            ]
        };
        
        marketChart.setOption(marketOption);
        
        // Responsive resize
        window.addEventListener('resize', () => {
            marketChart.resize();
        });
    }

    // Market Growth Chart (Investors page)
    const marketGrowthElement = document.getElementById('marketGrowthChart');
    if (marketGrowthElement) {
        const growthChart = echarts.init(marketGrowthElement);
        
        const growthOption = {
            title: {
                text: 'Market Growth Projection',
                textStyle: {
                    color: '#2C3E50',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    let result = params[0].name + '<br/>';
                    params.forEach(param => {
                        result += param.seriesName + ': $' + param.value + 'B<br/>';
                    });
                    return result;
                }
            },
            xAxis: {
                type: 'category',
                data: ['2024', '2025', '2026', '2027', '2028', '2029', '2030']
            },
            yAxis: {
                type: 'value',
                name: 'Market Size (Billions USD)'
            },
            series: [
                {
                    name: 'Total Market',
                    type: 'bar',
                    data: [68.9, 71.97, 76.7, 81.9, 87.5, 93.6, 118.14],
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#B7472A'
                            }, {
                                offset: 1, color: '#E67E22'
                            }]
                        }
                    }
                }
            ]
        };
        
        growthChart.setOption(growthOption);
        
        window.addEventListener('resize', () => {
            growthChart.resize();
        });
    }
}

// Interactive Demo
let currentScenario = 'datacenter';
let demoRunning = false;

function initializeDemo() {
    // Demo is initialized when user clicks "Start Demo"
}

function selectScenario(scenario) {
    currentScenario = scenario;
    
    // Update button states
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update demo visualization
    updateDemoVisualization();
}

function startDemo() {
    if (demoRunning) return;
    
    demoRunning = true;
    const visualization = document.getElementById('demoVisualization');
    
    // Reset progress bars
    resetDemoProgress();
    
    // Start detection phase
    setTimeout(() => {
        animateProgress('detectionProgress', 100, 1200);
        document.getElementById('detectionTime').textContent = '1.2s';
        
        // Start analysis phase
        setTimeout(() => {
            animateProgress('analysisProgress', 100, 800);
            document.getElementById('confidenceLevel').textContent = '99.7%';
            
            // Start suppression phase
            setTimeout(() => {
                animateProgress('suppressionProgress', 100, 1000);
                document.getElementById('damageLevel').textContent = 'Minimal';
                
                // Demo complete
                setTimeout(() => {
                    demoRunning = false;
                    showDemoComplete();
                }, 500);
            }, 800);
        }, 1200);
    }, 500);
}

function animateProgress(elementId, targetWidth, duration) {
    const element = document.getElementById(elementId);
    const startWidth = 0;
    const increment = (targetWidth - startWidth) / (duration / 16);
    let currentWidth = startWidth;
    
    const animate = () => {
        if (currentWidth < targetWidth) {
            currentWidth += increment;
            element.style.width = Math.min(currentWidth, targetWidth) + '%';
            requestAnimationFrame(animate);
        } else {
            element.style.width = targetWidth + '%';
        }
    };
    
    animate();
}

function resetDemoProgress() {
    document.getElementById('detectionProgress').style.width = '0%';
    document.getElementById('analysisProgress').style.width = '0%';
    document.getElementById('suppressionProgress').style.width = '0%';
    
    document.getElementById('detectionTime').textContent = '--';
    document.getElementById('confidenceLevel').textContent = '--';
    document.getElementById('damageLevel').textContent = '--';
}

function showDemoComplete() {
    const visualization = document.getElementById('demoVisualization');
    visualization.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center text-white">
            <div class="text-center">
                <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h4 class="text-xl font-bold mb-2">Demo Complete!</h4>
                <p class="text-gray-300">Fire detected and suppressed in 3.2 seconds with minimal damage</p>
                <button onclick="resetDemo()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Run Again
                </button>
            </div>
        </div>
    `;
}

function resetDemo() {
    const visualization = document.getElementById('demoVisualization');
    visualization.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center text-white">
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1"></path>
                    </svg>
                </div>
                <h4 class="text-xl font-bold mb-2">Click "Start Demo" to Begin</h4>
                <p class="text-gray-300">Interactive visualization will show real-time fire detection and suppression process</p>
            </div>
        </div>
    `;
    resetDemoProgress();
}

function updateDemoVisualization() {
    // Update visualization based on selected scenario
    const scenarios = {
        datacenter: {
            title: 'Data Center Environment',
            description: 'High-density server racks with precision cooling systems'
        },
        telecom: {
            title: 'Telecom Facility',
            description: 'Communication switching equipment with backup power systems'
        },
        industrial: {
            title: 'Industrial Plant',
            description: 'Manufacturing equipment with various fire risk factors'
        }
    };
    
    const scenario = scenarios[currentScenario];
    // Update any scenario-specific content
}

// ROI Calculator
function initializeROI() {
    // ROI calculator is initialized when user clicks "Calculate ROI"
}

function calculateROI() {
    const facilitySize = parseInt(document.getElementById('facilitySize').value) || 10000;
    const equipmentValue = parseInt(document.getElementById('equipmentValue').value) || 2000000;
    const downtimeCost = parseInt(document.getElementById('downtimeCost').value) || 350000;
    const currentCost = parseInt(document.getElementById('currentCost').value) || 75000;
    
    // Calculate system cost (estimated)
    const systemCost = Math.max(50000, facilitySize * 3); // $3 per sq ft minimum $50K
    const annualSavings = currentCost * 0.4 + (downtimeCost * 0.1); // 40% reduction in protection costs + 10% of downtime risk
    const paybackMonths = Math.ceil(systemCost / (annualSavings / 12));
    const fiveYearROI = Math.round(((annualSavings * 5 - systemCost) / systemCost) * 100);
    const totalSavings = annualSavings * 5 - systemCost;
    
    // Update display
    document.getElementById('initialInvestment').textContent = '$' + systemCost.toLocaleString();
    document.getElementById('annualSavings').textContent = '$' + Math.round(annualSavings).toLocaleString();
    document.getElementById('paybackPeriod').textContent = paybackMonths;
    document.getElementById('fiveYearROI').textContent = fiveYearROI + '%';
    document.getElementById('totalSavings').textContent = '$' + Math.round(totalSavings).toLocaleString();
    
    // Update chart
    updateROIChart(systemCost, annualSavings);
}

function updateROIChart(initialCost, annualSavings) {
    const roiChartElement = document.getElementById('roiChart');
    if (!roiChartElement) return;
    
    const roiChart = echarts.init(roiChartElement);
    
    const years = ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    const currentSystem = [0, -75000, -150000, -225000, -300000, -375000];
    const nexgenSystem = [-initialCost, -initialCost + annualSavings, -initialCost + annualSavings * 2, 
                         -initialCost + annualSavings * 3, -initialCost + annualSavings * 4, 
                         -initialCost + annualSavings * 5];
    
    const roiOption = {
        title: {
            text: 'Cost Comparison',
            textStyle: {
                color: '#2C3E50',
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let result = params[0].name + '<br/>';
                params.forEach(param => {
                    result += param.seriesName + ': $' + Math.abs(param.value).toLocaleString() + '<br/>';
                });
                return result;
            }
        },
        legend: {
            data: ['Current System', 'NexGenFireSafety']
        },
        xAxis: {
            type: 'category',
            data: years
        },
        yAxis: {
            type: 'value',
            name: 'Cumulative Cost ($)'
        },
        series: [
            {
                name: 'Current System',
                type: 'line',
                data: currentSystem,
                lineStyle: {
                    color: '#ef4444',
                    width: 3
                }
            },
            {
                name: 'NexGenFireSafety',
                type: 'line',
                data: nexgenSystem,
                lineStyle: {
                    color: '#10b981',
                    width: 3
                }
            }
        ]
    };
    
    roiChart.setOption(roiOption);
}

// Form Handling
function initializeForms() {
    // Demo request form
    const demoForm = document.querySelector('#demoModal form');
    if (demoForm) {
        demoForm.addEventListener('submit', handleDemoSubmission);
    }
    
    // Contact form
    const contactForms = document.querySelectorAll('section#contact form');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleContactSubmission);
    });
}

function openDemoForm() {
    document.getElementById('demoModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDemoForm() {
    document.getElementById('demoModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function openPitchDeckForm() {
    document.getElementById('pitchDeckModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePitchDeckForm() {
    document.getElementById('pitchDeckModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function downloadPitchDeck(event) {
    event.preventDefault();
    
    // Simulate download process
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Preparing Download...';
    button.disabled = true;
    
    setTimeout(() => {
        // Show success message
        alert('Thank you! The pitch deck has been sent to your email address.');
        closePitchDeckForm();
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

function handleDemoSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    
    // Simulate form submission
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your demo request! We will contact you within 24 hours to schedule your personalized demonstration.');
        closeDemoForm();
        event.target.reset();
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleContactSubmission(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        event.target.reset();
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Navigation
function initializeNavigation() {
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
    
    // Update active navigation state
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-yellow-300');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-yellow-300');
        }
    });
}

// Use Cases Tabs
function initializeUseCasesTabs() {
    const tabs = document.querySelectorAll('.usecase-tab');
    const panels = document.querySelectorAll('.usecase-panel');
    if (!tabs.length || !panels.length) return;

    const activate = (targetId) => {
        panels.forEach(p => {
            if (p.id === targetId) {
                p.classList.remove('hidden');
            } else {
                p.classList.add('hidden');
            }
        });
        tabs.forEach(t => {
            const isActive = t.getAttribute('data-target') === targetId;
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive) {
                t.classList.add('btn-primary','text-white');
                t.classList.remove('glass-effect');
            } else {
                t.classList.remove('btn-primary');
                t.classList.add('glass-effect');
            }
        });
    };

    // Click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            activate(target);
            // Update hash for deep linking
            if (history.pushState) {
                const url = new URL(window.location);
                url.hash = target;
                history.pushState(null, '', url);
            } else {
                window.location.hash = target;
            }
        });
    });

    // Deep link support via hash
    const initialHash = (window.location.hash || '').replace('#','');
    const defaultPanel = initialHash && document.getElementById(initialHash) ? initialHash : panels[0].id;
    activate(defaultPanel);
}

// Mobile Menu
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = menuToggle.contains(event.target) || mobileMenu.contains(event.target);
        if (!isClickInsideNav && mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// Utility Functions
function scrollToROI() {
    const roiSection = document.getElementById('roi-calculator');
    if (roiSection) {
        roiSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log('Page loaded in ' + Math.round(loadTime) + 'ms');
});

// Export functions for global access
window.NexGenFireSafety = {
    selectScenario,
    startDemo,
    calculateROI,
    openDemoForm,
    closeDemoForm,
    openPitchDeckForm,
    closePitchDeckForm,
    downloadPitchDeck,
    scrollToROI,
    initializeMobileMenu
};