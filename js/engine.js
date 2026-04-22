/**
 * Meeple Combat - Motor de Juego (Engine)
 * 
 * Este archivo centraliza la lógica de las entidades y el estado global del juego.
 * Sigue los principios de SOLID y busca eliminar la redundancia de código.
 */

class Entidad {
    constructor(data = {}) {
        // Inicialización con valores por defecto para evitar errores de renderizado
        this.actualizarPropiedades({
            nombre: "BIENVENIDO",
            portada: "img/logo-meeple-combat.png",
            icono: "",
            descripcion: "Descripcion personaje default",
            ataque: 0,
            esquiva: 0,
            bloqueo: 0,
            velocidad: 0,
            vida: 0,
            vidaMaxima: 0,
            poder: 0,
            poderMaximo: 0,
            experiencia: 0,
            arma1: "nada",
            arma2: "nada",
            equipo1: "nada",
            equipo2: "nada",
            equipo3: "nada",
            habilidad1: "nada",
            habilidad2: "nada",
            habilidad3: "nada",
            ...data
        });
    }

    /**
     * Actualiza las propiedades de la entidad.
     * Resuelve automáticamente strings si corresponden a diccionarios.
     */
    actualizarPropiedades(data) {
        Object.assign(this, data);

        // Resolución de referencias (si son strings, buscamos en el dict correspondiente)
        if (typeof this.arma1 === 'string') this.configurarArma(1, this.arma1);
        if (typeof this.arma2 === 'string') this.configurarArma(2, this.arma2);
        
        if (typeof this.habilidad1 === 'string') this.configurarHabilidad(1, this.habilidad1);
        if (typeof this.habilidad2 === 'string') this.configurarHabilidad(2, this.habilidad2);
        if (typeof this.habilidad3 === 'string') this.configurarHabilidad(3, this.habilidad3);

        if (typeof this.equipo1 === 'string') this.configurarEquipamiento(1, this.equipo1);
        if (typeof this.equipo2 === 'string') this.configurarEquipamiento(2, this.equipo2);
        if (typeof this.equipo3 === 'string') this.configurarEquipamiento(3, this.equipo3);

        // Validar límites de recursos
        this.vida = Math.min(this.vida, this.vidaMaxima);
        this.poder = Math.min(this.poder, this.poderMaximo);
    }

    configurarArma(ranura, nombre) {
        if (typeof armasDict !== 'undefined' && nombre in armasDict) {
            this[`arma${ranura}`] = armasDict[nombre];
        } else {
            this[`arma${ranura}`] = { nombre, icono: "img/nada.png", danno: 0, descripcion: "Sin datos" };
        }
    }

    configurarEquipamiento(ranura, nombre) {
        if (typeof equiposDict !== 'undefined' && nombre in equiposDict) {
            this[`equipo${ranura}`] = equiposDict[nombre];
        } else {
            this[`equipo${ranura}`] = { nombre: "Nada", icono: "img/nada.png", vidaMaxima: 0, poderMaximo: 0 };
        }
    }

    configurarHabilidad(ranura, nombre) {
        if (typeof habilidadesDict !== 'undefined' && nombre in habilidadesDict) {
            this[`habilidad${ranura}`] = habilidadesDict[nombre];
        } else {
            this[`habilidad${ranura}`] = { nombre, coste: 0, descripcion: "Habilidad sin datos" };
        }
    }
}

/**
 * GameState: Objeto global que mantiene el estado actual de la partida.
 */
const GameState = {
    // Array de 6 posiciones: [0] Heroe, [1..5] Esbirros
    entidades: Array.from({ length: 6 }, (_, i) => new Entidad(i === 0 ? {} : { nombre: "ESBIRRO" })),
    
    // Indica qué entidad está seleccionada actualmente en la UI (0-5)
    seleccionIndex: 0,

    // Mochila y moneda global unificada
    mochila: {
        capital: { oro: 0, plata: 0, bronce: 0 },
        items: { 1: "", 2: "", 3: "" }
    },

    get seleccionada() {
        return this.entidades[this.seleccionIndex];
    },

    /**
     * Guarda el estado completo en LocalStorage bajo una clave única.
     */
    guardar() {
        const data = {
            entidades: this.entidades,
            mochila: this.mochila,
            seleccionIndex: this.seleccionIndex,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('meeple_combat_state', JSON.stringify(data));
    },

    /**
     * Carga el estado desde LocalStorage y reconstruye las instancias de Entidad.
     */
    cargar() {
        const saved = localStorage.getItem('meeple_combat_state');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.entidades) {
                    data.entidades.forEach((d, i) => {
                        if (this.entidades[i]) this.entidades[i].actualizarPropiedades(d);
                    });
                }
                if (data.mochila) this.mochila = data.mochila;
                if (data.seleccionIndex !== undefined) this.seleccionIndex = data.seleccionIndex;
                return true;
            } catch (e) {
                console.error("Error al cargar GameState:", e);
                return false;
            }
        }
        return false;
    }
};

// Exponer al scope global para compatibilidad con scripts antiguos
window.Entidad = Entidad;
window.GameState = GameState;
