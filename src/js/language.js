// Language data
const languages = {
    en: {
        // Main Dashboard
        main_title: "Smart City Traffic Control - Analytics Dashboard",
        analytics_dashboard: "Analytics Dashboard",
        emergency_services: "Emergency Services",
        police_department: "Police Department",
        police_desc: "Traffic monitoring and accident management",
        ambulance_service: "Ambulance Service",
        ambulance_desc: "Emergency medical response and road health",
        fire_department: "Fire Department",
        fire_desc: "Fire response and infrastructure monitoring",
        ai_control: "AI Traffic Control",
        ai_desc: "Automated traffic management system",
        active: "Active",
        units: "Units",
        processing: "Processing",
        system_overview: "System Overview",
        traffic_stats: "Traffic Statistics",
        intersections: "Intersections",
        avg_wait: "Avg Wait",
        flow_efficiency: "Flow Efficiency",
        incident_summary: "Incident Summary",
        accidents: "Accidents",
        breakdowns: "Breakdowns",
        roadwork: "Road Work",
        avg_response: "Avg Response Time",
        emergency_units: "Emergency Units Status",
        police: "Police",
        ambulance: "Ambulance",
        fire: "Fire",
        system_health: "System Health",
        ai_processing: "AI Processing",
        operational: "Operational",
        sensor_network: "Sensor Network",
        online: "Online",
        communications: "Communications",
        degraded: "Degraded",
        recent_activity: "Recent Activity",
        
        // Police Interface
        police_title: "Police Traffic Control System",
        traffic_light_monitoring: "Traffic Light Monitoring",
        accident_management: "Accident Management",
        infrastructure_health: "Infrastructure Health",
        intersection: "Intersection",
        status: "Status",
        vehicle_count: "Vehicle Count",
        wait_time: "Wait Time",
        queue_length: "Queue Length",
        system_alerts: "System Alerts",
        high_traffic_detected: "High traffic detected",
        malfunction_reported: "Malfunction reported",
        emergency_override: "Emergency override active",
        
        // Accident Management
        location: "Location",
        description: "Description",
        unresolved: "Unresolved",
        in_progress: "In Progress",
        resolved: "Resolved",
        priority: "Priority",
        high: "High",
        medium: "Medium",
        low: "Low",
        mark_in_progress: "Mark In Progress",
        mark_resolved: "Mark Resolved",
        
        // Infrastructure
        camera_feeds: "Camera Feeds",
        sensor_readings: "Sensor Readings",
        road_condition: "Road Condition",
        good: "Good",
        fair: "Fair",
        poor: "Poor",
        crack_detected: "Crack Detected",
        water_level: "Water Level",
        normal: "Normal",
        elevated: "Elevated",
        
        // Fire Interface
        fire_title: "Fire Department - Road Monitoring",
        road_condition_dashboard: "Road Condition Dashboard",
        fire_risk: "Fire Risk",
        structural_integrity: "Structural Integrity",
        access_clearance: "Access Clearance",
        blocked: "Blocked",
        clear: "Clear",
        
        // Ambulance Interface
        ambulance_title: "Ambulance Service - Emergency Response",
        road_health_monitoring: "Road Health Monitoring",
        emergency_routes: "Emergency Routes",
        route_status: "Route Status",
        response_time: "Response Time",
        available: "Available",
        deployed: "Deployed",
        
        // AI Dashboard
        ai_title: "AI Traffic Control System",
        camera_input: "Camera Input",
        sensor_data: "Sensor Data",
        ai_analysis: "AI Analysis",
        decisions: "AI Decisions",
        confidence: "Confidence",
        reasoning: "Reasoning",
        processing_status: "Processing Status",
        
        // Time and Navigation
        current_time: "Current Time",
        back_to_main: "Back to Main Dashboard",
        refresh_data: "Refresh Data",
        export_report: "Export Report",
        
        // Status Messages
        data_updated: "Data updated successfully",
        connection_lost: "Connection lost - retrying...",
        system_maintenance: "System under maintenance",
        alert_acknowledged: "Alert acknowledged",
        
        // Activity Messages
        new_incident_detected: "New incident detected",
        traffic_light_updated: "Traffic light timing updated",
        emergency_unit_dispatched: "Emergency unit dispatched",
        road_closure_reported: "Road closure reported",
        ai_optimization_complete: "AI optimization complete"
    },
    ar: {
        // Main Dashboard
        main_title: "نظام التحكم المروري الذكي - لوحة التحليلات",
        analytics_dashboard: "لوحة التحليلات",
        emergency_services: "خدمات الطوارئ",
        police_department: "قسم الشرطة",
        police_desc: "مراقبة المرور وإدارة الحوادث",
        ambulance_service: "خدمة الإسعاف",
        ambulance_desc: "الاستجابة الطبية الطارئة وصحة الطرق",
        fire_department: "إدارة الإطفاء",
        fire_desc: "الاستجابة للحرائق ومراقبة البنية التحتية",
        ai_control: "التحكم المروري بالذكاء الاصطناعي",
        ai_desc: "نظام إدارة المرور الآلي",
        active: "نشط",
        units: "وحدات",
        processing: "جاري المعالجة",
        
        // Police Interface - Specific Titles
        police_traffic_lights_title: "الشرطة - مراقبة إشارات المرور",
        police_accidents_title: "الشرطة - إدارة الحوادث",  
        police_infrastructure_title: "الشرطة - صحة البنية التحتية",
        
        // Ambulance Interface - Specific Titles
        ambulance_road_health_title: "الإسعاف - مراقبة صحة الطرق",
        ambulance_accidents_title: "الإسعاف - إدارة الحوادث",
        
        // Fire Interface - Specific Titles
        fire_road_condition_title: "الإطفاء - لوحة حالة الطرق",
        fire_accidents_title: "الإطفاء - إدارة الحوادث",
        
        // Common Interface Elements
        system_overview: "نظرة عامة على النظام",
        traffic_stats: "إحصائيات المرور",
        intersections: "التقاطعات",
        avg_wait: "متوسط الانتظار",
        flow_efficiency: "كفاءة التدفق",
        incident_summary: "ملخص الحوادث",
        accidents: "الحوادث",
        breakdowns: "الأعطال",
        roadwork: "أعمال الطرق",
        avg_response: "متوسط وقت الاستجابة",
        emergency_units: "حالة وحدات الطوارئ",
        police: "الشرطة",
        ambulance: "الإسعاف",
        fire: "الإطفاء",
        system_health: "صحة النظام",
        ai_processing: "معالجة الذكاء الاصطناعي",
        operational: "تعمل",
        sensor_network: "شبكة الاستشعار",
        online: "متصل",
        communications: "الاتصالات",
        degraded: "متدهور",
        recent_activity: "النشاط الأخير",
        
        // Police Interface
        traffic_light_monitoring: "مراقبة إشارات المرور",
        accident_management: "إدارة الحوادث",
        infrastructure_health: "صحة البنية التحتية",
        intersection: "التقاطع",
        status: "الحالة",
        vehicle_count: "عدد المركبات",
        wait_time: "وقت الانتظار",
        queue_length: "طول الطابور",
        system_alerts: "تنبيهات النظام",
        high_traffic_detected: "تم اكتشاف حركة مرور كثيفة",
        malfunction_reported: "تم الإبلاغ عن عطل",
        emergency_override: "تجاوز الطوارئ نشط",
        
        // Accident Management
        location: "الموقع",
        description: "الوصف",
        unresolved: "غير محلول",
        in_progress: "قيد التنفيذ",
        resolved: "محلول",
        priority: "الأولوية",
        high: "عالية",
        medium: "متوسطة",
        low: "منخفضة",
        mark_in_progress: "وضع علامة قيد التنفيذ",
        mark_resolved: "وضع علامة محلول",
        
        // Infrastructure
        camera_feeds: "تغذية الكاميرات",
        sensor_readings: "قراءات الاستشعار",
        road_condition: "حالة الطريق",
        good: "جيد",
        fair: "مقبول",
        poor: "سيء",
        crack_detected: "تم اكتشاف شق",
        water_level: "مستوى المياه",
        normal: "طبيعي",
        elevated: "مرتفع",
        
        // Fire Interface
        road_condition_dashboard: "لوحة حالة الطرق",
        fire_risk: "خطر الحريق",
        structural_integrity: "السلامة الهيكلية",
        access_clearance: "خلوص الوصول",
        blocked: "مسدود",
        clear: "واضح",
        
        // Ambulance Interface
        road_health_monitoring: "مراقبة صحة الطرق",
        emergency_routes: "طرق الطوارئ",
        route_status: "حالة الطريق",
        response_time: "وقت الاستجابة",
        available: "متاح",
        deployed: "منتشر",
        
        // Time and Navigation
        current_time: "الوقت الحالي",
        back_to_main: "العودة للوحة الرئيسية",
        refresh_data: "تحديث البيانات",
        export_report: "تصدير التقرير",
        
        // Status Messages
        data_updated: "تم تحديث البيانات بنجاح",
        connection_lost: "فُقد الاتصال - جاري إعادة المحاولة...",
        system_maintenance: "النظام قيد الصيانة",
        alert_acknowledged: "تم الإقرار بالتنبيه",
        
        // Activity Messages
        new_incident_detected: "تم اكتشاف حادث جديد",
        traffic_light_updated: "تم تحديث توقيت إشارة المرور",
        emergency_unit_dispatched: "تم إرسال وحدة طوارئ",
        road_closure_reported: "تم الإبلاغ عن إغلاق طريق",
        ai_optimization_complete: "اكتمل تحسين الذكاء الاصطناعي"
    }
};

// Language management
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.applyLanguage(this.currentLanguage);
    }

    setupLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', () => {
                languageDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageToggle.contains(e.target)) {
                    languageDropdown.classList.remove('show');
                }
            });
        }

        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.changeLanguage(lang);
                languageDropdown.classList.remove('show');
            });
        });
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        const html = document.documentElement;
        const currentLangSpan = document.getElementById('currentLang');
        
        // Set HTML attributes
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update language indicator
        if (currentLangSpan) {
            currentLangSpan.textContent = lang === 'ar' ? 'ع' : 'EN';
        }

        // Apply translations
        this.updateTexts(lang);
        
        // Add RTL class for Arabic
        document.body.classList.toggle('rtl', lang === 'ar');
    }

    updateTexts(lang) {
        const langData = languages[lang];
        const elements = document.querySelectorAll('[data-lang-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });

        // Update page title
        const titleElements = document.querySelectorAll('title[data-lang-key]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-lang-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (langData[key]) {
                element.setAttribute('placeholder', langData[key]);
            }
        });
    }

    getText(key) {
        return languages[this.currentLanguage][key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language manager
const languageManager = new LanguageManager();

// Export for use in other scripts
window.languageManager = languageManager;
