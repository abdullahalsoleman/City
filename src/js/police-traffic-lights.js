// AI-Driven Police Traffic Lights JavaScript
class PoliceTrafficLights {
    constructor() {
        this.trafficLights = [
            { 
                id: 1, 
                name: 'Main St & Central Ave - Northbound', 
                phase: 'red', 
                timer: 45, 
                vehicles: 23, 
                queueLength: Math.ceil(23/3), // Initialize queue length based on 3 lanes
                priority: 'normal',
                lastPhaseChange: Date.now(),
                minGreenTime: 15,
                maxGreenTime: 60,
                trafficDensity: 'medium',
                lanes: 3
            },
            { 
                id: 2, 
                name: 'Main St & Central Ave - Southbound', 
                phase: 'green', 
                timer: 12, 
                vehicles: 15, 
                queueLength: Math.ceil(15/3), // Initialize queue length based on 3 lanes
                priority: 'normal',
                lastPhaseChange: Date.now(),
                minGreenTime: 15,
                maxGreenTime: 60,
                trafficDensity: 'low',
                lanes: 3
            },
            { 
                id: 3, 
                name: 'Main St & Central Ave - Eastbound', 
                phase: 'yellow', 
                timer: 3, 
                vehicles: 31, 
                queueLength: Math.ceil(31/3), // Initialize queue length based on 3 lanes
                priority: 'normal',
                lastPhaseChange: Date.now(),
                minGreenTime: 20,
                maxGreenTime: 70,
                trafficDensity: 'high',
                lanes: 3
            },
            { 
                id: 4, 
                name: 'Main St & Central Ave - Westbound', 
                phase: 'red', 
                timer: 67, 
                vehicles: 19, 
                queueLength: Math.ceil(19/3), // Initialize queue length based on 3 lanes
                priority: 'normal',
                lastPhaseChange: Date.now(),
                minGreenTime: 15,
                maxGreenTime: 60,
                trafficDensity: 'medium',
                lanes: 3
            }
        ];
        
        this.aiConfig = {
            // AI parameters for traffic optimization
            queueThreshold: 10,        // Cars in queue to trigger priority
            vehicleDensityThreshold: 25, // Vehicles to consider high density
            emergencyOverride: false,   // Emergency vehicle detection
            adaptiveMode: true,         // Enable AI adaptive timing
            optimizationInterval: 5000  // AI decision interval (5 seconds)
        };
        
        this.init();
    }

    init() {
        this.startDataUpdates();
        this.startAIOptimization();
        this.updateTrafficLights();
    }

    // AI-driven traffic analysis and optimization
    analyzeTrafficConditions(light) {
        let analysis = {
            congestionLevel: 'low',
            recommendedAction: 'maintain',
            urgencyScore: 0,
            reasoning: []
        };

        // Calculate congestion level based on multiple factors
        let congestionScore = 0;
        
        // Queue length factor (40% weight)
        if (light.queueLength > 15) {
            congestionScore += 40;
            analysis.reasoning.push(`High queue: ${light.queueLength} cars`);
        } else if (light.queueLength > 8) {
            congestionScore += 20;
            analysis.reasoning.push(`Medium queue: ${light.queueLength} cars`);
        }

        // Time since last phase change factor (10% weight)
        const timeSinceChange = (Date.now() - light.lastPhaseChange) / 1000;
        if (timeSinceChange > 120) { // More than 2 minutes
            congestionScore += 10;
            analysis.reasoning.push(`Long phase duration: ${Math.round(timeSinceChange)}s`);
        }

        // Determine congestion level and actions
        if (congestionScore >= 60) {
            analysis.congestionLevel = 'critical';
            analysis.urgencyScore = 9;
            analysis.recommendedAction = 'immediate_green';
        } else if (congestionScore >= 40) {
            analysis.congestionLevel = 'high';
            analysis.urgencyScore = 7;
            analysis.recommendedAction = 'prioritize_green';
        } else if (congestionScore >= 20) {
            analysis.congestionLevel = 'medium';
            analysis.urgencyScore = 4;
            analysis.recommendedAction = 'extend_green';
        } else {
            analysis.congestionLevel = 'low';
            analysis.urgencyScore = 1;
            analysis.recommendedAction = 'maintain';
        }

        return analysis;
    }

