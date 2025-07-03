// Analytics Dashboard JavaScript
class AnalyticsDashboard {
    constructor() {
        this.stats = {
            intersections: 24,
            avgWait: 2.3,
            flowEfficiency: 87,
            accidents: 3,
            breakdowns: 1,
            roadwork: 2,
            avgResponse: 4.2
        };
        
        this.init();
    }

    init() {
        this.updateStats();
        this.createTrafficChart();
        this.updateActivityFeed();
        this.startDataUpdates();
    }

    updateStats() {
        // Update system overview stats
        const intersectionsElement = document.querySelector('[data-stat="intersections"]');
        if (intersectionsElement) {
            intersectionsElement.textContent = this.stats.intersections;
        }
        
        const avgWaitElement = document.querySelector('[data-stat="avgWait"]');
        if (avgWaitElement) {
            avgWaitElement.textContent = `${this.stats.avgWait} د`;
        }
        
        const efficiencyElement = document.querySelector('[data-stat="flowEfficiency"]');
        if (efficiencyElement) {
            efficiencyElement.textContent = `${this.stats.flowEfficiency}%`;
        }
        
        // Simulate minor changes to stats
        if (Math.random() < 0.1) {
            this.stats.avgWait += (Math.random() - 0.5) * 0.5;
            this.stats.avgWait = Math.max(1.0, Math.min(5.0, this.stats.avgWait));
            this.stats.avgWait = Math.round(this.stats.avgWait * 10) / 10;
        }
        
        if (Math.random() < 0.08) {
            this.stats.flowEfficiency += (Math.random() - 0.5) * 5;
            this.stats.flowEfficiency = Math.max(70, Math.min(100, this.stats.flowEfficiency));
            this.stats.flowEfficiency = Math.round(this.stats.flowEfficiency);
        }
    }

    createTrafficChart() {
        const ctx = document.getElementById('trafficChart');
        if (!ctx) return;

        // Arabic day names
        const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
        
        // Sample data (60-80% range)
        const data = [60, 58, 70, 72, 55, 52, 42];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'كثافة المرور (%)',
                    data: data,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: '#4CAF50',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 14
                            },
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 14
                            },
                            color: '#fff'
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            color: '#fff',
                            font: {
                                size: 14
                            },
                            boxWidth: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    updateActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        const activities = [
            { time: '14:32', text: 'تم اكتشاف حادث جديد' },
            { time: '14:28', text: 'تم تحديث توقيت إشارة المرور' },
            { time: '14:25', text: 'تم إرسال وحدة طوارئ' }
        ];

        activityFeed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <span class="activity-time">${activity.time}</span>
                <span class="activity-spacer">&nbsp;&nbsp;&nbsp;</span>
                <span class="activity-text">${activity.text}</span>
            </div>
        `).join('');
    }

    startDataUpdates() {
        // Update analytics every 10 seconds
        setInterval(() => {
            this.updateStats();
            this.updateActivityFeed();
        }, 10000);
        
        // Redraw chart every 30 seconds
        setInterval(() => {
            this.createTrafficChart();
            console.log('تحديث البيانات: تحديث كل 30 ثانية');
        }, 30000);
    }
}

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsDashboard();
});