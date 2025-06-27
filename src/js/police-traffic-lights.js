// Police Traffic Lights JavaScript
class PoliceTrafficLights {
    constructor() {
        this.trafficLights = [
            { id: 1, name: 'North Main & 1st St', phase: 'red', timer: 45, vehicles: 23, waitTime: 2.3, queueLength: 8 },
            { id: 2, name: 'South Main & 2nd St', phase: 'green', timer: 12, vehicles: 15, waitTime: 1.8, queueLength: 5 },
            { id: 3, name: 'East Ave & 3rd St', phase: 'yellow', timer: 3, vehicles: 31, waitTime: 3.1, queueLength: 12 },
            { id: 4, name: 'West Blvd & 4th St', phase: 'red', timer: 67, vehicles: 19, waitTime: 2.1, queueLength: 7 }
        ];
        
        this.init();
    }

    init() {
        this.startDataUpdates();
        this.updateTrafficLights();
    }

    updateTrafficLights() {
        this.trafficLights.forEach((light, index) => {
            // Update timer display
            const timerElement = document.getElementById(`timer-${light.id}`);
            if (timerElement) {
                timerElement.textContent = `${light.timer}s`;
            }

            // Update vehicle stats
            const vehiclesElement = document.getElementById(`vehicles-${light.id}`);
            const waitElement = document.getElementById(`wait-${light.id}`);
            const queueElement = document.getElementById(`queue-${light.id}`);
            
            if (vehiclesElement) vehiclesElement.textContent = light.vehicles;
            if (waitElement) waitElement.textContent = `${light.waitTime}min`;
            if (queueElement) queueElement.textContent = `${light.queueLength} cars`;

            // Update light display
            const intersection = document.querySelector(`[data-intersection="${this.getIntersectionId(light.id)}"]`);
            if (intersection) {
                const lights = intersection.querySelectorAll('.light');
                lights.forEach(l => l.classList.remove('active'));
                
                const activeLight = intersection.querySelector(`.light.${light.phase}`);
                if (activeLight) {
                    activeLight.classList.add('active');
                }
            }
        });
    }

    getIntersectionId(lightId) {
        const ids = ['north-main', 'south-main', 'east-ave', 'west-blvd'];
        return ids[lightId - 1];
    }

    simulateTrafficData() {
        this.trafficLights.forEach(light => {
            // Update timer
            light.timer--;
            if (light.timer <= 0) {
                this.changePhase(light);
            }

            // Simulate vehicle count changes
            if (Math.random() < 0.3) {
                light.vehicles += Math.floor(Math.random() * 6) - 3;
                light.vehicles = Math.max(0, Math.min(50, light.vehicles));
            }

            // Simulate wait time and queue changes
            if (Math.random() < 0.2) {
                light.waitTime += (Math.random() - 0.5) * 1;
                light.waitTime = Math.max(0.5, Math.min(8, light.waitTime));
                light.waitTime = Math.round(light.waitTime * 10) / 10;
                
                light.queueLength += Math.floor(Math.random() * 4) - 2;
                light.queueLength = Math.max(0, Math.min(25, light.queueLength));
            }
        });
    }

    changePhase(light) {
        const phases = ['red', 'green', 'yellow'];
        const currentIndex = phases.indexOf(light.phase);
        const nextIndex = (currentIndex + 1) % phases.length;
        
        light.phase = phases[nextIndex];
        
        // Set appropriate timer for each phase
        switch (light.phase) {
            case 'red':
                light.timer = 30 + Math.floor(Math.random() * 40);
                break;
            case 'green':
                light.timer = 20 + Math.floor(Math.random() * 25);
                break;
            case 'yellow':
                light.timer = 3;
                break;
        }
    }

    startDataUpdates() {
        // Update traffic data every second
        setInterval(() => {
            this.simulateTrafficData();
            this.updateTrafficLights();
        }, 1000);

        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Police Traffic Lights: 30-second data refresh');
        }, 30000);
    }
}

// Initialize police traffic lights
document.addEventListener('DOMContentLoaded', () => {
    new PoliceTrafficLights();
});