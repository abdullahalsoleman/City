// Main shared functionality
class SharedFunctionality {
    constructor() {
        this.init();
    }

    init() {
        this.updateTime();
        this.startTimeUpdates();
    }

    updateTime() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        }
    }

    startTimeUpdates() {
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }
}

// Traffic Light Simulation
class TrafficLightSimulator {
    constructor() {
        this.phases = ['red', 'green', 'yellow'];
        this.currentPhases = {};
        this.timers = {};
    }

    initializeLight(lightId, initialPhase = 'red', initialTimer = 30) {
        this.currentPhases[lightId] = initialPhase;
        this.timers[lightId] = initialTimer;
    }

    updateLight(lightId) {
        if (!this.timers[lightId]) return;
        
        this.timers[lightId]--;
        
        if (this.timers[lightId] <= 0) {
            this.changePhase(lightId);
        }
    }

    changePhase(lightId) {
        const currentPhase = this.currentPhases[lightId];
        let nextPhase;
        let duration;
        
        switch (currentPhase) {
            case 'red':
                nextPhase = 'green';
                duration = 25 + Math.floor(Math.random() * 15);
                break;
            case 'green':
                nextPhase = 'yellow';
                duration = 3;
                break;
            case 'yellow':
                nextPhase = 'red';
                duration = 30 + Math.floor(Math.random() * 30);
                break;
            default:
                nextPhase = 'red';
                duration = 30;
        }
        
        this.currentPhases[lightId] = nextPhase;
        this.timers[lightId] = duration;
    }

    getCurrentPhase(lightId) {
        return this.currentPhases[lightId];
    }

    getTimer(lightId) {
        return this.timers[lightId];
    }
}

// Audio Manager
class AudioManager {
    constructor() {
        this.alertSound = null;
        this.speechSynthesis = window.speechSynthesis;
        this.isAlertActive = false;
        this.currentAlertInterval = null;
        this.currentSoundInterval = null;
        this.currentAccident = null;
        this.createAlertSound();
    }

    createAlertSound() {
        // Create a more prominent alert sound using Web Audio API
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContextClass = AudioContext || webkitAudioContext;
            this.audioContext = new AudioContextClass();
        }
    }

    playAlert() {
        if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.2);
        }
    }

    playLoudAlert() {
        if (this.audioContext) {
            // Create a louder, more attention-grabbing alert sound
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Two-tone alert sound (like emergency sirens)
            oscillator1.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator2.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            
            // Make it louder
            gainNode.gain.setValueAtTime(0.6, this.audioContext.currentTime);
            
            oscillator1.start();
            oscillator2.start();
            oscillator1.stop(this.audioContext.currentTime + 0.5);
            oscillator2.stop(this.audioContext.currentTime + 0.5);
        }
    }

    startContinuousAlert(accident, serviceType = 'emergency') {
        if (this.isAlertActive) {
            this.stopContinuousAlert();
        }

        this.isAlertActive = true;
        this.currentAccident = accident;

        // Create the alert message based on service type
        let alertMessage;
        switch (serviceType) {
            case 'police':
                alertMessage = `ATTENTION: Traffic accident reported at ${accident.location}. ${accident.description}. Priority: ${accident.priority}. Police response required.`;
                break;
            case 'ambulance':
                alertMessage = `ATTENTION: Medical emergency at ${accident.location}. ${accident.description}. Priority: ${accident.priority}. Ambulance response required.`;
                break;
            case 'fire':
                alertMessage = `ATTENTION: Fire emergency at ${accident.location}. ${accident.description}. Priority: ${accident.priority}. Fire department response required.`;
                break;
            default:
                alertMessage = `ATTENTION: Emergency reported at ${accident.location}. ${accident.description}. Priority: ${accident.priority}.`;
        }

        // Play initial alert sound and speech
        this.playLoudAlert();
        setTimeout(() => {
            this.speak(alertMessage, { rate: 0.9, volume: 1.0, pitch: 1.1 });
        }, 1000);

        // Set up continuous sound alerts (every 3 seconds)
        this.currentSoundInterval = setInterval(() => {
            if (this.isAlertActive) {
                this.playLoudAlert();
            }
        }, 3000);

        // Set up repeated speech alerts (every 15 seconds)
        this.currentAlertInterval = setInterval(() => {
            if (this.isAlertActive) {
                this.speak(alertMessage, { rate: 0.9, volume: 1.0, pitch: 1.1 });
            }
        }, 15000);

        console.log(`Continuous alert started for ${serviceType} accident:`, accident);
    }

    stopContinuousAlert() {
        this.isAlertActive = false;
        this.currentAccident = null;

        // Clear intervals
        if (this.currentAlertInterval) {
            clearInterval(this.currentAlertInterval);
            this.currentAlertInterval = null;
        }

        if (this.currentSoundInterval) {
            clearInterval(this.currentSoundInterval);
            this.currentSoundInterval = null;
        }

        // Stop speech synthesis
        this.stopSpeech();
        
        console.log('Continuous alert stopped');
    }

    speak(text, options = {}) {
        if (this.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = options.rate || 0.8;
            utterance.volume = options.volume || 0.8;
            utterance.pitch = options.pitch || 1;
            
            this.speechSynthesis.speak(utterance);
        }
    }

    stopSpeech() {
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
    }
}

// Navigation Helper
function navigateToService(service) {
    const routes = {
        police: 'police-traffic-lights.html',
        ambulance: 'ambulance-road-health.html', 
        fire: 'fire-road-condition.html',
        ai: 'index.html',
        main: 'index.html'
    };
    
    if (routes[service]) {
        window.location.href = routes[service];
    }
}

// Data Formatter
class DataFormatter {
    static formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }

    static formatDistance(meters) {
        if (meters < 1000) {
            return `${meters}m`;
        } else {
            return `${(meters / 1000).toFixed(1)}km`;
        }
    }

    static formatPercentage(value, decimals = 0) {
        return `${value.toFixed(decimals)}%`;
    }

    static formatCount(count) {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            return `${(count / 1000).toFixed(1)}K`;
        } else {
            return `${(count / 1000000).toFixed(1)}M`;
        }
    }
}

// Initialize shared functionality
const sharedApp = new SharedFunctionality();
const trafficSimulator = new TrafficLightSimulator();
const audioManager = new AudioManager();
if (typeof window !== 'undefined') {
    window.navigateToService = navigateToService;
    window.trafficSimulator = trafficSimulator;
    window.audioManager = audioManager;
    window.DataFormatter = DataFormatter;

    // Utility function to generate random data
    window.generateRandomData = function(min, max, decimals = 0) {
        const value = Math.random() * (max - min) + min;
        return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
    };

    // Utility function to simulate sensor data
    window.simulateSensorData = function() {
        return {
            temperature: generateRandomData(15, 35, 1),
            humidity: generateRandomData(30, 80, 1),
            pressure: generateRandomData(990, 1020, 1),
            windSpeed: generateRandomData(0, 25, 1),
            visibility: generateRandomData(5, 20, 1)
        };
    };
}

console.log('Main JavaScript loaded successfully');