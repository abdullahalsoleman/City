// Police Infrastructure JavaScript
class PoliceInfrastructure {
    constructor() {
        this.sensorData = {
            roadCondition: { quality: 92, grip: 88, status: 'good' },
            crackDetection: { severity: 'Minor', location: 'East Ave', status: 'warning' },
            waterLevel: { drainage: 'Clear', floodRisk: 'Low', status: 'normal' },
            trafficFlow: { avgSpeed: 45, congestion: 'Low', status: 'normal' }
        };
        
        this.init();
    }

    init() {
        this.updateSensorReadings();
        this.startDataUpdates();
    }

    updateSensorReadings() {
        // Update road condition sensor
        const roadCard = document.querySelector('.sensor-card');
        if (roadCard) {
            const qualityReading = roadCard.querySelector('.reading-value');
            if (qualityReading) {
                qualityReading.textContent = `${this.sensorData.roadCondition.quality}%`;
            }
        }
        
        console.log('Police Infrastructure: Sensor data updated');
    }

    simulateSensorData() {
        // Simulate sensor data changes
        if (Math.random() < 0.1) {
            this.sensorData.roadCondition.quality += (Math.random() - 0.5) * 4;
            this.sensorData.roadCondition.quality = Math.max(70, Math.min(100, this.sensorData.roadCondition.quality));
            this.sensorData.roadCondition.quality = Math.round(this.sensorData.roadCondition.quality);
            
            this.sensorData.roadCondition.grip += (Math.random() - 0.5) * 3;
            this.sensorData.roadCondition.grip = Math.max(60, Math.min(95, this.sensorData.roadCondition.grip));
            this.sensorData.roadCondition.grip = Math.round(this.sensorData.roadCondition.grip);
        }
        
        // Update traffic flow data
        if (Math.random() < 0.15) {
            this.sensorData.trafficFlow.avgSpeed += (Math.random() - 0.5) * 10;
            this.sensorData.trafficFlow.avgSpeed = Math.max(20, Math.min(70, this.sensorData.trafficFlow.avgSpeed));
            this.sensorData.trafficFlow.avgSpeed = Math.round(this.sensorData.trafficFlow.avgSpeed);
        }
    }

    startDataUpdates() {
        // Update sensor data every 5 seconds
        setInterval(() => {
            this.simulateSensorData();
            this.updateSensorReadings();
        }, 5000);

        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Police Infrastructure: 30-second data refresh');
        }, 30000);
    }
}

// Initialize police infrastructure
document.addEventListener('DOMContentLoaded', () => {
    new PoliceInfrastructure();
});