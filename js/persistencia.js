/**
 * Meeple Combat - Módulo de Persistencia
 * Gestión de guardado, carga y exportación de partidas.
 * @module Persistencia
 */

/**
 * Guarda el estado completo de la partida.
 */
function guardarPartida() {
    if (typeof GameState !== 'undefined') {
        GameState.guardar();
    }
}

/**
 * Carga el estado de la partida y actualiza la interfaz.
 */
function cargarPartida() {
    if (typeof GameState !== 'undefined' && GameState.cargar()) {
        if (typeof actualizarMochila === 'function') actualizarMochila();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
        return true;
    }
    return false;
}

/**
 * Exporta el localStorage a un archivo .txt.
 */
function exportarPartidaComoTxt() {
    try {
        const backup = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            backup[key] = localStorage.getItem(key);
        }

        const contenido = JSON.stringify(backup, null, 2);
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const enlace = document.createElement('a');
        const fecha = new Date().toISOString().slice(0, 10);
        enlace.href = url;
        enlace.download = `meeplecombat-partida-${fecha}.txt`;

        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);

        if (typeof contenConsola === 'function') {
            contenConsola("Partida exportada correctamente.");
        }
    } catch (e) {
        console.error("Error al exportar:", e);
    }
}

/**
 * Importa una partida desde un archivo.
 */
function manejarImportarArchivoPartida(evento) {
    const file = evento.target.files[0];
    if (!file) return;

    const lector = new FileReader();
    lector.onload = (e) => {
        try {
            const backup = JSON.parse(e.target.result);
            Object.keys(backup).forEach(key => localStorage.setItem(key, backup[key]));
            
            if (typeof contenConsola === 'function') {
                contenConsola("Partida importada. Recargando...");
            }
            setTimeout(() => window.location.reload(), 700);
        } catch (err) {
            console.error("Error importando:", err);
        }
    };
    lector.readAsText(file);
}

// Exponer globalmente para compatibilidad con main.js y triggers de UI
window.guardarPartida = guardarPartida;
window.cargarPartida = cargarPartida;
window.exportarPartidaComoTxt = exportarPartidaComoTxt;
window.manejarImportarArchivoPartida = manejarImportarArchivoPartida;
