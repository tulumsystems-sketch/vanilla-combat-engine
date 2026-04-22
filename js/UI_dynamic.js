// js/UI_dynamic.js
// Renderizado Data-Driven Dinámico de UI
document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.querySelector(".contenedor");
    if (!contenedor) return;

    // === MODAL AVATAR (Selección de Personaje/Avatar) ===
    let paginaAvatar = 0;
    const avataresPorPagina = 12;

    const modalAvatar = document.createElement("div");
    modalAvatar.className = "modal";
    modalAvatar.id = "modalAvatar";
    modalAvatar.style.display = "none";
    
    // Header (Fila 1)
    modalAvatar.innerHTML = `
        <div class="item-modal" style="grid-column: span 2; text-align: center;"><span class="texto">AVATAR</span></div>
        <div class="item-modal" id="cerrarModalAvatar"><div class="cuadrado-negro"><img src="img/cerrar.png"></div></div>
    `;

    // 12 Slots de avatares (Filas 2-5)
    for (let i = 0; i < 12; i++) {
        const slot = document.createElement("div");
        slot.className = "item-modal slot-lista-avatar";
        modalAvatar.appendChild(slot);
    }

    // Footer de navegación (Fila 6)
    const btnAntAvatar = document.createElement("div");
    btnAntAvatar.className = "item-modal btn-nav-avatar";
    btnAntAvatar.innerHTML = `<div class="cuadrado-negro"><img src="img/atras.png"></div>`;
    btnAntAvatar.onclick = () => { paginaAvatar--; renderizarModalAvatar(); };

    const btnAddAvatar = document.createElement("div");
    btnAddAvatar.className = "item-modal btn-nav-avatar";
    btnAddAvatar.innerHTML = `<div class="cuadrado-negro"><img src="img/nuevopjico.png"></div>`;
    btnAddAvatar.onclick = () => { 
        const input = document.getElementById("cambioImagenBtn");
        if (input) input.click();
    };

    const btnSigAvatar = document.createElement("div");
    btnSigAvatar.className = "item-modal btn-nav-avatar";
    btnSigAvatar.innerHTML = `<div class="cuadrado-negro"><img src="img/adelante.png"></div>`;
    btnSigAvatar.onclick = () => { paginaAvatar++; renderizarModalAvatar(); };

    modalAvatar.appendChild(btnAntAvatar);
    modalAvatar.appendChild(btnAddAvatar);
    modalAvatar.appendChild(btnSigAvatar);
    contenedor.appendChild(modalAvatar);

    modalAvatar.querySelector("#cerrarModalAvatar").onclick = () => {
        modalAvatar.style.display = "none";
        modalAvatar.classList.remove("activo");
    };

    window.renderizarModalAvatar = () => {
        let listaAvatares = [...Object.keys(personajesDict), ...Object.keys(esbirrosDict)];
        // Filtrar solo los que tienen imagen de portada válida y no son placeholders/logos
        listaAvatares = listaAvatares.filter(k => {
            const d = personajesDict[k] || esbirrosDict[k];
            const esPlaceholder = (k === 'bienvenida' || k === 'nuevopj' || k === 'nuevoesbirro');
            return d && d.portada && d.portada.trim() !== "" && !esPlaceholder;
        });

        const totalPaginas = Math.ceil(listaAvatares.length / avataresPorPagina) || 1;

        if (paginaAvatar >= totalPaginas) paginaAvatar = 0;
        if (paginaAvatar < 0) paginaAvatar = totalPaginas - 1;

        const inicio = paginaAvatar * avataresPorPagina;
        const avataresPagina = listaAvatares.slice(inicio, inicio + avataresPorPagina);

        const slots = modalAvatar.querySelectorAll(".slot-lista-avatar");
        slots.forEach((slot, i) => {
            const key = avataresPagina[i];
            const data = key ? (personajesDict[key] || esbirrosDict[key]) : null;
            if (key && data) {
                // Preferir icono para la lista, fallback a portada
                const iconSrc = data.icono || `img/${key}ico.png`;
                slot.innerHTML = `<div class="cuadrado-negro"><img src="${iconSrc}" alt="${key}" onerror="this.src='${data.portada}'"></div>`;
                slot.onclick = () => {
                    const action = window.esPersonaje ? (typeof avatar === "function" ? avatar : null) : (typeof cambiarEsbirro === "function" ? cambiarEsbirro : null);
                    if (action) action(key);
                };
            } else {
                // Slot vacío: cuadrado negro puro
                slot.innerHTML = '<div class="cuadrado-negro"></div>';
                slot.onclick = null;
            }
        });
    };

    // === MODAL ARMAS PAGINADO (Categoría Marcial/Natural) ===

    let categoriaArmas = "marcial";
    let paginaArmas = 0;
    const itemsPorPagina = 12;

    const listaMarciales = ["daga", "espada", "arco", "arrojadiza", "punno", "escudo", "magia", "varita", "baculo", "totem", "runa", "hojaruna", "fusil", "granada", "patada"];
    const listaNaturales = ["mordisco", "garras", "aliento", "cuernos", "pinzas", "pico", "mente", "aguijon", "mirada", "glandula", "lengua", "alas", "ramas", "hojas", "esporas", "cascos", "tentaculos", "cola", "espinas", "aleta", "antenas", "raices", "flores", "frutos"];

    window.renderizarModalArmas = () => {
        const armasBase = (categoriaArmas === "marcial" ? listaMarciales : listaNaturales);
        // Filtrar solo armas que tengan icono definido y no sean "nada"
        const armas = armasBase.filter(k => armasDict[k] && armasDict[k].icono && k !== "nada");

        const totalPaginas = Math.ceil(armas.length / itemsPorPagina) || 1;
        
        if (paginaArmas >= totalPaginas) paginaArmas = 0;
        if (paginaArmas < 0) paginaArmas = totalPaginas - 1;

        const inicio = paginaArmas * itemsPorPagina;
        const armasPagina = armas.slice(inicio, inicio + itemsPorPagina);

        const slots = modalArmas.querySelectorAll(".slot-arma");
        slots.forEach((slot, i) => {
            const key = armasPagina[i];
            if (key && armasDict[key]) {
                const w = armasDict[key];
                // Usar el icono del arma sobre el cuadrado negro para uniformidad
                slot.innerHTML = `<div class="cuadrado-negro"><img src="${w.icono}" alt="${w.nombre}" title="${w.nombre.toUpperCase()}"></div>`;
                slot.onclick = () => {
                    const action = window.esPersonaje ? (typeof cambiarArma === "function" ? cambiarArma : null) : (typeof cambiarArmaEsbirro === "function" ? cambiarArmaEsbirro : null);
                    if (action) action(key);
                };
            } else {
                // Slot vacío: cuadrado negro puro
                slot.innerHTML = '<div class="cuadrado-negro"></div>';
                slot.onclick = null;
            }
        });

        // Actualizar icono de categoría central en footer
        const toggleBtn = document.getElementById("toggleCategoriaArmas");
        if (toggleBtn) {
            toggleBtn.innerHTML = `<img src="img/${categoriaArmas === 'marcial' ? 'salvajes' : 'marciales'}.png" title="CAMBIAR A ${categoriaArmas === 'marcial' ? 'NATURALES' : 'MARCIALES'}">`;
        }
    };

    const oldArmas = document.getElementById("modalArmas");
    if (oldArmas) oldArmas.remove();

    const modalArmas = document.createElement("div");
    modalArmas.className = "modal";
    modalArmas.id = "modalArmas";
    modalArmas.style.display = "none";
    modalArmas.style.overflow = "hidden"; 
    
    // Header (Fila 1)
    modalArmas.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto">ARMAS</span></div>
        <div class="item-modal" id="cerrarModalArmas"><img src="img/cerrar.png" title="CERRAR"></div>
    `;

    // 12 Slots de armas (Filas 2-5)
    for (let i = 0; i < 12; i++) {
        const slot = document.createElement("div");
        slot.className = "item-modal slot-arma";
        modalArmas.appendChild(slot);
    }

    // Footer de navegación (Fila 6)
    const btnAnterior = document.createElement("div");
    btnAnterior.className = "item-modal";
    btnAnterior.innerHTML = `<div class="cuadrado-negro"><img src="img/atras.png" title="ANTERIOR"></div>`;
    btnAnterior.onclick = () => { paginaArmas--; renderizarModalArmas(); };

    const btnToggle = document.createElement("div");
    btnToggle.className = "item-modal";
    btnToggle.id = "toggleCategoriaArmas";
    btnToggle.onclick = () => { 
        categoriaArmas = (categoriaArmas === "marcial" ? "natural" : "marcial");
        paginaArmas = 0;
        renderizarModalArmas();
    };

    const btnSiguiente = document.createElement("div");
    btnSiguiente.className = "item-modal";
    btnSiguiente.innerHTML = `<div class="cuadrado-negro"><img src="img/adelante.png" title="SIGUIENTE"></div>`;
    btnSiguiente.onclick = () => { paginaArmas++; renderizarModalArmas(); };

    modalArmas.appendChild(btnAnterior);
    modalArmas.appendChild(btnToggle);
    modalArmas.appendChild(btnSiguiente);

    modalArmas.querySelector("#cerrarModalArmas").addEventListener("click", () => {
        modalArmas.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    });

    // Inyectar reset en abrirModal global
    const originalAbrirModal = window.abrirModal;
    window.abrirModal = function(id) {
        if (id === 'armas') {
            categoriaArmas = "marcial";
            paginaArmas = 0;
            renderizarModalArmas();
        }
        if (id === 'equipo') {
            paginaEquipo = 0;
            renderizarModalEquipo();
        }
        if (typeof originalAbrirModal === 'function') originalAbrirModal(id);
    };

    // === MODAL EQUIPAMIENTO PAGINADO ===
    let paginaEquipo = 0;
    const equiposPorPagina = 12;

    const oldEquipo = document.getElementById("modalEquipo");
    if (oldEquipo) oldEquipo.remove();

    const modalEquipo = document.createElement("div");
    modalEquipo.className = "modal";
    modalEquipo.id = "modalEquipo";
    modalEquipo.style.display = "none";
    modalEquipo.style.overflow = "hidden";
    
    // Header (Fila 1)
    modalEquipo.innerHTML = `
        <div class="item-modal" style="grid-column: span 2; text-align: center;"><span class="texto">EQUIPO</span></div>
        <div class="item-modal" id="cerrarModalEquipo"><img src="img/cerrar.png" title="CERRAR"></div>
    `;

    // 12 Slots dinámicos (Filas 2-5)
    for (let i = 0; i < 12; i++) {
        const slot = document.createElement("div");
        slot.className = "item-modal slot-equipo-dinamico";
        modalEquipo.appendChild(slot);
    }

    // Footer de navegación (Fila 6)
    const navEqAnterior = document.createElement("div");
    navEqAnterior.className = "item-modal";
    navEqAnterior.innerHTML = `<div class="cuadrado-negro"><img src="img/atras.png" title="ANTERIOR"></div>`;
    navEqAnterior.onclick = () => { paginaEquipo--; renderizarModalEquipo(); };

    const navEqBorrar = document.createElement("div");
    navEqBorrar.className = "item-modal";
    navEqBorrar.innerHTML = `<div class="cuadrado-negro"><img src="img/cerrar.png" title="BORRAR EQUIPO"></div>`;
    navEqBorrar.onclick = () => {
        const action = window.esPersonaje ? (typeof cambiarEquipamiento === "function" ? cambiarEquipamiento : null) : (typeof cambiarEquipamientoEsbirro === "function" ? cambiarEquipamientoEsbirro : null);
        if (action) action("nada");
        modalEquipo.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    };

    const navEqSiguiente = document.createElement("div");
    navEqSiguiente.className = "item-modal";
    navEqSiguiente.innerHTML = `<div class="cuadrado-negro"><img src="img/adelante.png" title="SIGUIENTE"></div>`;
    navEqSiguiente.onclick = () => { paginaEquipo++; renderizarModalEquipo(); };

    modalEquipo.appendChild(navEqAnterior);
    modalEquipo.appendChild(navEqBorrar);
    modalEquipo.appendChild(navEqSiguiente);

    window.renderizarModalEquipo = () => {
        if (typeof equiposDict === 'undefined') return;
        
        const equiposKeys = Object.keys(equiposDict).filter(k => k !== "nada" && equiposDict[k].icono);
        const totalPaginas = Math.ceil(equiposKeys.length / equiposPorPagina) || 1;

        if (paginaEquipo >= totalPaginas) paginaEquipo = 0;
        if (paginaEquipo < 0) paginaEquipo = totalPaginas - 1;

        const inicio = paginaEquipo * equiposPorPagina;
        const equiposPagina = equiposKeys.slice(inicio, inicio + equiposPorPagina);

        const slots = modalEquipo.querySelectorAll(".slot-equipo-dinamico");
        slots.forEach((slot, i) => {
            const key = equiposPagina[i];
            if (key && equiposDict[key]) {
                const eq = equiposDict[key];
                slot.innerHTML = `<div class="cuadrado-negro"><img src="${eq.icono}" alt="${eq.nombre}" title="${eq.nombre.toUpperCase()}"></div>`;
                slot.onclick = () => {
                    const action = window.esPersonaje ? (typeof cambiarEquipamiento === "function" ? cambiarEquipamiento : null) : (typeof cambiarEquipamientoEsbirro === "function" ? cambiarEquipamientoEsbirro : null);
                    if (action) action(key);
                    modalEquipo.style.display = "none";
                    if (typeof cerrarEdicion === "function") cerrarEdicion();
                };
            } else {
                slot.innerHTML = '<div class="cuadrado-negro"></div>';
                slot.onclick = null;
            }
        });
    };

    modalEquipo.querySelector("#cerrarModalEquipo").addEventListener("click", () => {
        modalEquipo.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
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
        
        <div class="item-modal" id="itemMochila1" style="grid-column: span 3;"></div>
        <div class="item-modal" id="itemMochila2" style="grid-column: span 3;"></div>
        <div class="item-modal" id="itemMochila3" style="grid-column: span 3;"></div>

        
        <div class="item-modal" id="oroMochilaBtn" style="background-color: #000000;"><img src="img/oro.png" title="ORO"></div>
        <div class="item-modal" id="plataMochilaBtn" style="background-color: #000000;"><img src="img/plata.png" title="PLATA"></div>
        <div class="item-modal" id="bronceMochilaBtn" style="background-color: #000000;"><img src="img/bronce.png" title="BRONCE"></div>
        
        <div class="item-modal"><span id="oroMochilaTxt" class="texto">0</span></div>
        <div class="item-modal"><span id="plataMochilaTxt" class="texto">0</span></div>
        <div class="item-modal"><span id="bronceMochilaTxt" class="texto">0</span></div>
    `;

    modalMochila.querySelector("#cerrarModalMochila").addEventListener("click", () => {
        modalMochila.style.display = "none";
    });

    // === LÓGICA DE MONEDAS (Sumar/Restar con conversión) ===
    const monedas = ['oro', 'plata', 'bronce'];
    monedas.forEach(m => {
        const btn = modalMochila.querySelector(`#${m}MochilaBtn`);
        if (btn) {
            btn.addEventListener('click', () => {
                if (typeof sumarMonedas === 'function') sumarMonedas(m);
            });
            btn.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (typeof restarMonedas === 'function') restarMonedas(m);
            });
        }
    });

    // === MODAL HABILIDADES PAGINADO (Por Categoría/Tipo) ===
    const tiposHabilidades = ["Fuego", "Agua", "Vida", "Sangre", "Rayo", "Aire", "Tierra", "Psique", "Luz", "Eter"];
    let indiceTipoHabilidad = 0;
    let paginaHabilidades = 0;
    const habsPorPagina = 12;

    // Construir listas de habilidades por tipo
    function obtenerHabilidadesPorTipo(tipo) {
        if (typeof habilidadesDict === 'undefined') return [];
        return Object.keys(habilidadesDict).filter(k => {
            const h = habilidadesDict[k];
            return h.tipo === tipo && h.tipo !== "oculto" && k !== "-";
        });
    }

    window.renderizarModalHabilidades = () => {
        const modal = document.getElementById("modalHabilidades");
        if (!modal) return;

        const tipoActual = tiposHabilidades[indiceTipoHabilidad];
        const habs = obtenerHabilidadesPorTipo(tipoActual);
        const totalPaginas = Math.max(1, Math.ceil(habs.length / habsPorPagina));

        if (paginaHabilidades >= totalPaginas) paginaHabilidades = 0;
        if (paginaHabilidades < 0) paginaHabilidades = totalPaginas - 1;

        const inicio = paginaHabilidades * habsPorPagina;
        const habsPagina = habs.slice(inicio, inicio + habsPorPagina);

        // Actualizar título con el tipo actual
        const tituloEl = modal.querySelector(".hab-titulo-tipo");
        if (tituloEl) tituloEl.textContent = tipoActual.toUpperCase();

        // Actualizar los 12 slots
        const slots = modal.querySelectorAll(".slot-habilidad");
        slots.forEach((slot, i) => {
            const key = habsPagina[i];
            if (key && habilidadesDict[key]) {
                const h = habilidadesDict[key];
                slot.textContent = (h.nombre || key).toUpperCase();
                slot.style.cursor = "pointer";
                slot.style.fontSize = "0.55rem";
                slot.style.fontFamily = "Titillium Web";
                slot.style.fontWeight = "600";
                slot.style.color = "#ffffff";
                slot.style.background = "#000000";
                slot.style.display = "flex";
                slot.style.alignItems = "center";
                slot.style.justifyContent = "center";
                slot.style.textAlign = "center";
                slot.style.padding = "2px";
                slot.style.wordBreak = "break-word";
                slot.style.overflow = "hidden";
                slot.onclick = () => {
                    if (typeof cambiarHabilidad === 'function') {
                        cambiarHabilidad(key);
                    }
                    modal.style.display = "none";
                    if (typeof cerrarEdicion === "function") cerrarEdicion();
                };
            } else {
                slot.innerHTML = '<div style="width: 85%; height: 85%; background-color: #000; margin: auto; border-radius: 2px;"></div>';
                slot.style.background = "transparent";
                slot.style.cursor = "default";
                slot.onclick = null;
            }
        });
    };

    const oldHabilidades = document.getElementById("modalHabilidades");
    if (oldHabilidades) oldHabilidades.remove();

    const modalHabilidades = document.createElement("div");
    modalHabilidades.className = "modal";
    modalHabilidades.id = "modalHabilidades";
    modalHabilidades.style.display = "none";
    modalHabilidades.style.overflow = "hidden";

    // Header (Fila 1): Tipo actual (2 cols) + Cerrar (1 col)
    modalHabilidades.innerHTML = `
        <div class="item-modal" style="grid-column: span 2;"><span class="texto hab-titulo-tipo">HABILIDADES</span></div>
        <div class="item-modal" id="cerrarModalHabilidades"><img src="img/cerrar.png" title="CERRAR"></div>
    `;

    // 12 Slots de habilidades (Filas 2-5)
    for (let i = 0; i < 12; i++) {
        const slot = document.createElement("div");
        slot.className = "item-modal slot-habilidad";
        slot.style.outline = "solid 1px #333";
        modalHabilidades.appendChild(slot);
    }

    // Footer de navegación (Fila 6): ◀ Anterior tipo | Pag ◀▶ | Siguiente tipo ▶
    const btnTipoAnterior = document.createElement("div");
    btnTipoAnterior.className = "item-modal";
    btnTipoAnterior.innerHTML = `<div class="cuadrado-negro"><img src="img/atras.png" title="TIPO ANTERIOR"></div>`;
    btnTipoAnterior.onclick = () => {
        indiceTipoHabilidad--;
        if (indiceTipoHabilidad < 0) indiceTipoHabilidad = tiposHabilidades.length - 1;
        paginaHabilidades = 0;
        renderizarModalHabilidades();
    };

    const btnDeseleccionarHab = document.createElement("div");
    btnDeseleccionarHab.className = "item-modal";
    btnDeseleccionarHab.innerHTML = `<div class="cuadrado-negro"><img src="img/cerrar.png" title="QUITAR HABILIDAD"></div>`;
    btnDeseleccionarHab.onclick = () => {
        if (typeof cambiarHabilidad === 'function') {
            cambiarHabilidad("-");
        }
        modalHabilidades.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    };

    const btnTipoSiguiente = document.createElement("div");
    btnTipoSiguiente.className = "item-modal";
    btnTipoSiguiente.innerHTML = `<div class="cuadrado-negro"><img src="img/adelante.png" title="TIPO SIGUIENTE"></div>`;
    btnTipoSiguiente.onclick = () => {
        indiceTipoHabilidad++;
        if (indiceTipoHabilidad >= tiposHabilidades.length) indiceTipoHabilidad = 0;
        paginaHabilidades = 0;
        renderizarModalHabilidades();
    };

    modalHabilidades.appendChild(btnTipoAnterior);
    modalHabilidades.appendChild(btnDeseleccionarHab);
    modalHabilidades.appendChild(btnTipoSiguiente);

    modalHabilidades.querySelector("#cerrarModalHabilidades").addEventListener("click", () => {
        modalHabilidades.style.display = "none";
        if (typeof cerrarEdicion === "function") cerrarEdicion();
    });

    // Override de abrirModalHabilidades para usar el nuevo modal paginado
    window.abrirModalHabilidades = function() {
        indiceTipoHabilidad = 0;
        paginaHabilidades = 0;
        renderizarModalHabilidades();
        modalHabilidades.style.display = "grid";
    };

    window.cerrarModalHabilidades = function() {
        modalHabilidades.style.display = "none";
    };

    contenedor.appendChild(modalArmas);
    contenedor.appendChild(modalEquipo);
    contenedor.appendChild(modalPersonaje);
    contenedor.appendChild(modalEsbirros);
    contenedor.appendChild(modalMochila);
    contenedor.appendChild(modalHabilidades);

    // Inicializar eventos de mochila una vez creados los elementos
    if (typeof inicializarMochilaUI === 'function') inicializarMochilaUI();
});
