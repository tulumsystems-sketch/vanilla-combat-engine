/**
 * Meeple Combat - Módulo de Eventos y Controladores
 * Vinculación de interacciones del usuario (clicks, teclados, touch).
 * Replica exactamente el comportamiento de la carpeta interfaz.
 * @module UIEvents
 */

function initEventos() {
    // === Helpers para limpiar subrayados ===
    function limpiarSubrayadoArmas() {
        const a1 = document.getElementById("arma1Txt");
        const a2 = document.getElementById("arma2Txt");
        if (a1) a1.style.textDecoration = "none";
        if (a2) a2.style.textDecoration = "none";
    }

    function limpiarSubrayadoHabilidades() {
        [1, 2, 3].forEach(i => {
            const h = document.getElementById(`habilidad${i}Txt`);
            if (h) h.style.textDecoration = "none";
        });
    }

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

    // === Click en Consola ===
    // Legacy: en juego limpia consola y oculta flechas. En edición abre input de comandos.
    const consolaBtnEl = document.getElementById("consolaBtn");
    if (consolaBtnEl) {
        consolaBtnEl.addEventListener('click', () => {
            if (typeof edicion !== 'undefined' && edicion) {
                if (typeof tipoIngreso !== 'undefined') window.tipoIngreso = "comando";
                if (typeof mostrarInputComandos === 'function') mostrarInputComandos();
            } else {
                consolaBtnEl.innerHTML = "";
                if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            }
        });
    }

    // === Botones de Navegación de Esbirros (solo entre 1 y 5) ===
    const izquierdaBtn = document.getElementById("izquierdaBtn");
    const derechaBtn = document.getElementById("derechaBtn");
    
    if (izquierdaBtn) {
        izquierdaBtn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            if (typeof indexVisualizado !== 'undefined' && typeof entidades !== 'undefined') {
                window.indexVisualizado--;
                if (window.indexVisualizado < 1) window.indexVisualizado = 5;
                if (typeof GameState !== 'undefined') GameState.seleccionIndex = window.indexVisualizado;
                if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
            }
        });
    }

    if (derechaBtn) {
        derechaBtn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            if (typeof indexVisualizado !== 'undefined' && typeof entidades !== 'undefined') {
                window.indexVisualizado++;
                if (window.indexVisualizado > 5) window.indexVisualizado = 1;
                if (typeof GameState !== 'undefined') GameState.seleccionIndex = window.indexVisualizado;
                if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
            }
        });
    }

    // === Variables globales de combate ===
    window.objetoAccion = window.objetoAccion || 'arma';
    window.slotArmaSeleccionada = window.slotArmaSeleccionada || 1;
    window.slotHabilidadSeleccionada = window.slotHabilidadSeleccionada || 1;
    window.slotEstadisticaSeleccionada = window.slotEstadisticaSeleccionada || 1;

    // === Botones de Atributos (Ataque, Esquiva, Bloqueo, Velocidad) ===
    // En interfaz legacy: edicion → muestra flechas para editar con EXP.
    //                      juego → muestra valor total, setea accionTxt y objetoAccion.
    const statsConfig = [
        { key: 'ataque', slot: 1, accionLabel: 'ATACAR' },
        { key: 'esquiva', slot: 2, accionLabel: 'ESQUIVAR' },
        { key: 'bloqueo', slot: 3, accionLabel: 'BLOQUEAR' },
        { key: 'velocidad', slot: 4, accionLabel: 'CORRER' }
    ];

    statsConfig.forEach(cfg => {
        const btn = document.getElementById(`${cfg.key}Btn`);
        if (!btn) return;

        btn.addEventListener('click', () => {
            limpiarSubrayadoArmas();
            limpiarSubrayadoHabilidades();

            if (typeof edicion !== 'undefined' && edicion) {
                // Modo edición: mostrar flechas para subir/bajar stat con EXP
                window.statSeleccionadaParaFlechas = cfg.key;
                if (typeof mostrarBtnArribaAbajo === 'function') mostrarBtnArribaAbajo();
                if (typeof actualizarConsolaAtributo === 'function') actualizarConsolaAtributo();
            } else {
                // Modo juego: mostrar valor total y preparar acción
                if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
                window.objetoAccion = "estadistica";
                window.slotEstadisticaSeleccionada = cfg.slot;

                const accionTxt = document.getElementById("accionTxt");
                if (accionTxt) accionTxt.textContent = cfg.accionLabel;

                if (typeof mostrarEstadistica === 'function') mostrarEstadistica('seleccionada', cfg.key);
            }
        });
    });

    // === Botones de Vida y Poder ===
    const vidaBtn = document.getElementById("vidaBtn");
    const poderBtn = document.getElementById("poderBtn");

    if (vidaBtn) {
        vidaBtn.addEventListener('click', () => {
            limpiarSubrayadoArmas();
            limpiarSubrayadoHabilidades();

            if (typeof edicion !== 'undefined' && edicion) {
                // Modo edición: editar vidaMaxima con EXP
                window.statSeleccionadaParaFlechas = 'vidaMaxima';
                if (typeof mostrarBtnArribaAbajo === 'function') mostrarBtnArribaAbajo();
                if (typeof actualizarConsolaAtributo === 'function') actualizarConsolaAtributo();
            } else {
                // Modo juego: ajustar vida actual
                window.statSeleccionadaParaFlechas = 'vida';
                window.slotEstadisticaSeleccionada = 5;
                window.objetoAccion = "estadistica";

                if (typeof mostrarBtnArribaAbajo === 'function') mostrarBtnArribaAbajo();

                const accionTxt = document.getElementById("accionTxt");
                if (accionTxt) accionTxt.textContent = "ACCION";

                if (typeof actualizarConsolaAtributo === 'function') actualizarConsolaAtributo();
            }
        });
    }

    if (poderBtn) {
        poderBtn.addEventListener('click', () => {
            limpiarSubrayadoArmas();
            limpiarSubrayadoHabilidades();

            if (typeof edicion !== 'undefined' && edicion) {
                // Modo edición: editar poderMaximo con EXP
                window.statSeleccionadaParaFlechas = 'poderMaximo';
                if (typeof mostrarBtnArribaAbajo === 'function') mostrarBtnArribaAbajo();
                if (typeof actualizarConsolaAtributo === 'function') actualizarConsolaAtributo();
            } else {
                // Modo juego: ajustar poder actual
                window.statSeleccionadaParaFlechas = 'poder';
                window.slotEstadisticaSeleccionada = 6;
                window.objetoAccion = "estadistica";

                if (typeof mostrarBtnArribaAbajo === 'function') mostrarBtnArribaAbajo();

                const accionTxt = document.getElementById("accionTxt");
                if (accionTxt) accionTxt.textContent = "ACCION";

                if (typeof actualizarConsolaAtributo === 'function') actualizarConsolaAtributo();
            }
        });
    }

    // === Botón de Acción Principal ===
    const accionBtn = document.getElementById("accionBtn");
    if (accionBtn) {
        accionBtn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            if (typeof accion === 'function') accion();
        });
    }

    // === Botones de Habilidades (1, 2, 3) ===
    // Legacy: edicion → abre modal. juego → muestra descripción, selecciona para lanzar, subraya.
    [1, 2, 3].forEach(idx => {
        const btn = document.getElementById(`habilidad${idx}Btn`);
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();

            if (typeof edicion !== 'undefined' && edicion) {
                window.slotHabilidadSeleccionada = idx;
                if (typeof abrirModalHabilidades === 'function') abrirModalHabilidades();
            } else {
                // Modo juego: mostrar descripción y preparar para lanzar
                const target = typeof GameState !== 'undefined' ? GameState.seleccionada : null;
                if (target) {
                    const habilidad = target[`habilidad${idx}`];
                    if (habilidad && typeof contenConsola === 'function') {
                        contenConsola(
                            habilidad.nombre + "<br>----------------<br>" +
                            habilidad.descripcion + "<br>-----------------<br> MANÁ: " +
                            habilidad.coste
                        );
                    }
                }
            }

            // Seleccionar habilidad para acción (en ambos modos, como legacy)
            window.slotHabilidadSeleccionada = idx;
            window.objetoAccion = "habilidad";

            const accionTxt = document.getElementById("accionTxt");
            if (accionTxt) accionTxt.textContent = "LANZAR";

            // Subrayar la habilidad seleccionada, quitar de las demás y armas
            limpiarSubrayadoArmas();
            limpiarSubrayadoHabilidades();
            const habTxt = document.getElementById(`habilidad${idx}Txt`);
            if (habTxt) habTxt.style.textDecoration = "underline";
        });
    });

    // === Botón de Edición ===
    const editarBtn = document.getElementById("editarBtn");
    if (editarBtn) {
        editarBtn.addEventListener('click', () => {
            if (typeof toggleModoEdicion === 'function') toggleModoEdicion();
        });
    }

    // === Botones de Incremento/Decremento (Flechas Arriba/Abajo) ===
    // Replica el comportamiento legacy: click + long-press con interval.
    const arribaBtn = document.getElementById("arribaBtn");
    const abajoBtn = document.getElementById("abajoBtn");
    
    function startAutoAdjust(increment) {
        if (typeof ajustarStatSeleccionada === 'function') {
            ajustarStatSeleccionada(increment);
            window.autoAdjustInterval = setInterval(() => ajustarStatSeleccionada(increment), 300);
        }
    }
    
    function stopAutoAdjust() {
        if (window.autoAdjustInterval) {
            clearInterval(window.autoAdjustInterval);
            window.autoAdjustInterval = null;
        }
    }

    if (arribaBtn) {
        arribaBtn.addEventListener('contextmenu', (e) => e.preventDefault());
        arribaBtn.addEventListener('click', () => {
            if (typeof ajustarStatSeleccionada === 'function') ajustarStatSeleccionada(1);
        });
        arribaBtn.addEventListener('mousedown', () => startAutoAdjust(1));
        arribaBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startAutoAdjust(1); });
    }
    
    if (abajoBtn) {
        abajoBtn.addEventListener('contextmenu', (e) => e.preventDefault());
        abajoBtn.addEventListener('click', () => {
            if (typeof ajustarStatSeleccionada === 'function') ajustarStatSeleccionada(-1);
        });
        abajoBtn.addEventListener('mousedown', () => startAutoAdjust(-1));
        abajoBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startAutoAdjust(-1); });
    }

    document.addEventListener('mouseup', stopAutoAdjust);
    document.addEventListener('touchend', stopAutoAdjust);

    // === Botón de Selección (Ojo / Persona) - Alternar Modo PJ/Esbirro ===
    const esbirrosBtn = document.getElementById("esbirrosBtn");
    const esbirrosImg = document.getElementById("esbirrosImg");
    
    if (esbirrosBtn && esbirrosImg) {
        esbirrosBtn.addEventListener('click', () => {
            if (typeof indexVisualizado === 'undefined') return;
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();

            if (window.indexVisualizado === 0) {
                window.indexVisualizado = 1;
                if (typeof GameState !== 'undefined') GameState.seleccionIndex = 1;
                esbirrosImg.src = "img/personajeico.png";
            } else {
                window.indexVisualizado = 0;
                if (typeof GameState !== 'undefined') GameState.seleccionIndex = 0;
                esbirrosImg.src = "img/esbirrosico.png";
            }

            if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
        });
    }

    // === Botones de Equipo (1, 2, 3) ===
    // Legacy: edicion → abre modal. juego → muestra descripción del equipo.
    [1, 2, 3].forEach(idx => {
        const btn = document.getElementById(`equipo${idx}Btn`);
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();

            if (typeof edicion !== 'undefined' && edicion) {
                window.equipamientoSeleccionado = idx;
                if (typeof abrirModal === 'function') abrirModal('equipo');
            } else {
                // Modo juego: mostrar descripción del equipo en consola
                const target = typeof GameState !== 'undefined' ? GameState.seleccionada : null;
                if (target) {
                    const eq = target[`equipo${idx}`];
                    if (eq && eq.descripcion && typeof contenConsola === 'function') {
                        contenConsola(eq.descripcion);
                    }
                }
            }
        });
    });

    // === Botones de Armas (Izquierda y Derecha) ===
    // Legacy: edicion → abre modal. juego → muestra descripción, selecciona para atacar, subraya.
    ['arma1ImgBtn', 'arma1TxtBtn', 'arma2ImgBtn', 'arma2TxtBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;

        btn.addEventListener('click', () => {
            const slot = id.includes('arma2') ? 2 : 1;
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            
            if (typeof edicion !== 'undefined' && edicion) {
                window.slotArmaSeleccionada = slot;
                if (typeof abrirModal === 'function') abrirModal('armas');
            } else {
                // Modo juego: seleccionar arma para atacar
                window.slotArmaSeleccionada = slot;
                window.objetoAccion = "arma";
                
                const accionTxt = document.getElementById("accionTxt");
                if (accionTxt) accionTxt.textContent = "ATACAR";

                // Subrayar arma seleccionada, limpiar la otra y habilidades
                limpiarSubrayadoHabilidades();
                const a1 = document.getElementById("arma1Txt");
                const a2 = document.getElementById("arma2Txt");
                if (slot === 1) {
                    if (a1) a1.style.textDecoration = "underline";
                    if (a2) a2.style.textDecoration = "none";
                } else {
                    if (a1) a1.style.textDecoration = "none";
                    if (a2) a2.style.textDecoration = "underline";
                }

                // Mostrar descripción del arma en consola
                const target = (typeof GameState !== 'undefined') ? GameState.seleccionada : null;
                if (target) {
                    const arma = target[`arma${slot}`];
                    if (arma && typeof contenConsola === 'function') {
                        contenConsola(arma.descripcion || (arma.nombre || "ARMA").toUpperCase());
                    }
                }
            }
        });
    });

    // === Módulo de Experiencia (EXP) ===
    const expBtn = document.getElementById("experienciaBtn");
    const expInputCont = document.getElementById("contenedorInputExperiencia");
    const expInputVal = document.getElementById("experienciaValor");
    const expInputOk = document.getElementById("cerrarExperienciaInput");

    if (expBtn && expInputCont) {
        expBtn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();

            if (typeof edicion !== 'undefined' && edicion) {
                expInputCont.style.display = "flex";
                if (expInputVal) expInputVal.focus();
            } else {
                // Modo juego: mostrar EXP en consola
                const target = typeof GameState !== 'undefined' ? GameState.seleccionada : null;
                const exp = target ? (target.experiencia || 0) : 0;
                if (typeof contenConsola === 'function') {
                    contenConsola(`Experiencia: ${exp}`);
                }
            }
        });
    }

    if (expInputOk) {
        expInputOk.addEventListener('click', () => {
            const extra = parseInt(expInputVal.value);
            if (!isNaN(extra)) {
                const target = typeof GameState !== 'undefined' ? GameState.seleccionada : null;
                if (target) target.experiencia = (target.experiencia || 0) + extra;
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
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            if (typeof abrirModal === 'function') abrirModal('mochila');
        });
    }

    // === Botones de Monedas (UI principal y modal mochila) ===
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
        const btnMochila = document.getElementById(`${m}MochilaBtn`);
        if (btnMochila) {
            btnMochila.addEventListener('click', () => {
                if (typeof sumarMonedas === 'function') sumarMonedas(m);
            });
            btnMochila.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (typeof restarMonedas === 'function') restarMonedas(m);
            });
        }
    });
    
    // === Botón de Nombre (Descripción en juego / Renombrar en edición) ===
    const nombreBtn = document.getElementById("nombreBtn");
    if (nombreBtn) {
        nombreBtn.addEventListener('click', () => {
            if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
            const seleccionada = (typeof GameState !== 'undefined') ? GameState.seleccionada : null;
            if (!seleccionada) return;

            if (typeof edicion !== 'undefined' && edicion) {
                const nuevoNombre = prompt("Ingrese nuevo nombre:", seleccionada.nombre || "");
                if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
                    seleccionada.nombre = nuevoNombre.trim();
                    if (typeof imprimirPersonaje === 'function') imprimirPersonaje();
                    if (typeof GameState !== 'undefined') GameState.guardar();
                }
            } else {
                if (typeof contenConsola === 'function' && seleccionada.descripcion) {
                    contenConsola(seleccionada.descripcion);
                }
            }
        });
    }

    // === Función para manejar clics en la portada (Avatar) ===
    window.clickPortada = function() {
        if (typeof ocultarBtnArribaAbajo === 'function') ocultarBtnArribaAbajo();
        if (typeof indexVisualizado === 'undefined') return;
        
        if (window.indexVisualizado === 0) {
            if (typeof abrirModal === 'function') abrirModal('avatar');
        } else {
            if (typeof abrirModal === 'function') abrirModal('esbirros');
        }
    };
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initEventos);
