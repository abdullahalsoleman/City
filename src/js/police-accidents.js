// Police Accidents JavaScript
class PoliceAccidents {
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
            
            // Continue simulating accidents every 45-90 seconds
            const scheduleNextSimulation = () => {
                const nextSimulationTime = 45000 + Math.random() * 45000; // 45-90 seconds
                setTimeout(() => {
                    // Only simulate if there are no unresolved accidents
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
            'Main Street & Oak Avenue',
            'Highway 101 Southbound',
            'Downtown Business District',
            'School Zone - Maple Elementary',
            'Shopping Center Parking Lot',
            'Industrial District - Factory Road',
            'Residential Area - Pine Street',
            'City Center - Traffic Circle',
            'Bridge Overpass - Route 66',
            'Hospital Emergency Access'
        ];
        
        const descriptions = [
            'Multi-vehicle collision blocking traffic lanes',
            'Vehicle rollover with potential injuries',
            'Pedestrian accident at crosswalk',
            'Head-on collision between two vehicles',
            'Vehicle vs bicycle accident',
            'Single vehicle collision with barriers',
            'Rear-end collision with multiple vehicles',
            'Vehicle struck utility pole',
            'Debris on roadway causing accidents',
            'Emergency vehicle collision'
        ];
        
        const priorities = ['high', 'medium', 'low'];
        const priorityWeights = [0.4, 0.4, 0.2]; // 40% high, 40% medium, 20% low
        
        // Weighted random selection for priority
        const randomPriority = Math.random();
        let selectedPriority;
        if (randomPriority < priorityWeights[0]) {
            selectedPriority = priorities[0]; // high
        } else if (randomPriority < priorityWeights[0] + priorityWeights[1]) {
            selectedPriority = priorities[1]; // medium
        } else {
            selectedPriority = priorities[2]; // low
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
            window.audioManager.startContinuousAlert(newAccident, 'police');
        }
        
        console.log('AUTO-SIMULATED: New traffic accident:', newAccident);
    }

    generateInitialAccidents() {
        this.accidents = [
            {
                id: 1,
                location: 'North Main & 1st St',
                description: 'Two-vehicle collision blocking northbound lane',
                status: 'unresolved',
                priority: 'high',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            {
                id: 2,
                location: 'West Blvd & 4th St',
                description: 'Vehicle breakdown causing minor delays',
                status: 'in_progress',
                priority: 'medium',
                time: new Date(Date.now() - 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
                    <button class="btn btn-warning" onclick="policeAccidentsApp.markAccidentInProgress(${accident.id})" 
                            data-lang-key="mark_in_progress" ${accident.status === 'in_progress' ? 'disabled' : ''}>
                        Mark In Progress
                    </button>
                    <button class="btn btn-success" onclick="policeAccidentsApp.markAccidentResolved(${accident.id})" 
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
            
            // Reset countdown display
            const countdownTimer = document.getElementById('countdownTimer');
            if (countdownTimer) {
                countdownTimer.textContent = 'Standby...';
                countdownTimer.style.color = '#2ed573';
                countdownTimer.style.fontWeight = 'normal';
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
            window.audioManager.startContinuousAlert(accident, 'police');
        } else {
            // Fallback to original alert system if audioManager is not available
            if (this.alertAudio) {
                this.alertAudio.currentTime = 0;
                this.alertAudio.play().catch(e => console.log('Audio play failed:', e));
            }
            
            const text = `Traffic accident reported at ${accident.location}. ${accident.description}. Priority: ${accident.priority}.`;
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
        // This method is kept for compatibility but auto-simulation handles new accidents now
        console.log('Manual accident checking disabled - using auto-simulation system');
    }

    startDataUpdates() {
        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('Police Accidents: 30-second data refresh');
        }, 30000);
    }
}
// Initialize police accidents
let policeAccidentsApp;
document.addEventListener('DOMContentLoaded', () => {
    policeAccidentsApp = new PoliceAccidents();
});