    // Calculate optimal timing based on traffic conditions
    calculateOptimalTiming(light, analysis) {
        // Base timing calculations based on number of vehicles
        let optimalTime;

        switch (light.phase) {
            case 'green':
                // Calculate green time based on vehicle count
                // More vehicles = longer green time to clear traffic
                optimalTime = Math.min(60, Math.max(15, light.vehicles * 1.5));
                break;

            case 'yellow':
                // Yellow light is always fixed at 2 seconds
                optimalTime = 2;
                break;

            case 'red':
                // Calculate red time inversely based on vehicle count
                // More vehicles = shorter red time to reduce congestion
                if (light.vehicles <= 10) {
                    optimalTime = 45; // Light traffic
                } else if (light.vehicles <= 20) {
                    optimalTime = 35; // Moderate traffic
                } else if (light.vehicles <= 30) {
                    optimalTime = 25; // Heavy traffic
                } else {
                    optimalTime = 20; // Very heavy traffic
                }
                break;

            default:
                optimalTime = 30;
        }

        return Math.round(optimalTime);
    }

    // Helper method to get opposing traffic pressure
    getOpposingTrafficPressure(lightId) {
        // Find opposing intersection (assuming pairs: 1-3 and 2-4)
        const opposingId = (lightId <= 2) ? lightId + 2 : lightId - 2;
        const opposingLight = this.trafficLights.find(l => l.id === opposingId);
        
        if (!opposingLight) return 50; // Default to medium pressure if not found

        const maxVehicles = opposingLight.lanes * 25;
        const trafficDensity = (opposingLight.vehicles / maxVehicles) * 100;
        const maxQueueLength = Math.ceil(maxVehicles / opposingLight.lanes);
        const queueDensity = (opposingLight.queueLength / maxQueueLength) * 100;

        return (trafficDensity * 0.6) + (queueDensity * 0.4);
    }

    // Enhanced rush hour detection
    isRushHour() {
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        
        // Morning rush: 7:00-9:30
        const isMorningRush = (hour === 7 || hour === 8 || (hour === 9 && minute <= 30));
        
        // Evening rush: 16:00-18:30 (4:00-6:30 PM)
        const isEveningRush = (hour === 16 || hour === 17 || (hour === 18 && minute <= 30));
        
        return isMorningRush || isEveningRush;
    }

    // Get average congestion of other intersections
    getAverageOtherCongestion(excludeId) {
        const otherLights = this.trafficLights.filter(light => light.id !== excludeId);
        const totalCongestion = otherLights.reduce((sum, light) => {
            return sum + this.analyzeTrafficConditions(light).urgencyScore;
        }, 0);
        return totalCongestion / otherLights.length;
    }

    // AI optimization engine
    startAIOptimization() {
        setInterval(() => {
            if (!this.aiConfig.adaptiveMode) return;

            this.trafficLights.forEach(light => {
                const analysis = this.analyzeTrafficConditions(light);
                const optimalTime = this.calculateOptimalTiming(light, analysis);
                
                // Apply AI recommendations
                if (analysis.recommendedAction === 'immediate_green' && light.phase === 'red') {
                    if (light.timer > 10) {
                        light.timer = Math.min(light.timer, 10);
                        this.logAIDecision(light, 'Reduced red time due to critical congestion', analysis);
                    }
                } else if (analysis.recommendedAction === 'prioritize_green' && light.phase === 'red') {
                    if (light.timer > 20) {
                        light.timer = Math.min(light.timer, 20);
                        this.logAIDecision(light, 'Prioritized green phase due to high congestion', analysis);
                    }
                } else if (analysis.recommendedAction === 'extend_green' && light.phase === 'green') {
                    if (light.timer < optimalTime - 10) {
                        light.timer = Math.min(optimalTime, light.timer + 15);
                        this.logAIDecision(light, 'Extended green time due to traffic demand', analysis);
                    }
                }

                // Update traffic density classification
                light.trafficDensity = analysis.congestionLevel;
            });
        }, this.aiConfig.optimizationInterval);
    }

