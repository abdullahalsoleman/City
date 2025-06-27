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
        this.createAlertSound();
    }

    createAlertSound() {
        // Create a simple beep sound using Web Audio API
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