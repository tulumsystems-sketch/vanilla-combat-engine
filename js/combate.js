/**
 * Meeple Combat - Módulo de Combate y Acción
 * Gestión de ataques, daño, habilidades y resultados de combate.
 * @module Combate
 */

/**
 * Ejecuta la acción del personaje o esbirro seleccionado.
 */
function accion() {
    const target = GameState.seleccionada;
    if (!target) return;

    // Determinar qué arma o ataque se está usando
    let armaALeer = (typeof slotArmaActiva !== 'undefined' && slotArmaActiva === 2) ? 2 : 1;
    let arma = target[`arma${armaALeer}`];

    // Lógica de daño 
    let dannoBase = arma.danno || 0;
    let bonusAtaque = target.ataque || 0;
    
    // Sumar bonus de equipos si existen
    [1, 2, 3].forEach(idx => {
        if (target[`equipo${idx}`] && target[`equipo${idx}`].ataque) {
            bonusAtaque += target[`equipo${idx}`].ataque;
        }
    });

    // Lógica de daño multiplicativa (según diseño original)
    let totalDanno = bonusAtaque * dannoBase;

    // Redondear para evitar decimales extraños
    totalDanno = Math.floor(totalDanno);

    // Mostrar en consola
    if (typeof contenConsola === 'function') {
        const mensaje = `${target.nombre.toUpperCase()} ATACA CON ${arma.nombre.toUpperCase()}: ${totalDanno} DE DAÑO.`;
        contenConsola(mensaje);
    }
}

/**
 * Gestiona el uso de una habilidad cobrando su coste de maná/poder.
 */
function usarHabilidad(ranura) {
    const target = GameState.seleccionada;
    if (!target) return;

    const habilidad = target[`habilidad${ranura}`];
    if (habilidad && habilidad.coste <= target.poder) {
        target.poder -= habilidad.coste;
        if (typeof contenConsola === 'function') {
            contenConsola(`${target.nombre.toUpperCase()} USA ${habilidad.nombre.toUpperCase()}: ${habilidad.descripcion}`);
        }
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
        if (typeof GameState !== 'undefined') GameState.guardar();
    } else {
        if (typeof contenConsola === 'function') {
            contenConsola("Poder insuficiente para usar la habilidad.");
        }
    }
}

// Exposición global
window.accion = accion;
window.usarHabilidad = usarHabilidad;
