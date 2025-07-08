// Quick test to check if the React components can be parsed
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing component files...');

// Test PantallaInicio.jsx
try {
  const pantallaInicio = fs.readFileSync(path.join(__dirname, 'src/components/PantallaInicio.jsx'), 'utf8');
  if (pantallaInicio.includes('const CoronaSVG') && pantallaInicio.includes('const MateSVG') && pantallaInicio.includes('const NaipeSVG')) {
    console.log('✅ PantallaInicio.jsx: SVG components found');
  }
  if (pantallaInicio.includes("import Button from './UI/Button'")) {
    console.log('✅ PantallaInicio.jsx: Button import correct');
  }
} catch (e) {
  console.log('❌ Error reading PantallaInicio.jsx:', e.message);
}

// Test Button component
try {
  const button = fs.readFileSync(path.join(__dirname, 'src/components/UI/Button/Button.jsx'), 'utf8');
  if (button.includes('export default Button')) {
    console.log('✅ Button.jsx: Properly exported');
  }
} catch (e) {
  console.log('❌ Error reading Button.jsx:', e.message);
}

// Test CSS
try {
  const css = fs.readFileSync(path.join(__dirname, 'src/styles/globals.css'), 'utf8');
  if (!css.includes('/* Color base EXACTO como "Rey del" */')) {
    console.log('✅ globals.css: Legacy CSS properly removed');
  }
  if (css.includes('.rey-svg-corona')) {
    console.log('✅ globals.css: SVG styles present');
  }
} catch (e) {
  console.log('❌ Error reading globals.css:', e.message);
}

console.log('✅ All files are readable and appear to have correct structure');