// Analytics Dashboard JavaScript
class AnalyticsDashboard {
    constructor() {
        this.stats = {
            intersections: 24,
            avgWait: 2.3,
            flowEfficiency: 87,
            accidents: 3,
            breakdowns: 1,
            roadwork: 2,
            avgResponse: 4.2
        };
        
        this.init();
    }

    init() {
        this.updateStats();
        this.createTrafficChart();
        this.updateActivityFeed();
        this.startDataUpdates();
    }

    updateStats() {
        // Update system overview stats
        const intersectionsElement = document.querySelector('[data-stat="intersections"]');
        if (intersectionsElement) {
            intersectionsElement.textContent = this.stats.intersections;
        }
        
        const avgWaitElement = document.querySelector('[data-stat="avgWait"]');
        if (avgWaitElement) {
            avgWaitElement.textContent = `${this.stats.avgWait}min`;
        }
        
        const efficiencyElement = document.querySelector('[data-stat="flowEfficiency"]');
        if (efficiencyElement) {
            efficiencyElement.textContent = `${this.stats.flowEfficiency}%`;
        }
        
        // Simulate minor changes to stats
        if (Math.random() < 0.1) {
            this.stats.avgWait += (Math.random() - 0.5) * 0.5;
            this.stats.avgWait = Math.max(1.0, Math.min(5.0, this.stats.avgWait));
            this.stats.avgWait = Math.round(this.stats.avgWait * 10) / 10;
        }
        
        if (Math.random() < 0.08) {
            this.stats.flowEfficiency += (Math.random() - 0.5) * 5;
            this.stats.flowEfficiency = Math.max(70, Math.min(100, this.stats.flowEfficiency));
            this.stats.flowEfficiency = Math.round(this.stats.flowEfficiency);
        }
    }

    createTrafficChart() {
        const canvas = document.getElementById('trafficCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = [65, 59, 80, 81, 56, 55, 40];
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simple line chart simulation
        ctx.strokeStyle = '#4F46E5';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * canvas.width;
            const y = canvas.height - (data[i] / 100) * canvas.height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#4F46E5';
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * canvas.width;
            const y = canvas.height - (data[i] / 100) * canvas.height;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    updateActivityFeed() {
        const activities = [
            'new_incident_detected',
            'traffic_light_updated',
            'emergency_unit_dispatched',
            'road_closure_reported',
            'ai_optimization_complete'
        ];
        
        if (Math.random() < 0.1) {
            const activityFeed = document.getElementById('activityFeed');
            if (activityFeed) {
                const newActivity = document.createElement('div');
                newActivity.className = 'activity-item';
                
                const activityKey = activities[Math.floor(Math.random() * activities.length)];
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                newActivity.innerHTML = `
                    <span class="activity-time">${currentTime}</span>
                    <span class="activity-text" data-lang-key="${activityKey}">${activityKey.replace(/_/g, ' ')}</span>
                `;
                
                activityFeed.insertBefore(newActivity, activityFeed.firstChild);
                
                // Keep only latest 5 activities
                while (activityFeed.children.length > 5) {
                    activityFeed.removeChild(activityFeed.lastChild);
                }
                
                // Update language for new elements
                if (window.languageManager) {
                    window.languageManager.updateTexts(window.languageManager.getCurrentLanguage());
                }
            }
        }
    }

    startDataUpdates() {
        // Update analytics every 10 seconds
        setInterval(() => {
            this.updateStats();
            this.updateActivityFeed();
        }, 10000);
        
        // Redraw chart every 30 seconds
        setInterval(() => {
            this.createTrafficChart();
            console.log('Analytics: 30-second data refresh');
        }, 30000);
    }
}

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsDashboard();
});