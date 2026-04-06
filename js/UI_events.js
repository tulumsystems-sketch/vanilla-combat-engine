/**
 * Meeple Combat - Módulo de Eventos y Controladores
 * Vinculación de interacciones del usuario (clicks, teclados, touch).
 * @module UIEvents
 */

function initEventos() {
    // === Comandos e Input ===
    const comandoValor = document.getElementById("comandoValor");
    if (comandoValor) {
        comandoValor.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (typeof procesarComando === 'function') procesarComando(comandoValor.value);
                comandoValor.value = "";
            }
        });
    }

    // === Botones de Navegación de Esbirros ===
    const izquierdaBtn = document.getElementById("izquierdaBtn");
    const derechaBtn = document.getElementById("derechaBtn");
    
    if (izquierdaBtn) {
        izquierdaBtn.addEventListener('click', () => {
            if (typeof indexVisualizado !== 'undefined' && typeof entidades !== 'undefined') {
                indexVisualizado--;
                if (indexVisualizado < 0) indexVisualizado = entidades.length - 1;
                if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
            }
        });
    }

    if (derechaBtn) {
        derechaBtn.addEventListener('click', () => {
            if (typeof indexVisualizado !== 'undefined' && typeof entidades !== 'undefined') {
                indexVisualizado++;
                if (indexVisualizado >= entidades.length) indexVisualizado = 0;
                if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
            }
        });
    }

    // === Botones de Atributos (Ataque, Esquiva, Bloqueo, Velocidad) ===
    const stats = ['ataque', 'esquiva', 'bloqueo', 'velocidad'];
    stats.forEach(key => {
        const btn = document.getElementById(`${key}Btn`);
        if (btn) {
            btn.addEventListener('click', () => {
                if (typeof edicion !== 'undefined' && edicion) {
                    if (typeof modificarEstadistica === 'function') modificarEstadistica(key);
                } else {
                    if (typeof mostrarEstadistica === 'function') mostrarEstadistica('seleccionada', key);
                }
            });
        }
    });

    // === Botones de Vida y Poder ===
    const vidaBtn = document.getElementById("vidaBtn");
    const poderBtn = document.getElementById("poderBtn");

    if (vidaBtn) {
        vidaBtn.addEventListener('click', () => {
            if (typeof edicion !== 'undefined' && edicion) {
                if (typeof modificarEstadistica === 'function') modificarEstadistica('vidaMaxima');
            } else {
                // Modo manual de ajuste de vida actual
                if (typeof mostrarEstadistica === 'function') mostrarEstadistica('seleccionada', 'vida');
            }
        });
    }

    if (poderBtn) {
        poderBtn.addEventListener('click', () => {
            if (typeof edicion !== 'undefined' && edicion) {
                if (typeof modificarEstadistica === 'function') modificarEstadistica('poderMaximo');
            } else {
                if (typeof mostrarEstadistica === 'function') mostrarEstadistica('seleccionada', 'poder');
            }
        });
    }

    // === Botón de Acción Principal ===
    const accionBtn = document.getElementById("accionBtn");
    if (accionBtn) {
        accionBtn.addEventListener('click', () => {
            if (typeof accion === 'function') accion();
        });
    }

    // === Botones de Habilidades (1, 2, 3) ===
    [1, 2, 3].forEach(idx => {
        const btn = document.getElementById(`habilidad${idx}Btn`);
        if (btn) {
            btn.addEventListener('click', () => {
                if (typeof edicion !== 'undefined' && edicion) {
                    if (typeof abrirModalHabilidades === 'function') abrirModalHabilidades();
                } else {
                    if (typeof usarHabilidad === 'function') usarHabilidad(idx);
                }
            });
        }
    });

    // === Botón de Edición ===
    const editarBtn = document.getElementById("editarBtn");
    if (editarBtn) {
        editarBtn.addEventListener('click', () => {
            if (typeof toggleModoEdicion === 'function') toggleModoEdicion();
        });
    }

    // === Botones de Incremento/Decremento (Flechas) ===
    const arribaBtn = document.getElementById("arribaBtn");
    const abajoBtn = document.getElementById("abajoBtn");
    if (arribaBtn) {
        arribaBtn.addEventListener('click', () => {
            window.tipoIngreso = 'mas';
            if (typeof contenConsola === 'function') contenConsola("Subir estadística (Haz clic en un ícono)");
        });
    }
    if (abajoBtn) {
        abajoBtn.addEventListener('click', () => {
            window.tipoIngreso = 'menos';
            if (typeof contenConsola === 'function') contenConsola("Bajar estadística (Haz clic en un ícono)");
        });
    }

    // === Botón de Selección (Ojo) ===
    const esbirrosBtn = document.getElementById("esbirrosBtn");
    if (esbirrosBtn) {
        esbirrosBtn.addEventListener('click', () => {
            const esPersonaje = (typeof indexVisualizado !== 'undefined' && indexVisualizado === 0);
            if (esPersonaje) {
                if (typeof abrirModal === 'function') abrirModal('personaje');
            } else {
                if (typeof abrirModal === 'function') abrirModal('esbirros');
            }
        });
    }

    // === Botones de Equipo (1, 2, 3) ===
    [1, 2, 3].forEach(idx => {
        const btn = document.getElementById(`equipo${idx}Btn`);
        if (btn) {
            btn.addEventListener('click', () => {
                window.equipamientoSeleccionado = idx;
                if (typeof abrirModal === 'function') abrirModal('equipo');
            });
        }
    });

    // === Botones de Armas (Izquierda y Derecha) ===
    ['arma1ImgBtn', 'arma1TxtBtn', 'arma2ImgBtn', 'arma2TxtBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.slotArmaSeleccionada = id.includes('arma2') ? 2 : 1;
                if (typeof abrirModal === 'function') abrirModal('armas');
            });
        }
    });

    // === Módulo de Experiencia (EXP) ===
    const expBtn = document.getElementById("experienciaBtn");
    const expInputCont = document.getElementById("contenedorInputExperiencia");
    const expInputVal = document.getElementById("experienciaValor");
    const expInputOk = document.getElementById("cerrarExperienciaInput");

    if (expBtn && expInputCont) {
        expBtn.addEventListener('click', () => {
            expInputCont.style.display = "flex";
            if (expInputVal) expInputVal.focus();
        });
    }

    if (expInputOk) {
        expInputOk.addEventListener('click', () => {
            const extra = parseInt(expInputVal.value);
            if (!isNaN(extra)) {
                window.experiencia = (window.experiencia || 0) + extra;
                if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
                if (typeof GameState !== 'undefined') GameState.guardar();
            }
            expInputCont.style.display = "none";
            expInputVal.value = "";
        });
    }

    // === Inicializar Mochila (si el módulo está cargado) ===
    if (typeof inicializarMochilaUI === 'function') inicializarMochilaUI();

    // === Botón de Mochila ===
    const mochilaBtn = document.getElementById("mochilaBtn");
    if (mochilaBtn) {
        mochilaBtn.addEventListener('click', () => {
            if (typeof abrirModal === 'function') abrirModal('mochila');
        });
    }

    // === Botones de Monedas ===
    const monedas = ['oro', 'plata', 'bronce'];
    monedas.forEach(m => {
        const btn = document.getElementById(`${m}Btn`);
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
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initEventos);
