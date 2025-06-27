// Fire Road Condition JavaScript
class FireRoadCondition {
    constructor() {
        this.riskAssessment = [
            { district: 'North', risk: 'low', vegetation: 'Minimal', weather: 'Moderate', access: 'clear' },
            { district: 'South', risk: 'high', vegetation: 'Dense', weather: 'Hot/Dry', access: 'blocked' },
            { district: 'East', risk: 'medium', vegetation: 'Moderate', weather: 'Windy', access: 'clear' }
        ];

        this.structures = [
            { name: 'Bridge - Main St', status: 'good', loadCapacity: 95, lastInspection: '2' },
            { name: 'Tunnel - East Ave', status: 'warning', ventilation: 87, drainage: 'Partial Block' },
            { name: 'Overpass - West Blvd', status: 'good', stability: 98, clearance: 'clear' }
        ];
        
        this.init();
    }

    init() {
        this.startDataUpdates();
    }

    simulateRiskData() {
        this.riskAssessment.forEach(area => {
            if (Math.random() < 0.05) {
                const risks = ['low', 'medium', 'high'];
                const currentIndex = risks.indexOf(area.risk);
                const change = Math.floor(Math.random() * 3) - 1;
                const newIndex = Math.max(0, Math.min(2, currentIndex + change));
                area.risk = risks[newIndex];
            }
        });
    }

    simulateStructuralData() {
        this.structures.forEach(structure => {
            if (structure.loadCapacity && Math.random() < 0.1) {
                structure.loadCapacity += (Math.random() - 0.5) * 3;
                structure.loadCapacity = Math.max(70, Math.min(100, structure.loadCapacity));
                structure.loadCapacity = Math.round(structure.loadCapacity);
            }
            
            if (structure.stability && Math.random() < 0.08) {
                structure.stability += (Math.random() - 0.5) * 2;
                structure.stability = Math.max(85, Math.min(100, structure.stability));
                structure.stability = Math.round(structure.stability);
            }
        });
    }

    startDataUpdates() {
        // Update risk and structural data every 15 seconds
        setInterval(() => {
            this.simulateRiskData();
            this.simulateStructuralData();
            console.log('Fire Road Condition: Risk assessment updated');
        }, 15000);
        
        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Fire Road Condition: 30-second data refresh');
        }, 30000);
    }
}

// Initialize fire road condition
document.addEventListener('DOMContentLoaded', () => {
    new FireRoadCondition();
});
