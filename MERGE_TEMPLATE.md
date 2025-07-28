# Merge Template: RPG Discord Webhooks & Level Progression System

## Description

This merge introduces a comprehensive Level Progression System with Discord webhook integration, enhanced faction descriptions, improved death detection, and automatic XP calculation for existing users. The system provides a complete RPG-like progression experience while maintaining clean separation between dashboard display and Discord notifications.

## Type of Change

- [x] New feature (non-breaking change which adds functionality)
- [x] Bug fix (non-breaking change which fixes an issue)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Key Features Added

### 🎮 Level Progression System
- **XP Calculation**: Combined PVE and PVP XP for unified progression
- **Level Formula**: `Math.floor(0.1 * Math.sqrt(xp))` for level calculation
- **Prestige System**: Every 100 levels = 1 prestige level
- **Faction-Based Titles**: Dynamic rank and prestige titles based on faction selection
- **Automatic XP Calculation**: Retroactively calculates XP from existing kill data for new users

### 🎯 Discord Webhook Integration
- **Conditional Level Data**: Toggle to include/exclude progression data in Discord notifications
- **Enhanced Kill Notifications**: Improved PVE kill detection for ground vs ship combat
- **Combined XP Display**: Shows total progression (PVE + PVP) in all webhooks
- **Smart Ship Detection**: Properly detects when user is on foot vs in ship

### ⚙️ Settings & UI Enhancements
- **Faction Descriptions**: Rich, themed descriptions for Outlaw and Peacekeeper factions
- **Progression Toggles**: Separate controls for dashboard display and Discord integration
- **Improved Death Detection**: Better classification of crash deaths and environmental hazards
- **Vehicle State Tracking**: Proper detection of ship entry/exit for accurate combat reporting

### 🔧 Technical Improvements
- **Enhanced Log Processing**: Improved regex patterns for better event detection
- **Automatic Data Migration**: Calculates XP from existing kill data on app startup
- **Robust Error Handling**: Better error handling and debug logging throughout
- **Performance Optimizations**: Efficient data loading and state management

## Testing

- [x] Tested locally with various combat scenarios
- [x] Verified XP calculation accuracy across PVE and PVP kills
- [x] Confirmed Discord webhook functionality with all event types
- [x] Tested faction switching and description display
- [x] Validated ground kill detection (no ship info displayed)
- [x] Verified automatic XP calculation for existing users
- [x] Tested vehicle entry/exit detection
- [x] Confirmed crash death classification as PVE death

## Screenshots

### Enhanced Settings UI
- Faction selection with rich descriptions
- Level Progression System toggles
- Discord notification controls

### Updated Dashboard
- Combined XP display (PVE + PVP)
- Faction-based rank and prestige titles
- Conditional display based on settings

### Discord Webhook Examples
- PVE kills with/without ship information
- PVP kills with combined progression data
- Suicide events with proper XP calculation

## Files Modified

### Core Features
- `src/views/Dashboard.jsx` - Combined XP calculation and conditional display
- `src/views/Settings.jsx` - Enhanced UI with faction descriptions and toggles
- `src/lib/discord/discordUtil.js` - Improved webhook logic with combined XP
- `src/processing_engine/rules/actorDeath.js` - Enhanced death detection and crash handling

### Data Management
- `src/lib/settings/settingsUtil.js` - New toggles and automatic XP calculation
- `src/lib/context/settings/settingsContext.jsx` - Automatic XP calculation on startup
- `src/lib/pve/pveUtil.js` - XP field addition and preservation
- `src/lib/pvp/pvpUtil.js` - XP field addition and preservation

### Vehicle Detection
- `src/processing_engine/rules/vehicleControlFlow.js` - Ship entry/exit detection

### Configuration
- `src-tauri/tauri.conf.json` - Window resizing and minimum constraints

## Checklist

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] My changes generate no new warnings
- [x] I have added comprehensive debug logging for troubleshooting
- [x] All existing functionality remains intact
- [x] New features are properly integrated with existing systems
- [x] Settings provide clear user control over feature visibility
- [x] Error handling is robust and informative

## Breaking Changes

**None** - All changes are additive and maintain backward compatibility. Existing user data will be automatically migrated with XP calculation from kill history.

## Migration Notes

- Existing users will have XP automatically calculated from their kill history on first launch
- New users will start with 0 XP and accumulate normally
- All existing settings and data structures remain compatible
- Discord webhook behavior is unchanged unless "Include Level Data" is enabled

## Performance Impact

- Minimal performance impact from additional calculations
- Automatic XP calculation runs once on startup for existing users
- Enhanced log processing maintains efficient event detection
- No significant memory or CPU overhead from new features 