/**
 * Meeple Combat - Módulo de Renderizado y UI
 * Gestión de la actualización visual de la ficha de personaje.
 * @module UIRender
 */

/**
 * Refresca todos los elementos visuales de la entidad seleccionada.
 */
function imprimirPersonaje() {
    const entidad = (typeof entidades !== 'undefined' && typeof indexVisualizado !== 'undefined') 
        ? entidades[indexVisualizado] : null;
    
    if (!entidad) return;

    // Actualizar portada y nombre
    const portadaImg = document.getElementById("portadaImg");
    const nombreTxt = document.getElementById("nombreTxt");
    if (portadaImg) portadaImg.src = entidad.portada;
    if (nombreTxt) nombreTxt.textContent = (entidad.nombre || "").toUpperCase();

    // Calcular atributos totales (base + equipos)
    const stats = ['ataque', 'esquiva', 'bloqueo', 'velocidad', 'vida', 'poder', 'vidaMaxima', 'poderMaximo'];
    const totales = {};
    
    stats.forEach(s => {
        totales[s] = entidad[s] || 0;
        [1, 2, 3].forEach(idx => {
            const eq = entidad[`equipo${idx}`];
            if (eq && eq[s]) totales[s] += eq[s];
        });
    });

    // Actualizar textos en el DOM
    const mappings = {
        ataque: "ataqueTxt", esquiva: "esquivaTxt", bloqueo: "bloqueoTxt", 
        velocidad: "velocidadTxt", vida: "vidaTxt", poder: "poderTxt"
    };

    Object.entries(mappings).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = totales[key];
    });

    // Actualizar armas y habilidades (nombres e imágenes)
    [1, 2].forEach(idx => {
        const arma = entidad[`arma${idx}`];
        if (!arma) return;
        const img = document.getElementById(`arma${idx}Img`);
        const txt = document.getElementById(`arma${idx}Txt`);
        if (img) img.src = arma.img || "img/nada.png";
        if (txt) txt.textContent = (arma.nombre || "NADA").toUpperCase();
    });

    [1, 2, 3].forEach(idx => {
        const hab = entidad[`habilidad${idx}`];
        const txt = document.getElementById(`habilidad${idx}Txt`);
        if (txt) txt.textContent = (hab && hab.nombre ? hab.nombre : "HABILIDAD").toUpperCase();
        
        const eq = entidad[`equipo${idx}`];
        const eqImg = document.getElementById(`equipo${idx}Img`);
        const eqTxt = document.getElementById(`equipo${idx}Txt`);
        if (eqImg) eqImg.src = (eq && eq.icono) ? eq.icono : "img/nada.png";
        
        if (eqTxt) {
            const nombre = (eq && eq.nombre) ? eq.nombre.toUpperCase() : "EQUIPO";
            eqTxt.textContent = nombre;
            // Reducir fuente si el nombre es demasiado largo para evitar romper el diseño
            eqTxt.style.fontSize = nombre.length > 8 ? "0.6rem" : "0.75rem";
        }
    });

    // Actualizar experiencia si estamos en el personaje principal
    const expTxt = document.getElementById("experienciaTxt");
    if (expTxt) {
        expTxt.textContent = (typeof experiencia !== 'undefined') ? experiencia : 0;
        expTxt.style.display = (indexVisualizado === 0) ? "block" : "none";
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
