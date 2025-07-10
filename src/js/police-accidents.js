// Police Accidents JavaScript
class PoliceAccidents {
    constructor() {
        this.accidents = [];
        this.alertAudio = document.getElementById('alertSound');
        this.speechSynthesis = window.speechSynthesis;
        this.autoSimulationTimer = null;
        
        // Initialize voices
        if (this.speechSynthesis) {
            // Load voices if they're not already loaded
            if (this.speechSynthesis.getVoices().length === 0) {
                this.speechSynthesis.addEventListener('voiceschanged', () => {
                    console.log('تم تحميل الأصوات');
                });
            }
        }
        
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
                    const unresolvedAccidents = this.accidents.filter(acc => acc.status === 'غير_محلول');
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
            'شارع الرئيسي وشارع البلوط',
            'الطريق السريع 101 جنوباً',
            'منطقة وسط المدينة التجارية',
            'المنطقة المدرسية - مدرسة الشجر الابتدائية',
            'موقف مركز التسوق',
            'المنطقة الصناعية - طريق المصنع',
            'المنطقة السكنية - شارع الصنوبر',
            'وسط المدينة - الدوار',
            'جسر العبور - الطريق 66',
            'مدخل الطوارئ للمستشفى'
        ];
        
        const descriptions = [
            'تصادم متعدد المركبات يعيق حركة المرور',
            'انقلاب مركبة مع احتمال وجود إصابات',
            'حادث مشاة عند معبر المشاة',
            'اصطدام مباشر بين مركبتين',
            'حادث بين مركبة ودراجة هوائية',
            'اصطدام مركبة واحدة بالحواجز',
            'اصطدام خلفي مع عدة مركبات',
            'مركبة اصطدمت بعمود كهرباء',
            'حطام على الطريق يسبب حوادث',
            'حادث مركبة طوارئ'
        ];
        
        const priorities = ['عالي', 'متوسط'];
        const priorityWeights = [0.7, 0.3]; // 70% عالي, 30% متوسط
        
        // Weighted random selection for priority
        const randomPriority = Math.random();
        let selectedPriority;
        if (randomPriority < priorityWeights[0]) {
            selectedPriority = priorities[0]; // عالي
        } else {
            selectedPriority = priorities[1]; // متوسط
        }
        
        const newAccident = {
            id: Date.now(),
            location: locations[Math.floor(Math.random() * locations.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            status: 'غير_محلول',
            priority: selectedPriority,
            time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
        
        this.accidents.unshift(newAccident);
        this.renderAccidents();
        
        // Start continuous alert for the new accident
        if (window.audioManager) {
            window.audioManager.startContinuousAlert(newAccident, 'police');
        } else {
            this.playAlert(newAccident);
        }
        
        console.log('محاكاة تلقائية: حادث مرور جديد:', newAccident);
    }

    generateInitialAccidents() {
        this.accidents = [
            {
                id: 1,
                location: 'شارع الشمال الرئيسي وشارع الأول',
                description: 'تصادم بين مركبتين يعيق المسار الشمالي',
                status: 'غير_محلول',
                priority: 'عالي',
                time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
            },
            {
                id: 2,
                location: 'شارع الغرب وشارع الرابع',
                description: 'عطل في مركبة يسبب تأخيرات بسيطة',
                status: 'قيد_المعالجة',
                priority: 'متوسط',
                time: new Date(Date.now() - 30 * 60000).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
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
                    <div class="accident-priority ${accident.priority === 'عالي' ? 'high' : 'medium'}">
                        <span>الأولوية</span>: <span>${accident.priority}</span>
                    </div>
                    <div class="accident-status ${accident.status.replace('_', '-')}">${accident.status.replace('_', ' ')}</div>
                </div>
                <div class="accident-details">
                    <div class="accident-location">
                        <strong>الموقع</strong>: ${accident.location}
                    </div>
                    <div class="accident-description">
                        <strong>الوصف</strong>: 
                        <span>${accident.description}</span>
                    </div>
                    <div class="accident-time">
                        <strong>الوقت</strong>: ${accident.time}
                    </div>
                </div>
                <div class="accident-actions">
                    <button class="btn btn-warning" onclick="policeAccidentsApp.markAccidentInProgress(${accident.id})" 
                            ${accident.status !== 'غير_محلول' ? 'disabled' : ''}>
                        تحديد قيد المعالجة
                    </button>
                    <button class="btn btn-success" onclick="policeAccidentsApp.markAccidentResolved(${accident.id})" 
                            ${accident.status !== 'قيد_المعالجة' ? 'disabled' : ''}>
                        تم الحل
                    </button>
                </div>
            `;
            
            accidentsList.appendChild(accidentCard);
        });
    }

    markAccidentInProgress(accidentId) {
        const accident = this.accidents.find(a => a.id === accidentId);
        if (accident) {
            accident.status = 'قيد_المعالجة';
            this.renderAccidents();
            
            // Stop continuous alerts when status changes to "In Progress"
            if (window.audioManager) {
                window.audioManager.stopContinuousAlert();
            }
            
            // Reset countdown display
            const countdownTimer = document.getElementById('countdownTimer');
            if (countdownTimer) {
                countdownTimer.textContent = 'في الانتظار...';
                countdownTimer.style.color = '#2ed573';
                countdownTimer.style.fontWeight = 'normal';
            }
        }
    }

    markAccidentResolved(accidentId) {
        const accident = this.accidents.find(a => a.id === accidentId);
        if (accident) {
            accident.status = 'تم_الحل';
            this.renderAccidents();
            
            // Stop continuous alerts if any are active
            if (window.audioManager) {
                window.audioManager.stopContinuousAlert();
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
                this.alertAudio.play().catch(e => console.log('فشل تشغيل الصوت:', e));
            }
            
            const text = `تم الإبلاغ عن حادث مرور في ${accident.location}. ${accident.description}. الأولوية: ${accident.priority}.`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.volume = 0.8;
            utterance.lang = 'ar-SA';
            
            // Try to find an Arabic voice
            const voices = this.speechSynthesis.getVoices();
            const arabicVoice = voices.find(voice => 
                voice.lang.toLowerCase().includes('ar') || 
                voice.name.toLowerCase().includes('arabic')
            );
            
            if (arabicVoice) {
                utterance.voice = arabicVoice;
            }
            
            if (this.speechSynthesis) {
                this.speechSynthesis.cancel(); // Cancel any ongoing speech
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
        console.log('تم تعطيل التحقق اليدوي من الحوادث - استخدام نظام المحاكاة التلقائي');
    }

    startDataUpdates() {
        // Major data refresh every 30 seconds
        setInterval(() => {
            console.log('حوادث الشرطة: تحديث البيانات كل 30 ثانية');
        }, 30000);
    }
}
// Initialize police accidents
let policeAccidentsApp;
document.addEventListener('DOMContentLoaded', () => {
    policeAccidentsApp = new PoliceAccidents();
});
