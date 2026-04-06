// js/UI_dynamic.js
// Renderizado Data-Driven Dinámico de UI
document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.querySelector(".contenedor");
    if (!contenedor) return;

    // Generar Modal Armas Unificado
    const modalsToRemove = ["modalArmas", "modalArmasNaturales", "modalArmasNaturales2"];
    modalsToRemove.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });

    const modalArmas = document.createElement("div");
    modalArmas.className = "modal";
    modalArmas.id = "modalArmas";
    // Forzando scroll para acomodar todas las armas generadas dinámicamente
    modalArmas.style.display = "none";
    modalArmas.style.overflowY = "auto";
    modalArmas.style.overflowX = "hidden";
    modalArmas.style.gridAutoRows = "16.6%";
    
    modalArmas.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto">ARMAS</span></div>
        <div class="item-modal" id="cerrarModalArmas"><img src="img/cerrar.png"></div>
    `;
    
    if (typeof armasDict !== 'undefined') {
        Object.keys(armasDict).forEach(k => {
            const w = armasDict[k];
            const wBtn = document.createElement("div");
            wBtn.className = "item-modal";
            // Emulando ID antiguo para retrocompatibilidad
            wBtn.id = k + "Btn"; 
            wBtn.innerHTML = `<img src="${w.icono}" alt="${w.nombre}" title="${w.nombre.toUpperCase()}">`;
            
            wBtn.addEventListener("click", () => {
                if (window.esPersonaje) {
                    if (typeof cambiarArma === "function") cambiarArma(k);
                } else {
                    if (typeof cambiarArmaEsbirro === "function") cambiarArmaEsbirro(k);
                }
            });
            modalArmas.appendChild(wBtn);
        });
    }

    modalArmas.querySelector("#cerrarModalArmas").addEventListener("click", () => {
        modalArmas.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    });

    // Generar Modal Equipamiento
    const oldEquipo = document.getElementById("modalEquipo");
    if (oldEquipo) oldEquipo.remove();

    const modalEquipo = document.createElement("div");
    modalEquipo.className = "modal";
    modalEquipo.id = "modalEquipo";
    modalEquipo.style.display = "none";
    modalEquipo.style.overflowY = "auto";
    modalEquipo.style.overflowX = "hidden";
    modalEquipo.style.gridAutoRows = "16.6%";
    
    modalEquipo.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto">EQUIPAMIENTO</span></div>
        <div class="item-modal" id="cerrarModalEquipo"><img src="img/cerrar.png"></div>
        <div class="item-modal" id="sinEquipoBtn"><img src="img/nada.png" title="SIN EQUIPO"></div>
    `;
    
    if (typeof equiposDict !== 'undefined') {
        Object.keys(equiposDict).forEach(k => {
            if (k === "nada") return;
            const eq = equiposDict[k];
            const eqBtn = document.createElement("div");
            eqBtn.className = "item-modal";
            eqBtn.id = k + "Btn";
            eqBtn.innerHTML = `<img src="${eq.icono}" alt="${eq.nombre}" title="${eq.nombre.toUpperCase()}">`;
            eqBtn.addEventListener("click", () => {
                if (window.esPersonaje) {
                    if (typeof cambiarEquipamiento === "function") cambiarEquipamiento(k);
                } else {
                    if (typeof cambiarEquipamientoEsbirro === "function") cambiarEquipamientoEsbirro(k);
                }
            });
            modalEquipo.appendChild(eqBtn);
        });
    }
    
    modalEquipo.querySelector("#cerrarModalEquipo").addEventListener("click", () => {
        modalEquipo.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    });
    
    modalEquipo.querySelector("#sinEquipoBtn").addEventListener("click", () => {
        if (window.esPersonaje) {
            if (typeof cambiarEquipamiento === "function") cambiarEquipamiento("nada");
        } else {
            if (typeof cambiarEquipamientoEsbirro === "function") cambiarEquipamientoEsbirro("nada");
        }
    });

    // Generar Modal Personaje Dinámico
    const oldPersonaje = document.getElementById("modalPersonaje");
    if (oldPersonaje) oldPersonaje.remove();

    const modalPersonaje = document.createElement("div");
    modalPersonaje.className = "modal";
    modalPersonaje.id = "modalPersonaje";
    modalPersonaje.style.display = "none";
    modalPersonaje.style.overflowY = "auto";
    modalPersonaje.style.overflowX = "hidden";
    modalPersonaje.style.gridAutoRows = "16.6%";
    
    modalPersonaje.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto">PERSONAJES</span></div>
        <div class="item-modal" id="cerrarModalPersonaje"><img src="img/cerrar.png"></div>
    `;

    if (typeof personajesDict !== 'undefined') {
        Object.keys(personajesDict).forEach(k => {
            if (k === 'bienvenida') return;
            const p = personajesDict[k];
            const pBtn = document.createElement("div");
            pBtn.className = "item-modal";
            pBtn.id = k + "Btn";
            const iconSrc = p.icono || `img/${k}ico.png`;
            pBtn.innerHTML = `<img src="${iconSrc}" alt="${p.nombre}" title="${p.nombre.toUpperCase()}" onerror="this.src='img/nada.png'">`;
            
            pBtn.addEventListener("click", () => {
                if (typeof avatar === "function") avatar(k);
            });
            modalPersonaje.appendChild(pBtn);
        });
    }

    modalPersonaje.querySelector("#cerrarModalPersonaje").addEventListener("click", () => {
        modalPersonaje.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    });

    // Generar Modal Esbirros Dinámico
    const oldEsbirros = document.getElementById("modalEsbirros");
    if (oldEsbirros) oldEsbirros.remove();

    const modalEsbirros = document.createElement("div");
    modalEsbirros.className = "modal";
    modalEsbirros.id = "modalEsbirros";
    modalEsbirros.style.display = "none";
    modalEsbirros.style.overflowY = "auto";
    modalEsbirros.style.overflowX = "hidden";
    modalEsbirros.style.gridAutoRows = "16.6%";
    
    modalEsbirros.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto">ESBIRROS</span></div>
        <div class="item-modal" id="cerrarModalEsbirros"><img src="img/cerrar.png"></div>
    `;

    if (typeof esbirrosDict !== 'undefined') {
        Object.keys(esbirrosDict).forEach(k => {
            const e = esbirrosDict[k];
            const eBtn = document.createElement("div");
            eBtn.className = "item-modal";
            eBtn.id = k + "Btn";
            const iconSrc = e.icono || `img/${k}ico.png`;
            eBtn.innerHTML = `<img src="${iconSrc}" alt="${e.nombre}" title="${e.nombre.toUpperCase()}" onerror="this.src='img/nada.png'">`;
            
            eBtn.addEventListener("click", () => {
                if (typeof cambiarEsbirro === "function") cambiarEsbirro(k);
            });
            modalEsbirros.appendChild(eBtn);
        });
    }

    modalEsbirros.querySelector("#cerrarModalEsbirros").addEventListener("click", () => {
        modalEsbirros.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    });

    // Generar Modal Mochila Dinámico
    const oldMochila = document.getElementById("modalMochila");
    if (oldMochila) oldMochila.remove();

    const modalMochila = document.createElement("div");
    modalMochila.className = "modal";
    modalMochila.id = "modalMochila";
    modalMochila.style.display = "none";
    modalMochila.style.zIndex = "300";

    modalMochila.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto">MOCHILA</span></div>
        <div class="item-modal" id="cerrarModalMochila"><img src="img/cerrar.png"></div>
        <div class="item-modal" style="grid-column: span 3; height: 40px;"><span class="texto" style="font-size:0.7rem">OBJETOS / CONSUMIBLES</span></div>
        <div class="item-modal" id="itemMochila1" style="grid-column: span 3; font-size: 0.8rem;">- VACÍO -</div>
        <div class="item-modal" id="itemMochila2" style="grid-column: span 3; font-size: 0.8rem;">- VACÍO -</div>
        <div class="item-modal" id="itemMochila3" style="grid-column: span 3; font-size: 0.8rem;">- VACÍO -</div>
    `;

    modalMochila.querySelector("#cerrarModalMochila").addEventListener("click", () => {
        modalMochila.style.display = "none";
    });

    contenedor.appendChild(modalArmas);
    contenedor.appendChild(modalEquipo);
    contenedor.appendChild(modalPersonaje);
    contenedor.appendChild(modalEsbirros);
    contenedor.appendChild(modalMochila);
});
