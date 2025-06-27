// Police Accidents JavaScript
class PoliceAccidents {
    constructor() {
        this.accidents = [];
        this.alertAudio = document.getElementById('alertSound');
        this.speechSynthesis = window.speechSynthesis;
        
        this.init();
    }

    init() {
        this.generateInitialAccidents();
        this.renderAccidents();
        this.startDataUpdates();
        this.checkForNewAccidents();
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
            this.stopAlerts();
            
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
            
            // Update language if needed
            if (window.languageManager) {
                window.languageManager.updateTexts(window.languageManager.getCurrentLanguage());
            }
        }
    }

    playAlert(accident) {
        // Play alert sound
        if (this.alertAudio) {
            this.alertAudio.currentTime = 0;
            this.alertAudio.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Text-to-speech
        const text = `Traffic accident reported at ${accident.location}. ${accident.description}. Priority: ${accident.priority}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.volume = 0.8;
        
        if (this.speechSynthesis) {
            this.speechSynthesis.speak(utterance);
        }
    }

    stopAlerts() {
        if (this.alertAudio) {
            this.alertAudio.pause();
            this.alertAudio.currentTime = 0;
        }
        
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
    }

    checkForNewAccidents() {
        // Simulate new accidents
        if (Math.random() < 0.01) { // 1% chance every update
            const locations = [
                'Downtown Intersection',
                'Highway On-ramp',
                'Shopping Center Parking',
                'School Zone',
                'Industrial District'
            ];
            
            const descriptions = [
                'Minor fender-bender causing delays',
                'Vehicle stalled in traffic lane',
                'Multi-vehicle collision',
                'Pedestrian incident reported',
                'Road debris blocking traffic'
            ];
            
            const newAccident = {
                id: Date.now(),
                location: locations[Math.floor(Math.random() * locations.length)],
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                status: 'unresolved',
                priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            this.accidents.unshift(newAccident);
            this.renderAccidents();
            
            // Play alert for new accident
            if (newAccident.status === 'unresolved') {
                this.playAlert(newAccident);
            }
        }
    }

    startDataUpdates() {
        // Check for new accidents every 15 seconds
        setInterval(() => {
            this.checkForNewAccidents();
        }, 15000);
        
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
