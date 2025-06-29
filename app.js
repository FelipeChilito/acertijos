// Variables globales en español
let entrada = '';
let temporizadorError = null;
let procesandoEntrada = false; // Prevenir doble entrada

// Elementos del DOM
const pantallaAcertijos = document.getElementById('pantallaAcertijos');
const pantallaContraseña = document.getElementById('pantallaContraseña');
const pantallaCarta = document.getElementById('pantallaCarta');
const displayEntrada = document.getElementById('displayEntrada');
const mensajeError = document.getElementById('mensajeError');
const contenidoCarta = document.getElementById('contenidoCarta');

/**
 * Función para navegar a la pantalla de contraseña
 */
function irAPantallaContraseña() {
    console.log('Navegando a pantalla de contraseña...');
    // Ocultar pantalla de acertijos
    pantallaAcertijos.classList.remove('activa');
    // Mostrar pantalla de contraseña con animación
    setTimeout(() => {
        pantallaContraseña.classList.add('activa');
        // Reiniciar la entrada al llegar a la pantalla
        reiniciarEntrada();
    }, 300);
}

/**
 * Función para volver a la pantalla de acertijos
 */
function volverAAcertijos() {
    console.log('Volviendo a pantalla de acertijos...');
    // Ocultar pantalla de contraseña
    pantallaContraseña.classList.remove('activa');
    // Mostrar pantalla de acertijos con animación
    setTimeout(() => {
        pantallaAcertijos.classList.add('activa');
    }, 300);
    // Limpiar entrada y mensajes de error
    reiniciarEntrada();
    limpiarMensajeError();
}

/**
 * Función para ingresar un dígito al display
 * @param {string} digito - El dígito a ingresar (0-9)
 */
function ingresarDigito(digito) {
    // Prevenir doble entrada
    if (procesandoEntrada) return;

    // Solo permitir hasta 5 dígitos
    if (entrada.length < 5) {
        procesandoEntrada = true;
        entrada += digito;
        actualizarDisplay();

        // Si se completaron 5 dígitos, validar contraseña
        if (entrada.length === 5) {
            setTimeout(() => {
                validarContraseña();
                procesandoEntrada = false;
            }, 500); // Pausa para mejor UX
        } else {
            // Liberar el procesamiento después de un breve momento
            setTimeout(() => {
                procesandoEntrada = false;
            }, 200);
        }
    }
}

/**
 * Función para borrar el último dígito ingresado
 */
function borrarDigito() {
    if (procesandoEntrada) return;

    if (entrada.length > 0) {
        procesandoEntrada = true;
        entrada = entrada.slice(0, -1);
        actualizarDisplay();
        // Limpiar cualquier mensaje de error si existe
        limpiarMensajeError();

        setTimeout(() => {
            procesandoEntrada = false;
        }, 200);
    }
}

/**
 * Actualiza el display visual con la entrada actual
 */
function actualizarDisplay() {
    const displayTexto = entrada.padEnd(5, '•');
    displayEntrada.textContent = displayTexto;

    // Agregar clase de animación para feedback visual
    displayEntrada.style.transform = 'scale(1.05)';
    setTimeout(() => {
        displayEntrada.style.transform = 'scale(1)';
    }, 150);
}

/**
 * Valida la contraseña usando la API serverless segura
 */
async function validarContraseña() {
    try {
        mostrarCargando();

        // Llamar a la función serverless de login
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clave: entrada })
        });

        if (response.ok) {
            const data = await response.json();
            // Guardar el token de forma segura
            sessionStorage.setItem('token', data.token);
            // Contraseña correcta - cargar y mostrar carta
            await cargarCarta();
        } else {
            // Contraseña incorrecta - mostrar error y limpiar
            mostrarError('Contraseña incorrecta. Intenta de nuevo.');
            setTimeout(() => {
                reiniciarEntrada();
                procesandoEntrada = false;
            }, 2000);
        }
    } catch (error) {
        console.error('Error al validar contraseña:', error);
        mostrarError('Error de conexión. Intenta de nuevo.');
        setTimeout(() => {
            reiniciarEntrada();
            procesandoEntrada = false;
        }, 2000);
    }
}

/**
 * Carga el contenido de la carta de forma segura
 */
async function cargarCarta() {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            mostrarError('Token de acceso no válido.');
            return;
        }

        const response = await fetch('/api/carta', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            mostrarCarta(data.carta);
        } else {
            mostrarError('Error al cargar la carta.');
        }
    } catch (error) {
        console.error('Error al cargar carta:', error);
        mostrarError('Error de conexión al cargar la carta.');
    }
}

/**
 * Muestra el estado de carga
 */
function mostrarCargando() {
    displayEntrada.textContent = '⏳...';
}

