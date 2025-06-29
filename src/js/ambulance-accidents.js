// Ambulance Accidents JavaScript
class AmbulanceAccidents {
    constructor() {
        this.accidents = [];
        this.alertAudio = document.getElementById('alertSound');
        this.speechSynthesis = window.speechSynthesis;
        this.autoSimulationTimer = null;
        
        this.init();
    }

    init() {
        this.generateInitialAccidents();
        this.renderAccidents();
        this.startDataUpdates();
        this.checkForNewAccidents();
        this.startAutoSimulation();
    }



    startAutoSimulation() {
        // Start automatic simulation after 30 seconds
        this.autoSimulationTimer = setTimeout(() => {
            this.simulateNewAccident();
            
            // Continue simulating emergencies every 60-120 seconds
            const scheduleNextSimulation = () => {
                const nextSimulationTime = 60000 + Math.random() * 60000; // 60-120 seconds
                setTimeout(() => {
                    // Only simulate if there are no unresolved emergencies
                    const unresolvedAccidents = this.accidents.filter(acc => acc.status === 'unresolved');
                    if (unresolvedAccidents.length === 0) {
                        this.simulateNewAccident();
                    }
                    scheduleNextSimulation();
                }, nextSimulationTime);
            };
            
            scheduleNextSimulation();
        }, 30000); // 30 seconds initial delay
    }