    // Log AI decisions for transparency
    logAIDecision(light, action, analysis) {
        console.log(`🤖 AI Decision for ${light.name}:`, {
            action: action,
            congestionLevel: analysis.congestionLevel,
            urgencyScore: analysis.urgencyScore,
            reasoning: analysis.reasoning,
            newTimer: light.timer
        });
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
            const queueElement = document.getElementById(`queue-${light.id}`);
            
            if (vehiclesElement) vehiclesElement.textContent = light.vehicles;
            if (queueElement) queueElement.textContent = `${light.queueLength} cars`;

            // Update light display with congestion-based styling
            const intersection = document.querySelector(`[data-intersection="${this.getIntersectionId(light.id)}"]`);
            if (intersection) {
                const lights = intersection.querySelectorAll('.light');
                lights.forEach(l => l.classList.remove('active'));
                
                const activeLight = intersection.querySelector(`.light.${light.phase}`);
                if (activeLight) {
                    activeLight.classList.add('active');
                }

                // Add congestion indicator
                intersection.className = intersection.className.replace(/congestion-\w+/g, '');
                intersection.classList.add(`congestion-${light.trafficDensity}`);
            }
        });
    }

    getIntersectionId(lightId) {
        const ids = ['north-main', 'south-main', 'east-ave', 'west-blvd'];
        return ids[lightId - 1];
    }

    simulateRealisticTrafficData() {
        this.trafficLights.forEach(light => {
            // Update timer
            light.timer--;
            if (light.timer <= 0) {
                this.changePhaseIntelligently(light);
            }

            // Track time since last vehicle update
            if (!light.lastVehicleUpdate) {
                light.lastVehicleUpdate = Date.now();
            }

            const currentTime = Date.now();
            const timeSinceLastUpdate = currentTime - light.lastVehicleUpdate;

            // Calculate maximum queue capacity
            const maxVehicles = 75; // Maximum total vehicles allowed

            // Implement simple 1-2-3 vehicle changes
            if (light.phase === 'green') {
                // Process vehicles every second during green
                if (timeSinceLastUpdate >= 1000) { // Every 1 second
                    // Random number of vehicles leaving (1, 2, or 3)
                    const vehiclesLeaving = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
                    light.vehicles = Math.max(0, light.vehicles - vehiclesLeaving);

                    // Check for new arrivals every 2 seconds
                    const secondsSinceLastUpdate = timeSinceLastUpdate / 1000;
                    if (secondsSinceLastUpdate >= 2) {
                        // Random number of new arrivals (1, 2, or 3)
                        const newArrivals = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
                        light.vehicles = Math.min(maxVehicles, light.vehicles + newArrivals);
                    }

                    // Update queue length
                    light.queueLength = Math.ceil(light.vehicles / 3); // 3 lanes
                    light.lastVehicleUpdate = currentTime;

                    // Log significant changes
                    console.log(`🚦 ${light.name} (Green): -${vehiclesLeaving} left, Queue: ${light.queueLength}`);
                }
            } else if (light.phase === 'red') {
                // Accumulate vehicles every 2 seconds during red
                if (timeSinceLastUpdate >= 2000) { // Every 2 seconds
                    // Random number of new arrivals (1, 2, or 3)
                    const newArrivals = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
                    light.vehicles = Math.min(maxVehicles, light.vehicles + newArrivals);
                    
                    // Update queue length
                    light.queueLength = Math.ceil(light.vehicles / 3); // 3 lanes
                    light.lastVehicleUpdate = currentTime;

                    // Log changes
                    console.log(`🚦 ${light.name} (Red): +${newArrivals} arrived, Queue: ${light.queueLength}`);
                }
            } else if (light.phase === 'yellow') {
                // Yellow phase - minimal changes during 2-second transition
                if (timeSinceLastUpdate >= 1000) {
                    // Some vehicles might complete their passage (1 vehicle only)
                    if (light.vehicles > 0 && Math.random() < 0.3) { // 30% chance
                        const passingVehicles = 1; // Just 1 vehicle might pass
                        light.vehicles = Math.max(0, light.vehicles - passingVehicles);
                        light.queueLength = Math.ceil(light.vehicles / 3); // 3 lanes
                    }
                    light.lastVehicleUpdate = currentTime;
                }
            }

            // Ensure values stay within bounds
            light.vehicles = Math.max(0, Math.min(maxVehicles, light.vehicles));
            light.queueLength = Math.ceil(light.vehicles / 3); // 3 lanes
        });
    }

    // Apply realistic traffic patterns based on time and location
    applyTrafficPatterns(light) {
        const hour = new Date().getHours();
        
        // Morning rush hour (7-9 AM) - more traffic on main roads
        if (hour >= 7 && hour <= 9) {
            if (light.name.includes('Main')) {
                // Main roads get more traffic during morning rush
                if (Math.random() < 0.2) {
                    light.vehicles = Math.min(50, light.vehicles + 1);
                    if (light.phase !== 'green') {
                        light.queueLength = Math.min(25, light.queueLength + 1);
                    }
                }
            }
        }
        
        // Evening rush hour (5-7 PM) - distributed traffic
        else if (hour >= 17 && hour <= 19) {
            if (Math.random() < 0.15) {
                light.vehicles = Math.min(50, light.vehicles + 1);
                if (light.phase !== 'green') {
                    light.queueLength = Math.min(25, light.queueLength + 1);
                }
            }
        }
        
        // Late night (11 PM - 5 AM) - very light traffic
        else if (hour >= 23 || hour <= 5) {
            // Reduce traffic accumulation during late night
            if (Math.random() < 0.1 && light.vehicles > 0) {
                light.vehicles = Math.max(0, light.vehicles - 1);
                light.queueLength = Math.max(0, light.queueLength - 1);
            }
        }
    }

    // Enhanced phase change with more realistic transition effects
    changePhaseIntelligently(light) {
        const phases = ['red', 'green', 'yellow'];
        const currentIndex = phases.indexOf(light.phase);
        const nextIndex = (currentIndex + 1) % phases.length;
        
        const previousPhase = light.phase;
        light.phase = phases[nextIndex];
        light.lastPhaseChange = Date.now();
        
        // Apply immediate effects of phase change
        if (previousPhase === 'red' && light.phase === 'green') {
            // Just turned green - vehicles start moving immediately
            this.logAIDecision(light, `🟢 GREEN: Traffic starts moving (${light.queueLength} cars in queue)`, 
                this.analyzeTrafficConditions(light));
        } else if (previousPhase === 'green' && light.phase === 'yellow') {
            // Just turned yellow - some vehicles rush through
            this.logAIDecision(light, `🟡 YELLOW: Transition phase (${light.vehicles} vehicles present)`, 
                this.analyzeTrafficConditions(light));
        } else if (previousPhase === 'yellow' && light.phase === 'red') {
            // Just turned red - traffic starts accumulating
            this.logAIDecision(light, `🔴 RED: Traffic stops (Queue will grow from ${light.queueLength})`, 
                this.analyzeTrafficConditions(light));
        }
        
        // Calculate intelligent timing based on traffic conditions
        const analysis = this.analyzeTrafficConditions(light);
        light.timer = this.calculateOptimalTiming(light, analysis);
    }

    startDataUpdates() {
        // Update traffic data every second
        setInterval(() => {
            this.simulateRealisticTrafficData();
            this.updateTrafficLights();
        }, 1000);

        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('🚦 AI Traffic Control: 30-second optimization cycle complete');
            this.trafficLights.forEach(light => {
                const analysis = this.analyzeTrafficConditions(light);
                console.log(`${light.name}: ${analysis.congestionLevel} congestion (Score: ${analysis.urgencyScore})`);
            });
        }, 30000);
    }
}

// Initialize AI-driven police traffic lights
document.addEventListener('DOMContentLoaded', () => {
    new PoliceTrafficLights();
});