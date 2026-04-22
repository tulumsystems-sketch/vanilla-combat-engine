/**
 * Meeple Combat - Módulo de Modales
 * Gestión de apertura y cierre de ventanas modales (Habilidades, Armas, etc.)
 * @module UIModals
 */

/**
 * Abre un modal por ID.
 */
function abrirModal(id) {
    const modalId = `modal${id.charAt(0).toUpperCase() + id.slice(1)}`;
    const modal = document.getElementById(modalId);
    if (modal) {
        if (id === 'avatar' && typeof renderizarModalAvatar === 'function') renderizarModalAvatar();
        if (id === 'armas' && typeof renderizarModalArmas === 'function') renderizarModalArmas();
        modal.classList.add("activo");
        modal.style.display = "grid"; 
    }
}

/**
 * Cierra un modal por ID.
 */
function cerrarModal(id) {
    const modalId = `modal${id.charAt(0).toUpperCase() + id.slice(1)}`;
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("activo");
        modal.style.display = "none";
    }
}

/**
 * Especial para modal de habilidades (por su estructura personalizada).
 */
function abrirModalHabilidades() {
    const modal = document.getElementById("modalHabilidades");
    if (modal) {
        if (typeof generarListaHabilidades === 'function') generarListaHabilidades();
        modal.classList.add("activo");
    }
}

function cerrarModalHabilidades() {
    const modal = document.getElementById("modalHabilidades");
    if (modal) modal.classList.remove("activo");
}

/**
 * Genera la lista de habilidades dinámicamente según el diccionario cargado.
 */
function generarListaHabilidades() {
    const lista = document.getElementById("listaHabilidades");
    if (!lista || typeof habilidadesDict === 'undefined') return;

    lista.innerHTML = "";
    
    // Clasificar habilidades por tipo para mostrar títulos
    const claves = Object.keys(habilidadesDict).sort((a, b) => 
        (habilidadesDict[a].nombre || a).localeCompare(habilidadesDict[b].nombre || b)
    );

    const grupos = {};
    claves.forEach(k => {
        const h = habilidadesDict[k];
        if (h.tipo === "oculto") return;
        const t = h.tipo || "otros";
        if (!grupos[t]) grupos[t] = [];
        grupos[t].push(k);
    });

    Object.keys(grupos).sort().forEach(tipo => {
        const titulo = document.createElement("div");
        titulo.className = "titulo-reino";
        titulo.textContent = tipo.toUpperCase();
        lista.appendChild(titulo);

        grupos[tipo].forEach(key => {
            const hab = habilidadesDict[key];
            const item = document.createElement("div");
            item.className = "item-habilidad";
            item.textContent = (hab.nombre || key).toUpperCase();
            
            item.addEventListener("click", () => {
                if (typeof cambiarHabilidad === 'function') {
                    cambiarHabilidad(key);
                } else if (typeof editarHabilidadEsbirro === 'function') {
                    editarHabilidadEsbirro(key);
                }
                cerrarModalHabilidades();
            });

            // Soporte para press-hold (debe estar definido en UI.js o main.js)
            if (typeof initPressHoldVisor === 'function') initPressHoldVisor(item, hab);
            
            lista.appendChild(item);
        });
    });
}

// Exposición global
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.abrirModalHabilidades = abrirModalHabilidades;
window.cerrarModalHabilidades = cerrarModalHabilidades;