    simulateNewAccident() {
        const locations = [
            'City General Hospital',
            'Downtown Medical Center',
            'Elderly Care Facility',
            'Public Park - Jogging Trail',
            'Office Building - 15th Floor',
            'Residential Home - Maple Street',
            'Shopping Mall - Food Court',
            'University Campus - Library',
            'Community Health Center',
            'Senior Living Complex'
        ];
        
        const descriptions = [
            'Cardiac arrest - CPR in progress',
            'Severe allergic reaction - anaphylaxis',
            'Fall with suspected head injury',
            'Respiratory distress - difficulty breathing',
            'Stroke symptoms - facial drooping',
            'Diabetic emergency - unconscious patient',
            'Severe chest pain - possible heart attack',
            'Seizure episode - patient unresponsive',
            'Drug overdose - critical condition',
            'Choking incident - airway obstruction'
        ];
        
        const priorities = ['high', 'medium'];
        const priorityWeights = [0.7, 0.3]; // 70% high, 30% medium - medical emergencies are typically urgent
        
        // Weighted random selection for priority
        const randomPriority = Math.random();
        let selectedPriority;
        if (randomPriority < priorityWeights[0]) {
            selectedPriority = priorities[0]; // high
        } else {
            selectedPriority = priorities[1]; // medium
        }
        
        const newAccident = {
            id: Date.now(),
            location: locations[Math.floor(Math.random() * locations.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            status: 'unresolved',
            priority: selectedPriority,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        this.accidents.unshift(newAccident);
        this.renderAccidents();
        
        // Start continuous alert for the new accident
        if (window.audioManager) {
            window.audioManager.startContinuousAlert(newAccident, 'ambulance');
        }
        
        console.log('AUTO-SIMULATED: New medical emergency:', newAccident);
    }

    generateInitialAccidents() {
        this.accidents = [
            {
                id: 1,
                location: 'Downtown Medical Center',
                description: 'Cardiac emergency - elderly patient',
                status: 'unresolved',
                priority: 'high',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            {
                id: 2,
                location: 'Shopping Mall Parking',
                description: 'Slip and fall injury',
                status: 'in_progress',
                priority: 'medium',
                time: new Date(Date.now() - 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ];
    }

    renderAccidents() {
        const accidentsList = document.getElementById('accidentsList');
        if (!accidentsList) return;

        accidentsList.innerHTML = '';
        
        this.accidents.forEach(accident => {
            const accidentCard = document.createElement('div');
            accidentCard.className = `accident-card`;
            accidentCard.setAttribute('data-status', accident.status);
            accidentCard.setAttribute('data-priority', accident.priority);
            
            accidentCard.innerHTML = `
                <div class="accident-header">
                    <div class="accident-priority ${accident.priority}">
                        <span data-lang-key="priority">Priority</span>: <span data-lang-key="${accident.priority}">${accident.priority}</span>
                    </div>
                    <div class="accident-status ${accident.status.replace('_', '-')}" data-lang-key="${accident.status}">${accident.status.replace('_', ' ')}</div>
                </div>
                <div class="accident-details">
                    <div class="accident-location">
                        <strong data-lang-key="location">Location</strong>: ${accident.location}
                    </div>
                    <div class="accident-description">
                        <strong data-lang-key="description">Description</strong>: 
                        <span>${accident.description}</span>
                    </div>
                    <div class="accident-time">
                        <strong>Time</strong>: ${accident.time}
                    </div>
                </div>
                <div class="accident-actions">
                    <button class="btn btn-warning" onclick="ambulanceAccidentsApp.markAccidentInProgress(${accident.id})" 
                            data-lang-key="mark_in_progress" ${accident.status === 'in_progress' ? 'disabled' : ''}>
                        Mark In Progress
                    </button>
                    <button class="btn btn-success" onclick="ambulanceAccidentsApp.markAccidentResolved(${accident.id})" 
                            data-lang-key="mark_resolved" ${accident.status === 'unresolved' ? 'disabled' : ''}>
                        Mark Resolved
                    </button>
                </div>
            `;
            
            accidentsList.appendChild(accidentCard);
        });
    }

    markAccidentInProgress(accidentId) {
        const accident = this.accidents.find(a => a.id === accidentId);
        if (accident) {
            accident.status = 'in_progress';
            this.renderAccidents();
            
            // Stop continuous alerts when status changes to "In Progress"
            if (window.audioManager) {
                window.audioManager.stopContinuousAlert();
            }
            
            // Update language if needed
            if (window.languageManager) {
                window.languageManager.updateTexts(window.languageManager.getCurrentLanguage());
            }
        }
    }

    markAccidentResolved(accidentId) {
        const accident = this.accidents.find(a => a.id === accidentId);
        if (accident) {
            accident.status = 'resolved';
            this.renderAccidents();
            
            // Stop continuous alerts if any are active
            if (window.audioManager) {
                window.audioManager.stopContinuousAlert();
            }
            
            // Update language if needed
            if (window.languageManager) {
                window.languageManager.updateTexts(window.languageManager.getCurrentLanguage());
            }
        }
    }

    playAlert(accident) {
        // Use the new continuous alert system instead of single alerts
        if (window.audioManager) {
            window.audioManager.startContinuousAlert(accident, 'ambulance');
        } else {
            // Fallback to original alert system if audioManager is not available
            if (this.alertAudio) {
                this.alertAudio.currentTime = 0;
                this.alertAudio.play().catch(e => console.log('Audio play failed:', e));
            }
            
            const text = `Medical emergency reported at ${accident.location}. ${accident.description}. Priority: ${accident.priority}.`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.volume = 0.8;
            
            if (this.speechSynthesis) {
                this.speechSynthesis.speak(utterance);
            }
        }
    }

    stopAlerts() {
        // Stop continuous alerts
        if (window.audioManager) {
            window.audioManager.stopContinuousAlert();
        }
        
        // Fallback cleanup
        if (this.alertAudio) {
            this.alertAudio.pause();
            this.alertAudio.currentTime = 0;
        }
        
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
    }

    checkForNewAccidents() {
        // This method is kept for compatibility but auto-simulation handles new emergencies now
        console.log('Manual emergency checking disabled - using auto-simulation system');
    }

    startDataUpdates() {
        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Ambulance Accidents: 30-second data refresh');
        }, 30000);
    }
}

// Initialize ambulance accidents
let ambulanceAccidentsApp;
document.addEventListener('DOMContentLoaded', () => {
    ambulanceAccidentsApp = new AmbulanceAccidents();
});

// Global functions for button clicks
window.markAccidentInProgress = (id) => {
    if (ambulanceAccidentsApp) ambulanceAccidentsApp.markAccidentInProgress(id);
};

window.markAccidentResolved = (id) => {
    if (ambulanceAccidentsApp) ambulanceAccidentsApp.markAccidentResolved(id);
};