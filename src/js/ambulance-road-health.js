// Ambulance Road Health JavaScript  
class AmbulanceRoadHealth {
    constructor() {
        this.routes = [
            { id: 1, name: 'Route A - Hospital District', status: 'clear', responseTime: 4.2, traffic: 'Low', condition: 'good' },
            { id: 2, name: 'Route B - City Center', status: 'blocked', responseTime: 8.7, traffic: 'High', condition: 'poor' },
            { id: 3, name: 'Route C - Industrial Zone', status: 'clear', responseTime: 6.1, traffic: 'Medium', condition: 'fair' }
        ];

        this.units = [
            { id: 'AMB-01', status: 'available', location: 'Station North', crew: '2 Paramedics', equipment: 'Full ALS' },
            { id: 'AMB-02', status: 'deployed', location: 'En Route', eta: '3.2 min', priority: 'high' },
            { id: 'AMB-03', status: 'available', location: 'Station South', crew: '2 EMTs', equipment: 'BLS' }
        ];
        
        this.init();
    }

    init() {
        this.startDataUpdates();
    }

    simulateRouteData() {
        this.routes.forEach(route => {
            // Simulate response time changes
            if (Math.random() < 0.2) {
                const change = (Math.random() - 0.5) * 2;
                route.responseTime = Math.max(2, Math.min(15, route.responseTime + change));
                route.responseTime = Math.round(route.responseTime * 10) / 10;
            }
            
            // Simulate status changes
            if (Math.random() < 0.1) {
                route.status = route.status === 'clear' ? 'blocked' : 'clear';
            }
        });
    }

    simulateUnitData() {
        this.units.forEach(unit => {
            if (unit.status === 'deployed' && Math.random() < 0.1) {
                const etaChange = (Math.random() - 0.5) * 1;
                const currentEta = parseFloat(unit.eta);
                const newEta = Math.max(0.5, currentEta + etaChange);
                unit.eta = `${newEta.toFixed(1)} min`;
            }
        });
    }

    startDataUpdates() {
        // Update route and unit data every 10 seconds
        setInterval(() => {
            this.simulateRouteData();
            this.simulateUnitData();
            console.log('Ambulance Road Health: Route data updated');
        }, 10000);
        
        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Ambulance Road Health: 30-second data refresh');
        }, 30000);
    }
}

// Initialize ambulance road health
document.addEventListener('DOMContentLoaded', () => {
    new AmbulanceRoadHealth();
});
