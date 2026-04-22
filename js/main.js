// === Estado Global (Unificado mediante GameState) ===
GameState.cargar();

var indexVisualizado = GameState.seleccionIndex;
var entidades = GameState.entidades;
var capital = GameState.mochila.capital;
var itemMochila = GameState.mochila.items;
var edicion = 0;
var tipoEdicion = 'personaje';
var experiencia = 0;
var slotArmaSeleccionada = 1;
var slotEstadisticaSeleccionada = 1;
var objetoAccion = "arma";
var flagControlesCambioEsbirro = false;
var equipamientoSeleccionado = 1;
var estadisticaSeleccionada;
var habilidadSeleccionada = {};
var slotHabilidadSeleccionada = 1;

const valorExperiencia = {
  ataque: 3, esquiva: 3, bloqueo: 3, velocidad: 6, vidaMaxima: 1, poderMaximo: 1
};

// Aliases para mantener la compatibilidad con el código heredado modularizado
function definirGetterGlobal(nombre, getter, setter) {
  Object.defineProperty(window, nombre, {
    get: getter,
    set: setter || function(v) { Object.defineProperty(window, nombre, { value: v, writable: true }); },
    configurable: true
  });
}

definirGetterGlobal('personaje', () => entidades[0]);
definirGetterGlobal('esPersonaje', () => indexVisualizado === 0, (v) => { if (v) indexVisualizado = 0; });
definirGetterGlobal('esbirroSeleccionado', () => entidades[indexVisualizado], (v) => { 
    const idx = entidades.indexOf(v); 
    if (idx !== -1) indexVisualizado = idx;
    GameState.seleccionIndex = indexVisualizado;
});
definirGetterGlobal('esbirros', () => entidades.slice(1));

// === Inicialización Principal ===
document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const charName = queryParams.get("personaje");

    if (charName && typeof avatar === 'function') avatar(charName);

    const esbirroConfigs = [];
    const esSingle = queryParams.get("esbirro");
    if (esSingle) esbirroConfigs.push({ slot: 1, nombre: esSingle }); // Slots 1 al 5 son esbirros

    for (let i = 1; i <= 5; i++) {
        const p = queryParams.get("esbirro" + i);
        if (p) esbirroConfigs.push({ slot: i, nombre: p });
    }

    esbirroConfigs.forEach(cfg => {
        const key = cfg.nombre.toLowerCase().trim();
        let base = typeof esbirrosDict !== 'undefined' ? esbirrosDict[key] : null;
        if (base && entidades && entidades[cfg.slot]) {
            entidades[cfg.slot].actualizarPropiedades(base);
        }
    });

    if (typeof imprimirPersonaje === "function") imprimirPersonaje();
    
    // Conectar el input de importación de partida
    var inputImportar = document.getElementById("importarPartidaInput");
    if (inputImportar && typeof manejarImportarArchivoPartida === 'function') {
      inputImportar.addEventListener("change", manejarImportarArchivoPartida);
    }
});

// === RESTAURACIÓN DE LAS ACCIONES MAESTRAS (SETTERS) ===
window.avatar = function(nombre) {
    const key = nombre.toLowerCase().trim();
    const pj = (typeof personajesDict !== 'undefined' && personajesDict[key]) ? personajesDict[key] : null;
    if (pj && entidades && entidades[0]) {
        indexVisualizado = 0; // Forzamos visión al héroe
        GameState.seleccionIndex = 0;
        entidades[0].actualizarPropiedades(pj);
        if (typeof GameState !== 'undefined') GameState.guardar();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    }
    if(typeof cerrarModal === 'function') cerrarModal('personaje');
};

window.cambiarEsbirro = function(nombre) {
    const key = nombre.toLowerCase().trim();
    const pj = (typeof esbirrosDict !== 'undefined') ? esbirrosDict[key] : null;
    if (pj && entidades && typeof indexVisualizado !== 'undefined' && entidades[indexVisualizado]) {
        entidades[indexVisualizado].actualizarPropiedades(pj);
        if (typeof GameState !== 'undefined') GameState.guardar();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    }
    if(typeof cerrarModal === 'function') cerrarModal('esbirros');
};

window.cambiarArma = function(nombre) {
    if(typeof indexVisualizado === 'undefined' || typeof slotArmaSeleccionada === 'undefined') return;
    const ent = entidades[indexVisualizado];
    if(ent && typeof armasDict !== 'undefined') {
        ent["arma" + slotArmaSeleccionada] = armasDict[nombre];
        if (typeof GameState !== 'undefined') GameState.guardar();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    }
    if(typeof cerrarModal === 'function') cerrarModal('armas');
    if(typeof cerrarEdicion === 'function') cerrarEdicion();
}
window.cambiarArmaEsbirro = window.cambiarArma;

window.cambiarEquipamiento = function(nombre) {
    if(typeof indexVisualizado === 'undefined' || typeof equipamientoSeleccionado === 'undefined') return;
    const ent = entidades[indexVisualizado];
    if(ent && typeof equiposDict !== 'undefined') {
        // Asignar nuevo equipo (el renderizado se encarga de sumar los stats)
        ent["equipo" + equipamientoSeleccionado] = equiposDict[nombre] || equiposDict['nada'];
        
        if (typeof GameState !== 'undefined') GameState.guardar();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    }
    if(typeof cerrarModal === 'function') cerrarModal('equipo');
}
window.cambiarEquipamientoEsbirro = window.cambiarEquipamiento;

window.cambiarHabilidad = function(nombre) {
    if(typeof indexVisualizado === 'undefined') return;
    const slot = (typeof slotHabilidadSeleccionada !== 'undefined') ? slotHabilidadSeleccionada : 1;
    const ent = entidades[indexVisualizado];
    if(ent && typeof habilidadesDict !== 'undefined') {
        ent["habilidad" + slot] = habilidadesDict[nombre];
        if (typeof GameState !== 'undefined') GameState.guardar();
        if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
    }
    if(typeof cerrarModalHabilidades === 'function') cerrarModalHabilidades();
}
window.editarHabilidadEsbirro = window.cambiarHabilidad;

/**
 * Gestiona el cambio de imagen de portada para la entidad actual.
 */
window.cambioImagen = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const ent = entidades[indexVisualizado];
        if (ent) {
            ent.portada = e.target.result;
            if (typeof imprimirPersonaje === "function") imprimirPersonaje();
            if (typeof GameState !== "undefined") GameState.guardar();
            if (typeof cerrarModal === "function") cerrarModal('avatar');
        }
    };
    reader.readAsDataURL(file);
};

// Alias legacy: en el código viejo mostrarEsbirroSeleccionado() refrescaba la UI del esbirro.
// En el nuevo código, imprimirPersonaje() ya renderiza la entidad seleccionada (hero o esbirro).
window.mostrarEsbirroSeleccionado = function() {
    if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
};
