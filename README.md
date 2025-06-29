# Smart City Traffic Control - Automatic Emergency Simulation System

## Overview
This Smart City Traffic Control system features an advanced **automatic accident simulation** with continuous audio alerts and spoken messages. The system automatically generates new emergencies **30 seconds after entering any accident page**, creating realistic training scenarios with loud alerts and detailed voice announcements that continue until the status is changed to "In Progress".

## 🚨 New Features

### Automatic Simulation System
- **30-Second Delay**: System automatically starts generating emergencies 30 seconds after entering any accident page
- **Automatic Emergency Generation**: System creates realistic accidents without manual intervention
- **Continuous Monitoring**: Only simulates new emergencies when there are no unresolved incidents
- **Service-Specific Timing**: Different intervals for Police (45-90s), Ambulance (60-120s), and Fire (75-150s)

### Continuous Alert System
- **Loud Alert Sounds**: Two-tone emergency siren sounds that play every 3 seconds
- **Spoken Messages**: Detailed voice announcements every 15 seconds with incident information
- **Service-Specific Alerts**: Different alert messages for Police, Ambulance, and Fire emergencies
- **Visual Indicators**: Animated accident cards with pulsing effects for unresolved incidents

### Intelligent Emergency Types
Each emergency service automatically generates realistic scenarios:
- **Police Department**: Traffic accidents, collisions, and road incidents
- **Ambulance Service**: Medical emergencies, cardiac events, and health crises  
- **Fire Department**: Structure fires, gas leaks, and fire emergencies

## 🎯 How It Works

### Automatic Operation
1. **Enter Any Emergency Service**:
   - Navigate to `police-accidents.html`, `ambulance-accidents.html`, or `fire-accidents.html`
   - System begins automatic 30-second countdown in the background

2. **Wait for Auto-Generation**:
   - System silently counts down 30 seconds
   - No user interaction required

3. **Emergency Auto-Generation**:
   - At 30 seconds, system automatically creates a new emergency
   - **Sound Alerts**: Loud two-tone siren sounds every 3 seconds
   - **Voice Alerts**: Spoken incident details every 15 seconds
   - **Visual Effects**: Pulsing and animated accident cards

### Stopping Alerts
Alerts will continue until you change the accident status:
- Click **"Mark In Progress"** to stop all alerts for that incident
- Click **"Mark Resolved"** to fully resolve the incident
- Only "In Progress" status change stops the continuous alerts

### Continued Simulation
After the first emergency:
- **Police**: New accidents every 45-90 seconds (if no unresolved incidents)
- **Ambulance**: New emergencies every 60-120 seconds (if no unresolved incidents)
- **Fire**: New emergencies every 75-150 seconds (if no unresolved incidents)

## 🔊 Alert System Details

### Audio Features
- **Two-tone Siren**: 800Hz and 1000Hz oscillators for attention-grabbing sound
- **High Volume**: 60% volume level for loud alerts
- **Continuous Loop**: Sounds repeat every 3 seconds until stopped
- **Cross-browser Compatible**: Uses Web Audio API with fallbacks

### Speech Synthesis
- **Clear Pronunciation**: Optimized rate (0.9x), volume (100%), and pitch (1.1x)
- **Detailed Messages**: Includes location, description, priority, and service type
- **Repeat Interval**: Every 15 seconds for continuous awareness
- **Service-Specific**: Different message formats for each emergency type

### Alert Examples
- **Police**: *"ATTENTION: Traffic accident reported at Main Street & Oak Avenue. Multi-vehicle collision blocking traffic lanes. Priority: high. Police response required."*
- **Ambulance**: *"ATTENTION: Medical emergency at City General Hospital. Cardiac arrest - CPR in progress. Priority: high. Ambulance response required."*
- **Fire**: *"ATTENTION: Fire emergency at Industrial Warehouse District. Structure fire with heavy smoke and flames. Priority: high. Fire department response required."*

## 🎨 Visual Features

### Animated Interface
- **Pulsing Accident Cards**: Unresolved accidents have visual animations
- **Priority Indicators**: High priority accidents blink for attention
- **Status Animations**: Visual feedback for different emergency states
- **Service-Specific Colors**: Different panel colors for each emergency type

## 🚀 Getting Started

1. **Open the Main Dashboard**: Load `index.html`
2. **Choose an Emergency Service**: Click on Police, Ambulance, or Fire
3. **Navigate to Accidents**: Use the navigation tabs to go to accident management
4. **Wait for Auto-Simulation**: System automatically generates first emergency after 30 seconds
5. **Experience Automatic Alerts**: Listen to continuous sounds and speech
6. **Stop Alerts**: Click "Mark In Progress" to stop the alerts

## ⏱️ Timing System

### Initial Simulation
- **30-Second Delay**: Automatic start 30 seconds after page load
- **Silent Operation**: System works in background without visual countdown
- **Automatic Activation**: No user interaction required

### Ongoing Simulations
- **Police Accidents**: Every 45-90 seconds (random interval)
- **Medical Emergencies**: Every 60-120 seconds (random interval)  
- **Fire Emergencies**: Every 75-150 seconds (random interval)
- **Smart Logic**: Only creates new incidents when no unresolved emergencies exist

### Priority Distribution
- **Police**: 40% High, 40% Medium, 20% Low priority
- **Ambulance**: 70% High, 30% Medium priority (medical urgency)
- **Fire**: 80% High, 20% Medium priority (fire danger)

## 🛠️ Technical Implementation

### Enhanced Emergency Classes
- **Automatic Timers**: `setTimeout()` and `setInterval()` for scheduling
- **Smart Logic**: Checks for existing unresolved incidents before creating new ones
- **Background Operation**: Silent simulation without visual interference
- **Memory Management**: Proper cleanup of timers and intervals

### Realistic Scenarios
- **Location Variety**: 10+ different location types per service
- **Incident Descriptions**: 10+ realistic emergency descriptions per service
- **Weighted Priorities**: Realistic priority distribution based on emergency type

## 📋 File Structure

```
City/
├── index.html                    # Main dashboard
├── police-accidents.html         # Police accident management (auto-simulation)
├── ambulance-accidents.html      # Medical emergency management (auto-simulation)
├── fire-accidents.html          # Fire emergency management (auto-simulation)
├── src/
│   ├── js/
│   │   ├── main.js              # Enhanced AudioManager with continuous alerts
│   │   ├── police-accidents.js  # Auto-simulation system for traffic accidents
│   │   ├── ambulance-accidents.js # Auto-simulation system for medical emergencies
│   │   └── fire-accidents.js    # Auto-simulation system for fire emergencies
│   └── css/
│       └── emergency.css        # Auto-simulation status panel styles
└── README.md                    # This documentation
```

## 🔍 Training Benefits

### Realistic Emergency Response Training
- **Continuous Pressure**: Constant alerts create realistic stress
- **Decision Making**: Must quickly assess and respond to incidents
- **Time Management**: Learn to prioritize multiple emergency types
- **System Familiarity**: Practice with actual emergency management interface

### Multi-Service Coordination
- **Cross-Department**: Experience Police, Fire, and Medical scenarios
- **Priority Recognition**: Learn to identify high vs. medium priority incidents
- **Response Protocols**: Practice proper incident status management

**⚠️ Important Note**: This is an automatic simulation system for training and demonstration purposes. The system generates emergencies continuously to provide realistic training scenarios for emergency response personnel. 