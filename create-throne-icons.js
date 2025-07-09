const fs = require('fs');

// Función para crear iconos PNG usando data URIs
function createThroneIconPNG(size) {
    // SVG del trono optimizado para iconos
    const svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo Negro -->
  <rect width="${size}" height="${size}" fill="#0a0a0a"/>
  
  <!-- Trono Argentino para Icono -->
  <g transform="translate(${size/2}, ${size/2}) scale(${size/512})">
    <!-- Base del trono -->
    <rect x="-80" y="60" width="160" height="40" fill="#D4A574" stroke="#C59660" stroke-width="3"/>
    
    <!-- Respaldo central -->
    <rect x="-60" y="-100" width="120" height="160" fill="#D4A574" stroke="#C59660" stroke-width="3"/>
    
    <!-- Brazos del trono -->
    <rect x="-90" y="0" width="30" height="80" fill="#D4A574" stroke="#C59660" stroke-width="2"/>
    <rect x="60" y="0" width="30" height="80" fill="#D4A574" stroke="#C59660" stroke-width="2"/>
    
    <!-- Decoración superior central -->
    <circle cx="0" cy="-120" r="15" fill="#FFD700" stroke="#D4A574" stroke-width="2"/>
    
    <!-- Decoraciones laterales -->
    <circle cx="-40" cy="-80" r="8" fill="#FFD700"/>
    <circle cx="40" cy="-80" r="8" fill="#FFD700"/>
    
    <!-- Corona en la parte superior -->
    <polygon points="0,-140 -10,-130 -5,-125 0,-130 5,-125 10,-130" fill="#FFD700" stroke="#D4A574" stroke-width="1"/>
    
    <!-- Detalles ornamentales -->
    <rect x="-50" y="-60" width="100" height="4" fill="#FFD700"/>
    <rect x="-50" y="-40" width="100" height="4" fill="#FFD700"/>
    <rect x="-50" y="-20" width="100" height="4" fill="#FFD700"/>
    
    <!-- Sombra dorada sutil -->
    <ellipse cx="0" cy="120" rx="100" ry="20" fill="rgba(212, 165, 116, 0.3)"/>
  </g>
</svg>`;

    return svgContent;
}

// Crear HTML para generar los iconos
const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Generador Rey del Truco Icons</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        canvas { border: 1px solid #ccc; margin: 10px; }
        .icon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .icon-container { text-align: center; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Generador de Iconos Rey del Truco</h1>
    
    <div class="icon-grid">
        <div class="icon-container">
            <h3>180x180 (iPhone)</h3>
            <canvas id="canvas180" width="180" height="180"></canvas>
            <br><button onclick="downloadIcon(180)">Descargar</button>
        </div>
        
        <div class="icon-container">
            <h3>192x192 (Android)</h3>
            <canvas id="canvas192" width="192" height="192"></canvas>
            <br><button onclick="downloadIcon(192)">Descargar</button>
        </div>
        
        <div class="icon-container">
            <h3>512x512 (PWA)</h3>
            <canvas id="canvas512" width="512" height="512"></canvas>
            <br><button onclick="downloadIcon(512)">Descargar</button>
        </div>
        
        <div class="icon-container">
            <h3>152x152 (iPad)</h3>
            <canvas id="canvas152" width="152" height="152"></canvas>
            <br><button onclick="downloadIcon(152)">Descargar</button>
        </div>
        
        <div class="icon-container">
            <h3>167x167 (iPad Pro)</h3>
            <canvas id="canvas167" width="167" height="167"></canvas>
            <br><button onclick="downloadIcon(167)">Descargar</button>
        </div>
        
        <div class="icon-container">
            <h3>144x144 (Windows)</h3>
            <canvas id="canvas144" width="144" height="144"></canvas>
            <br><button onclick="downloadIcon(144)">Descargar</button>
        </div>
    </div>
    
    <br><br>
    <button onclick="downloadAllIcons()" style="font-size: 18px; background: #D4A574; color: #0a0a0a; padding: 15px 30px;">
        🏆 Descargar Todos los Iconos
    </button>

    <script>
        function drawThroneIcon(canvas, size) {
            const ctx = canvas.getContext('2d');
            
            // Limpiar canvas con fondo negro
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, size, size);
            
            // Escalar desde 512px base
            const scale = size / 512;
            ctx.save();
            ctx.translate(size/2, size/2);
            ctx.scale(scale, scale);
            
            // Colores del trono
            const gold = '#D4A574';
            const darkGold = '#C59660';
            const brightGold = '#FFD700';
            
            // Base del trono
            ctx.fillStyle = gold;
            ctx.strokeStyle = darkGold;
            ctx.lineWidth = 3;
            ctx.fillRect(-80, 60, 160, 40);
            ctx.strokeRect(-80, 60, 160, 40);
            
            // Respaldo central
            ctx.fillRect(-60, -100, 120, 160);
            ctx.strokeRect(-60, -100, 120, 160);
            
            // Brazos laterales
            ctx.lineWidth = 2;
            ctx.fillRect(-90, 0, 30, 80);
            ctx.strokeRect(-90, 0, 30, 80);
            ctx.fillRect(60, 0, 30, 80);
            ctx.strokeRect(60, 0, 30, 80);
            
            // Decoraciones doradas
            ctx.fillStyle = brightGold;
            
            // Círculo superior central
            ctx.beginPath();
            ctx.arc(0, -120, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = gold;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Círculos laterales
            ctx.beginPath();
            ctx.arc(-40, -80, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(40, -80, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            // Corona superior
            ctx.beginPath();
            ctx.moveTo(0, -140);
            ctx.lineTo(-10, -130);
            ctx.lineTo(-5, -125);
            ctx.lineTo(0, -130);
            ctx.lineTo(5, -125);
            ctx.lineTo(10, -130);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = gold;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Líneas ornamentales horizontales
            ctx.fillStyle = brightGold;
            ctx.fillRect(-50, -60, 100, 4);
            ctx.fillRect(-50, -40, 100, 4);
            ctx.fillRect(-50, -20, 100, 4);
            
            // Sombra dorada base
            ctx.fillStyle = 'rgba(212, 165, 116, 0.3)';
            ctx.beginPath();
            ctx.ellipse(0, 120, 100, 20, 0, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.restore();
        }
        
        function downloadIcon(size) {
            const canvas = document.getElementById('canvas' + size);
            const link = document.createElement('a');
            link.download = 'throne-icon-' + size + '.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        }
        
        function downloadAllIcons() {
            const sizes = [144, 152, 167, 180, 192, 512];
            sizes.forEach((size, index) => {
                setTimeout(() => {
                    downloadIcon(size);
                }, index * 500); // Delay para no saturar el navegador
            });
        }
        
        // Inicializar todos los iconos
        function initializeIcons() {
            const sizes = [144, 152, 167, 180, 192, 512];
            sizes.forEach(size => {
                const canvas = document.getElementById('canvas' + size);
                drawThroneIcon(canvas, size);
            });
        }
        
        // Ejecutar al cargar la página
        window.onload = initializeIcons;
    </script>
</body>
</html>`;

// Escribir el archivo HTML
fs.writeFileSync('./public/icon-generator.html', htmlContent);

console.log('✅ Generador de iconos creado: public/icon-generator.html');
console.log('');
console.log('🎯 Para crear los iconos:');
console.log('1. Abre http://localhost:3000/icon-generator.html en tu navegador');
console.log('2. Haz clic en "Descargar Todos los Iconos"');
console.log('3. Mueve los archivos descargados a la carpeta public/');
console.log('4. Reinicia el servidor npm start');
console.log('');
console.log('📱 Luego agrega la app al inicio desde Safari en tu iPhone!');