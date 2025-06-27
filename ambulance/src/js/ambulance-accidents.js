// Ambulance Accident Management System
class AmbulanceAccidentManagement {
    constructor() {
        this.medicalCalls = new Map();
        this.audioEnabled = true;
        this.speechEnabled = true;
        
        this.initializeMedicalCalls();
        this.setupEventListeners();
        this.startMonitoring();
    }
    
    initializeMedicalCalls() {
        const callData = [
            {
                id: 'AMB-001',
                type: 'Cardiac Emergency',
                location: 'Senior Center - 123 Oak Street',
                description: '75-year-old male, chest pain, difficulty breathing. CPR in progress.',
                status: 'unresolved',
                priority: 'critical',
                reportedTime: '14:52',
                eta: 4
            }
        ];
        
        callData.forEach(data => {
            this.medicalCalls.set(data.id, data);
        });
    }
    
    setupEventListeners() {
        // Setup would include audio controls if needed
    }
    
    startMonitoring() {
        // Simulate new medical emergencies
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.simulateNewMedicalCall();
            }
        }, 20000);
    }
    
    simulateNewMedicalCall() {
        const newCalls = [
            {
                id: `AMB-${Date.now()}`,
                type: 'Stroke Alert',
                location: 'Residential - 789 Pine Street',
                description: '68-year-old female, sudden speech difficulty, facial drooping.',
                status: 'unresolved',
                priority: 'critical',
                reportedTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                eta: 6
            },
            {
                id: `AMB-${Date.now()}`,
                type: 'Traffic Accident Injury',
                location: 'Main & 2nd Street Intersection',
                description: 'Motor vehicle accident, one patient with suspected broken arm.',
                status: 'unresolved',
                priority: 'medium',
                reportedTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                eta: 8
            },
            {
                id: `AMB-${Date.now()}`,
                type: 'Respiratory Emergency',
                location: 'Shopping Mall - 456 Commerce Ave',
                description: 'Adult male, severe asthma attack, difficulty breathing.',
                status: 'unresolved',
                priority: 'high',
                reportedTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                eta: 5
            }
        ];
        
        const newCall = newCalls[Math.floor(Math.random() * newCalls.length)];
        this.medicalCalls.set(newCall.id, newCall);
        
        this.addMedicalCallToDOM(newCall);
        this.playAlert(newCall);
    }
    
    addMedicalCallToDOM(medicalCall) {
        const callsList = document.getElementById('ambulance-accidents-list');
        if (!callsList) return;
        
        const callElement = document.createElement('div');
        callElement.className = 'accident-card unresolved new-accident';
        callElement.setAttribute('data-status', medicalCall.status);
        callElement.setAttribute('data-id', medicalCall.id);
        
        const priorityClass = medicalCall.priority === 'critical' ? 'urgent' : '';
        
        callElement.innerHTML = `
            <div class="accident-header">
                <div class="accident-title">
                    <h3 class="text-heading-03" data-en="${medicalCall.type}" data-ar="${this.translateCallType(medicalCall.type)}">${medicalCall.type}</h3>
                    <div class="status-badge unresolved" data-en="Priority ${this.getPriorityNumber(medicalCall.priority)}" data-ar="أولوية ${this.getPriorityNumber(medicalCall.priority)}">Priority ${this.getPriorityNumber(medicalCall.priority)}</div>
                    <div class="new-badge" data-en="NEW" data-ar="جديد">NEW</div>
                </div>
                <div class="accident-time">
                    <span class="reported-time" data-en="Reported: ${medicalCall.reportedTime}" data-ar="مبلغ عنه: ${medicalCall.reportedTime}">Reported: ${medicalCall.reportedTime}</span>
                    <span class="duration" data-en="Duration: Just now" data-ar="المدة: الآن">Duration: Just now</span>
                </div>
            </div>
            <div class="accident-details">
                <div class="location-info">
                    <span class="location-icon">📍</span>
                    <span class="location-text" data-en="${medicalCall.location}" data-ar="${medicalCall.location}">${medicalCall.location}</span>
                </div>
                <div class="description">
                    <p data-en="${medicalCall.description}" data-ar="${this.translateDescription(medicalCall.description)}">${medicalCall.description}</p>
                </div>
                <div class="severity-indicators">
                    <div class="severity ${medicalCall.priority}">
                        <span class="severity-label" data-en="Priority:" data-ar="الأولوية:">Priority:</span>
                        <span class="severity-value" data-en="${medicalCall.priority}" data-ar="${this.translatePriority(medicalCall.priority)}">${medicalCall.priority}</span>
                    </div>
                    <div class="eta">
                        <span class="eta-label" data-en="ETA:" data-ar="الوقت المتوقع للوصول:">ETA:</span>
                        <span class="eta-value" data-en="${medicalCall.eta} minutes" data-ar="${medicalCall.eta} دقائق">${medicalCall.eta} minutes</span>
                    </div>
                </div>
            </div>
            <div class="accident-actions">
                <button class="cds-button cds-button--primary ${priorityClass}" onclick="updateAmbulanceStatus('${medicalCall.id}', 'dispatched')" data-en="🚨 Dispatch Unit" data-ar="🚨 إرسال وحدة">
                    🚨 Dispatch Unit
                </button>
            </div>
        `;
        
        callsList.insertBefore(callElement, callsList.firstChild);
        
        // Update translations if system is available
        if (window.translationSystem) {
            window.translationSystem.updateTranslatableElements();
        }
    }
    
    playAlert(medicalCall) {
        if (!this.audioEnabled) return;
        
        // Play alert sound
        const alertSound = document.getElementById('ambulance-alert-sound');
        if (alertSound) {
            alertSound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Text-to-speech announcement
        if (this.speechEnabled && window.translationSystem) {
            const enMessage = `New medical emergency: ${medicalCall.type} at ${medicalCall.location}. Priority ${this.getPriorityNumber(medicalCall.priority)}. ${medicalCall.description}`;
            const arMessage = `طوارئ طبية جديدة: ${this.translateCallType(medicalCall.type)} في ${medicalCall.location}. أولوية ${this.getPriorityNumber(medicalCall.priority)}. ${this.translateDescription(medicalCall.description)}`;
            
            setTimeout(() => {
                window.translationSystem.speak(enMessage, arMessage);
            }, 1000);
        }
    }
    
    getPriorityNumber(priority) {
        const priorities = {
            'critical': '1',
            'high': '2',
            'medium': '3',
            'low': '4'
        };
        return priorities[priority] || '3';
    }
    
    translateCallType(type) {
        const translations = {
            'Cardiac Emergency': 'طوارئ قلبية',
            'Stroke Alert': 'تنبيه سكتة دماغية',
            'Traffic Accident Injury': 'إصابة حادث مروري',
            'Respiratory Emergency': 'طوارئ تنفسية'
        };
        return translations[type] || type;
    }
    
    translateDescription(desc) {
        // Simple translation - in real app would use proper translation service
        const translations = {
            '75-year-old male, chest pain, difficulty breathing. CPR in progress.': 'ذكر 75 سنة، ألم في الصدر، صعوبة في التنفس. الإنعاش القلبي الرئوي قيد التقدم.',
            '68-year-old female, sudden speech difficulty, facial drooping.': 'أنثى 68 سنة، صعوبة مفاجئة في الكلام، تدلي الوجه.',
            'Motor vehicle accident, one patient with suspected broken arm.': 'حادث سيارة، مريض واحد يشتبه في كسر في الذراع.',
            'Adult male, severe asthma attack, difficulty breathing.': 'ذكر بالغ، نوبة ربو شديدة، صعوبة في التنفس.'
        };
        return translations[desc] || desc;
    }
    
    translatePriority(priority) {
        const translations = {
            'critical': 'حرج',
            'high': 'عالي',
            'medium': 'متوسط',
            'low': 'منخفض'
        };
        return translations[priority] || priority;
    }
}

