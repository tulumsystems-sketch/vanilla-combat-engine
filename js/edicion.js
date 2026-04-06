/**
 * Meeple Combat - Módulo de Edición y Estadísticas
 * Gestión de modificación de atributos de héroe y esbirros.
 * @module Edicion
 */

/**
 * Modifica una estadística sumando o restando (según el modo edicion).
 */
function modificarEstadistica(key) {
    if (typeof edicion === 'undefined' || !edicion) return;
    
    // Obtenemos la entidad seleccionada del GameState
    const target = GameState.seleccionada;
    if (!target) return;

    // Manejo de valores actuales para vida/poder (si es necesario)
    const valorActual = target[key] || 0;
    
    // Implementar la lógica del comando mas/menos o similar
    if (typeof tipoIngreso !== 'undefined' && tipoIngreso === 'mas') {
        target[key] += 1;
    } else {
        target[key] -= 1;
    }

    if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    if (typeof GameState !== 'undefined') GameState.guardar();
}

/**
 * Muestra el valor total de una estadística (incluyendo equipos).
 */
function mostrarEstadistica(tipo, key) {
    const target = (tipo === 'personaje') ? GameState.entidades[0] : GameState.seleccionada;
    if (!target) return;

    let total = target[key] || 0;
    
    // Sumar bonos de equipamiento 1, 2, 3 si existen y tienen el valor key
    [1, 2, 3].forEach(idx => {
        const eq = target[`equipo${idx}`];
        if (eq && eq[key]) total += eq[key];
    });

    if (typeof contenConsola === 'function') {
        const nombreStat = key.charAt(0).toUpperCase() + key.slice(1);
        contenConsola(`${nombreStat}: ${total}`);
    }
}

/**
 * Activa o desactiva el modo de edición visual.
 */
function toggleModoEdicion() {
    if (typeof edicion === 'undefined') return;

    if (edicion === 0) {
        edicion = 1;
        if (typeof editarImg !== 'undefined') editarImg.src = "img/guardar.png";
        mostrarBtnArribaAbajo();
        if (typeof contenConsola === 'function') {
            contenConsola("MODO EDICIÓN: Elige SUBIR o BAJAR y luego toca un atributo.");
        }
    } else {
        cerrarEdicion();
    }
}

function mostrarBtnArribaAbajo() {
    const btn = document.getElementById("btnMasMenos");
    if (btn) btn.style.display = "flex";
}

function ocultarBtnArribaAbajo() {
    const btn = document.getElementById("btnMasMenos");
    if (btn) btn.style.display = "none";
}

function cerrarEdicion() {
    if (typeof edicion === 'undefined') return;
    edicion = 0;
    if (typeof editarImg !== 'undefined') editarImg.src = "img/editar.png";
    ocultarBtnArribaAbajo();
    
    // Restaurar el mensaje por defecto de la consola al cerrar
    if (typeof contenConsola === 'function') {
        contenConsola("CONSOLA");
    }
    
    if (typeof GameState !== 'undefined') GameState.guardar();
}

// Exposición global
window.modificarEstadistica = modificarEstadistica;
window.mostrarEstadistica = mostrarEstadistica;
window.toggleModoEdicion = toggleModoEdicion;
window.cerrarEdicion = cerrarEdicion;
window.mostrarBtnArribaAbajo = mostrarBtnArribaAbajo;
window.ocultarBtnArribaAbajo = ocultarBtnArribaAbajo;
