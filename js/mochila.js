/**
 * Meeple Combat - Módulo de Mochila
 * Gestión de moneda global, consumibles e inventario de mochilas.
 * @module Mochila
 */

/**
 * Actualiza los elementos de la interfaz de mochila.
 */
function actualizarMochila() {
    if (typeof capital === 'undefined' || typeof itemMochila === 'undefined') return;

    // Actualizar monedas en la UI principal (legacy, ahora oculta)
    const oroTxt = document.getElementById("oroTxt");
    const plataTxt = document.getElementById("plataTxt");
    const bronceTxt = document.getElementById("bronceTxt");

    if (oroTxt) oroTxt.textContent = capital.oro;
    if (plataTxt) plataTxt.textContent = capital.plata;
    if (bronceTxt) bronceTxt.textContent = capital.bronce;

    // Actualizar monedas en el modal de mochila
    const oroMochilaTxt = document.getElementById("oroMochilaTxt");
    const plataMochilaTxt = document.getElementById("plataMochilaTxt");
    const bronceMochilaTxt = document.getElementById("bronceMochilaTxt");

    if (oroMochilaTxt) oroMochilaTxt.textContent = capital.oro;
    if (plataMochilaTxt) plataMochilaTxt.textContent = capital.plata;
    if (bronceMochilaTxt) bronceMochilaTxt.textContent = capital.bronce;

    // Actualizar items de mochila (1-3)
    for (let i = 1; i <= 3; i++) {
        const item = document.getElementById(`itemMochila${i}`);
        if (item) item.textContent = itemMochila[i] || "";
    }
}

/**
 * Resta una moneda de un tipo y maneja el cambio (si es necesario).
 */
function restarMonedas(tipo) {
    if (typeof capital === 'undefined') return;

    switch (tipo) {
        case "oro":
            if (capital.oro > 0) capital.oro--;
            break;
        case "plata":
            if (capital.plata === 0 && capital.oro > 0) {
                capital.oro--;
                capital.plata += 9;
            } else if (capital.plata > 0) {
                capital.plata--;
            }
            break;
        case "bronce":
            if (capital.bronce === 0 && capital.plata > 0) {
                capital.plata--;
                capital.bronce += 9;
            } else if (capital.bronce > 0) {
                capital.bronce--;
            }
            break;
    }

    if (typeof GameState !== 'undefined') GameState.guardar();
    actualizarMochila();
}

/**
 * Suma una moneda de un tipo y maneja el cambio (si es necesario).
 */
function sumarMonedas(tipo) {
    if (typeof capital === 'undefined') return;

    switch (tipo) {
        case "oro":
            capital.oro++;
            break;
        case "plata":
            capital.plata++;
            break;
        case "bronce":
            capital.bronce++;
            break;
    }

    // Conversión automática (cada 10 unidades sube un nivel)
    if (capital.bronce >= 10) {
        capital.bronce -= 10;
        capital.plata++;
    }
    if (capital.plata >= 10) {
        capital.plata -= 10;
        capital.oro++;
    }

    if (typeof GameState !== 'undefined') GameState.guardar();
    actualizarMochila();
}

/**
 * Cambia el nombre de un item de la mochila tras comando o evento.
 */
function cambiarItemMochila(txt) {
    if (typeof itemMochila !== 'undefined' && typeof idxitemMochila !== 'undefined') {
        itemMochila[idxitemMochila] = txt;
        if (typeof GameState !== 'undefined') GameState.guardar();
        actualizarMochila();
    }
}

/**
 * Inicializa los listeners para la edición de la mochila.
 */
function inicializarMochilaUI() {
    // === Edición de Items de Mochila ===
    [1, 2, 3].forEach(i => {
        const item = document.getElementById(`itemMochila${i}`);
        if (item) {
            item.addEventListener('click', () => {
                const nuevoItem = prompt("Ingresa el nombre del objeto para este slot:", item.textContent === "" ? "" : item.textContent);
                if (nuevoItem !== null) {
                    window.idxitemMochila = i; 
                    if (typeof cambiarItemMochila === 'function') {
                        cambiarItemMochila(nuevoItem || "");
                    }
                }
            });
        }
    });
}

// Vinculación de eventos de click/touchstart para monedas en inicialización (o delegación)
// Se delega a main.js para evitar cargar en tiempo inesperado o moverlo aquí.
window.actualizarMochila = actualizarMochila;
window.sumarMonedas = sumarMonedas;
window.restarMonedas = restarMonedas;
window.cambiarItemMochila = cambiarItemMochila;
window.inicializarMochilaUI = inicializarMochilaUI;