/**
 * Muestra un mensaje de error temporalmente
 * @param {string} mensaje - El mensaje de error a mostrar
 */
function mostrarError(mensaje) {
    // Limpiar temporizador anterior si existe
    limpiarMensajeError();

    // Mostrar el mensaje
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mostrar');

    // Programar la limpieza del mensaje después de 3 segundos
    temporizadorError = setTimeout(() => {
        limpiarMensajeError();
    }, 3000);
}

/**
 * Limpia el mensaje de error
 */
function limpiarMensajeError() {
    if (temporizadorError) {
        clearTimeout(temporizadorError);
        temporizadorError = null;
    }

    mensajeError.classList.remove('mostrar');
    setTimeout(() => {
        if (!mensajeError.classList.contains('mostrar')) {
            mensajeError.textContent = '';
        }
    }, 250);
}

/**
 * Reinicia la entrada y el display
 */
function reiniciarEntrada() {
    entrada = '';
    actualizarDisplay();
}

/**
 * Muestra la pantalla de la carta con animación
 * @param {string} contenido - El contenido de la carta
 */
function mostrarCarta(contenido) {
    console.log('Mostrando carta...');

    // Insertar el contenido de la carta
    contenidoCarta.innerHTML = contenido;

    // Desactivar la pantalla de contraseña
    pantallaContraseña.classList.remove('activa');

    // Activar la pantalla de carta inmediatamente
    pantallaCarta.classList.add('activa');

    // Aplicar animación a la libreta
    const libreta = pantallaCarta.querySelector('.libreta');
    if (libreta) {
        libreta.style.transform = 'translateY(30px) scale(0.95)';
        libreta.style.opacity = '0';

        // Usar requestAnimationFrame para asegurar que los estilos se apliquen
        requestAnimationFrame(() => {
            libreta.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            libreta.style.transform = 'translateY(0) scale(1)';
            libreta.style.opacity = '1';
        });
    }
}

/**
 * Maneja las teclas del teclado físico
 * @param {KeyboardEvent} evento - El evento de teclado
 */
function manejarTecladoFisico(evento) {
    const tecla = evento.key;

    // Solo procesar si estamos en la pantalla de contraseña
    if (!pantallaContraseña.classList.contains('activa')) {
        return;
    }

    // Prevenir comportamiento por defecto para las teclas que manejamos
    if (/^[0-9]$/.test(tecla) || tecla === 'Backspace' || tecla === 'Delete') {
        evento.preventDefault();
    }

    // Manejar dígitos (0-9)
    if (/^[0-9]$/.test(tecla)) {
        ingresarDigito(tecla);
    }

    // Manejar tecla de borrar
    if (tecla === 'Backspace' || tecla === 'Delete') {
        borrarDigito();
    }
}

/**
 * Inicialización cuando se carga la página
 */
function inicializar() {
    console.log('Inicializando aplicación de Acertijos del Corazón...');

    // Verificar que todos los elementos existen
    if (!pantallaAcertijos || !pantallaContraseña || !pantallaCarta || !displayEntrada || !mensajeError) {
        console.error('Error: No se pudieron encontrar todos los elementos del DOM');
        return;
    }

    // Agregar event listener para el teclado físico
    document.addEventListener('keydown', manejarTecladoFisico);

    // Asegurar que el display esté correctamente inicializado para 5 dígitos
    actualizarDisplay();

    // Asegurar que solo la pantalla de acertijos esté visible al inicio
    pantallaAcertijos.classList.add('activa');
    pantallaContraseña.classList.remove('activa');
    pantallaCarta.classList.remove('activa');

    // Agregar animación de entrada a la pantalla de acertijos
    setTimeout(() => {
        const contenedorAcertijos = pantallaAcertijos.querySelector('.contenedor-acertijos');
        if (contenedorAcertijos) {
            contenedorAcertijos.style.transform = 'translateY(0)';
            contenedorAcertijos.style.opacity = '1';
        }
    }, 100);

    console.log('Aplicación de Acertijos del Corazón inicializada correctamente');
}

// Prevenir zoom en dispositivos móviles al hacer doble tap
let ultimoToque = 0;
document.addEventListener('touchend', function(evento) {
    const ahora = (new Date()).getTime();
    if (ahora - ultimoToque < 300) {
        evento.preventDefault();
    }
    ultimoToque = ahora;
}, false);

// Prevenir selección de texto en elementos interactivos
document.addEventListener('selectstart', function(evento) {
    if (evento.target.classList.contains('tecla') ||
        evento.target.classList.contains('btn') ||
        evento.target.classList.contains('display-entrada')) {
        evento.preventDefault();
    }
});

// Esperar a que se cargue completamente el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    // Si el DOM ya está cargado, inicializar inmediatamente
    inicializar();
}