
// Fire Department Accident Management System
class FireAccidentManagement {
    constructor() {
        this.accidents = new Map();
        this.audioEnabled = true;
        this.speechEnabled = true;
        
        this.initializeAccidents();
        this.setupEventListeners();
        this.startMonitoring();
    }
    
    initializeAccidents() {
        const accidentData = [
            {
                id: 'FIRE-001',
                type: 'Vehicle Fire',
                location: 'Highway 101 - Mile marker 15',
                description: 'Car engine fire, spreading to nearby grass area. Driver evacuated safely.',
                status: 'unresolved',
                severity: 'high',
                reportedTime: '14:45',
                fireRisk: 'spreading'
            }
        ];
        
        accidentData.forEach(data => {
            this.accidents.set(data.id, data);
        });
    }
    
    setupEventListeners() {
        // Audio toggle functionality would go here
        const muteButton = document.getElementById('mute-alerts');
        if (muteButton) {
            muteButton.addEventListener('click', () => {
                this.toggleAudio();
            });
        }
    }
    
    startMonitoring() {
        // Simulate new accidents
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.simulateNewAccident();
            }
        }, 15000);
    }
    
    simulateNewAccident() {
        const newAccidents = [
            {
                id: `FIRE-${Date.now()}`,
                type: 'Building Fire',
                location: 'Commercial Building - 456 Main St',
                description: 'Smoke reported from second floor, evacuation in progress.',
                status: 'unresolved',
                severity: 'critical',
                reportedTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                fireRisk: 'contained'
            },
            {
                id: `FIRE-${Date.now()}`,
                type: 'Grass Fire',
                location: 'Highway 101 - Mile marker 22',
                description: 'Wildfire spreading rapidly, multiple units requested.',
                status: 'unresolved',
                severity: 'critical',
                reportedTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                fireRisk: 'expanding'
            }
        ];
        
        const newAccident = newAccidents[Math.floor(Math.random() * newAccidents.length)];
        this.accidents.set(newAccident.id, newAccident);
        
        this.addAccidentToDOM(newAccident);
        this.playAlert(newAccident);
    }
    
    addAccidentToDOM(accident) {
        const accidentsList = document.getElementById('fire-accidents-list');
        if (!accidentsList) return;
        
        const accidentElement = document.createElement('div');
        accidentElement.className = 'accident-card unresolved new-accident';
        accidentElement.setAttribute('data-status', accident.status);
        accidentElement.setAttribute('data-id', accident.id);
        
        accidentElement.innerHTML = `
            <div class="accident-header">
                <div class="accident-title">
                    <h3 class="text-heading-03" data-en="${accident.type}" data-ar="${this.translateAccidentType(accident.type)}">${accident.type}</h3>
                    <div class="status-badge unresolved" data-en="Unresolved" data-ar="غير محلول">Unresolved</div>
                    <div class="new-badge" data-en="NEW" data-ar="جديد">NEW</div>
                </div>
                <div class="accident-time">
                    <span class="reported-time" data-en="Reported: ${accident.reportedTime}" data-ar="مبلغ عنه: ${accident.reportedTime}">Reported: ${accident.reportedTime}</span>
                    <span class="duration" data-en="Duration: Just now" data-ar="المدة: الآن">Duration: Just now</span>
                </div>
            </div>
            <div class="accident-details">
                <div class="location-info">
                    <span class="location-icon">📍</span>
                    <span class="location-text" data-en="${accident.location}" data-ar="${accident.location}">${accident.location}</span>
                </div>
                <div class="description">
                    <p data-en="${accident.description}" data-ar="${this.translateDescription(accident.description)}">${accident.description}</p>
                </div>
                <div class="severity-indicators">
                    <div class="severity ${accident.severity}">
                        <span class="severity-label" data-en="Severity:" data-ar="الخطورة:">Severity:</span>
                        <span class="severity-value" data-en="${accident.severity}" data-ar="${this.translateSeverity(accident.severity)}">${accident.severity}</span>
                    </div>
                    <div class="fire-risk">
                        <span class="fire-label" data-en="Fire Risk:" data-ar="خطر الحريق:">Fire Risk:</span>
                        <span class="fire-value" data-en="${accident.fireRisk}" data-ar="${this.translateFireRisk(accident.fireRisk)}">${accident.fireRisk}</span>
                    </div>
                </div>
            </div>
            <div class="accident-actions">
                <button class="cds-button cds-button--primary" onclick="updateFireAccidentStatus('${accident.id}', 'in-progress')" data-en="Deploy Fire Truck" data-ar="نشر سيارة الإطفاء">
                    Deploy Fire Truck
                </button>
            </div>
        `;
        
        accidentsList.insertBefore(accidentElement, accidentsList.firstChild);
        
        // Update translations if system is available
        if (window.translationSystem) {
            window.translationSystem.updateTranslatableElements();
        }
    }
    
    playAlert(accident) {
        if (!this.audioEnabled) return;
        
        // Play alert sound
        const alertSound = document.getElementById('fire-alert-sound');
        if (alertSound) {
            alertSound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Text-to-speech announcement
        if (this.speechEnabled && window.translationSystem) {
            const enMessage = `New fire emergency: ${accident.type} at ${accident.location}. ${accident.description}`;
            const arMessage = `طوارئ حريق جديدة: ${this.translateAccidentType(accident.type)} في ${accident.location}. ${this.translateDescription(accident.description)}`;
            
            setTimeout(() => {
                window.translationSystem.speak(enMessage, arMessage);
            }, 1000);
        }
    }
    
    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        const muteButton = document.getElementById('mute-alerts');
        if (muteButton) {
            const enText = this.audioEnabled ? '🔊 Mute Alerts' : '🔇 Unmute Alerts';
            const arText = this.audioEnabled ? '🔊 كتم التنبيهات' : '🔇 إلغاء كتم التنبيهات';
            
            muteButton.setAttribute('data-en', enText);
            muteButton.setAttribute('data-ar', arText);
            muteButton.textContent = window.translationSystem?.currentLang === 'ar' ? arText : enText;
        }
    }
    
    translateAccidentType(type) {
        const translations = {
            'Vehicle Fire': 'حريق مركبة',
            'Building Fire': 'حريق مبنى',
            'Grass Fire': 'حريق عشب'
        };
        return translations[type] || type;
    }
    
    translateDescription(desc) {
        // Simple translation - in real app would use proper translation service
        const translations = {
            'Car engine fire, spreading to nearby grass area. Driver evacuated safely.': 'حريق محرك السيارة، ينتشر إلى منطقة العشب المجاورة. تم إخلاء السائق بأمان.',
            'Smoke reported from second floor, evacuation in progress.': 'تم الإبلاغ عن دخان من الطابق الثاني، عملية الإخلاء قيد التقدم.',
            'Wildfire spreading rapidly, multiple units requested.': 'حريق الغابات ينتشر بسرعة، طُلبت وحدات متعددة.'
        };
        return translations[desc] || desc;
    }
    
    translateSeverity(severity) {
        const translations = {
            'high': 'عالي',
            'critical': 'حرج',
            'medium': 'متوسط',
            'low': 'منخفض'
        };
        return translations[severity] || severity;
    }
    
    translateFireRisk(risk) {
        const translations = {
            'spreading': 'منتشر',
            'contained': 'محتوى',
            'expanding': 'متوسع'
        };
        return translations[risk] || risk;
    }
}

