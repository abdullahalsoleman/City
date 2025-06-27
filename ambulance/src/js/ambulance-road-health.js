// Ambulance Road Health Monitoring System
class AmbulanceRoadHealth {
    constructor() {
        this.routes = new Map();
        this.accessibilityItems = new Map();
        this.updateInterval = 30000; // 30 seconds
        
        this.initializeRoutes();
        this.initializeAccessibility();
        this.startMonitoring();
    }
    
    initializeRoutes() {
        const routeData = [
            {
                id: 'hospital-a',
                name: 'Hospital Route A',
                status: 'clear',
                estimatedTime: 8
            },
            {
                id: 'hospital-b',
                name: 'Hospital Route B',
                status: 'blocked',
                estimatedTime: null,
                blockageReason: 'Construction work'
            },
            {
                id: 'emergency-center',
                name: 'Emergency Center Route',
                status: 'slow',
                estimatedTime: 15
            }
        ];
        
        routeData.forEach(data => {
            this.routes.set(data.id, data);
        });
    }
    
    initializeAccessibility() {
        const accessData = [
            {
                id: 'hospital-access',
                title: 'Main Hospital Access',
                status: 'good',
                description: 'All lanes clear, ambulance priority lanes available'
            },
            {
                id: 'bridge-clearance',
                title: 'Bridge Clearance',
                status: 'warning',
                description: 'Height restriction may affect larger ambulances'
            }
        ];
        
        accessData.forEach(data => {
            this.accessibilityItems.set(data.id, data);
        });
    }
    
    startMonitoring() {
        setInterval(() => {
            this.updateRouteStatus();
            this.updateAccessibility();
        }, this.updateInterval);
    }
    
    updateRouteStatus() {
        this.routes.forEach((route, id) => {
            // Simulate route condition changes
            if (Math.random() > 0.8) {
                const statuses = ['clear', 'slow', 'blocked'];
                const oldStatus = route.status;
                route.status = statuses[Math.floor(Math.random() * statuses.length)];
                
                // Update estimated time based on status
                if (route.status === 'clear') {
                    route.estimatedTime = Math.floor(Math.random() * 5) + 6; // 6-10 min
                    route.blockageReason = null;
                } else if (route.status === 'slow') {
                    route.estimatedTime = Math.floor(Math.random() * 10) + 12; // 12-22 min
                    route.blockageReason = null;
                } else {
                    route.estimatedTime = null;
                    route.blockageReason = 'Traffic incident';
                }
                
                if (oldStatus !== route.status) {
                    this.updateRouteDisplay(route);
                }
            }
        });
    }
    
    updateRouteDisplay(route) {
        const routeCards = document.querySelectorAll('.route-card');
        routeCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.getAttribute('data-en') === route.name) {
                card.className = `route-card ${route.status}`;
                
                const statusElement = card.querySelector('.route-status');
                const timeElement = card.querySelector('.travel-time');
                
                if (statusElement) {
                    const enStatus = this.getStatusText(route.status);
                    const arStatus = this.translateStatus(route.status);
                    
                    statusElement.setAttribute('data-en', enStatus);
                    statusElement.setAttribute('data-ar', arStatus);
                    statusElement.textContent = window.translationSystem?.currentLang === 'ar' ? arStatus : enStatus;
                }
                
                if (timeElement) {
                    let enTime, arTime;
                    
                    if (route.estimatedTime) {
                        enTime = `Est. Time: ${route.estimatedTime} min`;
                        arTime = `الوقت المقدر: ${route.estimatedTime} دقيقة`;
                    } else {
                        enTime = route.blockageReason || 'Blocked';
                        arTime = this.translateBlockageReason(route.blockageReason) || 'مسدود';
                    }
                    
                    timeElement.setAttribute('data-en', enTime);
                    timeElement.setAttribute('data-ar', arTime);
                    timeElement.textContent = window.translationSystem?.currentLang === 'ar' ? arTime : enTime;
                }
            }
        });
    }
    
    updateAccessibility() {
        // Simulate accessibility changes
        if (Math.random() > 0.9) {
            this.accessibilityItems.forEach((item, id) => {
                const statuses = ['good', 'warning', 'critical'];
                item.status = statuses[Math.floor(Math.random() * statuses.length)];
                this.updateAccessibilityDisplay(item);
            });
        }
    }
    
    updateAccessibilityDisplay(item) {
        const accessItems = document.querySelectorAll('.access-item');
        accessItems.forEach(element => {
            const title = element.querySelector('h3');
            if (title && title.getAttribute('data-en') === item.title) {
                element.className = `access-item ${item.status}`;
                
                const icon = element.querySelector('.access-icon');
                if (icon) {
                    const icons = {
                        'good': '✅',
                        'warning': '⚠️',
                        'critical': '🚨'
                    };
                    icon.textContent = icons[item.status] || '✅';
                }
            }
        });
    }
    
    getStatusText(status) {
        const statusTexts = {
            'clear': 'Clear',
            'slow': 'Slow Traffic',
            'blocked': 'Blocked'
        };
        return statusTexts[status] || status;
    }
    
    translateStatus(status) {
        const translations = {
            'clear': 'واضح',
            'slow': 'حركة مرور بطيئة',
            'blocked': 'مسدود'
        };
        return translations[status] || status;
    }
    
    translateBlockageReason(reason) {
        const translations = {
            'Construction work': 'أعمال إنشائية',
            'Traffic incident': 'حادث مروري',
            'Road maintenance': 'صيانة الطريق'
        };
        return translations[reason] || reason;
    }
}

// Initialize ambulance road health monitoring
document.addEventListener('DOMContentLoaded', function() {
    const monitoring = new AmbulanceRoadHealth();
});