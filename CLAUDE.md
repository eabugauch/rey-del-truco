# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based "Anotador de Truco" (Truco Scorekeeper) application - a digital scorecard for the Argentine card game Truco. The app is built using Create React App with React 19, styled with Tailwind CSS, and features a **cinematographic "Rey del Truco" aesthetic** with advanced CSS effects and premium visual design.

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
- **PantallaInicio.jsx**: Start screen with ornamental design and game mode selection
- **ScoreDisplay.jsx**: Visual score representation using traditional "rayitas" (tally marks) system with golden effects
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

### Advanced Styling Architecture
- **Tailwind CSS** for utility-first styling with custom configuration
- **Comprehensive CSS system** in `src/styles/globals.css` with:
  - **"Rey del Truco" cinematographic theme** (primary)
  - **Ornamental Victorian patterns** with SVG backgrounds
  - **Premium typography system** (Cinzel Decorative, Fredericka the Great, Rye, Oswald, Playfair Display)
  - **Dramatic golden color palette** with multiple glow effects
  - **Advanced button system** with metallic gradients and hover animations
  - **Golden particle effects** and microinteractions
  - **Responsive design** optimized for all screen sizes from mobile to ultra-wide
  - **High-DPI support** for retina displays

## Key Features Implemented

### Core Functionality
1. **Flexible Scoring System**: Support for 16, 24, and 30 point games
2. **Tap-to-Score**: Click anywhere on score areas to add points
3. **Falta Envido**: Proper implementation with point calculation based on game total
4. **Game History**: Detailed move tracking with timestamps
5. **Auto-Save**: Automatic game persistence with recovery on app restart

### Premium UI/UX Features
1. **Cinematographic Theme System**: 
   - **Rey del Truco Mode**: Premium golden theme with Victorian ornaments
   - **Dramatic visual effects**: Multiple drop-shadows, golden glows, particle effects
   - **Ornamental fonts**: Cinzel Decorative, Fredericka the Great, Rye
2. **Advanced Responsive Design**: 
   - **Fluid typography**: clamp() functions for seamless scaling
   - **Custom breakpoints**: xs, sm, md, lg, xl, 2xl, tablet-landscape, phone-landscape
   - **Desktop optimizations**: Full-screen layouts for large displays
3. **Premium Microinteractions**:
   - **Epic screen transitions**: 3D rotations and blur effects
   - **Golden particle animations**: Sparkles and floating particles
   - **Premium button effects**: Metallic gradients with shine animations
   - **Score glow effects**: Dramatic shadows and golden pulses

### User Experience Enhancements
1. **Continue Game**: Prominent button appears when saved game detected
2. **Premium Visual Feedback**: Golden explosions, sparkles, and glow effects on important actions
3. **Cinematic Transitions**: Smooth screen changes with blur and scale effects
4. **Fully Responsive**: Optimized layouts from 320px mobile to 1536px+ ultra-wide displays

## Advanced CSS System

### Theme Architecture
```css
/* Rey del Truco Cinematographic Theme */
.theme-rey {
  --rey-gold-bright: ##D4AF37;
  --rey-gold-main: #D4AF37;
  --rey-shadow-gold: rgba(248, 231, 28, 0.5);
  --rey-glow-gold: rgba(255, 215, 0, 0.8);
  /* + 15 more premium color variables */
}
```

### Premium Effect Classes
```css
/* Available premium effects */
.score-primary          /* Dramatic shadows for scores */
.score-enhanced         /* Golden pulse animation */
.epic-entrance          /* Cinematic screen entry */
.premium-click          /* Golden ripple on click */
.sparkle-effect         /* Corner sparkles */
.gold-particle-effect   /* Floating particles */
.victory-glow           /* Epic victory animation */
.magic-gold-bg          /* Animated golden background */
```

### Responsive Typography
```css
/* Fluid typography system */
.player-name-fluid      /* Scales 2rem → 4rem */
.score-number-fluid     /* Scales 2.5rem → 5rem */
.fluid-text-*          /* Full responsive text scale */
```