// Global function for button actions
function updateFireAccidentStatus(accidentId, newStatus) {
    console.log(`Updating fire accident ${accidentId} to status: ${newStatus}`);
    
    const accidentCard = document.querySelector(`[data-id="${accidentId}"]`);
    if (accidentCard) {
        const statusBadge = accidentCard.querySelector('.status-badge');
        const actionButton = accidentCard.querySelector('.cds-button--primary');
        
        if (statusBadge && actionButton) {
            if (newStatus === 'in-progress') {
                statusBadge.textContent = window.translationSystem?.currentLang === 'ar' ? 'قيد التنفيذ' : 'In Progress';
                statusBadge.className = 'status-badge in-progress';
                actionButton.textContent = window.translationSystem?.currentLang === 'ar' ? 'تحديث الحالة' : 'Update Status';
                
                // Stop audio alerts for this accident
                const alertSound = document.getElementById('fire-alert-sound');
                if (alertSound) {
                    alertSound.pause();
                    alertSound.currentTime = 0;
                }
                
                // Stop speech synthesis
                speechSynthesis.cancel();
            }
        }
        
        // Remove new badge
        const newBadge = accidentCard.querySelector('.new-badge');
        if (newBadge) {
            newBadge.remove();
        }
        
        accidentCard.setAttribute('data-status', newStatus);
        accidentCard.className = `accident-card ${newStatus}`;
    }
}

// Initialize fire accident management
document.addEventListener('DOMContentLoaded', function() {
    const management = new FireAccidentManagement();
});