# Optimización y Manipulación de Imágenes

En este proyecto el objetivo principal es crear una web interactiva que demuestre diferentes técnicas de optimización y manipulación de imágenes.

![alt text](image.png)

## Tecnologías Utilizadas

Para el desarrollo de este proyecto se han utilizado las siguientes tecnologías:

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- jsPDF
- React Markdown

## Estructura del Proyecto

### Páginas y Ejercicios
1. **Home**: Introducción teórica y objetivos del proyecto
2. **Ejercicio 1**: Optimización de imágenes con conversión entre formatos
3. **Ejercicio 2**: Implementación de Lazy Loading en imágenes
4. **Ejercicio 3**: Manipulación de imágenes con Canvas en React
5. **Ejercicio 4**: Integración de imágenes de Figma a React
6. **Ejercicio 5**: Creación de un tutorial interactivo con los ejercicios

### Características Principales
- Home con introducción y objetivos
- Navbar con navegación entre ejercicios
- Optimización de imágenes con conversión entre formatos
- Lazy Loading para mejorar el rendimiento
- Manipulación de imágenes con Canvas en React
- Integración con Figma y exportación a JSX
- Tutorial interactivo con Markdown y exportación a PDF

# Crear Proyecto

```bash
npm create vite@latest optimizacion-imagenes --template react 
cd optimizacion-imagenes 
npm install 
npm install react-router-dom @types/react-router-dom
npm install jspdf @types/jspdf
npm install react-markdown
```

# Instalaciones

## Tailwind
Como se indica en la documentación (https://tailwindcss.com/docs/installation/using-vite), la instalación y configuración de TailwindCSSv4 se realiza de la siguiente manera:
```bash
npm install tailwindcss @tailwindcss/vite
npm run dev
```

En vite.config.ts configurar Tailwind:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

En src/index.css:
```css
@import "tailwindcss";
```

# React + TypeScript + Vite

Esta plantilla proporciona una configuración mínima para hacer funcionar React en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay disponibles dos plugins oficiales:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utiliza [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh

## Ampliar la Configuración de ESLint

Si estás desarrollando una aplicación de producción, actualiza la configuración para habilitar reglas de lint con soporte de tipos:

```js
export default tseslint.config({
  extends: [
    // Eliminar ...tseslint.configs.recommended y reemplazar con esto
    ...tseslint.configs.recommendedTypeChecked,
    // Alternativamente, usar esto para reglas más estrictas
    ...tseslint.configs.strictTypeChecked,
    // Opcionalmente, añadir esto para reglas de estilo
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

También puedes instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas de lint específicas de React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Añadir los plugins react-x y react-dom
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // otras reglas...
    // Habilitar sus reglas de typescript recomendadas
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
