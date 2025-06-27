// Fire Department Road Conditions Monitoring
class FireRoadConditions {
    constructor() {
        this.riskAreas = new Map();
        this.blockages = new Map();
        this.updateInterval = 30000; // 30 seconds
        
        this.initializeRiskAreas();
        this.initializeBlockages();
        this.startMonitoring();
    }
    
    initializeRiskAreas() {
        const riskData = [
            {
                id: 'downtown',
                name: 'Downtown Area',
                riskLevel: 'low',
                factors: 'Good access, clear routes'
            },
            {
                id: 'industrial',
                name: 'Industrial District',
                riskLevel: 'high',
                factors: 'Narrow access, blocked routes'
            }
        ];
        
        riskData.forEach(data => {
            this.riskAreas.set(data.id, data);
        });
    }
    
    initializeBlockages() {
        const blockageData = [
            {
                id: 'construction-main',
                type: 'Construction Blockage',
                description: 'Main Street blocked, fire truck access limited',
                status: 'critical'
            },
            {
                id: 'bridge-oak',
                type: 'Narrow Bridge',
                description: 'Oak Street bridge weight limit concerns',
                status: 'warning'
            }
        ];
        
        blockageData.forEach(data => {
            this.blockages.set(data.id, data);
        });
    }
    
    startMonitoring() {
        setInterval(() => {
            this.updateRiskAssessment();
            this.updateBlockages();
        }, this.updateInterval);
    }
    
    updateRiskAssessment() {
        this.riskAreas.forEach((area, id) => {
            // Simulate risk level changes
            if (Math.random() > 0.9) {
                const riskLevels = ['low', 'medium', 'high'];
                const currentIndex = riskLevels.indexOf(area.riskLevel);
                const newIndex = Math.max(0, Math.min(2, currentIndex + (Math.random() > 0.5 ? 1 : -1)));
                area.riskLevel = riskLevels[newIndex];
                
                this.updateRiskDisplay(area);
            }
        });
    }
    
    updateRiskDisplay(area) {
        const riskCards = document.querySelectorAll('.risk-card');
        riskCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.getAttribute('data-en') === area.name) {
                card.className = `risk-card ${area.riskLevel}`;
                
                const riskLevel = card.querySelector('.risk-level');
                if (riskLevel) {
                    const enText = `${area.riskLevel.charAt(0).toUpperCase() + area.riskLevel.slice(1)} Risk`;
                    const arText = this.translateRiskLevel(area.riskLevel);
                    
                    riskLevel.setAttribute('data-en', enText);
                    riskLevel.setAttribute('data-ar', arText);
                    
                    if (window.translationSystem) {
                        const currentText = window.translationSystem.currentLang === 'ar' ? arText : enText;
                        riskLevel.textContent = currentText;
                    }
                }
            }
        });
    }
    
    updateBlockages() {
        // Simulate blockage status changes
        if (Math.random() > 0.85) {
            this.blockages.forEach((blockage, id) => {
                const statuses = ['warning', 'critical', 'resolved'];
                blockage.status = statuses[Math.floor(Math.random() * statuses.length)];
                this.updateBlockageDisplay(blockage);
            });
        }
    }
    
    updateBlockageDisplay(blockage) {
        const blockageItems = document.querySelectorAll('.blockage-item');
        blockageItems.forEach(item => {
            const title = item.querySelector('h3');
            if (title && title.getAttribute('data-en') === blockage.type) {
                item.className = `blockage-item ${blockage.status}`;
            }
        });
    }
    
    translateRiskLevel(level) {
        const translations = {
            'low': 'خطر منخفض',
            'medium': 'خطر متوسط',
            'high': 'خطر عالي'
        };
        return translations[level] || level;
    }
}

// Initialize fire road conditions monitoring
document.addEventListener('DOMContentLoaded', function() {
    const monitoring = new FireRoadConditions();
});