// Global function for button actions
function updateAmbulanceStatus(callId, newStatus) {
    console.log(`Updating ambulance call ${callId} to status: ${newStatus}`);
    
    const callCard = document.querySelector(`[data-id="${callId}"]`);
    if (callCard) {
        const statusBadge = callCard.querySelector('.status-badge');
        const actionButton = callCard.querySelector('.cds-button--primary');
        
        if (statusBadge && actionButton) {
            if (newStatus === 'dispatched') {
                statusBadge.textContent = window.translationSystem?.currentLang === 'ar' ? 'في الطريق' : 'En Route';
                statusBadge.className = 'status-badge in-progress';
                actionButton.textContent = window.translationSystem?.currentLang === 'ar' ? 'تحديث الحالة' : 'Update Status';
                
                // Stop audio alerts for this call
                const alertSound = document.getElementById('ambulance-alert-sound');
                if (alertSound) {
                    alertSound.pause();
                    alertSound.currentTime = 0;
                }
                
                // Stop speech synthesis
                speechSynthesis.cancel();
            }
        }
        
        // Remove new badge
        const newBadge = callCard.querySelector('.new-badge');
        if (newBadge) {
            newBadge.remove();
        }
        
        callCard.setAttribute('data-status', newStatus);
        callCard.className = `accident-card ${newStatus}`;
    }
}

// Initialize ambulance accident management
document.addEventListener('DOMContentLoaded', function() {
    const management = new AmbulanceAccidentManagement();
});