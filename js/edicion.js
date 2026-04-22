/**
 * Meeple Combat - Módulo de Edición y Estadísticas
 * Gestión de modificación de atributos de héroe y esbirros.
 * Replica el comportamiento de la carpeta interfaz.
 * @module Edicion
 */

/**
 * Muestra el valor total de una estadística (incluyendo equipos).
 */
function mostrarEstadistica(tipo, key) {
    const target = (tipo === 'personaje') ? GameState.entidades[0] : GameState.seleccionada;
    if (!target) return;

    let total = target[key] || 0;

    // Sumar bonos de equipamiento
    [1, 2, 3].forEach(idx => {
        const eq = target[`equipo${idx}`];
        if (eq && eq[key]) total += Number(eq[key]);
    });

    if (typeof contenConsola === 'function') {
        const nombreStat = key.charAt(0).toUpperCase() + key.slice(1);
        contenConsola(`${nombreStat} ${total}`);
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
        if (typeof contenConsola === 'function') {
            contenConsola("Seleccione nombre, slot de arma o habilidad");
        }
        const expLabel = document.getElementById("experienciaTxt");
        if (expLabel) expLabel.style.display = "flex";
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    } else {
        cerrarEdicion();
    }
}

/**
 * Muestra los botones de flechas arriba/abajo.
 * En legacy se muestra para CUALQUIER stat en edición, y solo vida/poder en juego.
 */
function mostrarBtnArribaAbajo() {
    const btn = document.getElementById("btnMasMenos");
    if (btn) btn.style.display = "grid";
}

function ocultarBtnArribaAbajo() {
    const btn = document.getElementById("btnMasMenos");
    if (btn) btn.style.display = "none";
    window.statSeleccionadaParaFlechas = null;
    if (typeof GameState !== 'undefined') GameState.guardar();
}

function cerrarEdicion() {
    if (typeof edicion === 'undefined') return;
    edicion = 0;
    if (typeof editarImg !== 'undefined') editarImg.src = "img/editar.png";

    const btn = document.getElementById("btnMasMenos");
    if (btn) btn.style.display = "none";
    window.statSeleccionadaParaFlechas = null;

    const expLabel = document.getElementById("experienciaTxt");
    if (expLabel) expLabel.style.display = "none";

    if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    if (typeof GameState !== 'undefined') GameState.guardar();
}

/**
 * Ajusta la estadística seleccionada.
 * En modo edición: sube/baja stats base con costo de EXP (como legacy).
 * En modo juego: solo ajusta vida/poder actual, gratis, limitado por máximo + equipos.
 */
function ajustarStatSeleccionada(valor) {
    if (!window.statSeleccionadaParaFlechas) return;
    
    const target = GameState.seleccionada;
    if (!target) return;
    
    const stat = window.statSeleccionadaParaFlechas;
    const isEditing = (typeof edicion !== 'undefined' && edicion);

    if (isEditing) {
        // === Modo edición: costo de EXP ===
        const isMas = valor > 0;

        if (isMas) {
            let costo = 1;
            if (stat !== 'vidaMaxima' && stat !== 'poderMaximo') {
                costo = ((target[stat] || 0) + 1) * (valorExperiencia[stat] || 1);
            }

            if ((target.experiencia || 0) >= costo) {
                target[stat] = (target[stat] || 0) + 1;
                target.experiencia -= costo;
            } else if (typeof contenConsola === 'function') {
                contenConsola("Experiencia insuficiente");
                return;
            }
        } else {
            if ((target[stat] || 0) > 0) {
                target[stat]--;

                // Devolver EXP
                let reembolso = 1;
                if (stat !== 'vidaMaxima' && stat !== 'poderMaximo') {
                    reembolso = ((target[stat] || 0) + 1) * (valorExperiencia[stat] || 1);
                }
                target.experiencia = (target.experiencia || 0) + reembolso;

                // Si el actual supera al nuevo máximo, bajar el actual
                if (stat === 'vidaMaxima' && target.vida > target.vidaMaxima) target.vida = target.vidaMaxima;
                if (stat === 'poderMaximo' && target.poder > target.poderMaximo) target.poder = target.poderMaximo;
            }
        }
    } else {
        // === Modo juego: solo vida/poder actual ===
        if (stat !== 'vida' && stat !== 'poder') return;

        const valorBase = Number(target[stat] || 0);
        target[stat] = valorBase + valor;
        
        if (target[stat] < 0) target[stat] = 0;
        
        // Limitar al máximo con equipos
        const keyMax = (stat === 'poder') ? 'poderMaximo' : 'vidaMaxima';
        let maxVal = Number(target[keyMax] || 0);
        
        [1, 2, 3].forEach(idx => {
            const eq = target[`equipo${idx}`];
            if (eq && eq[keyMax]) maxVal += Number(eq[keyMax]);
        });

        if (target[stat] > maxVal) target[stat] = maxVal;
    }
    
    if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    if (typeof GameState !== 'undefined') GameState.guardar();
    actualizarConsolaAtributo();
}

/**
 * Muestra en la consola el valor actual de la estadística seleccionada.
 * Replica el formato legacy: "Vida 10 / 20", "Ataque 5", etc.
 */
function actualizarConsolaAtributo() {
    if (typeof contenConsola !== 'function') return;
    
    const target = GameState.seleccionada;
    if (!target) return;
    
    const stat = window.statSeleccionadaParaFlechas;
    if (!stat) return;

    const consolaBtn = document.getElementById("consolaBtn");
    if (!consolaBtn) return;
    
    const nombres = {
        vida: 'Vida', poder: 'Maná', ataque: 'Ataque',
        esquiva: 'Esquiva', bloqueo: 'Bloqueo', velocidad: 'Velocidad',
        vidaMaxima: 'Vida', poderMaximo: 'Maná'
    };
    
    const nombre = nombres[stat] || stat;
    const actual = target[stat] || 0;
    
    if (stat === 'vida' || stat === 'vidaMaxima') {
        const keyMax = 'vidaMaxima';
        let maxVal = Number(target[keyMax] || 0);
        [1, 2, 3].forEach(idx => {
            const eq = target[`equipo${idx}`];
            if (eq && eq[keyMax]) maxVal += Number(eq[keyMax]);
        });
        const vidaActual = (stat === 'vidaMaxima') ? target.vida : actual;
        consolaBtn.innerHTML = `Vida ${vidaActual} / ${(stat === 'vidaMaxima') ? target.vidaMaxima : maxVal}`;
    } else if (stat === 'poder' || stat === 'poderMaximo') {
        const keyMax = 'poderMaximo';
        let maxVal = Number(target[keyMax] || 0);
        [1, 2, 3].forEach(idx => {
            const eq = target[`equipo${idx}`];
            if (eq && eq[keyMax]) maxVal += Number(eq[keyMax]);
        });
        const poderActual = (stat === 'poderMaximo') ? target.poder : actual;
        consolaBtn.innerHTML = `Maná ${poderActual} / ${(stat === 'poderMaximo') ? target.poderMaximo : maxVal}`;
    } else {
        consolaBtn.innerHTML = `${nombre} ${actual}`;
    }
}

// Exposición global
window.mostrarEstadistica = mostrarEstadistica;
window.toggleModoEdicion = toggleModoEdicion;
window.cerrarEdicion = cerrarEdicion;
window.mostrarBtnArribaAbajo = mostrarBtnArribaAbajo;
window.ocultarBtnArribaAbajo = ocultarBtnArribaAbajo;
window.ajustarStatSeleccionada = ajustarStatSeleccionada;
window.actualizarConsolaAtributo = actualizarConsolaAtributo;
