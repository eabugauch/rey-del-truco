# Button Component - Rey del Truco

Sistema de botones reutilizable con design tokens y arquitectura CSS profesional.

## 🎯 Uso Básico

```jsx
import Button from './components/UI/Button';

// Botón principal dorado
<Button variant="primary" size="large" fullWidth>
  INICIAR PARTIDA
</Button>

// Botón secundario para cancelar/volver
<Button variant="secondary" size="medium">
  VOLVER
</Button>

// Botón transparente con hover sutil
<Button variant="ghost" size="medium">
  OPCIÓN SUTIL
</Button>

// Botón para acciones peligrosas
<Button variant="danger" size="medium">
  ELIMINAR
</Button>
```

## 📋 Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'primary'`, `'secondary'`, `'ghost'`, `'danger'` | `'primary'` | Variante visual del botón |
| `size` | `'small'`, `'medium'`, `'large'` | `'medium'` | Tamaño del botón |
| `disabled` | `boolean` | `false` | Si el botón está deshabilitado |
| `loading` | `boolean` | `false` | Muestra spinner de carga |
| `fullWidth` | `boolean` | `false` | Ocupa todo el ancho disponible |
| `organic` | `'light'`, `'heavy'`, `'negative'`, `null` | `null` | Rotación orgánica estilo handwritten |
| `pulse` | `boolean` | `false` | Animación de pulso |
| `selected` | `boolean` | `false` | Estado seleccionado con escalado |
| `className` | `string` | `''` | Clases CSS adicionales (Tailwind) |
| `children` | `ReactNode` | - | Contenido del botón |
| `onClick` | `function` | - | Handler de click |
| `type` | `'button'`, `'submit'`, `'reset'` | `'button'` | Tipo de botón HTML |
| `style` | `object` | - | Estilos inline adicionales |

## 🎨 Variants

### Primary
- **Color**: Dorado `#D4A574` (mismo que "Rey del")
- **Fondo**: Transparente
- **Borde**: Dorado sutil
- **Uso**: Acciones principales

### Secondary  
- **Color**: Blanco
- **Fondo**: Marrón `#5D4037`
- **Uso**: Botones de cancelar/volver

### Ghost
- **Color**: Dorado
- **Fondo**: Transparente
- **Hover**: Fondo sutil
- **Uso**: Acciones secundarias

### Danger
- **Color**: Rojo `#DC143C`
- **Fondo**: Transparente
- **Uso**: Acciones destructivas

## 📏 Sizes

### Small
- **Altura**: 32px
- **Padding**: 8px 16px
- **Font**: 14px

### Medium
- **Altura**: 40px
- **Padding**: 12px 24px
- **Font**: 16px

### Large
- **Altura**: 48px
- **Padding**: 16px 32px
- **Font**: 18px

## 🎭 Efectos Especiales

### Organic Rotation
Simula escritura a mano con rotaciones sutiles:

```jsx
<Button organic="light">Rotación suave</Button>
<Button organic="heavy">Rotación marcada</Button>
<Button organic="negative">Rotación negativa</Button>
```

### Estados Especiales
```jsx
<Button loading>Cargando...</Button>
<Button pulse>Con pulso</Button>
<Button selected>Seleccionado</Button>
<Button disabled>Deshabilitado</Button>
```

## 🔄 Migración desde CSS Inline

### Antes
```jsx
<button
  className="w-full py-4 px-6 fluid-text-lg btn-rey-dorado"
  style={{
    backgroundColor: '#D4A574',
    color: '#3B2414',
    fontWeight: '600',
    // ... más estilos inline
  }}
  onClick={handleClick}
>
  TEXTO
</button>
```

### Después
```jsx
<Button
  variant="primary"
  size="large"
  fullWidth
  onClick={handleClick}
  className="fluid-text-lg"
>
  TEXTO
</Button>
```

## 🏗️ Arquitectura CSS

- **CSS Modules**: Encapsulación sin conflictos
- **Design Tokens**: Variables CSS organizadas
- **Sin !important**: Especificidad natural
- **BEM-like**: Naming conventions claras
- **Responsive**: Mobile-first design

## 🎯 Compatibilidad

- ✅ **Tailwind CSS**: Clases utility compatibles
- ✅ **Responsive**: Breakpoints automáticos
- ✅ **Accesibilidad**: Estados focus/disabled
- ✅ **Touch**: Optimizado para móvil
- ✅ **SSR**: Server-side rendering ready

## 🚀 Performance

- **Bundle size**: Optimizado con CSS Modules
- **Render**: Memoizado internamente
- **Animations**: CSS puro (no JS)
- **Loading**: Lazy loading compatible