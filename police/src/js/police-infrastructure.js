// Police Infrastructure Health Monitoring System
class InfrastructureMonitoring {
    constructor() {
        this.sensors = new Map();
        this.cameras = new Map();
        this.updateInterval = 30000; // 30 seconds
        
        this.initializeSensors();
        this.initializeCameras();
        this.startMonitoring();
    }
    
    initializeSensors() {
        const sensorData = [
            {
                id: 'road-quality-main1st',
                type: 'Road Surface Quality',
                location: 'Main & 1st Street',
                status: 'normal',
                value: 'Good'
            },
            {
                id: 'cracks-oak2nd',
                type: 'Pavement Cracks',
                location: 'Oak & 2nd Street',
                status: 'warning',
                value: '3 detected'
            },
            {
                id: 'drainage-pine',
                type: 'Drainage Status',
                location: 'Pine Avenue',
                status: 'normal',
                value: 'Clear'
            },
            {
                id: 'flooding-low',
                type: 'Flooding Risk',
                location: 'Low Street Area',
                status: 'critical',
                value: 'High'
            }
        ];
        
        sensorData.forEach(data => {
            this.sensors.set(data.id, data);
        });
    }
    
    initializeCameras() {
        const cameraData = [
            {
                id: 'main-cam1',
                name: 'Main Street Cam 1',
                status: 'active',
                aiAnalysis: 'Road surface condition normal'
            },
            {
                id: 'oak-cam2',
                name: 'Oak Street Cam 2',
                status: 'warning',
                aiAnalysis: 'Crack detected in pavement'
            }
        ];
        
        cameraData.forEach(data => {
            this.cameras.set(data.id, data);
        });
    }
    
    startMonitoring() {
        // Update sensor readings every 30 seconds
        setInterval(() => {
            this.updateSensorReadings();
            this.updateCameraFeeds();
        }, this.updateInterval);
        
        // Initial update
        this.updateSensorReadings();
        this.updateCameraFeeds();
    }
    
    updateSensorReadings() {
        this.sensors.forEach((sensor, id) => {
            // Simulate sensor value changes
            if (sensor.type === 'Pavement Cracks' && Math.random() > 0.8) {
                const currentCount = parseInt(sensor.value);
                sensor.value = `${currentCount + 1} detected`;
                sensor.status = currentCount >= 5 ? 'critical' : 'warning';
            }
            
            if (sensor.type === 'Flooding Risk' && Math.random() > 0.7) {
                const risks = ['Low', 'Medium', 'High'];
                const statuses = ['normal', 'warning', 'critical'];
                const index = Math.floor(Math.random() * risks.length);
                sensor.value = risks[index];
                sensor.status = statuses[index];
            }
            
            this.updateSensorDisplay(sensor);
        });
    }
    
    updateSensorDisplay(sensor) {
        const sensorCards = document.querySelectorAll('.sensor-card');
        sensorCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.textContent.includes(sensor.type)) {
                const valueElement = card.querySelector('.sensor-value');
                if (valueElement) {
                    valueElement.textContent = sensor.value;
                }
                
                // Update card status class
                card.className = `sensor-card ${sensor.status}`;
            }
        });
    }
    
    updateCameraFeeds() {
        this.cameras.forEach((camera, id) => {
            // Simulate AI analysis updates
            if (Math.random() > 0.8) {
                const analyses = [
                    'Road surface condition normal',
                    'Minor debris detected',
                    'Crack detected in pavement',
                    'Standing water observed',
                    'Construction equipment present'
                ];
                
                camera.aiAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
                this.updateCameraDisplay(camera);
            }
        });
    }
    
    updateCameraDisplay(camera) {
        const cameraFeeds = document.querySelectorAll('.camera-feed');
        cameraFeeds.forEach(feed => {
            const header = feed.querySelector('.camera-header span');
            if (header && header.textContent.includes(camera.name)) {
                const aiOverlay = feed.querySelector('.ai-overlay');
                if (aiOverlay) {
                    const enText = `🧠 AI: ${camera.aiAnalysis}`;
                    const arText = `🧠 الذكي: ${this.translateAIAnalysis(camera.aiAnalysis)}`;
                    
                    aiOverlay.setAttribute('data-en', enText);
                    aiOverlay.setAttribute('data-ar', arText);
                    
                    // Update display based on current language
                    if (window.translationSystem) {
                        const currentText = window.translationSystem.currentLang === 'ar' ? arText : enText;
                        aiOverlay.textContent = currentText;
                    }
                }
            }
        });
    }
    
    translateAIAnalysis(text) {
        const translations = {
            'Road surface condition normal': 'حالة سطح الطريق طبيعية',
            'Minor debris detected': 'حطام طفيف مكتشف',
            'Crack detected in pavement': 'شق مكتشف في الرصيف',
            'Standing water observed': 'مياه راكدة ملاحظة',
            'Construction equipment present': 'معدات البناء موجودة'
        };
        
        return translations[text] || text;
    }
}

// Initialize infrastructure monitoring
document.addEventListener('DOMContentLoaded', function() {
    const monitoring = new InfrastructureMonitoring();
});
