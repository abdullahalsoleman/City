// Translation System for Emergency Services
class TranslationSystem {
    constructor() {
        this.currentLang = 'en';
        this.initializeTranslation();
        this.setupLanguageToggle();
    }
    
    initializeTranslation() {
        // Set initial language based on browser or localStorage
        const savedLang = localStorage.getItem('emergency-lang') || 'en';
        this.setLanguage(savedLang);
    }
    
    setupLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }
    
    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.setLanguage(newLang);
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('emergency-lang', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update direction for Arabic
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all translatable elements
        this.updateTranslatableElements();
        
        // Update language toggle button
        this.updateLanguageToggle();
        
        // Add CSS class for language-specific styling
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        document.body.classList.add(`lang-${lang}`);
    }
    
    updateTranslatableElements() {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
    
    updateLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = this.currentLang === 'en' ? 'العربية' : 'English';
        }
    }
    
    // Get translated text programmatically
    getText(enText, arText) {
        return this.currentLang === 'ar' ? arText : enText;
    }
    
    // Text-to-speech with language support
    speak(enText, arText) {
        const text = this.getText(enText, arText);
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language for speech synthesis
        utterance.lang = this.currentLang === 'ar' ? 'ar-SA' : 'en-US';
        utterance.rate = 0.9;
        utterance.volume = 0.8;
        
        // Find appropriate voice
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(this.currentLang));
        if (voice) {
            utterance.voice = voice;
        }
        
        speechSynthesis.speak(utterance);
    }
}

// Initialize translation system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.translationSystem = new TranslationSystem();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationSystem;
}