## Development Patterns

### State Management Pattern
```javascript
// Game state is centralized in useGameState hook
const { puntosNos, puntosEllos, sumarPunto, nuevoPartido, restaurarPartida } = useGameState();

// Persistence is handled automatically via useGamePersistence
const { getSavedGame, clearSavedGame, hasSavedGame } = useGamePersistence(gameState);
```

### Premium Effects Usage
```javascript
// Adding cinematic effects to components
<span className="score-number-fluid score-primary score-enhanced gold-particle-effect">
  {puntos}
</span>

// Premium buttons with golden effects
<button className="premium-click sparkle-effect rey-buttons">
  Sumar Punto
</button>

// Epic screen transitions
<div className="epic-entrance screen-transition">
  {screenContent}
</div>
```

### Responsive Design Pattern
```javascript
// Responsive containers
<div className="game-container lg:desktop-game-card landscape-compact">
  <div className="responsive-padding lg:p-8 xl:p-12">
    {/* content scales automatically */}
  </div>
</div>
```

## File Structure

```
src/
├── components/
│   ├── AnotadorTruco.jsx     # Main game component with premium effects
│   ├── PantallaInicio.jsx    # Start screen with ornamental design
│   ├── ScoreDisplay.jsx      # Tally marks with golden animations
│   └── MobileNavHeader.jsx   # Responsive mobile navigation
├── hooks/
│   ├── useGameState.js       # Core game logic
│   ├── useGamePersistence.js # Auto-save functionality
│   └── useSwipeBack.js       # Gesture navigation
├── styles/
│   └── globals.css          # Advanced theme system (1500+ lines)
│       ├── Color variables (3 complete themes)
│       ├── Premium typography (7 font families)
│       ├── Victorian SVG patterns
│       ├── Golden animation effects
│       ├── Responsive breakpoints
│       └── Microinteraction system
└── App.js                   # Root component
```

## Technical Considerations

1. **Performance**: 
   - Optimized CSS animations with `will-change` and hardware acceleration
   - Efficient particle effects using CSS transforms
   - Lazy-loaded visual effects to maintain 60fps
2. **Accessibility**: 
   - WCAG-compliant contrast ratios with golden theme
   - Proper touch targets (48px+) across all breakpoints
   - `prefers-reduced-motion` support for animations
3. **Responsive Optimization**: 
   - Fluid typography with clamp() functions
   - Container queries for optimal layouts
   - High-DPI display support with crisp text rendering
4. **Cross-Platform Compatibility**: 
   - iOS, Android, and desktop browser optimization
   - Safe area handling for notched displays
   - Touch gesture support with hardware acceleration

## CSS Effect Guidelines

### Golden Color Palette
- **Primary Gold**: `##D4AF37` (bright highlights)
- **Secondary Gold**: `#D4AF37` (main elements)
- **Dark Gold**: `#B8860B` (shadows and depth)
- **Glow Effects**: Use `--rey-shadow-gold` and `--rey-glow-gold` variables

### Animation Performance
- Use `transform` and `opacity` for smooth 60fps animations
- Apply `will-change: transform` to animated elements
- Prefer CSS animations over JavaScript for visual effects

### Responsive Design Rules
- Use `fluid-text-*` classes for typography
- Apply `responsive-padding` and `responsive-gap` for spacing
- Implement `landscape-compact` for mobile horizontal orientation

## Version Evolution

### v0.0.1 → v0.1.0 (Current)
- ✅ **Cinematographic "Rey del Truco" theme** with golden effects
- ✅ **Advanced responsive design** (320px → 1536px+)
- ✅ **Premium typography system** with 7 ornamental fonts
- ✅ **Victorian SVG patterns** and decorative elements
- ✅ **Golden particle effects** and microinteractions
- ✅ **Dramatic shadow system** with multiple depth layers
- ✅ **Metallic button gradients** with shine animations
- ✅ **Epic screen transitions** with 3D effects

The app now features **cinematographic-quality visuals** while maintaining all core Truco functionality, responsive design, and performance optimization.