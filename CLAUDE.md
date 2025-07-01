# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based "Anotador de Truco" (Truco Scorekeeper) application - a digital scorecard for the Argentine card game Truco. The app is built using Create React App with React 19, styled with Tailwind CSS, and features a handwritten notebook aesthetic with dual theme support.

## Common Development Commands

```bash
# Start development server on http://localhost:3000
npm start

# Run tests in interactive watch mode
npm test

# Run a specific test file
npm test -- src/App.test.js

# Build production-ready bundle
npm run build

# The project uses Create React App's built-in ESLint configuration
# Linting is done automatically during development and build
```

## Architecture

### Component Structure
- **App.js**: Root component that renders AnotadorTruco
- **AnotadorTruco.jsx**: Main game interface component handling screens, persistence, and game flow
- **PantallaInicio.jsx**: Start screen with game mode selection and continue game functionality
- **ScoreDisplay.jsx**: Visual score representation using traditional "rayitas" (tally marks) system
- **MobileNavHeader.jsx**: Native-style mobile navigation for history screen

### Custom Hooks
- **useGameState.js**: Core game state management including:
  - Score tracking for both teams (puntosNos/puntosEllos)
  - Flexible point totals (16, 24, 30 points)
  - Team names with custom input
  - Game history tracking
  - Falta Envido implementation with proper point calculation
  - Game reset and restore functionality
- **useGamePersistence.js**: Automatic game saving to localStorage with 24h expiration
- **useSwipeBack.js**: iOS-style edge swipe gesture for navigation

### Styling Architecture
- **Tailwind CSS** for utility-first styling
- **Custom CSS system** in `src/styles/globals.css` with:
  - Dual theme support (Clásico/Campo modes)
  - Handwritten font system (Kalam + Caveat for titles)
  - Organic button styles with glassmorphism effects
  - Mobile-optimized touch targets and animations
  - Theme-specific color palettes and backgrounds

## Key Features Implemented

### Core Functionality
1. **Flexible Scoring System**: Support for 16, 24, and 30 point games
2. **Tap-to-Score**: Click anywhere on score areas to add points
3. **Falta Envido**: Proper implementation with point calculation based on game total
4. **Game History**: Detailed move tracking with timestamps
5. **Auto-Save**: Automatic game persistence with recovery on app restart

### UI/UX Features
1. **Dual Theme System**: 
   - Modo Clásico: Light theme with blue accents
   - Modo Campo: Dark theme with beige/orange palette
2. **Mobile-First Design**: Native iOS/Android navigation patterns
3. **Handwritten Aesthetic**: Organic rotations and felt-tip pen styling
4. **Touch Optimizations**: 48px+ touch targets, haptic-like feedback

### User Experience
1. **Continue Game**: Prominent button appears when saved game detected
2. **Accidental Exit Protection**: Confirmation dialog for menu navigation
3. **Native Navigation**: Swipe-back gesture and proper mobile headers
4. **Responsive Layouts**: Optimized for all screen sizes

## Development Patterns

### State Management Pattern
```javascript
// Game state is centralized in useGameState hook
const { puntosNos, puntosEllos, sumarPunto, nuevoPartido, restaurarPartida } = useGameState();

// Persistence is handled automatically via useGamePersistence
const { getSavedGame, clearSavedGame, hasSavedGame } = useGamePersistence(gameState);
```

### Theme System Pattern
```css
/* Dual theme CSS structure */
.theme-clasico .ink-blue { color: #1e40af; }
.theme-pampa .ink-blue { color: #e0e0e0; }

/* Component usage */
<div className={`theme-${temaActual === 'campo' ? 'pampa' : 'clasico'}`}>
```

### Mobile Navigation Pattern
```javascript
// Native-style navigation with proper touch targets
<MobileNavHeader 
  onBack={() => setPantallaActual('juego')} 
  title="Historial" 
/>
```

## File Structure

```
src/
├── components/
│   ├── AnotadorTruco.jsx     # Main game component
│   ├── PantallaInicio.jsx    # Start screen with modes
│   ├── ScoreDisplay.jsx      # Tally marks visualization
│   └── MobileNavHeader.jsx   # Mobile navigation
├── hooks/
│   ├── useGameState.js       # Core game logic
│   ├── useGamePersistence.js # Auto-save functionality
│   └── useSwipeBack.js       # Gesture navigation
├── styles/
│   └── globals.css          # Theme system and animations
└── App.js                   # Root component
```

## Technical Considerations

1. **Performance**: Uses localStorage for persistence, optimized CSS animations
2. **Accessibility**: WCAG-compliant touch targets, proper contrast ratios
3. **Mobile Optimization**: Native gesture support, safe area handling
4. **Cross-Platform**: Works on iOS, Android, and desktop browsers
5. **Offline-First**: No network dependencies, fully functional offline

## Common Development Tasks

### Adding New Themes
1. Add theme colors in `globals.css` under `.theme-newtheme`
2. Update theme toggle in `PantallaInicio.jsx`
3. Test all components with new color palette

### Modifying Game Rules
1. Update scoring logic in `useGameState.js`
2. Adjust Falta Envido calculations if needed
3. Update ScoreDisplay component for visual changes

### Adding New Screens
1. Create component in `src/components/`
2. Add screen state to `pantallaActual` in `AnotadorTruco.jsx`
3. Implement navigation and back button functionality

## Version 0.0.1 Status

Current version includes all core Truco functionality with modern mobile UX patterns. The app is feature-complete for basic Truco scorekeeping with enhanced user experience through automatic saving, theme switching, and mobile-optimized interactions.