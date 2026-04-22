/**
 * Meeple Combat - Módulo de Renderizado y UI
 * Gestión de la actualización visual de la ficha de personaje.
 * Replica exactamente imprimirPersonaje() de la carpeta interfaz.
 * @module UIRender
 */

/**
 * Refresca todos los elementos visuales de la entidad seleccionada.
 * No resetea selección de stat ni flechas (eso se maneja desde eventos).
 */
function imprimirPersonaje() {
    const entidad = (typeof entidades !== 'undefined' && typeof indexVisualizado !== 'undefined') 
        ? entidades[indexVisualizado] : null;
    
    if (!entidad) return;

    // Actualizar portada y nombre
    const portadaImg = document.getElementById("portadaImg");
    const nombreTxt = document.getElementById("nombreTxt");
    const esbirrosImg = document.getElementById("esbirrosImg");
    
    if (portadaImg) portadaImg.src = entidad.portada;

    if (nombreTxt) {
        let nombreDisplay = (entidad.nombre || "").toUpperCase();
        if (window.indexVisualizado > 0 && nombreDisplay === "ESBIRRO") {
            nombreDisplay = `ESBIRRO ${window.indexVisualizado}`;
        }
        nombreTxt.textContent = nombreDisplay;
    }

    if (esbirrosImg) {
        esbirrosImg.src = (indexVisualizado === 0) ? "img/esbirrosico.png" : "img/personajeico.png";
    }

    // Gestionar UI de la consola y flechas de esbirros
    const consolaBtn = document.getElementById("consolaBtn");
    const textoNavEsbirro = document.getElementById("textoNavEsbirro");
    const izquierdaBtn = document.getElementById("izquierdaBtn");
    const derechaBtn = document.getElementById("derechaBtn");

    if (window.indexVisualizado > 0) {
        if (consolaBtn) consolaBtn.style.display = "none";
        if (textoNavEsbirro) textoNavEsbirro.style.display = "block";
        if (izquierdaBtn) izquierdaBtn.style.display = "flex";
        if (derechaBtn) derechaBtn.style.display = "flex";
    } else {
        if (consolaBtn) consolaBtn.style.display = "block";
        if (textoNavEsbirro) textoNavEsbirro.style.display = "none";
        if (izquierdaBtn) izquierdaBtn.style.display = "none";
        if (derechaBtn) derechaBtn.style.display = "none";
    }

    // Calcular atributos totales (base + equipos) para mostrar en la UI
    const totales = {
        ataque: Number(entidad.ataque || 0),
        esquiva: Number(entidad.esquiva || 0),
        bloqueo: Number(entidad.bloqueo || 0),
        velocidad: Number(entidad.velocidad || 0)
    };

    [1, 2, 3].forEach(idx => {
        const eq = entidad[`equipo${idx}`];
        if (eq) {
            for (const key in totales) {
                if (eq[key]) totales[key] += Number(eq[key]);
            }
        }
    });

    // Actualizar textos en el DOM
    // Legacy: ataque/esquiva/bloqueo/velocidad = total con equipos
    //         vida/poder = valor ACTUAL (no máximo)
    const ataqueTxt = document.getElementById("ataqueTxt");
    const esquivaTxt = document.getElementById("esquivaTxt");
    const bloqueoTxt = document.getElementById("bloqueoTxt");
    const velocidadTxt = document.getElementById("velocidadTxt");
    const vidaTxt = document.getElementById("vidaTxt");
    const poderTxt = document.getElementById("poderTxt");

    if (ataqueTxt) ataqueTxt.textContent = totales.ataque;
    if (esquivaTxt) esquivaTxt.textContent = totales.esquiva;
    if (bloqueoTxt) bloqueoTxt.textContent = totales.bloqueo;
    if (velocidadTxt) velocidadTxt.textContent = totales.velocidad;
    if (vidaTxt) vidaTxt.textContent = entidad.vida || 0;
    if (poderTxt) poderTxt.textContent = entidad.poder || 0;

    // Actualizar armas (nombres e imágenes)
    [1, 2].forEach(idx => {
        const arma = entidad[`arma${idx}`];
        const img = document.getElementById(`arma${idx}Img`);
        const txt = document.getElementById(`arma${idx}Txt`);
        
        const tieneArma = arma && arma.nombre && arma.nombre.toUpperCase() !== "NADA";
        
        if (img) img.src = tieneArma ? (arma.icono || "img/nada.png") : "img/nada.png";
        if (txt) txt.textContent = tieneArma ? arma.nombre.toUpperCase() : `ARMA ${idx}`;
    });

    // Actualizar habilidades
    [1, 2, 3].forEach(idx => {
        const hab = entidad[`habilidad${idx}`];
        const txt = document.getElementById(`habilidad${idx}Txt`);
        if (txt) {
            let displayText = `HABILIDAD ${idx}`;
            if (hab && hab.nombre && hab.nombre.toUpperCase() !== "NADA") {
                displayText = hab.nombre.toUpperCase();
            }
            txt.textContent = displayText;
        }
        
        // Actualizar equipamiento visual
        const eq = entidad[`equipo${idx}`];
        const eqImg = document.getElementById(`equipo${idx}Img`);
        const eqTxt = document.getElementById(`equipo${idx}Txt`);

        if (eqImg) eqImg.src = (eq && eq.icono) ? eq.icono : "img/nada.png";
        
        if (eqTxt) {
            const tieneEquipo = eq && eq.nombre && eq.nombre.toUpperCase() !== "NADA";
            // Legacy muestra eq.nivel; mostramos idx si tiene equipo, "0" si no
            eqTxt.textContent = tieneEquipo ? (eq.nivel || String(idx)) : "0";
        }
    });

    // Actualizar experiencia desde la entidad
    const expTxt = document.getElementById("experienciaTxt");
    if (expTxt) {
        expTxt.textContent = entidad.experiencia || 0;
    }
}

/**
 * Escribe un mensaje en la consola del juego.
 * @param {string} texto - Mensaje (soporta HTML).
 */
function contenConsola(texto) {
    const consolaBtn = document.getElementById("consolaBtn");
    if (consolaBtn) {
        consolaBtn.innerHTML = texto;
    }
}

// Exposición global
window.imprimirPersonaje = imprimirPersonaje;
window.contenConsola = contenConsola;
