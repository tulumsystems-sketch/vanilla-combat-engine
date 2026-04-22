/**
 * Meeple Combat - Módulo de Combate y Acción
 * Gestión de ataques, daño, habilidades y resultados de combate.
 * Replica exactamente la función accion() de la carpeta interfaz.
 * @module Combate
 */

/**
 * Ejecuta la acción del personaje o esbirro seleccionado.
 * Usa window.objetoAccion para saber qué tipo de acción ejecutar:
 *   - "arma": ataque con arma (usa slotArmaSeleccionada)
 *   - "habilidad": lanzar habilidad (usa slotHabilidadSeleccionada + arma seleccionada)
 *   - "estadistica": tirada limpia de atributo (usa slotEstadisticaSeleccionada numérico)
 */
function accion() {
    const target = GameState.seleccionada;
    if (!target) return;

    // Calcular atributos totales (base + equipos)
    const atributos = {
        ataque: target.ataque || 0,
        esquiva: target.esquiva || 0,
        bloqueo: target.bloqueo || 0,
        velocidad: target.velocidad || 0,
        vidaMaxima: target.vidaMaxima || 0,
        poderMaximo: target.poderMaximo || 0
    };

    [1, 2, 3].forEach(idx => {
        const eq = target[`equipo${idx}`];
        if (eq) {
            for (const key in atributos) {
                if (eq[key]) atributos[key] += eq[key];
            }
        }
    });

    const ataque = atributos.ataque;
    const esquiva = atributos.esquiva;
    const bloqueo = atributos.bloqueo;
    const velocidad = atributos.velocidad;

    const dado = Math.floor(Math.random() * 20) + 1;
    const obj = window.objetoAccion || "arma";

    // =========================
    // ACCIÓN CON ARMA
    // =========================
    if (obj === "arma") {
        const slot = window.slotArmaSeleccionada || 1;
        const arma = target[`arma${slot}`];
        if (!arma) return;

        let tipo = arma.tipo || "marcial";
        if (tipo === "null" || tipo === "") tipo = "marcial";
        const dannoBase = arma.danno || 0;
        const alcanceBase = arma.alcance || 0;

        // ARMA MARCIAL (ATAQUE)
        if (tipo === "marcial") {
            if (dado >= 19) {
                contenConsola(`ATAQUE CON ${arma.nombre.toUpperCase()}<br>¡CRITICO!<br>Efecto base ${Math.floor((dannoBase * ataque) * 2)}`);
            } else if (dado === 1) {
                contenConsola(`ATAQUE CON ${arma.nombre.toUpperCase()}<br>¡PIFIA!<br>Efecto base 0`);
            } else {
                contenConsola(`ATAQUE CON: ${arma.nombre.toUpperCase()}<br>TIRADA: ${dado}<br>TOTAL: ${dado + ataque}<br>EFECTO/DAÑO: ${Math.floor(dannoBase * ataque)}<br>ALCANCE: ${ataque * alcanceBase}`);
            }
        }

        // ARMA DE PROTECCIÓN (BLOQUEO)
        if (tipo === "proteccion") {
            if (dado >= 19) {
                contenConsola(`Bloqueo con ${arma.nombre}<br>¡CRITICO!<br>Efecto base ${Math.floor((dannoBase * bloqueo) * 2)}`);
            } else if (dado === 1) {
                contenConsola(`Bloqueo con ${arma.nombre}<br>¡PIFIA!<br>Efecto base 0`);
            } else {
                contenConsola(`Bloqueo con: ${arma.nombre}<br>TIRADA: ${dado}<br>TOTAL: ${dado + bloqueo}<br>EFECTO/DAÑO: ${Math.floor(dannoBase * bloqueo)}<br>ALCANCE: ${bloqueo * alcanceBase}`);
            }
        }

        // ARMA MECANO-MÁGICA (COSTE DE PODER)
        if (tipo === "mecanomagica") {
            if (target.poder < (arma.coste || 0)) {
                contenConsola("Poder insuficiente");
                return;
            }
            target.poder -= (arma.coste || 0);
            if (typeof GameState !== 'undefined') GameState.guardar();
            if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
        }
    }

    // =========================
    // ACCIÓN CON HABILIDAD
    // =========================
    else if (obj === "habilidad") {
        const slotHab = window.slotHabilidadSeleccionada || 1;
        const habilidad = target[`habilidad${slotHab}`];
        if (!habilidad) return;

        if (target.poder < (habilidad.coste || 0)) {
            contenConsola("Maná insuficiente");
            return;
        }

        // Usar el arma seleccionada (subrayada) como arma activa
        const slotArma = window.slotArmaSeleccionada || 1;
        let arma = target[`arma${slotArma}`];
        if (!arma) arma = { nombre: "Nada", tipo: "marcial", danno: 0, alcance: 0 };

        let tipo = arma.tipo || "marcial";
        if (tipo === "null" || tipo === "") tipo = "marcial";
        const dannoBase = arma.danno || 0;
        const alcanceBase = arma.alcance || 0;
        const costeHab = habilidad.coste || 0;

        // HABILIDAD + ARMA MARCIAL
        if (tipo === "marcial") {
            if (dado >= 19) {
                contenConsola(`Lanzas ${habilidad.nombre} con ${arma.nombre}<br>¡CRITICO!<br>Efecto base = ${Math.floor(((dannoBase * ataque) + costeHab) * 2)}`);
            } else if (dado === 1) {
                contenConsola(`Intentas lanzar ${habilidad.nombre} con ${arma.nombre}<br>¡PIFIA!<br>Efecto base 0`);
            } else {
                contenConsola(`Lanzas ${habilidad.nombre} con ${arma.nombre}<br>Tirada = ${dado + ataque}<br>Efecto base = ${Math.floor((dannoBase * ataque) + costeHab)}<br>ALCANCE: ${ataque * alcanceBase}`);
            }
        }

        // HABILIDAD + ARMA DE PROTECCIÓN
        if (tipo === "proteccion") {
            if (dado >= 19) {
                contenConsola(`Canalizas ${habilidad.nombre} con ${arma.nombre}<br>¡CRITICO!<br>Efecto base = ${Math.floor(((dannoBase * bloqueo) + costeHab) * 2)}`);
            } else if (dado === 1) {
                contenConsola(`Fallás al canalizar ${habilidad.nombre} con ${arma.nombre}<br>¡PIFIA!<br>Efecto base 0`);
            } else {
                contenConsola(`Canalizas ${habilidad.nombre} con ${arma.nombre}<br>Tirada = ${dado + bloqueo}<br>Efecto base = ${Math.floor((dannoBase * bloqueo) + costeHab)}<br>ALCANCE: ${bloqueo * alcanceBase}`);
            }
        }

        // HABILIDAD + ARMA MECANO-MÁGICA
        if (tipo === "mecanomagica") {
            if (target.poder < (arma.coste || 0)) {
                contenConsola("Poder insuficiente para el arma");
                return;
            }
            target.poder -= (arma.coste || 0);
        }

        // Descontar coste de habilidad
        target.poder -= costeHab;
        if (typeof GameState !== 'undefined') GameState.guardar();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    }

    // =========================
    // TIRADA CON ESTADÍSTICA
    // =========================
    else if (obj === "estadistica") {
        const slot = window.slotEstadisticaSeleccionada || 1;
        switch (slot) {
            case 1: // Ataque
                if (dado >= 19) contenConsola(`Ataque limpio<br>¡CRITICO!`);
                else if (dado === 1) contenConsola(`Ataque limpio<br>¡PIFIA!`);
                else contenConsola(`Ataque limpio<br>${dado + ataque}`);
                break;
            case 2: // Esquiva
                if (dado >= 19) contenConsola(`Esquiva<br>¡CRITICO!`);
                else if (dado === 1) contenConsola(`Esquiva<br>¡PIFIA!`);
                else contenConsola(`Esquiva<br>${dado + esquiva}`);
                break;
            case 3: // Bloqueo
                if (dado >= 19) contenConsola(`Bloquea<br>¡CRITICO!`);
                else if (dado === 1) contenConsola(`Bloquea<br>¡PIFIA!`);
                else contenConsola(`Bloquea<br>${dado + bloqueo}`);
                break;
            case 4: // Velocidad
                if (dado >= 19) contenConsola(`Corre<br>¡CRITICO!`);
                else if (dado === 1) contenConsola(`Corre<br>¡PIFIA!`);
                else contenConsola(`Corre<br>${dado + velocidad}`);
                break;
            case 5: // Tirada limpia (vida)
            case 6: // Tirada limpia (poder)
                if (dado >= 19) contenConsola(`Tirada limpia<br>¡CRITICO!<br>${dado}`);
                else if (dado === 1) contenConsola(`Tirada limpia<br>¡PIFIA!`);
                else contenConsola(`Tirada limpia<br>${dado}`);
                break;
            default:
                contenConsola(`Tirada: ${dado}`);
                break;
        }
    }
}

// Exposición global
window.accion = accion;
