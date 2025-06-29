<<<<<<< HEAD
# acertijos
=======
# 💕 Acertijos del Corazón

Una experiencia romántica interactiva que combina acertijos personalizados con una carta de amor especial. El proyecto incluye medidas de seguridad avanzadas usando Netlify Functions para proteger tanto la contraseña como el contenido de la carta.

## ✨ Características

- **Interfaz romántica**: Diseño pink/rosa con gradientes y animaciones suaves
- **Acertijos personalizados**: 4 acertijos únicos que forman un código de 5 dígitos
- **Seguridad mejorada**: Lógica de validación y contenido protegido en el servidor
- **Responsive**: Funciona perfectamente en móviles y desktop
- **Animaciones fluidas**: Transiciones suaves entre pantallas
- **Teclado físico**: Soporte para entrada por teclado además del teclado en pantalla

## 🚀 Despliegue Rápido en Netlify

### 1. Subir a GitHub (Opcional)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/acertijos-del-corazon.git
git push -u origin main
```

### 2. Conectar con Netlify
1. Ve a [netlify.com](https://netlify.com) e inicia sesión
2. Click en "New site from Git" o arrastra la carpeta del proyecto
3. Conecta tu repositorio de GitHub (si usaste Git)
4. Configuración de build:
   - **Build command**: Dejar vacío
   - **Publish directory**: `.` (punto)

### 3. Configurar Variables de Entorno
En el panel de Netlify, ve a **Site settings → Environment variables** y añade:

```
CLAVE_SECRETA=39234
JWT_SECRET=unaClaveMuySeguraYLarga2024AcertijosDelCorazon!
```

⚠️ **Importante**: Cambia `JWT_SECRET` por una clave única y segura.

### 4. Desplegar
- El sitio se desplegará automáticamente
- Las funciones serverless se configurarán automáticamente
- Tu sitio estará disponible en `https://tu-sitio.netlify.app`

## 🔧 Desarrollo Local

### Prerequisitos
- Node.js 18+ instalado
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Instalar Netlify CLI globalmente (opcional)
npm install -g netlify-cli

# Desarrollar localmente con funciones serverless
netlify dev
```

El sitio estará disponible en `http://localhost:8888` con las funciones funcionando correctamente.

## 🔐 Arquitectura de Seguridad

### Antes (Inseguro)
- ❌ Contraseña hardcodeada en JavaScript
- ❌ Contenido de la carta visible en HTML
- ❌ Validación solo del lado del cliente

### Después (Seguro)
- ✅ Contraseña almacenada en variables de entorno del servidor
- ✅ Contenido de la carta protegido por autenticación JWT
- ✅ Validación del lado del servidor con Netlify Functions
- ✅ Tokens con expiración automática (10 minutos)

## 📁 Estructura del Proyecto

```
acertijos-del-corazon/
├── index.html              # Página principal
├── app.js                  # JavaScript del cliente (seguro)
├── style.css               # Estilos CSS
├── package.json            # Dependencias del proyecto
├── netlify.toml            # Configuración de Netlify
├── README.md               # Este archivo
└── netlify/
    └── functions/
        ├── login.js        # API de autenticación
        └── carta.js        # API de contenido protegido
```

## 🛠️ Personalización

### Cambiar los Acertijos
Edita el archivo `index.html` en la sección de acertijos:

```html
<div class="acertijo">
    <span class="numero-acertijo">1.</span>
    <p class="texto-acertijo">Tu nuevo acertijo aquí</p>
</div>
```

### Cambiar la Contraseña
1. Actualiza la variable de entorno `CLAVE_SECRETA` en Netlify
2. No necesitas cambiar código

### Personalizar la Carta
Edita el contenido en `netlify/functions/carta.js`:

```javascript
const contenidoCarta = `
    <p>Tu nuevo mensaje romántico aquí...</p>
    <p>Otro párrafo de amor...</p>
`;
```

### Modificar Colores
Los colores están centralizados en variables CSS al inicio de `style.css`:

```css
:root {
    --color-primary: #f48fb1;     /* Rosa principal */
    --color-background: #fce4ec;  /* Fondo */
    --color-text: #4a148c;        /* Texto */
    /* ... más variables */
}
```

## 📱 Uso

1. **Pantalla de Acertijos**: Lee los acertijos personalizados
2. **Pantalla de Código**: Ingresa el código de 5 dígitos
   - Puedes usar el teclado en pantalla o tu teclado físico
   - Usa ⌫ (Backspace) para borrar
3. **Pantalla de Carta**: Lee el mensaje romántico especial

## 🔒 Límites del Plan Gratuito de Netlify

- ✅ **100 GB** de ancho de banda mensual
- ✅ **300 minutos** de build por mes  
- ✅ **125,000 invocaciones** de funciones por mes
- ✅ HTTPS automático con certificados SSL
- ✅ Variables de entorno ilimitadas

Para un proyecto personal, estos límites son más que suficientes.

## 🚨 Solución de Problemas

### Error: "Token inválido"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que `JWT_SECRET` sea la misma en ambas funciones

### Error: "Function not found"
- Verifica que la carpeta `netlify/functions` esté en la raíz del proyecto
- Confirma que `netlify.toml` esté configurado correctamente

### Los estilos no se cargan
- Asegúrate de que `style.css` esté en la raíz del proyecto
- Verifica que no haya errores de sintaxis en el CSS

### Las funciones no funcionan localmente
```bash
# Instalar y usar Netlify CLI
npm install -g netlify-cli
netlify dev
```

## 💡 Mejoras Futuras

- [ ] Agregar más efectos de partículas románticas
- [ ] Implementar música de fondo opcional
- [ ] Añadir más animaciones en la transición a la carta
- [ ] Sistema de pistas para los acertijos
- [ ] Modo oscuro/claro
- [ ] Compartir carta por enlace temporal

## 📞 Soporte

Si tienes problemas con el despliegue:

1. Revisa los logs en el panel de Netlify (Deploy log)
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que los archivos estén en la estructura correcta

## 📄 Licencia

MIT License - Puedes usar este proyecto libremente para tus propios proyectos románticos 💕

---

**¡Hecho con amor para crear momentos especiales! 💕**
>>>>>>> 59df25a (Versión segura con functions)
