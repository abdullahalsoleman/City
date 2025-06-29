// Fire Accidents JavaScript
class FireAccidents {
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
            
            // Continue simulating fire emergencies every 75-150 seconds
            const scheduleNextSimulation = () => {
                const nextSimulationTime = 75000 + Math.random() * 75000; // 75-150 seconds
                setTimeout(() => {
                    // Only simulate if there are no unresolved fire emergencies
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
            'Apartment Complex - Building A',
            'Industrial Warehouse District',
            'Downtown Office Tower',
            'Residential House - Oak Street',
            'Chemical Manufacturing Plant',
            'Shopping Mall - West Wing',
            'Forest Area - Pine Ridge',
            'School Building - Gymnasium',
            'Hospital Parking Garage',
            'Municipal Building - City Hall'
        ];
        
        const descriptions = [
            'Structure fire with heavy smoke and flames',
            'Electrical fire spreading rapidly',
            'Gas leak with potential explosion risk',
            'Kitchen fire spreading to adjacent rooms',
            'Chemical fire - hazardous materials involved',
            'Smoke detected in ventilation system',
            'Wildfire approaching residential area',
            'Vehicle fire in parking garage',
            'Propane tank explosion reported',
            'Electrical transformer fire'
        ];
        
        const priorities = ['high', 'medium'];
        const priorityWeights = [0.8, 0.2]; // 80% high, 20% medium - fire emergencies are typically high priority
        
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
            window.audioManager.startContinuousAlert(newAccident, 'fire');
        }
        
        console.log('AUTO-SIMULATED: New fire emergency:', newAccident);
    }

    generateInitialAccidents() {
        this.accidents = [
            {
                id: 1,
                location: 'Industrial Zone - Warehouse Fire',
                description: 'Large fire reported in warehouse, potential hazardous materials',
                status: 'unresolved',
                priority: 'high',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            {
                id: 2,
                location: 'Residential Area - Kitchen Fire',
                description: 'Small kitchen fire, smoke reported, potential for spread',
                status: 'in_progress',
                priority: 'medium',
                time: new Date(Date.now() - 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
                    <button class="btn btn-warning" onclick="fireAccidentsApp.markAccidentInProgress(${accident.id})" 
                            data-lang-key="mark_in_progress" ${accident.status === 'in_progress' ? 'disabled' : ''}>
                        Mark In Progress
                    </button>
                    <button class="btn btn-success" onclick="fireAccidentsApp.markAccidentResolved(${accident.id})" 
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
            window.audioManager.startContinuousAlert(accident, 'fire');
        } else {
            // Fallback to original alert system if audioManager is not available
            if (this.alertAudio) {
                this.alertAudio.currentTime = 0;
                this.alertAudio.play().catch(e => console.log('Audio play failed:', e));
            }
            
            const text = `Fire emergency reported at ${accident.location}. ${accident.description}. Priority: ${accident.priority}.`;
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
        // This method is kept for compatibility but auto-simulation handles new fire emergencies now
        console.log('Manual fire emergency checking disabled - using auto-simulation system');
    }

    startDataUpdates() {
        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Fire Accidents: 30-second data refresh');
        }, 30000);
    }
}

// Initialize fire accidents
let fireAccidentsApp;
document.addEventListener('DOMContentLoaded', () => {
    fireAccidentsApp = new FireAccidents();
});