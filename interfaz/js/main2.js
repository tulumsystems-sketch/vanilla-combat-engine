
// ======================================
// BLOQUE AGREGADO - INICIALIZACIÓN SEGURA ESBIRROS
// ======================================

var esbirros = [];
var esbirroSeleccionado = null;

function inicializarEsbirros() {

  try {

    const guardados = localStorage.getItem('listaEsbirros');

    if (guardados) {
      esbirros = cargarEstadoListaEsbirros();
    } else {

      esbirros = [
        new Esbirro(esbirrosDict.esbirro1),
        new Esbirro(esbirrosDict.esbirro2),
        new Esbirro(esbirrosDict.esbirro3),
        new Esbirro(esbirrosDict.esbirro4),
        new Esbirro(esbirrosDict.esbirro5),
      ];

      guardarEstadoListaEsbirros();
    }

    if (!Array.isArray(esbirros) || esbirros.length === 0) {
      console.warn("Lista vacía, reinicializando esbirros.");

      esbirros = [
        new Esbirro(esbirrosDict.esbirro1),
        new Esbirro(esbirrosDict.esbirro2),
        new Esbirro(esbirrosDict.esbirro3),
        new Esbirro(esbirrosDict.esbirro4),
        new Esbirro(esbirrosDict.esbirro5),
      ];

      guardarEstadoListaEsbirros();
    }

    esbirroSeleccionado = esbirros[0] || null;

  } catch (error) {
    console.error("Error al inicializar esbirros:", error);
  }
}

// Ejecutar automáticamente cuando cargue el DOM
document.addEventListener("DOMContentLoaded", function () {
  inicializarEsbirros();
});



function mostrarVisorHabilidad(hab) {
  const v = document.getElementById("visorHabilidad");
  if (!v) return;
  visorNombre.textContent = hab.nombre || "";
  visorCoste.textContent = "Coste: " + (hab.coste || 0);
  visorDescripcion.textContent = hab.descripcion || "";
  visorEfecto.textContent = hab.efecto || "";
  v.classList.add("visible");
  v.classList.remove("oculto");
}
function ocultarVisorHabilidad() {
  const v = document.getElementById("visorHabilidad");
  if (!v) return;
  v.classList.remove("visible");
  v.classList.add("oculto");
}
function initPressHoldVisor(item, hab) {
  let t = null;
  item.addEventListener("touchstart", () => { t = setTimeout(() => { mostrarVisorHabilidad(hab) }, 700); });
  function cls() { clearTimeout(t); ocultarVisorHabilidad(); }
  item.addEventListener("touchend", cls);
  item.addEventListener("touchmove", cls);
  item.addEventListener("touchcancel", cls);
}

// === Tooltip móvil con press-and-hold ===
function agregarTooltipMovil(btn, habilidad) {
  let pressTimer = null;

  btn.addEventListener("touchstart", e => {
    pressTimer = setTimeout(() => {
      if (typeof descripcionHabilidad === "function") {
        descripcionHabilidad(habilidad);
      }
    }, 700);
  });

  btn.addEventListener("touchend", e => {
    clearTimeout(pressTimer);
  });

  btn.addEventListener("touchmove", e => {
    clearTimeout(pressTimer);
  });

  btn.addEventListener("touchcancel", e => {
    clearTimeout(pressTimer);
  });
}
// === Fin tooltip móvil ===

/* 
  Meeple Combat - WebApp
  Versión con datos separados en archivos independientes.
  Tecnologías: HTML, CSS y JavaScript vanilla.

  Estructura de JS:
    - datos.esbirros.js: lista de esbirros (esbirrosDict)
    - datos.habilidades.js: lista de habilidades (habilidadesDict)
    - datos.armas.js: lista de armas (armasDict)
    - datos.personajes.js: lista de personajes (personajesDict)
    - main.js: lógica principal, manejo de eventos y comandos.

  Nota:
    El código se mantiene lo más legible posible para principiantes.
*/


document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("personaje");

  if (nombre) {
    const key = nombre.toLowerCase().trim();

    // Primero busca en personajes
    if (personajesDict[key]) {
      avatar(key);
      return;
    }

    // Luego busca por .nombre
    for (const k in personajesDict) {
      if (personajesDict[k].nombre.toLowerCase() === key) {
        avatar(k);
        return;
      }
    }

    console.warn("Personaje no encontrado:", nombre);
  }

  // --- GET para esbirros en slots ---
  const esbirroSingle = params.get("esbirro");
  const slotSingle = params.get("slot");
  const esbirroConfigs = [];

  if (esbirroSingle) {
    esbirroConfigs.push({
      slot: slotSingle ? parseInt(slotSingle, 10) - 1 : 0,
      nombre: esbirroSingle
    });
  }

  // Permite ?esbirro1=..., ?esbirro2=..., hasta ?esbirro5=...
  for (let i = 1; i <= 5; i++) {
    const p = params.get("esbirro" + i);
    if (p) {
      esbirroConfigs.push({
        slot: i - 1,
        nombre: p
      });
    }
  }

  if (esbirroConfigs.length > 0) {
    esbirroConfigs.forEach(cfg => {
      const rawName = cfg.nombre;
      const key = rawName.toLowerCase().trim();
      let base = null;

      // Primero busca por clave directa
      if (esbirrosDict[key]) {
        base = esbirrosDict[key];
      } else {
        // Luego busca por .nombre dentro del diccionario
        for (const k in esbirrosDict) {
          if (esbirrosDict[k].nombre.toLowerCase() === key) {
            base = esbirrosDict[k];
            break;
          }
        }
      }

      if (!base) {
        console.warn("Esbirro no encontrado:", rawName);
        return;
      }

      // Asegura índice de slot válido dentro del array esbirros
      if (typeof esbirros !== "undefined" && Array.isArray(esbirros) && esbirros.length > 0) {
        const idx = Math.max(0, Math.min(cfg.slot || 0, esbirros.length - 1));
        if (esbirros[idx] && typeof esbirros[idx].actualizarPropiedades === "function") {
          esbirros[idx].actualizarPropiedades(base);
        }
      }
    });

    // Si se configuró al menos un esbirro por GET, selecciona el primero para mostrarlo
    if (typeof esbirros !== "undefined" && Array.isArray(esbirros) && esbirros.length > 0) {
      const first = esbirroConfigs[0];
      const idx = Math.max(0, Math.min(first.slot || 0, esbirros.length - 1));
      if (typeof esbirroSeleccionado !== "undefined") {
        esbirroSeleccionado = esbirros[idx];
      }
      if (typeof mostrarEsbirroSeleccionado === "function") {
        mostrarEsbirroSeleccionado();
      }
    }
  }

});

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

//document.body.addEventListener('keydown', (e) => {
//  e.preventDefault();
//  return false;
//});

document.body.addEventListener('selectstart', (e) => {
  e.preventDefault();
  return false;
});

document.body.addEventListener('dragstart', (e) => {
  e.preventDefault();
  return false;
});

{ // * helpers, funciones varias
  /**
   * ? Cambia la portada del personaje o del esbirro seleccionado
   */
  function cambioImagen(event) {
    var input = event.target;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {

        if (esPersonaje) {
          personaje.portada = e.target.result
          guardarEstadoPersonaje()
          imprimirPersonaje()
        } else {
          esbirroSeleccionado.portada = e.target.result
          guardarEstadoListaEsbirros()
          mostrarEsbirroSeleccionado()
        }
      };

      // Read the selected image as a data URL
      reader.readAsDataURL(input.files[0]);
    }
  }

  function guardarEstadoMochila() {
    const mochilaString = JSON.stringify({ capital, itemMochila })

    localStorage.setItem('mochila', mochilaString)
  }

  function cargarEstadoMochila() {
    const mochilaString = localStorage.getItem('mochila')

    const mochilaData = JSON.parse(mochilaString)

    return mochilaData
  }

  /**
   * Guarda el estado de la lista de esbirros en el almacenamiento local.
   */
  function guardarEstadoListaEsbirros() {
    // Convierte la lista de esbirros a una cadena JSON.
    const esbirrosString = JSON.stringify(esbirros);

    // Almacena la cadena JSON en el almacenamiento local con la clave 'listaEsbirros'.
    localStorage.setItem('listaEsbirros', esbirrosString);
  }

  /**
 * Carga el estado previamente guardado de la lista de esbirros desde el almacenamiento local.
 * @returns {Array} - La lista de esbirros recuperada desde el almacenamiento local.
 */
  function cargarEstadoListaEsbirros() {
    // Obtiene la cadena JSON almacenada en el almacenamiento local con la clave 'listaEsbirros'.
    const esbirrosString = localStorage.getItem('listaEsbirros');

    // Parsea la cadena JSON y, si es nula, asigna un array vacío.
    const esbirrosData = JSON.parse(esbirrosString) || [];

    // Convierte los objetos simples de esbirro a instancias de la clase Esbirro.
    const lista = esbirrosData.map(data => new Esbirro(data));

    // Devuelve la lista de esbirros.
    return lista;
  }


  /**
   * Guarda el estado del personaje en el almacenamiento local.
   */
  function guardarEstadoPersonaje() {
    // Convierte el objeto del personaje a una cadena JSON.
    const personajeString = JSON.stringify(personaje);

    // Almacena la cadena JSON en el almacenamiento local con la clave 'personaje'.
    localStorage.setItem('personaje', personajeString);

    localStorage.setItem('arma1', JSON.stringify(arma1))
    localStorage.setItem('arma2', JSON.stringify(arma2))

    localStorage.setItem('equipo1', JSON.stringify(equipo1))
    localStorage.setItem('equipo2', JSON.stringify(equipo2))
    localStorage.setItem('equipo3', JSON.stringify(equipo3))

    localStorage.setItem('habilidad1', JSON.stringify(habilidad1))
    localStorage.setItem('habilidad2', JSON.stringify(habilidad2))
    localStorage.setItem('habilidad3', JSON.stringify(habilidad3))

    localStorage.setItem('exp', experiencia)
  }

  /**
   * Carga el estado previamente guardado del personaje desde el almacenamiento local.
   * @returns {Object} - El objeto del personaje recuperado desde el almacenamiento local.
   */
  function cargarEstadoPersonaje() {
    let output = {}

    // Obtiene la cadena JSON almacenada en el almacenamiento local con la clave 'personaje'.
    output.personaje = JSON.parse(localStorage.getItem('personaje'))

    output.arma1 = JSON.parse(localStorage.getItem('arma1'))
    output.arma2 = JSON.parse(localStorage.getItem('arma2'))

    output.equipo1 = JSON.parse(localStorage.getItem('equipo1'))
    output.equipo2 = JSON.parse(localStorage.getItem('equipo2'))
    output.equipo3 = JSON.parse(localStorage.getItem('equipo3'))

    output.habilidad1 = JSON.parse(localStorage.getItem('habilidad1'))
    output.habilidad2 = JSON.parse(localStorage.getItem('habilidad2'))
    output.habilidad3 = JSON.parse(localStorage.getItem('habilidad3'))

    if (localStorage.getItem('exp')) experiencia = Number(localStorage.getItem('exp'))
    // Parsea la cadena JSON y devuelve el objeto del personaje.
    return output
  }


  /* 
      * @text: sring
  */
  // ? Elimina los acentos de un string

  // ===== Guardar y cargar partida completa en .txt =====

  /**
   * Exporta todo el contenido del localStorage a un archivo .txt descargable.
   * La idea es poder guardar una "partida" completa en un archivo de texto.
   */
  function exportarPartidaComoTxt() {
    try {
      const backup = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
      }

      const contenido = JSON.stringify(backup, null, 2);
      const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const enlace = document.createElement('a');
      const fecha = new Date().toISOString().slice(0, 10);
      enlace.href = url;
      enlace.download = 'meeplecombat-partida-' + fecha + '.txt';

      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      URL.revokeObjectURL(url);

      if (typeof contenConsola === 'function') {
        contenConsola("Partida exportada. Revisa la carpeta de descargas.");
      }
    } catch (e) {
      console.error(e);
      if (typeof contenConsola === 'function') {
        contenConsola("Ocurrió un error al exportar la partida.");
      }
    }
  }

  /**
   * Maneja el evento de selección de archivo para importar una partida.
   * Lee el .txt, parsea el JSON y restaura todas las claves en localStorage.
   */
  function manejarImportarArchivoPartida(evento) {
    const input = evento.target;
    const archivo = input.files && input.files[0];

    if (!archivo) {
      if (typeof contenConsola === 'function') {
        contenConsola("No se seleccionó ningún archivo para importar.");
      }
      return;
    }

    const lector = new FileReader();
    lector.onload = function (e) {
      try {
        const texto = e.target.result;
        const backup = JSON.parse(texto);

        if (typeof backup !== 'object' || backup === null) {
          throw new Error("Formato de archivo inválido.");
        }

        Object.keys(backup).forEach((clave) => {
          localStorage.setItem(clave, backup[clave]);
        });

        if (typeof contenConsola === 'function') {
          contenConsola("Partida importada correctamente. Recargando la página...");
        }
        setTimeout(function () {
          window.location.reload();
        }, 700);
      } catch (error) {
        console.error(error);
        if (typeof contenConsola === 'function') {
          contenConsola("Error al importar el archivo. ¿Es un archivo de partida válido?");
        }
      } finally {
        input.value = "";
      }
    };

    lector.readAsText(archivo);
  }

  function quitarAcentos(text) {
    return text
      .normalize('NFD') // decompose accented characters into their base character and accent character
      .replace(/[\u0300-\u036f]/g, '') // remove the accent characters
      .toUpperCase()
  }

  // ? Limpia la consola si no esta en modo edición, caso contrario habre el promt de comandos
  consolaBtn.addEventListener('click', () => {
    if (!edicion) {
      consolaBtn.innerHTML = ""
      ocultarControlesCambioEsbirro()
      ocultarBtnArrivaAbajo()
      flagControlesCambioEsbirro = false
    } else if (edicion) {
      tipoIngreso = "comando"
      mostrarInputComandos()
    }
  })

  // ? Oculta los botones de edición, y cambia la var edición a 0
  function cerrarEdicion() {
    edicion = 0
    editarImg.src = "img/editar.png"

    ocultarBtnArrivaAbajo()
    experienciaTxt.style.display = "none"

    tipoIngreso = "comando"
    ocultarInputExperiencia()
    ocultarInputComandos()

    guardarEstadoListaEsbirros()
    guardarEstadoPersonaje()
  }
  /* 
      * @estadistica: string
  */
  // ? Muestra la estadistica
  function mostrarEstadistica(tipo, estadistica) {
    let data

    let personajeEstadistica = personaje[estadistica] + equipo1[estadistica] + equipo2[estadistica] + equipo3[estadistica]
    let esbirroEstadistica = esbirroSeleccionado[estadistica] + esbirroSeleccionado.equipo1[estadistica] + esbirroSeleccionado.equipo2[estadistica] + esbirroSeleccionado.equipo3[estadistica]

    if (tipo === "personaje") data = `${capitalizarPrimeraLetra(estadistica)} ${personajeEstadistica}`
    else data = `${capitalizarPrimeraLetra(estadistica)} ${esbirroEstadistica}`

    // * Para la funcion accion()
    switch (estadistica) {
      case "ataque":
        slotEstadisticaSeleccionada = 1
        break
      case "esquiva":
        slotEstadisticaSeleccionada = 2
        break
      case "bloqueo":
        slotEstadisticaSeleccionada = 3
        break
      case "velocidad":
        slotEstadisticaSeleccionada = 4
        break
      default:
        break
    }
    objetoAccion = "estadistica"

    contenConsola(data)
  }

  /* 
      * @val: string
  */
  // ? Modifica el contenido de la consola
  function contenConsola(val) {
    consolaBtn.innerHTML = val

    btnMasMenos.style.display = "none"
    if (!esPersonaje) {
      izquierdaBtn.style.display = "none"
      derechaBtn.style.display = "none"
    }
  }

  /* 
      * @slot: number
  */
  // ? Muestra descripcion de arma
  function mostrarDescripcionArma(slot) {
    let seleccion = slot == 1 ? arma1 : arma2
    contenConsola(seleccion.descripcion)
  }

  // ? Muestra los botones de incremento y decremento
  function mostrarBtnArribaAbajo() {
    btnMasMenos.style.display = "flex"
    ocultarControlesCambioEsbirro()
    flagControlesCambioEsbirro = false
  }

  // ? Oculta los botones de incremento y decremento
  function ocultarBtnArrivaAbajo() {
    btnMasMenos.style.display = "none"
    if (esPersonaje) guardarEstadoPersonaje()
    else guardarEstadoListaEsbirros()
  }

  /**
   * ? Capitaliza la primera letra de un string.
   *
   * @param {string} texto - El string que se va a capitalizar.
   * @returns {string} - El string con la primera letra en mayúscula.
   */
  function capitalizarPrimeraLetra(texto) {
    // Verifica si el texto está vacío o es nulo y devuelve el mismo texto sin cambios
    if (!texto) {
      return texto;
    }

    // Capitaliza la primera letra del texto y la concatena con el resto del texto en minúsculas
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  function quitarEspacios(texto) {
    return texto.split(" ").join("")
  }
}


{ // * Ingreso de comandos
  // ? Indica si el input se quiere usar para ingresar comandos, cambiar nombre de habilidades o nombre de personaje

}









//HABILIDADES





// ? Objeto para almacenar información de las habilidades
// TODO: Agregar habilidades restantes, y revisar existentes
















//ARMAS











// ? Objeto para almacenar información de las armas
// TODO: Agregar las demas armas / tipo: mecanomagica para consumir poder automaticamente.

const listaArmas = Object.keys(armasDict)







//ESBIRROS







// ? Objeto para almacenar información de los esbirros
// TODO: Agregar los demas esbirros

const listaEsbirros = Object.keys(esbirrosDict).filter(name => {
  if (["esbirro1", "esbirro2", "esbirro3", "esbirro4", "esbirro5"].indexOf(name) === -1) {
    return true
  } else return false
})






//PERSONAJES






// ? Objeto para almecenar información de los esbirros
// TODO: Agregar los demas personajes



const listaPersonajes = Object.keys(personajesDict).filter(name => {
  if (
    name !== 'bienvenida'
    && name !== 'nuevopj'
    && name !== 'nuevoesbirro'
  ) {
    return true
  } else return false
})






















// ? Objeto para almacenar información de los distintos equipamientos
// TODO: Revisar atributos de cada item

const listaEquipos = Object.keys(equiposDict).filter(name => {
  if (name !== 'nada') {
    return true
  } else return false
})

// ? Bandera que indica si el juego esta en modo edicion o no, valores posibles 0 o 1
var edicion = 0
// ? Bandera que indica si se esta editanto el personaje principal o el esbirro, valores posibles 'personaje' o 'esbirro'
var tipoEdicion = 'personaje'
// ? Contiene informacion sobre la cantidad de monedas en la mochila
var capital = {
  oro: 0,
  plata: 0,
  bronce: 0,
}
var itemMochila = {
  1: "",
  2: "",
  3: ""
}

if (localStorage.getItem('mochila')) {
  const mochila = cargarEstadoMochila()
  Object.assign(capital, mochila.capital)
  Object.assign(itemMochila, mochila.itemMochila)

  actualizarMochila()
}

// ? Indicador de experiencia general
var experiencia = 0
// ? Indica el arma seleccionada para ejecutar la función acción(), rango 1..2
var slotArmaSeleccionada = 1
// ? Indica el atributo seleccionado para ejecutar la función acción(), rango 1..6
var slotEstadisticaSeleccionada = 1
// ? Indica si selecciono un arma o un atributo para ejecutar la función acción(), valor "arma" || "estadistica"
var objetoAccion = "arma"
// ? Indica si los botones de izquierda y derecha de cambio de esbirro estan activados
var flagControlesCambioEsbirro = false

// Referencias seguras a elementos del DOM (evita depender de IDs como variables globales)
const esbirrosBtn = document.getElementById('esbirrosBtn') || window.esbirrosBtn;
const esbirrosImg = document.getElementById('esbirrosImg') || window.esbirrosImg;

// ? Indica que ranura de equipamiento se esta editando, rango 1..3
var equipamientoSeleccionado = 1
// ? Guarda la estadistica que se esta modificando
var estadisticaSeleccionada
// ? Contiene el esbirro que se esta mostrando

var esPersonaje = true
// ? Contiene el costo de experiencia de cada atributo
const valorExperiencia = {
  ataque: 3,
  esquiva: 3,
  bloqueo: 3,
  velocidad: 6,
  vidaMaxima: 1,
  poderMaximo: 1
}








































//!! //////////////////// COMIENZO BLOQUE DE PERSONAJE //!! ////////////////////
{ // * Variables personaje
  var personaje = {}
  var arma1 = {}
  var arma2 = {}
  var equipo1 = {}
  var equipo2 = {}
  var equipo3 = {}
  var habilidad1 = {}
  var habilidad2 = {}
  var habilidad3 = {}

  if (localStorage.getItem('personaje')) {
    personaje = cargarEstadoPersonaje().personaje

    arma1 = cargarEstadoPersonaje().arma1
    arma2 = cargarEstadoPersonaje().arma2
    equipo1 = cargarEstadoPersonaje().equipo1
    equipo2 = cargarEstadoPersonaje().equipo2
    equipo3 = cargarEstadoPersonaje().equipo3
    habilidad1 = cargarEstadoPersonaje().habilidad1
    habilidad2 = cargarEstadoPersonaje().habilidad2
    habilidad3 = cargarEstadoPersonaje().habilidad3
  } else {
    personaje = {

      nombre: "BIENVENIDO",
      // meeple: "img/logo-meeple-combat.png",
      portada: "img/logo-meeple-combat.png",
      descripcion: "Descripcion personaje default",



      ataque: 0,
      esquiva: 0,
      bloqueo: 0,
      velocidad: 0,

      vida: 0,
      vidaMaxima: 0,

      poder: 0,
      poderMaximo: 0,

      // * nivel del equipamiento
      // equipo1: "",
      // equipo2: "",
      // equipo3: "",

      // * nombre de arma
      arma1: "Una Mano",
      arma2: "Dos Manos",

      // * nombre de habilidades
      habilidad1: "HABILIDAD 1",
      habilidad2: "HABILIDAD 2",
      habilidad3: "HABILIDAD 3",
    }

    arma1 = {

      nombre: "Arma 1",
      icono: "img/nada.png",
      descripcion: "Espacio de arma 1",
      danno: 0,

    }

    arma2 = {

      nombre: "Arma 2",
      icono: "img/nada.png",
      descripcion: "Espacio de arma 2",
      danno: 0,

    }

    equipo1 = {

      nombre: "Equipo1",
      icono: "img/nada.png",
      descripcion: "",

      nivel: 0,

      ataque: 0,
      esquiva: 0,
      bloqueo: 0,
      velocidad: 0,
      vidaMaxima: 0,
      poderMaximo: 0,

    }

    equipo2 = {

      nombre: "Equipo1",
      icono: "img/nada.png",
      descripcion: "",

      nivel: 0,

      ataque: 0,
      esquiva: 0,
      bloqueo: 0,
      velocidad: 0,
      vidaMaxima: 0,
      poderMaximo: 0,

    }

    equipo3 = {

      nombre: "Equipo1",
      icono: "img/nada.png",
      descripcion: "",

      nivel: 0,

      ataque: 0,
      esquiva: 0,
      bloqueo: 0,
      velocidad: 0,
      vidaMaxima: 0,
      poderMaximo: 0,

    }

    habilidad1 = {
      nombre: "habilidad 1",
      coste: 0,
      descripcion: "Descripción de habilidad 1"
    }

    habilidad2 = {
      nombre: "habilidad 2",
      coste: 0,
      descripcion: "Descripción de habilidad 2"
    }

    habilidad3 = {
      nombre: "habilidad 3",
      coste: 0,
      descripcion: "Descripción de habilidad 3"
    }
  }
}

/* 
    ? Refresca el texto y la imagen de los siguientes componentes:
        portada, nombre, estadisticas (ataque, esquiva, etc), equipamiento, arma slot 1, arma slot 2, habilidades
*/
function imprimirPersonaje() {
  let atributosPersonaje = {
    ataque: personaje.ataque,
    esquiva: personaje.esquiva,
    bloqueo: personaje.bloqueo,
    velocidad: personaje.velocidad,
    vida: personaje.vida,
    poder: personaje.poder,
    vidaMaxima: personaje.vidaMaxima,
    poderMaximo: personaje.poderMaximo
  }

  for (const key in atributosPersonaje) {
    if (equipo1[key]) atributosPersonaje[key] += equipo1[key]
    if (equipo2[key]) atributosPersonaje[key] += equipo2[key]
    if (equipo3[key]) atributosPersonaje[key] += equipo3[key]
  }

  portadaImg.src = personaje.portada
  // portadaImg.src = `img/${quitarEspacios(personaje.nombre)}.png`

  nombreTxt.textContent = personaje.nombre.toUpperCase()

  ataqueTxt.textContent = atributosPersonaje.ataque
  esquivaTxt.textContent = atributosPersonaje.esquiva
  bloqueoTxt.textContent = atributosPersonaje.bloqueo
  velocidadTxt.textContent = atributosPersonaje.velocidad

  vidaTxt.textContent = personaje.vida

  poderTxt.textContent = personaje.poder

  equipo1Txt.textContent = equipo1.nivel
  equipo2Txt.textContent = equipo2.nivel
  equipo3Txt.textContent = equipo3.nivel

  equipo1Img.src = equipo1.icono
  equipo2Img.src = equipo2.icono
  equipo3Img.src = equipo3.icono

  arma1Txt.textContent = capitalizarPrimeraLetra(arma1.nombre)
  arma2Txt.textContent = capitalizarPrimeraLetra(arma2.nombre)
  arma1Img.src = arma1.icono
  arma2Img.src = arma2.icono

  habilidad1Txt.textContent = habilidad1.nombre.toUpperCase()
  habilidad2Txt.textContent = habilidad2.nombre.toUpperCase()
  habilidad3Txt.textContent = habilidad3.nombre.toUpperCase()

  experienciaTxt.textContent = experiencia
}
imprimirPersonaje()


editarBtn.addEventListener('click', function () {

  if (edicion == 0) {
    edicion = 1
    editarImg.src = "img/guardar.png"

    contenConsola("Seleccione nombre, slot de arma o habilidad")

    experienciaTxt.style.display = "flex"
  } else {

    edicion = 0
    editarImg.src = "img/editar.png"
    cerrarEdicion()
  }

})

portadaBtn.addEventListener('click', function () {
  if (edicion == 1 && tipoEdicion == "personaje") {
    modalPersonaje.style.display = "grid"
  } else if (edicion == 1 && tipoEdicion == "esbirro") {
    modalEsbirros.style.display = "grid"
  }

  // ? Si esta en modo juego y el personaje es un esbirro muestra los botones para intercambiar entre esbirros
  if (!edicion && !esPersonaje && !flagControlesCambioEsbirro) {
    flagControlesCambioEsbirro = true
    mostrarControlesCambioEsbirro()

    ocultarBtnArrivaAbajo()
    consolaBtn.innerHTML = esbirroSeleccionado.descripcion
  } else if (!edicion && !esPersonaje && flagControlesCambioEsbirro) {
    flagControlesCambioEsbirro = false
    ocultarControlesCambioEsbirro()

    ocultarBtnArrivaAbajo()
    consolaBtn.innerHTML = esbirroSeleccionado.descripcion
  }

})

/* 
    * @opcion: string
*/
// ? cierra modal de armas, de personajes, de equipamiento o de la mochila
function cerrarModal(opcion) {
  switch (opcion) {
    case "armas":
      modalArmas.style.display = "none"
      edicion = 0
      editarImg.src = "img/editar.png"
      break;

    case "armasNaturales":
      modalArmasNaturales.style.display = "none"
      edicion = 0
      editarImg.src = "img/editar.png"
      tipoArma = "marciales"
      break;

    case "armasNaturales2":
      modalArmasNaturales2.style.display = "none"
      edicion = 0
      editarImg.src = "img/editar.png"
      tipoArma = "marciales"
      break;

    case "personajes":
      modalPersonaje.style.display = "none"
      edicion = 0
      editarImg.src = "img/editar.png"
      break;

    case "esbirros":
      modalEsbirros.style.display = "none"
      edicion = 0
      editarImg.src = "img/editar.png"
      break;

    case "equipamiento":
      modalEquipo.style.display = "none"
      edicion = 0
      editarImg.src = "img/editar.png"
      break;

    case "mochila":
      // TODO: Completar
      modalMochila.style.display = "none"


    default:
      break;
  }
  cerrarEdicion()
}

cerrarModalPersonaje.addEventListener('click', function () {
  cerrarModal("personajes")
})
cerrarModalEsbirros.addEventListener('click', function () {
  cerrarModal("esbirros")
})
cerrarModalArmas.addEventListener('click', function () {
  cerrarModal("armas")
})
cerrarModalArmasNaturales.addEventListener('click', function () {
  cerrarModal("armasNaturales")
})
cerrarModalArmasNaturales2.addEventListener('click', function () {
  cerrarModal("armasNaturales2")
})
cerrarModalEquipo.addEventListener('click', function () {
  cerrarModal("equipamiento")
})

const cerrarModalHabilidadesBtn = document.getElementById("cerrarModalHabilidades");
if (cerrarModalHabilidadesBtn) {
  cerrarModalHabilidadesBtn.addEventListener("click", function () {
    cerrarModalHabilidades();
  });
}

cerrarModalMochila.addEventListener('click', function () {
  cerrarModal("mochila")
})

arma1ImgBtn.addEventListener('click', function () {
  armas(personaje.arma1, 1)
  accionTxt.textContent = "ATACAR"
  arma1Txt.style.textDecoration = "underline"
  arma2Txt.style.textDecoration = "none"
})
arma1TxtBtn.addEventListener('click', function () {
  armas(personaje.arma1, 1)
  accionTxt.textContent = "ATACAR"
  arma1Txt.style.textDecoration = "underline"
  arma2Txt.style.textDecoration = "none"

  habilidad1Txt.style.textDecoration = "none"
  habilidad2Txt.style.textDecoration = "none"
  habilidad3Txt.style.textDecoration = "none"
})
arma2ImgBtn.addEventListener('click', function () {
  armas(personaje.arma2, 2)
  accionTxt.textContent = "ATACAR"
  arma1Txt.style.textDecoration = "none"
  arma2Txt.style.textDecoration = "underline"
})
arma2TxtBtn.addEventListener('click', function () {
  armas(personaje.arma2, 2)
  accionTxt.textContent = "ATACAR"
  arma1Txt.style.textDecoration = "none"
  arma2Txt.style.textDecoration = "underline"

  habilidad1Txt.style.textDecoration = "none"
  habilidad2Txt.style.textDecoration = "none"
  habilidad3Txt.style.textDecoration = "none"
})


// ! Mochila
mochilaBtn.addEventListener('click', function () {
  modalMochila.style.display = "grid"
})
function actualizarMochila() {
  oroTxt.textContent = capital.oro
  plataTxt.textContent = capital.plata
  bronceTxt.textContent = capital.bronce
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`item-mochila${i}`).textContent = itemMochila[i]
  }
}
actualizarMochila()

function restarMonedas(tipo) {
  switch (tipo) {
    case "oro":
      if (capital.oro > 0) capital.oro--
      break
    case "plata":
      if (capital.plata === 0 && capital.oro > 0) {
        capital.oro--
        capital.plata += 9
      } else if (capital.plata > 0) {
        capital.plata--
      }
      break
    case "bronce":
      if (capital.bronce === 0 && capital.plata > 0) {
        capital.plata--
        capital.bronce += 9
      } else if (capital.bronce > 0) {
        capital.bronce--
      }
      break
    default:
      break
  }

  guardarEstadoMochila()
  actualizarMochila()
}

function sumarMonedas(tipo) {
  switch (tipo) {
    case "oro":
      capital.oro++
      break
    case "plata":
      capital.plata++
      break
    case "bronce":
      capital.bronce++
      break
    default:
      break
  }

  // Evalua el capital
  if (capital.plata / 10 >= 1) {
    capital.plata %= 100
    capital.oro++
  }
  if (capital.bronce / 10 >= 1) {
    capital.bronce %= 100
    capital.plata++
  }

  guardarEstadoMochila()
  actualizarMochila()
}

function cambiarItemMochila(txt) {
  itemMochila[idxitemMochila] = txt
  guardarEstadoMochila()
}

{ // Triggers de monedas
  const monedas = ['oro', 'plata', 'bronce']
  monedas.forEach(nombre => {
    const boton = document.getElementById(`${nombre}Btn`)
    boton.addEventListener('click', function () {
      const handler = edicion == 1 ?
        sumarMonedas : restarMonedas
      handler(nombre)
    })

    let timer
    function iniciarTimer() {
      timer = setInterval(() => {
        const handler = edicion == 1 ?
          sumarMonedas : restarMonedas
        handler(nombre)
      }, 300)
    }

    function detenerTimer() {
      clearInterval(timer)
    }

    boton.addEventListener('mousedown', () => {
      iniciarTimer()
    })
    boton.addEventListener('touchstart', () => {
      iniciarTimer()
    })

    // Manejar el evento de soltar el botón
    document.addEventListener('mouseup', () => {
      detenerTimer()
    })
    document.addEventListener('touchend', () => {
      detenerTimer()
    })

  })
}

let idxitemMochila = 1
{ // Items mochila
  for (let i = 1; i <= 3; i++) {
    const item = document.getElementById(`item-mochila${i}`)
    item.addEventListener('click', () => {
      if (edicion) {
        tipoIngreso = "mochila-item"
        idxitemMochila = i
        mostrarInputComandos()
      }
    })
  }
}

/* 
    * @meeple: string
*/
// ? Funcion para cambio de personaje
function avatar(meeple) {
  if (!(meeple in personajesDict)) {
    console.error(`Personaje: ${meeple} no esta en personajesDict`)
    return
  }

  esPersonaje = true

  Object.assign(personaje, personajesDict[meeple])
  personaje.meeple = `img/${quitarEspacios(personaje.nombre)}.png`

  Object.assign(arma1, armasDict[personaje.arma1])

  Object.assign(arma2, armasDict[personaje.arma2])

  Object.assign(habilidad1, habilidadesDict[personaje.habilidad1])
  Object.assign(habilidad2, habilidadesDict[personaje.habilidad2])
  Object.assign(habilidad3, habilidadesDict[personaje.habilidad3])

  equipo1 = reiniciarEquipamiento(1)
  equipo2 = reiniciarEquipamiento(2)
  equipo3 = reiniciarEquipamiento(3)

  Object.assign(equipo1, equiposDict[personajesDict[meeple].equipo1])
  Object.assign(equipo2, equiposDict[personajesDict[meeple].equipo2])
  Object.assign(equipo3, equiposDict[personajesDict[meeple].equipo3])


  // Cargar habilidades preestablecidas del personaje seleccionado
  Object.assign(habilidad1, habilidadesDict[personaje.habilidad1] || { nombre: "N/A", coste: 0, descripcion: "" })
  Object.assign(habilidad2, habilidadesDict[personaje.habilidad2] || { nombre: "N/A", coste: 0, descripcion: "" })
  Object.assign(habilidad3, habilidadesDict[personaje.habilidad3] || { nombre: "N/A", coste: 0, descripcion: "" })

  experiencia = 0

  if (meeple === 'nuevopj' || meeple === 'nuevoesbirro') experiencia = 200

  imprimirPersonaje()
  cerrarModal("personajes")
  cerrarModal("esbirros")
  cerrarEdicion()
  contenConsola(personaje.descripcion)

}



// * EventListener de los personajes del modal personaje

// TODO: Agregar el nombre de los personajes restantes

[

  "barbaro", "guerrero", "paladin",
  "picaro", "monje", "cazador",
  "druida", "chaman", "mago",
  "paladinoscuro", "nigromante", "guardiarunico",
  "nuevopj",

  "nuevoesbirro", "cinirus", "naigaran",
  "sarcomos", "raizor", "momontu", "ghalidos", "tortakla",
  "kardanto", "terronte", 'lobo'


].forEach(key => {
  const boton = document.getElementById(`${key}Btn`)
  boton.addEventListener('click', () => {
    if (esPersonaje) avatar(key)
    else if (!esPersonaje) cambiarEsbirro(key)
  })
})

/**
 * ? Funcion para mostrar el modal de equipamiento
 * @param {number} slot - numero de ranura en equipamiento seleccionada
 */
function equipo(slot) {
  equipamientoSeleccionado = slot
  if (edicion == 1) {

    modalEquipo.style.display = "grid"

  } else {
    if (slot === 1) {
      if (esPersonaje) contenConsola(`${equipo1.descripcion}`)
      else contenConsola(`${esbirroSeleccionado.equipo1.descripcion}`)
    }
    if (slot === 2) {
      if (esPersonaje) contenConsola(`${equipo2.descripcion}`)
      else contenConsola(`${esbirroSeleccionado.equipo2.descripcion}`)
    }
    if (slot === 3) {
      if (esPersonaje) contenConsola(`${equipo3.descripcion}`)
      else contenConsola(`${esbirroSeleccionado.equipo3.descripcion}`)
    }
  }
}

equipo1Btn.addEventListener('click', function () { equipo(1) })
equipo2Btn.addEventListener('click', function () { equipo(2) })
equipo3Btn.addEventListener('click', function () { equipo(3) })

function armas(armaSeleccionada, slot) {
  slotArmaSeleccionada = slot
  objetoAccion = "arma"
  if (edicion == 1) {

    modalArmas.style.display = "grid"

  } else {
    if (esPersonaje) {
      contenConsola(
        slotArmaSeleccionada == 1
          ? arma1.descripcion
          : arma2.descripcion
      )
    }
    else contenConsola(esbirroSeleccionado[`arma${slotArmaSeleccionada}`].descripcion)
  }
}

// * Cambio en las estadisticas del personaje
{ // * Funciones para manipulación de la experiencia
  function mostrarInputExperiencia() {
    ocultarInputComandos()
    contenedorInputExperiencia.style.display = "flex"
    experienciaValor.autofocus = true
  }
  function ocultarInputExperiencia() {
    contenedorInputExperiencia.style.display = "none"
  }
  experienciaValor.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      establecerExperiencia(Number(experienciaValor.value))
      ocultarInputExperiencia()
    }
  })
  cerrarExperienciaInput.addEventListener("click", function () {
    establecerExperiencia(Number(experienciaValor.value))
    ocultarInputExperiencia()
  })

  function establecerExperiencia(valor) {
    if (!valor) valor = 0

    if (esPersonaje) {
      experiencia += valor
      imprimirPersonaje()
    } else {
      experiencia += valor
      mostrarEsbirroSeleccionado()
    }

    cerrarEdicion()
  }

  /**
   * ? Incrementa o disminuye la experiencia del personaje o esbirro según la acción y la estadística especificadas.
   * @param {string} tipo - El tipo de entidad a la que se aplica la experiencia: "personaje" o "esbirro".
   * @param {string} accion - La acción a realizar: "mas" para aumentar, "menos" para disminuir.
   * @param {string} estadistica - La estadística relacionada con la experiencia: "vidaMaxima", "poderMaximo", etc.
   */
  function aumentarDisminuirExperiencia(tipo, accion, estadistica) {
    let valor;

    // TODO: El valor a aumentar o disminuir sera de 1 cada 10 pts si el atributo es vidaMaxima o poderMaximo

    if (tipo === "personaje") {
      // Calcular el valor de experiencia según la acción y estadística
      if (estadistica === 'vidaMaxima' || estadistica === 'poderMaximo') {
        valor = 1
      }
      else {
        valor =
          accion === "mas"
            ? (personaje[estadistica] === 0 ? 1 : personaje[estadistica] + 1) *
            valorExperiencia[estadistica]
            : personaje[estadistica] * valorExperiencia[estadistica]
      }
      // Incrementar o disminuir la experiencia del personaje
      experiencia += accion === "mas" ? valor : valor * -1
    } else {
      if (estadistica === 'vidaMaxima' || estadistica === 'poderMaximo') {
        valor = 1
      } else {
        // Calcular el valor de experiencia según la acción y estadística
        valor =
          accion === "mas"
            ? (esbirroSeleccionado[estadistica] === 0
              ? 1
              : esbirroSeleccionado[estadistica] + 1) *
            valorExperiencia[estadistica]
            : esbirroSeleccionado[estadistica] * valorExperiencia[estadistica]
      }
      // Incrementar o disminuir la experiencia del esbirro seleccionado
      experiencia += accion === "mas" ? valor : valor * -1
    }
  }

}

{ // * eventListeners del boton de experiencia
  experienciaBtn.addEventListener('click', () => {
    if (edicion) {
      mostrarInputExperiencia()
    } else {
      ocultarBtnArrivaAbajo()
      if (esPersonaje) contenConsola(`Experiencia: ${experiencia}`)
      else contenConsola(`Experiencia: ${experiencia}`)
    }
  })
}

{ // * Funciones para modificar las estadisticas de los personajes

  /**
   *  ? Muestra los botones de incremento y decremento SOLO EN MODO EDICIÓN, y modifica "estadisticaSeleccionada".
   * @param {string} atributo - El nombre del atributo a modificar.
   */
  function modificarEstadistica(atributo) {

    mostrarBtnArribaAbajo()

    estadisticaSeleccionada = atributo;

    let data;

    if (tipoEdicion === "personaje") {
      if (atributo === 'vidaMaxima') {
        data = `Vida ${personaje['vida']} / ${personaje['vidaMaxima']}`

      } else if (atributo === 'poderMaximo') {
        data = `Maná ${personaje['poder']} / ${personaje['poderMaximo']}`

      } else data = `${capitalizarPrimeraLetra(atributo)} ${personaje[atributo]}`;
    } else {
      if (atributo === 'vidaMaxima') {
        data = `Vida ${esbirroSeleccionado['vida']} / ${esbirroSeleccionado['vidaMaxima']}`

      } else if (atributo === 'poderMaximo') {
        data = `Maná ${esbirroSeleccionado['poder']} / ${esbirroSeleccionado['poderMaximo']}`

      } else data = `${capitalizarPrimeraLetra(atributo)} ${esbirroSeleccionado[atributo]}`;
    }

    consolaBtn.innerHTML = data
  }


  /* 
      * @accion: string
      * @estadistica: string
   */
  // ? modifica los valores dependiendo de la estadistica
  function modificarValores(accion, estadistica) {
    let data = ""

    // * componenetes
    let consola = consolaBtn

    // ? valor de experiencia minimo requerido
    let valor
    if (estadistica === 'vidaMaxima' || estadistica === 'poderMaximo') {
      valor = 1
    }
    else valor = (personaje[estadistica] + 1) * valorExperiencia[estadistica]

    if (accion === 'mas') {
      if (experiencia >= valor) {
        personaje[estadistica]++

        if (estadistica === 'vidaMaxima') {
          data = `Vida ${personaje['vida']} / ${personaje['vidaMaxima']}`

        } else if (estadistica === 'poderMaximo') {
          data = `Maná ${personaje['poder']} / ${personaje['poderMaximo']}`

        } else {
          data = `${capitalizarPrimeraLetra(estadistica)} ${personaje[estadistica]}`
        }

        // * decrementar exp
        aumentarDisminuirExperiencia("personaje", 'menos', estadistica)

        // * cambiar contenido mostrado
        consola.innerHTML = data
        imprimirPersonaje()
      } else {
        consola.innerHTML = "Experiencia insuficiente"
      }
    } else {
      if (personaje[estadistica] > 0) {
        personaje[estadistica]--

        // * Incrementar exp
        aumentarDisminuirExperiencia('personaje', 'mas', estadistica)

        // * cambiar contenido mostrado
        if (estadistica === 'vidaMaxima') {
          if (personaje.vidaMaxima < personaje.vida) personaje.vida--
          data = `Vida ${personaje.vida} / ${personaje.vidaMaxima}`
        } else if (estadistica === 'poderMaximo') {
          if (personaje.poderMaximo < personaje.poder) personaje.poder--
          data = `Maná ${personaje.poder} / ${personaje.poderMaximo}`
        } else {
          data = `${capitalizarPrimeraLetra(estadistica)} ${personaje[estadistica]}`
        }

        consola.innerHTML = data
        imprimirPersonaje()
      }
    }
  }

  /* 
      * @accion: string
  */
  // ? Modifica la vida o el poder actual de personaje
  function masMenosVidaPoder(accion) {
    let vidaMaxima = personaje.vidaMaxima + equipo1.vidaMaxima + equipo2.vidaMaxima + equipo3.vidaMaxima
    let poderMaximo = personaje.poderMaximo + equipo1.poderMaximo + equipo2.poderMaximo + equipo3.poderMaximo

    if (estadisticaSeleccionada === "vida") {
      if (accion === "mas") { // ? Incremento de vida
        // if (personaje.vida < personaje.vidaMaxima) personaje.vida++
        if (personaje.vida < vidaMaxima) personaje.vida++
      } else { // ? Decremento de vida
        if (personaje.vida > 0) personaje.vida--
      }
      // contenConsola(`Vida ${personaje.vida} / ${personaje.vidaMaxima}`)
      // consolaBtn.innerHTML = `Vida ${personaje.vida} / ${personaje.vidaMaxima}`
      consolaBtn.innerHTML = `Vida ${personaje.vida} / ${vidaMaxima}`
    } else if (estadisticaSeleccionada === "poder") {
      if (accion === "mas") { // ? Incremento de poder
        // if (personaje.poder < personaje.poderMaximo) personaje.poder++
        if (personaje.poder < poderMaximo) personaje.poder++
      } else { // ? Decremento de poder
        if (personaje.poder > 0) personaje.poder--
      }
      // contenConsola(`Poder ${personaje.poder} / ${personaje.poderMaximo}`)
      // consolaBtn.innerHTML = `Poder ${personaje.poder} / ${personaje.poderMaximo}`
      consolaBtn.innerHTML = `Maná ${personaje.poder} / ${poderMaximo}`
    }
    // muestra el personaje actualizado
    imprimirPersonaje()
    // guarda los cambios en el navegador
    guardarEstadoPersonaje()
  }
}

{ // * eventListeners de los atributos
  ataqueBtn.addEventListener('click', () => {
    if (edicion) {
      tipoEdicion = "personaje"
      modificarEstadistica('ataque')
    }
    else if (esPersonaje) mostrarEstadistica('personaje', 'ataque')

    accionTxt.textContent = "ATACAR"

    arma1Txt.style.textDecoration = "none"
    arma2Txt.style.textDecoration = "none"
  })
  esquivaBtn.addEventListener('click', () => {
    if (edicion) {
      tipoEdicion = "personaje"
      modificarEstadistica('esquiva')
    }
    else if (esPersonaje) mostrarEstadistica('personaje', 'esquiva')

    accionTxt.textContent = "ESQUIVAR"

    arma1Txt.style.textDecoration = "none"
    arma2Txt.style.textDecoration = "none"
  })
  bloqueoBtn.addEventListener('click', () => {
    if (edicion) {
      tipoEdicion = "personaje"
      modificarEstadistica('bloqueo')
    }
    else if (esPersonaje) mostrarEstadistica('personaje', 'bloqueo')

    accionTxt.textContent = "BLOQUEAR"

    arma1Txt.style.textDecoration = "none"
    arma2Txt.style.textDecoration = "none"
  })
  velocidadBtn.addEventListener('click', () => {
    if (edicion) {
      tipoEdicion = "personaje"
      modificarEstadistica('velocidad')
    }
    else if (esPersonaje) mostrarEstadistica('personaje', 'velocidad')

    accionTxt.textContent = "CORRER"

    arma1Txt.style.textDecoration = "none"
    arma2Txt.style.textDecoration = "none"
  })

  vidaBtn.addEventListener('click', () => {
    if (edicion) {
      tipoEdicion = "personaje"
      modificarEstadistica('vidaMaxima')
    }
    else { // ? Muestra los boton de incremento y decremento
      mostrarBtnArribaAbajo()
      estadisticaSeleccionada = "vida"

      slotEstadisticaSeleccionada = 5
      objetoAccion = "estadistica"

      let vidaMaxima = personaje.vidaMaxima + equipo1.vidaMaxima + equipo2.vidaMaxima + equipo3.vidaMaxima
      consolaBtn.innerHTML = `Vida ${personaje.vida} / ${vidaMaxima}`

      accionTxt.textContent = "ACCION"

      arma1Txt.style.textDecoration = "none"
      arma2Txt.style.textDecoration = "none"
    }
  })
  poderBtn.addEventListener('click', () => {
    if (edicion) {
      tipoEdicion = "personaje"
      modificarEstadistica('poderMaximo')
    }
    else { // ? Muestra los boton de incremento y decremento
      mostrarBtnArribaAbajo()
      estadisticaSeleccionada = "poder"

      slotEstadisticaSeleccionada = 6
      objetoAccion = "estadistica"

      let poderMaximo = personaje.poderMaximo + equipo1.poderMaximo + equipo2.poderMaximo + equipo3.poderMaximo
      consolaBtn.innerHTML = `Maná ${personaje.poder} / ${poderMaximo}`

      accionTxt.textContent = "ACCION"

      arma1Txt.style.textDecoration = "none"
      arma2Txt.style.textDecoration = "none"
    }
  })
}

{ // * eventListeners de los botones arriba y abajo

  // Seleccionar los botones de arriba y abajo
  ['arriba', 'abajo'].forEach(key => {
    const boton = document.getElementById(`${key}Btn`)
    let accionBtn = key === 'arriba'
      ? 'mas'
      : 'menos'

    // Prevenir el menú contextual al hacer clic derecho en el botón
    boton.addEventListener('contextmenu', (event) => {
      event.preventDefault()
    })

    // Manejar el evento de clic en el botón
    boton.addEventListener('click', () => {
      if (edicion) {
        if (tipoEdicion === "personaje") modificarValores(accionBtn, estadisticaSeleccionada)
        else modificarAtributosEsbirro(accionBtn, estadisticaSeleccionada)
      }
      else {
        if (tipoEdicion === "personaje") masMenosVidaPoder(accionBtn)
        else modificarVidaPoderActualEsbirro(accionBtn)
      }
    })

    let timer

    // Iniciar un temporizador cuando se mantiene presionado el botón
    function iniciarTimer() {
      timer = setInterval(() => {
        if (edicion) {
          if (tipoEdicion === "personaje") modificarValores(accionBtn, estadisticaSeleccionada)
          else modificarAtributosEsbirro(accionBtn, estadisticaSeleccionada)
        }
        else {
          if (tipoEdicion === "personaje") masMenosVidaPoder(accionBtn)
          else modificarVidaPoderActualEsbirro(accionBtn)
        }
      }, 300)
    }

    // Detener el temporizador cuando se deja de presionar el botón
    function detenerTimer() {
      clearTimeout(timer)
    }

    // Manejar el evento de presionar el botón
    boton.addEventListener('mousedown', () => {
      iniciarTimer()
    })
    boton.addEventListener('touchstart', () => {
      iniciarTimer()
    })

    // Manejar el evento de soltar el botón
    document.addEventListener('mouseup', () => {
      detenerTimer()
    })
    document.addEventListener('touchend', () => {
      detenerTimer()
    })
  })

}


{ // * Nombre de habilidades y nombre de personaje
  { //  * Descipción de habilidades
    /* 
        * @habilidad: Obj
    */
    function descripcionHabilidad(habilidad) {
      contenConsola(habilidad.nombre + "<br>----------------<br>" + habilidad.descripcion + "<br>-----------------<br> MANÁ: " + habilidad.coste)
      cerrarEdicion()
    }
  }
  { // * Funcion para cambio de habilidad
    var habilidadSeleccionada = {}
    var slotHabilidadSeleccionada = 1
    /* 
        * @habilidad:  Obj
     */
    function cambiarHabilidad(nombre) {
      nombre = quitarAcentos(nombre).toLowerCase()
      Object.assign(habilidadSeleccionada, habilidadesDict[nombre])

      cerrarEdicion()
      imprimirPersonaje()
    }
  }
  { // * eventListeners de habilidades

    // Activar tooltip móvil solo con press & hold
    agregarTooltipMovil(habilidad1Btn, habilidad1);
    agregarTooltipMovil(habilidad2Btn, habilidad2);
    agregarTooltipMovil(habilidad3Btn, habilidad3);


    habilidad1Btn.addEventListener('click', () => {
      if (esPersonaje) {
        if (edicion) {
          tipoIngreso = "habilidad";
          slotHabilidadSeleccionada = 1;
          habilidadSeleccionada = habilidad1;
          objetoAccion = "habilidad";
          abrirModalHabilidades();
        } else {
          // Descripción de habilidad del personaje
          descripcionHabilidad(habilidad1);
        }
      } else {
        if (edicion) {
          tipoIngreso = "habilidad";
          slotHabilidadSeleccionada = 1;
          habilidadSeleccionada = esbirroSeleccionado.habilidad1;
          objetoAccion = "habilidad";
          abrirModalHabilidades();
        } else {
          // Descripción de habilidad del esbirro
          descripcionHabilidad(esbirroSeleccionado.habilidad1);
        }
      }

      // Selección efectiva de habilidad para la acción
      slotHabilidadSeleccionada = 1;
      if (esPersonaje) {
        habilidadSeleccionada = habilidad1;
      } else {
        habilidadSeleccionada = esbirroSeleccionado.habilidad1;
      }
      objetoAccion = "habilidad";

      accionTxt.textContent = "LANZAR";
      habilidad1Txt.style.textDecoration = "underline";
      habilidad2Txt.style.textDecoration = "none";
      habilidad3Txt.style.textDecoration = "none";
    });

    habilidad2Btn.addEventListener('click', () => {
      if (esPersonaje) {
        if (edicion) {
          tipoIngreso = "habilidad";
          slotHabilidadSeleccionada = 2;
          habilidadSeleccionada = habilidad2;
          objetoAccion = "habilidad";
          abrirModalHabilidades();
        } else {
          descripcionHabilidad(habilidad2);
        }
      } else {
        if (edicion) {
          tipoIngreso = "habilidad";
          slotHabilidadSeleccionada = 2;
          habilidadSeleccionada = esbirroSeleccionado.habilidad2;
          objetoAccion = "habilidad";
          abrirModalHabilidades();
        } else {
          descripcionHabilidad(esbirroSeleccionado.habilidad2);
        }
      }

      // Selección efectiva de habilidad para la acción
      slotHabilidadSeleccionada = 2;
      if (esPersonaje) {
        habilidadSeleccionada = habilidad2;
      } else {
        habilidadSeleccionada = esbirroSeleccionado.habilidad2;
      }
      objetoAccion = "habilidad";

      accionTxt.textContent = "LANZAR";
      habilidad2Txt.style.textDecoration = "underline";
      habilidad1Txt.style.textDecoration = "none";
      habilidad3Txt.style.textDecoration = "none";
    });

    habilidad3Btn.addEventListener('click', () => {
      if (esPersonaje) {
        if (edicion) {
          tipoIngreso = "habilidad";
          slotHabilidadSeleccionada = 3;
          habilidadSeleccionada = habilidad3;
          objetoAccion = "habilidad";
          abrirModalHabilidades();
        } else {
          descripcionHabilidad(habilidad3);
        }
      } else {
        if (edicion) {
          tipoIngreso = "habilidad";
          slotHabilidadSeleccionada = 3;
          habilidadSeleccionada = esbirroSeleccionado.habilidad3;
          objetoAccion = "habilidad";
          abrirModalHabilidades();
        } else {
          descripcionHabilidad(esbirroSeleccionado.habilidad3);
        }
      }

      // Selección efectiva de habilidad para la acción
      slotHabilidadSeleccionada = 3;
      if (esPersonaje) {
        habilidadSeleccionada = habilidad3;
      } else {
        habilidadSeleccionada = esbirroSeleccionado.habilidad3;
      }
      objetoAccion = "habilidad";

      accionTxt.textContent = "LANZAR";
      habilidad3Txt.style.textDecoration = "underline";
      habilidad1Txt.style.textDecoration = "none";
      habilidad2Txt.style.textDecoration = "none";
    });
  }
}
{ // * eventListener nombre personaje
  nombreBtn.addEventListener('click', () => {
    if (esPersonaje) {
      if (edicion) {
        // let val = prompt("Nuevo nombre")
        // personaje.nombre = val
        tipoIngreso = "nombre"
        mostrarInputComandos()
        // imprimirPersonaje()
        // cerrarEdicion()
      } else if (esPersonaje) {
        contenConsola(personaje.descripcion)
      }
    } else {
      if (edicion) {
        // let val = prompt("Nuevo nombre")
        // esbirroSeleccionado.nombre = val
        tipoIngreso = "nombre"
        mostrarInputComandos()
        // imprimirPersonaje()
        // cerrarEdicion()
      } else if (!esPersonaje) {
        contenConsola(esbirroSeleccionado.descripcion)
      }
    }
  })

}


{ // * Cambio de armas
  { // * Funciones para cambiar armas
    /* 
        * @arma: string
     */
    // ? cambia de arma
    function cambiarArma(arma, slot) {
      let seleccion
      if (slot) {
        seleccion = slot == 1 ? arma1 : arma2
      }
      // ? crea una referencia al objeto arma1 o arma2, se basa en slotArmaSeleccionada, revisar función armas()
      else seleccion = slotArmaSeleccionada === 1 ? arma1 : arma2

      // Si se cambiar nuevamente al arma 'puño' carga el arma 'patada'
      if (seleccion.nombre === 'puño' && arma === 'punno') {
        Object.assign(seleccion, armasDict.patada)
      }

      // Caso contrario carga el arma seleccionada
      else Object.assign(seleccion, armasDict[arma])

      // reflejar cambios
      modalArmas.style.display = "none"
      modalArmasNaturales.style.display = "none"
      modalArmasNaturales2.style.display = "none"
      // mostrarCambioArma()
      imprimirPersonaje()
      cerrarModal("armas")
      cerrarModal("armasNaturales")
      cerrarModal("armasNaturales2")
      cerrarEdicion()
    }
  }
  { // * eventListeners de armas
    dagaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('daga')
      else cambiarArmaEsbirro('daga')
    })

    espadaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('espada')
      else cambiarArmaEsbirro('espada')
    })

    arcoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('arco')
      else cambiarArmaEsbirro('arco')
    })

    arrojadizaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('arrojadiza')
      else cambiarArmaEsbirro('arrojadiza')
    })

    punnoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('punno')
      else cambiarArmaEsbirro('punno')
    })

    escudoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('escudo')
      else cambiarArmaEsbirro('escudo')
    })

    magiaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('magia')
      else cambiarArmaEsbirro('magia')
    })

    varitaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('varita')
      else cambiarArmaEsbirro('varita')
    })

    baculoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('baculo')
      else cambiarArmaEsbirro('baculo')
    })

    totemBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('totem')
      else cambiarArmaEsbirro('totem')
    })

    runaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('runa')
      else cambiarArmaEsbirro('runa')
    })

    hojarunaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('hojaruna')
      else cambiarArmaEsbirro('hojaruna')
    })




    mordiscoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('mordisco')
      else cambiarArmaEsbirro('mordisco')
    })

    garrasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('garras')
      else cambiarArmaEsbirro('garras')
    })

    colaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('cola')
      else cambiarArmaEsbirro('cola')
    })

    cuernosBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('cuernos')
      else cambiarArmaEsbirro('cuernos')
    })

    pinzasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('pinzas')
      else cambiarArmaEsbirro('pinzas')
    })

    picoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('pico')
      else cambiarArmaEsbirro('pico')
    })

    lenguaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('lengua')
      else cambiarArmaEsbirro('lengua')
    })

    aguijonBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('aguijon')
      else cambiarArmaEsbirro('aguijon')
    })

    espinasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('espinas')
      else cambiarArmaEsbirro('espinas')
    })

    cascosBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('cascos')
      else cambiarArmaEsbirro('cascos')
    })

    alientoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('aliento')
      else cambiarArmaEsbirro('aliento')
    })

    alasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('alas')
      else cambiarArmaEsbirro('alas')
    })

    aletaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('aleta')
      else cambiarArmaEsbirro('aleta')
    })


    tentaculosBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('tentaculos')
      else cambiarArmaEsbirro('tentaculos')
    })

    antenasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('antenas')
      else cambiarArmaEsbirro('antenas')
    })


    menteBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('mente')
      else cambiarArmaEsbirro('mente')
    })


    miradaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('mirada')
      else cambiarArmaEsbirro('mirada')
    })


    glandulaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('glandula')
      else cambiarArmaEsbirro('glandula')
    })

    raicesBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('raices')
      else cambiarArmaEsbirro('raices')
    })


    ramasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('ramas')
      else cambiarArmaEsbirro('ramas')
    })

    hojasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('hojas')
      else cambiarArmaEsbirro('hojas')
    })


    frutosBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('frutos')
      else cambiarArmaEsbirro('frutos')
    })


    floresBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('flores')
      else cambiarArmaEsbirro('flores')
    })


    esporasBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarArma('esporas')
      else cambiarArmaEsbirro('esporas')
    })






  }


}


var tipoArma = "marciales"

salvajesBtn.addEventListener('click', () => {



  if (tipoArma == "marciales") {

    modalArmas.style.display = "none"
    modalArmasNaturales.style.display = "grid"
    modalArmasNaturales2.style.display = "none"

    tipoArma = "salvajes"

  } else if (tipoArma == "salvajes") {

    modalArmas.style.display = "grid"
    modalArmasNaturales.style.display = "none"
    modalArmasNaturales2.style.display = "none"

    tipoArma = "marciales"

  }

})

marcialesBtn.addEventListener('click', () => {


  if (tipoArma == "marciales") {

    modalArmas.style.display = "none"
    modalArmasNaturales.style.display = "grid"
    modalArmasNaturales2.style.display = "none"

    tipoArma = "salvajes"

  } else if (tipoArma == "salvajes") {

    modalArmas.style.display = "grid"
    modalArmasNaturales.style.display = "none"
    modalArmasNaturales2.style.display = "none"

    tipoArma = "marciales"

  }

})



marciales2Btn.addEventListener('click', () => {


  if (tipoArma == "marciales") {

    modalArmas.style.display = "none"
    modalArmasNaturales2.style.display = "none"
    modalArmasNaturales.style.display = "grid"

    tipoArma = "salvajes"

  } else if (tipoArma == "salvajes") {

    modalArmas.style.display = "grid"
    modalArmasNaturales2.style.display = "none"
    modalArmasNaturales.style.display = "none"

    tipoArma = "marciales"

  }

})


adelanteBtn.addEventListener('click', () => {




  modalArmas.style.display = "none"
  modalArmasNaturales.style.display = "none"
  modalArmasNaturales2.style.display = "grid"

  tipoArma = "salvajes"



})

atras2Btn.addEventListener('click', () => {




  modalArmas.style.display = "none"
  modalArmasNaturales.style.display = "grid"
  modalArmasNaturales2.style.display = "none"

  tipoArma = "salvajes"



})











{ // * Cambio de equipamiento
  { // * Funciones para cambiar el equipamiento
    function reiniciarEquipamiento(slot) {
      return {
        nombre: `Equipo ${slot}`,
        icono: "img/nada.png",
        descripcion: "",

        nivel: 1,

        ataque: 0,
        esquiva: 0,
        bloqueo: 0,
        velocidad: 0,
        vidaMaxima: 0,
        poderMaximo: 0,
      }
    }

    function cambiarEquipamiento(item) {
      let equipo

      switch (equipamientoSeleccionado) {
        case 1:
          equipo = equipo1
          personaje.equipo1 = 1
          break
        case 2:
          equipo = equipo2
          personaje.equipo2 = 1
          break
        case 3:
          equipo = equipo3
          personaje.equipo3 = 1
          break
        default:
          break
      }

      personaje.vida -= equipo.vidaMaxima
      personaje.poder -= equipo.poderMaximo

      if (item in equiposDict) Object.assign(equipo, equiposDict[item])
      else console.error(`Personaje: ${item} no esta en equiposDict`)

      personaje.vida += equipo.vidaMaxima
      personaje.poder += equipo.poderMaximo

      imprimirPersonaje()
      cerrarEdicion()
      cerrarModal('equipamiento')
    }

  }
  { // * eventListeners de equipamiento
    armaduraligeraBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('armaduraLigera')
      else cambiarEquipamientoEsbirro('armaduraLigera')
    })
    // TODO: Agregar los demas listeners para los items restantes
    armaduramediaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('armaduraMedia')
      else cambiarEquipamientoEsbirro('armaduraMedia')
    })
    armadurapesadaBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('armaduraPesada')
      else cambiarEquipamientoEsbirro('armaduraPesada')
    })
    anilloBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('anillo')
      else cambiarEquipamientoEsbirro('anillo')
    })
    collarBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('collar')
      else cambiarEquipamientoEsbirro('collar')
    })
    brazalBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('brazal')
      else cambiarEquipamientoEsbirro('brazal')
    })
    sinEquipoBtn.addEventListener('click', () => {
      if (esPersonaje) cambiarEquipamiento('nada')
      else cambiarEquipamientoEsbirro('nada')
    })
  }
}

{ // * Cambio de personaje
  { // * Funciones para cambio de personajes
    // ! Revisar avatar()
  }

}

{ // * Accion Personaje

  { // * Funciones para tirada
    /* 
        * @slot: number
    */
    function accion(slot) {
      const atributos = {
        ataque: personaje.ataque,
        esquiva: personaje.esquiva,
        bloqueo: personaje.bloqueo,
        velocidad: personaje.velocidad,
        vidaMaxima: personaje.vidaMaxima,
        poderMaximo: personaje.poderMaximo
      }

      for (const key in atributos) {
        if (equipo1[key]) atributos[key] += equipo1[key]
        if (equipo2[key]) atributos[key] += equipo2[key]
        if (equipo3[key]) atributos[key] += equipo3[key]
      }

      let ataque = atributos.ataque,
        esquiva = atributos.esquiva,
        bloqueo = atributos.bloqueo,
        velocidad = atributos.velocidad,
        vidaMaxima = atributos.vidaMaxima,
        poderMaximo = atributos.poderMaximo

      let dado = Math.floor(Math.random() * 20) + 1

      if (objetoAccion == "arma") {

        let arma = slot == 1 ? arma1 : arma2

        // =========================
        // ARMA MARCIAL (ATAQUE)
        // =========================
        if (arma.tipo == "marcial" || arma.tipo == "" || arma.tipo =="null") {

          if (dado == 19 || dado == 20)
            contenConsola(`ATAQUE CON ${arma.nombre.toUpperCase()}<br>¡CRITICO!<br>Efecto base ${Math.floor((arma.danno * ataque) * 2)}`)
          else if (dado == 1)
            contenConsola(`ATAQUE CON ${arma.nombre.toUpperCase()}<br>¡PIFIA!<br>Efecto base 0`)
          else
            contenConsola(`ATAQUE CON: ${arma.nombre.toUpperCase()}
      <br>TIRADA: ${dado}
      <br>TOTAL: ${dado + ataque}
      <br>EFECTO/DAÑO: ${Math.floor(arma.danno * ataque)}
      <br>ALCANCE: ${ataque * arma.alcance}`)
        }

        // =========================
        // ARMA DE PROTECCIÓN (BLOQUEO)
        // =========================
        if (arma.tipo == "proteccion") {

          if (dado == 19 || dado == 20)
            contenConsola(`Bloqueo con ${arma.nombre}<br>¡CRITICO!<br>Efecto base ${Math.floor((arma.danno * bloqueo) * 2)}`)
          else if (dado == 1)
            contenConsola(`Bloqueo con ${arma.nombre}<br>¡PIFIA!<br>Efecto base 0`)
          else
            contenConsola(`Bloqueo con: ${arma.nombre}
      <br>TIRADA: ${dado}
      <br>TOTAL: ${dado + bloqueo}
      <br>EFECTO/DAÑO: ${Math.floor(arma.danno * bloqueo)}
      <br>ALCANCE: ${bloqueo * arma.alcance}`)
        }

        // =========================
        // ARMA MECANO-MÁGICA (COSTE DE PODER)
        // =========================
        if (arma.tipo == "mecanomagica") {

          if (personaje.poder < arma.coste) {
            contenConsola("Poder insuficiente")
            return
          }

          personaje.poder -= arma.coste
          guardarEstadoPersonaje()
          imprimirPersonaje()
        }
      }

      else if (objetoAccion === "habilidad") {

  if (personaje.poder < habilidadSeleccionada.coste) {
    contenConsola("Maná insuficiente")
    return
  }

  let arma = slotArmaSeleccionada === 1 ? arma1 : arma2

  // =========================
  // HABILIDAD + ARMA MARCIAL
  // =========================
  if (arma.tipo == "marcial") {

    if (dado == 19 || dado == 20)
      contenConsola(`Lanzas ${habilidadSeleccionada.nombre} con ${arma.nombre}
      <br>¡CRITICO!
      <br>Efecto base = ${Math.floor(((arma.danno * ataque) + habilidadSeleccionada.coste) * 2)}`)
    else if (dado == 1)
      contenConsola(`Intentas lanzar ${habilidadSeleccionada.nombre} con ${arma.nombre}
      <br>¡PIFIA!
      <br>Efecto base 0`)
    else
      contenConsola(`Lanzas ${habilidadSeleccionada.nombre} con ${arma.nombre}
      <br>Tirada = ${dado + ataque}
      <br>Efecto base = ${Math.floor((arma.danno * ataque) + habilidadSeleccionada.coste)}
      <br>ALCANCE: ${ataque * arma.alcance}`)
  }

  // =========================
  // HABILIDAD + ARMA PROTECCIÓN
  // =========================
  if (arma.tipo == "proteccion") {

    if (dado == 19 || dado == 20)
      contenConsola(`Canalizas ${habilidadSeleccionada.nombre} con ${arma.nombre}
      <br>¡CRITICO!
      <br>Efecto base = ${Math.floor(((arma.danno * bloqueo) + habilidadSeleccionada.coste) * 2)}`)
    else if (dado == 1)
      contenConsola(`Fallás al canalizar ${habilidadSeleccionada.nombre} con ${arma.nombre}
      <br>¡PIFIA!
      <br>Efecto base 0`)
    else
      contenConsola(`Canalizas ${habilidadSeleccionada.nombre} con ${arma.nombre}
      <br>Tirada = ${dado + bloqueo}
      <br>Efecto base = ${Math.floor((arma.danno * bloqueo) + habilidadSeleccionada.coste)}
      <br>ALCANCE: ${bloqueo * arma.alcance}`)
  }

  // =========================
  // COSTE ARMA MECANO-MÁGICA
  // =========================
  if (arma.tipo == "mecanomagica") {

    if (personaje.poder < arma.coste) {
      contenConsola("Poder insuficiente para el arma")
      return
    }

    personaje.poder -= arma.coste
    guardarEstadoPersonaje()
    imprimirPersonaje()
  }

  // =========================
  // COSTE DE LA HABILIDAD
  // =========================
  personaje.poder -= habilidadSeleccionada.coste
  imprimirPersonaje()
}
      // ? Tirada con atributo
      else {
        switch (slot) {
          case 1: // * Ataque
            // TODO: Retocar el ataque limpio
            if (dado == 19 || dado == 20)
              contenConsola(`Ataque limpio<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Ataque limpio<br>¡PIFIA!`)
            else
              contenConsola(`Ataque limpio<br>${dado + ataque}`)
            break;
          case 2: // * Esquiva
            // TODO: Retocar esquiva
            if (dado == 19 || dado == 20)
              contenConsola(`Esquiva<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Esquiva<br>¡PIFIA!`)
            else
              contenConsola(`Esquiva<br>${dado + esquiva}`)
            break;
          case 3: // * Bloquea
            // TODO: Retocar bloqueo
            if (dado == 19 || dado == 20)
              contenConsola(`Bloquea<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Bloquea<br>¡PIFIA!`)
            else
              contenConsola(`Bloquea<br>${dado + bloqueo}`)
            break;
          case 4: // * Huye
            // TODO: Retocar huye
            if (dado == 19 || dado == 20)
              contenConsola(`Corre<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Corre<br>¡PIFIA!`)
            else
              contenConsola(`Corre<br>${dado + velocidad}`)
            break;
          case 5: // * Tirada limpia vida
          case 6: // * Tirada limpia poder
            // TODO: Retocar tirada limpia
            if (dado == 19 || dado == 20)
              contenConsola(`Tirada limpia<br>¡CRITICO!<br>${dado}`)
            else if (dado == 1)
              contenConsola(`Tirada limpia<br>¡PIFIA!`)
            else
              contenConsola(`Tirada limpia<br>${dado}`)
            break;
          default:
            break;
        }
      }
    }
  }

  { // * evenListener accion
    accionBtn.addEventListener('click', () => {
      if (!edicion && esPersonaje) {
        if (objetoAccion === 'arma') {
          accion(slotArmaSeleccionada);
        } else if (objetoAccion === "habilidad") {
          // Lanza la habilidad seleccionada del personaje y descuenta poder
          accion(slotHabilidadSeleccionada);
        } else {
          accion(slotEstadisticaSeleccionada);
        }
      } else if (!edicion && !esPersonaje) {
        if (objetoAccion === 'arma') {
          accionEsbirroArma(slotArmaSeleccionada);
        } else if (objetoAccion === "habilidad") {
          accionEsbirroHabilidad(slotArmaSeleccionada);
        } else {
          accionEsbirroAtributo(slotEstadisticaSeleccionada);
        }
      }
    })
  }

  //!! //////////////////// FIN BLOQUE DE PERSONAJE //!! ////////////////////





















































  //!! //////////////////// COMIENZO BLOQUE DE MASCOTAS //!! ////////////////////
  /**
   * ? Clase que representa a un Esbirro.
   * Un Esbirro es una criatura con diversas propiedades y habilidades.
   */
  class Esbirro {
    /**
     * @param {Object} opciones - Objeto que contiene las propiedades del Esbirro.
     * @param {string} opciones.nombre - El nombre del Esbirro.
     * @param {string} opciones.portada - La URL de la imagen del Esbirro.
     * @param {string} opciones.icono - El icono del Esbirro (sin uso).
     * @param {string} opciones.descripcion - La descripción del Esbirro.
     * @param {number} opciones.experiencia - La experiencia del Esbirro.
     * @param {number} opciones.ataque - El valor de ataque del Esbirro.
     * @param {number} opciones.esquiva - El valor de esquiva del Esbirro.
     * @param {number} opciones.bloqueo - El valor de bloqueo del Esbirro.
     * @param {number} opciones.velocidad - El valor de velocidad del Esbirro.
     * @param {number} opciones.vida - El valor de vida actual del Esbirro.
     * @param {number} opciones.vidaMaxima - El valor máximo de vida del Esbirro.
     * @param {number} opciones.poder - El poder actual del Esbirro.
     * @param {number} opciones.poderMaximo - El poder máximo del Esbirro.
     * @param {Object} opciones.arma1 - El arma en la ranura 1 del Esbirro.
     * @param {Object} opciones.arma2 - El arma en la ranura 2 del Esbirro.
     * @param {Object} opciones.equipo1 - El equipo en la ranura 1 del Esbirro.
     * @param {Object} opciones.equipo2 - El equipo en la ranura 2 del Esbirro.
     * @param {Object} opciones.equipo3 - El equipo en la ranura 3 del Esbirro.
     * @param {Object} opciones.habilidad1 - La habilidad en la ranura 1 del Esbirro.
     * @param {Object} opciones.habilidad2 - La habilidad en la ranura 2 del Esbirro.
     * @param {Object} opciones.habilidad3 - La habilidad en la ranura 3 del Esbirro.
     */
    constructor({
      // Propiedades generales de esbirro
      nombre = "",
      portada = "img/logo-meeple-combat.png",
      icono = "", // Sin Uso
      descripcion = "Selecciona editar y luego el ícono de esta criatura para invocar otra.",

      // Atributos de esbirro
      ataque = 0,
      esquiva = 0,
      bloqueo = 0,
      velocidad = 0,
      vida = 0,
      vidaMaxima = 0,
      poder = 0,
      poderMaximo = 0,

      // Armas de esbirro
      arma1 = { nombre: "Arma 1", icono: "img/nada.png", danno: 0, descripcion: "Arma 1 sin descripción" },
      arma2 = { nombre: "Arma 2", icono: "img/nada.png", danno: 0, descripcion: "Arma 2 sin descripción" },

      // Equipamiento de esbirro
      equipo1 = {
        nombre: "Nada",
        icono: "img/nada.png",
        descripcion: "Sin descripcion",
        nivel: 0,
        ataque: 0,
        esquiva: 0,
        bloqueo: 0,
        velocidad: 0,
        vidaMaxima: 0,
        poderMaximo: 0
      },
      equipo2 = {
        nombre: "Nada",
        icono: "img/nada.png",
        descripcion: "Sin descripcion",
        nivel: 0,
        ataque: 0,
        esquiva: 0,
        bloqueo: 0,
        velocidad: 0,
        vidaMaxima: 0,
        poderMaximo: 0
      },
      equipo3 = {
        nombre: "Nada",
        icono: "img/nada.png",
        descripcion: "Sin descripcion",
        nivel: 0,
        ataque: 0,
        esquiva: 0,
        bloqueo: 0,
        velocidad: 0,
        vidaMaxima: 0,
        poderMaximo: 0
      },

      // Habilidades de esbirro
      habilidad1 = { nombre: "HABILIDAD 1", coste: 0, descripcion: "SIN DESCRIPCION" },
      habilidad2 = { nombre: "HABILIDAD 2", coste: 0, descripcion: "SIN DESCRIPCION" },
      habilidad3 = { nombre: "HABILIDAD 3", coste: 0, descripcion: "SIN DESCRIPCION" },
    }) {
      // * Propiedades generales de esbirro
      this.nombre = nombre;
      this.portada = portada;
      this.icono = icono;
      this.descripcion = descripcion;

      // * Atributos de esbirro
      this.ataque = ataque;
      this.esquiva = esquiva;
      this.bloqueo = bloqueo;
      this.velocidad = velocidad;
      this.vida = vida;
      this.vidaMaxima = vidaMaxima;
      this.poder = poder;
      this.poderMaximo = poderMaximo;

      // * Armas de esbirro
      this.arma1 = arma1;
      this.arma2 = arma2;

      // * Equipamiento de esbirro
      this.equipo1 = equipo1
      this.equipo2 = equipo2
      this.equipo3 = equipo3

      // * Habilidades de esbirro
      this.habilidad1 = habilidad1;
      this.habilidad2 = habilidad2;
      this.habilidad3 = habilidad3;
    }

    /**
     * ? Actualiza las propiedades del esbirro con los valores proporcionados.
     * @param {Object} props - Un objeto con las propiedades a actualizar.
     */
    actualizarPropiedades(props) {
      Object.assign(this, props);
      this.configurarArma(1, this.arma1)
      this.configurarArma(2, this.arma2)

      this.configurarHabilidad(1, this.habilidad1)
      this.configurarHabilidad(2, this.habilidad2)
      this.configurarHabilidad(3, this.habilidad3)

      this.configurarEquipamiento(1, this.equipo1)
      this.configurarEquipamiento(2, this.equipo2)
      this.configurarEquipamiento(3, this.equipo3)


    }

    /**
     * ? Configura el arma en una ranura específica.
     * @param {number} ranura - El número de ranura del arma.
     * @param {string} nombre - El nombre del arma.
     */
    configurarArma(ranura, nombre) {
      if (nombre in armasDict) {
        if (!armasDict[nombre].icono) console.error(`Esbirro: Agregar propiedad icono de ${nombre} en armasDict`)

        if (this[`arma${ranura}`].nombre === 'puño' && nombre === 'punno') {
          this[`arma${ranura}`] = armasDict.patada
        } else this[`arma${ranura}`] = armasDict[nombre]
      }
      else
        this[`arma${ranura}`] = { nombre, descripcion: "Arma sin descripción" }
    }

    configurarEquipamiento(ranura, nombre) {
      if (nombre in equiposDict) {
        if (typeof this[`equipo${ranura}`] !== 'string') {
          this.vida -= this[`equipo${ranura}`].vidaMaxima
          this.poder -= this[`equipo${ranura}`].poderMaximo
        }

        this[`equipo${ranura}`] = equiposDict[nombre]

        this.vida += this[`equipo${ranura}`].vidaMaxima
        this.poder += this[`equipo${ranura}`].poderMaximo

      } else console.error(`Esbirro: ${nombre} no esta en equiposDict`)

    }

    /**
     * ? Configura la habilidad en una ranura específica.
     * @param {number} ranura - El número de ranura de la habilidad.
     * @param {string} nombre - El nombre de la habilidad.
     */
    configurarHabilidad(ranura, nombre) {
      this[`habilidad${ranura}`] = {}
      if (nombre in habilidadesDict) {
        // this[`habilidad${ranura}`] = { nombre, descripcion: habilidadesDict[nombre.toLowerCase()] }
        Object.assign(this[`habilidad${ranura}`], habilidadesDict[nombre])
      }
      else {
        Object.assign(this[`habilidad${ranura}`], { nombre, descripcion: "Habilidad sin descripción" })

        console.error(`Esbirro: Agregar habilidad ${nombre} a habilidadesDict`)
      }
    }
  }
  { // * Variables esbirro

    // ! Lista de esbirros !
    // Crea un array vacío para almacenar instancias de la clase Esbirro
    var esbirros = []

    // Helper: crea la lista base de 5 esbirros (fallback seguro)
    function crearEsbirrosBase() {
      const base = []
      for (let i = 0; i < 5; i++) base.push(new Esbirro({ nombre: `Esbirro ${i + 1}` }))

      // Datos por defecto (temporal) para que la UI siempre tenga algo coherente
      if (typeof esbirrosDict !== 'undefined') {
        if (esbirrosDict.esbirro1) base[0].actualizarPropiedades(esbirrosDict.esbirro1)
        if (esbirrosDict.esbirro2) base[1].actualizarPropiedades(esbirrosDict.esbirro2)
        if (esbirrosDict.esbirro3) base[2].actualizarPropiedades(esbirrosDict.esbirro3)
        if (esbirrosDict.esbirro4) base[3].actualizarPropiedades(esbirrosDict.esbirro4)
        if (esbirrosDict.esbirro5) base[4].actualizarPropiedades(esbirrosDict.esbirro5)
      }
      return base
    }

    if (localStorage.getItem('listaEsbirros')) {
      esbirros = cargarEstadoListaEsbirros()
    }

    // Si el storage viene vacío/corrupto, aseguramos una lista válida
    if (!Array.isArray(esbirros) || esbirros.length === 0) {
      esbirros = crearEsbirrosBase()
    }

    // Si por algún motivo hay menos de 5, completamos
    while (esbirros.length < 5) {
      esbirros.push(new Esbirro({ nombre: `Esbirro ${esbirros.length + 1}` }))
    }

    // ! Lista de esbirros !
    var esbirroSeleccionado = esbirros[0] || new Esbirro({ nombre: 'Esbirro 1' })
    // ? Indica si se esta usando el personaje o un esbirro
  }

  // ? Elemento del botón para cambiar entre personaje y esbirros
  esbirrosBtn.addEventListener('click', () => {
    if (esPersonaje) {
      // Si se estaba mostrando el personaje, cambia a mostrar el esbirro
      esPersonaje = false;

      // Cambia el ícono SIEMPRE, incluso si no hay esbirro cargado/seleccionado.
      // (Evita que un error posterior impida el feedback visual.)
      if (esbirrosImg) esbirrosImg.src = "img/personajeico.png";

      tipoEdicion = 'esbirro'


      cerrarEdicion()
      ocultarInputExperiencia()
      ocultarInputComandos()

      // Asegura selección válida (por si el storage guardó una lista vacía/corrupta)
      if (!esbirroSeleccionado) esbirroSeleccionado = (Array.isArray(esbirros) && esbirros[0]) ? esbirros[0] : new Esbirro({ nombre: 'Esbirro 1' });

      // Llama a la función para mostrar la información del esbirro seleccionado
      try {
        mostrarEsbirroSeleccionado();
        contenConsola(esbirroSeleccionado && esbirroSeleccionado.descripcion ? esbirroSeleccionado.descripcion : "");
      } catch (e) {
        console.warn('No se pudo mostrar esbirro seleccionado:', e);
      }

      mostrarControlesCambioEsbirro()

    } else {
      // Si se estaba mostrando un esbirro, cambia a mostrar el personaje
      esPersonaje = true;

      // Cambia el ícono SIEMPRE.
      if (esbirrosImg) esbirrosImg.src = "img/esbirrosico.png";

      tipoEdicion = 'personaje'

      cerrarEdicion()
      ocultarInputExperiencia()
      ocultarInputComandos()

      // Oculta los boton de izquierda y derecha
      ocultarControlesCambioEsbirro()
      flagControlesCambioEsbirro = false

      // Llama a la función para mostrar la información del personaje
      try {
        imprimirPersonaje()
        contenConsola(personaje && personaje.descripcion ? personaje.descripcion : "")
      } catch (e) {
        console.warn('No se pudo mostrar personaje:', e);
      }
    }
  })

  /**
   * ? Muestra la información del esbirro seleccionado en la interfaz gráfica.
   */
  function mostrarEsbirroSeleccionado() {
    let atributosEsbirroSeleccionado = {
      ataque: esbirroSeleccionado.ataque,
      esquiva: esbirroSeleccionado.esquiva,
      bloqueo: esbirroSeleccionado.bloqueo,
      velocidad: esbirroSeleccionado.velocidad,
      vidaMaxima: esbirroSeleccionado.vidaMaxima,
      poderMaximo: esbirroSeleccionado.poderMaximo
    }

    for (const key in atributosEsbirroSeleccionado) {
      if (esbirroSeleccionado.equipo1[key]) atributosEsbirroSeleccionado[key] += esbirroSeleccionado.equipo1[key]
      if (esbirroSeleccionado.equipo2[key]) atributosEsbirroSeleccionado[key] += esbirroSeleccionado.equipo2[key]
      if (esbirroSeleccionado.equipo3[key]) atributosEsbirroSeleccionado[key] += esbirroSeleccionado.equipo3[key]
    }

    nombreTxt.textContent = esbirroSeleccionado.nombre.toUpperCase()
    portadaImg.src = esbirroSeleccionado.portada
    experienciaTxt.textContent = experiencia

    ataqueTxt.textContent = atributosEsbirroSeleccionado.ataque
    // esquivaTxt.textContent = esbirroSeleccionado.esquiva + eq1.esquiva + eq2.esquiva + eq3.esquiva
    esquivaTxt.textContent = atributosEsbirroSeleccionado.esquiva
    // bloqueoTxt.textContent = esbirroSeleccionado.bloqueo + eq1.bloqueo + eq2.bloqueo + eq3.bloqueo
    bloqueoTxt.textContent = atributosEsbirroSeleccionado.bloqueo
    // velocidadTxt.textContent = esbirroSeleccionado.velocidad + eq1.velocidad + eq2.velocidad + eq3.velocidad
    velocidadTxt.textContent = atributosEsbirroSeleccionado.velocidad
    vidaTxt.textContent = esbirroSeleccionado.vida
    poderTxt.textContent = esbirroSeleccionado.poder

    equipo1Txt.textContent = esbirroSeleccionado.equipo1.nivel
    equipo2Txt.textContent = esbirroSeleccionado.equipo2.nivel
    equipo3Txt.textContent = esbirroSeleccionado.equipo3.nivel

    equipo1Img.src = esbirroSeleccionado.equipo1.icono
    equipo2Img.src = esbirroSeleccionado.equipo2.icono
    equipo3Img.src = esbirroSeleccionado.equipo3.icono

    arma1Txt.textContent = capitalizarPrimeraLetra(esbirroSeleccionado.arma1.nombre)
    arma1Img.src = esbirroSeleccionado.arma1.icono

    arma2Txt.textContent = capitalizarPrimeraLetra(esbirroSeleccionado.arma2.nombre)
    arma2Img.src = esbirroSeleccionado.arma2.icono

    habilidad1Txt.textContent = esbirroSeleccionado.habilidad1.nombre.toUpperCase()
    habilidad2Txt.textContent = esbirroSeleccionado.habilidad2.nombre.toUpperCase()
    habilidad3Txt.textContent = esbirroSeleccionado.habilidad3.nombre.toUpperCase()
  }

  { // * Cambiar esbirro seleccionado
    /**
     * ? Función para cambiar el esbirro al de la izquierda o derecha
     */
    function cambiarEsbirro(nombre) {
      if (nombre in personajesDict) {
        esbirroSeleccionado.actualizarPropiedades(personajesDict[nombre])
      }
      if (nombre in esbirrosDict) esbirroSeleccionado.actualizarPropiedades(esbirrosDict[nombre])

      mostrarEsbirroSeleccionado()
      cerrarEdicion()
      cerrarModal('esbirros')
    }
  }

  { // * Edición de atributos de esbirro
    { // * Funciones
      /**
       * ? Modifica los atributos del esbirro seleccionado según la acción especificada.
       * @param {string} accion - La acción a realizar: "mas" para aumentar, "menos" para disminuir.
       * @param {string} atributo - El atributo a modificar: "vidaMaxima", "poderMaximo", etc.
       */
      function modificarAtributosEsbirro(accion, atributo) {
        let data = ""

        // Valor mínimo requerido para aumentar el atributo
        let valor
        if (atributo === 'vidaMaxima' || atributo === 'poderMaximo') {
          valor = 1
        } else valor = (esbirroSeleccionado[atributo] + 1) * valorExperiencia[atributo]

        if (accion === 'mas') {
          if (experiencia >= valor) {
            // Incrementar el atributo
            esbirroSeleccionado[atributo]++

            if (atributo === 'vidaMaxima') {
              data = `Vida ${personaje.vida} / ${esbirroSeleccionado['vidaMaxima']}`
            } else if (atributo === 'poderMaximo') {
              data = `Maná ${esbirroSeleccionado['poder']} / ${esbirroSeleccionado['poderMaximo']}`
            } else {
              data = `${capitalizarPrimeraLetra(atributo)} ${esbirroSeleccionado[atributo]}`
            }

            // Decrementar experiencia
            aumentarDisminuirExperiencia("esbirroSeleccionado", 'menos', atributo)

            // Cambiar contenido mostrado en la consola
            consolaBtn.innerHTML = data
          } else {
            // contenConsola("Experiencia insuficiente")
            consolaBtn.innerHTML = "Experiencia insuficiente"
          }
        } else {
          if (esbirroSeleccionado[atributo] > 0) {
            // Decrementar el atributo
            esbirroSeleccionado[atributo]--

            // Incrementar experiencia
            aumentarDisminuirExperiencia('esbirroSeleccionado', 'mas', atributo)

            // Cambiar contenido mostrado en la consola
            if (atributo === 'vidaMaxima') {
              if (esbirroSeleccionado.vidaMaxima < esbirroSeleccionado.vida) esbirroSeleccionado.vida--
              data = `Vida ${personaje.vida} / ${esbirroSeleccionado['vidaMaxima']}`
            } else if (atributo === 'poderMaximo') {
              if (esbirroSeleccionado.poderMaximo < esbirroSeleccionado.poder) esbirroSeleccionado.poder--
              data = `Maná ${esbirroSeleccionado['poder']} / ${esbirroSeleccionado['poderMaximo']}`
            } else {
              data = `${capitalizarPrimeraLetra(atributo)} ${esbirroSeleccionado[atributo]}`
            }

            consolaBtn.innerHTML = data
          }
        }
        // Actualizar la información del esbirro en la interfaz
        mostrarEsbirroSeleccionado()
      }

      function modificarVidaPoderActualEsbirro(accion) {
        let vidaMaxima = esbirroSeleccionado.vidaMaxima
        if (esbirroSeleccionado.equipo1.vidaMaxima) vidaMaxima += esbirroSeleccionado.equipo1.vidaMaxima
        if (esbirroSeleccionado.equipo2.vidaMaxima) vidaMaxima += esbirroSeleccionado.equipo2.vidaMaxima
        if (esbirroSeleccionado.equipo3.vidaMaxima) vidaMaxima += esbirroSeleccionado.equipo3.vidaMaxima

        let poderMaximo = esbirroSeleccionado.poderMaximo
        if (esbirroSeleccionado.equipo1.poderMaximo) poderMaximo += esbirroSeleccionado.equipo1.poderMaximo
        if (esbirroSeleccionado.equipo2.poderMaximo) poderMaximo += esbirroSeleccionado.equipo2.poderMaximo
        if (esbirroSeleccionado.equipo3.poderMaximo) poderMaximo += esbirroSeleccionado.equipo3.poderMaximo

        if (estadisticaSeleccionada === 'vida') {
          if (accion === "mas") { // ? Incremento de vida
            if (esbirroSeleccionado.vida < vidaMaxima) esbirroSeleccionado.vida++
          } else { // ? Decremento de vida
            if (esbirroSeleccionado.vida > 0) esbirroSeleccionado.vida--
          }

          consolaBtn.innerHTML = `Vida ${esbirroSeleccionado.vida} / ${vidaMaxima}`
        } else if (estadisticaSeleccionada === "poder") {
          if (accion === "mas") { // ? Incremento de poder
            if (esbirroSeleccionado.poder < poderMaximo) esbirroSeleccionado.poder++
          } else { // ? Decremento de poder
            if (esbirroSeleccionado.poder > 0) esbirroSeleccionado.poder--
          }

          consolaBtn.innerHTML = `Poder ${esbirroSeleccionado.poder} / ${poderMaximo}`
        }

        mostrarEsbirroSeleccionado()
      }
    }
    { // * Triggers
      { // * Ataque, esquiva, bloqueo y velocidad
        // Arreglo que contiene los nombres de atributos a los que se les asignarán eventos de clic
        const dictAtributos = ['ataque', 'esquiva', 'bloqueo', 'velocidad']

        // Itera a través del arreglo de atributos y configura eventos de clic para los botones correspondientes
        dictAtributos.forEach((key) => {
          // Obtiene una referencia al botón por su ID, que está compuesto por el nombre del atributo y "Btn"
          let boton = document.getElementById(`${key}Btn`)

          // Agrega un evento de clic al botón
          boton.addEventListener('click', () => {
            // Verifica si estamos en modo de edición y no es el personaje principal
            if (edicion && !esPersonaje) {
              // Establece el tipo de edición como "esbirro"
              tipoEdicion = 'esbirro';
              // Llama a la función para modificar la estadística correspondiente
              modificarEstadistica(key);
            } else if (!esPersonaje) {
              // Si no estamos en modo de edición, muestra la estadística correspondiente
              mostrarEstadistica('esbirro', key);
            }
          })
        })
      }

      { // * Vida, vidaMaxima, poder y poderMaximo
        // Agregar un controlador de evento al botón "vidaBtn"
        vidaBtn.addEventListener('click', () => {
          if (edicion && !esPersonaje) {
            // Si estamos en modo edición y no es el personaje principal,
            // establecer el tipo de edición en "esbirro" y modificar la estadística de "vidaMaxima"
            tipoEdicion = "esbirro";
            modificarEstadistica('vidaMaxima');
          } else if (!edicion && !esPersonaje) {
            // Si no estamos en modo edición y no es el personaje principal,
            // establecer el tipo de edición en "esbirro", mostrar botones arriba/abajo
            // y establecer la estadística seleccionada en "vida"
            tipoEdicion = 'esbirro';
            mostrarBtnArribaAbajo();
            estadisticaSeleccionada = 'vida';

            slotEstadisticaSeleccionada = 5
            objetoAccion = "estadistica"

            // Mostrar información de la estadística de vida actual y máxima en la consola
            let vidaMaxima = esbirroSeleccionado.vidaMaxima
            if (esbirroSeleccionado.equipo1.vidaMaxima) vidaMaxima += esbirroSeleccionado.equipo1.vidaMaxima
            if (esbirroSeleccionado.equipo2.vidaMaxima) vidaMaxima += esbirroSeleccionado.equipo2.vidaMaxima
            if (esbirroSeleccionado.equipo3.vidaMaxima) vidaMaxima += esbirroSeleccionado.equipo3.vidaMaxima

            consolaBtn.innerHTML = `Vida ${esbirroSeleccionado.vida} / ${vidaMaxima}`
          }
        })

        // Agregar un controlador de evento al botón "poderBtn"
        poderBtn.addEventListener('click', () => {
          if (edicion && !esPersonaje) {
            // Si estamos en modo edición y no es el personaje principal,
            // establecer el tipo de edición en "esbirro" y modificar la estadística de "poderMaximo"
            tipoEdicion = "esbirro";
            modificarEstadistica('poderMaximo');
          } else if (!edicion && !esPersonaje) {
            // Si no estamos en modo edición y no es el personaje principal,
            // establecer el tipo de edición en "esbirro", mostrar botones arriba/abajo
            // y establecer la estadística seleccionada en "poder"
            tipoEdicion = 'esbirro';
            mostrarBtnArribaAbajo();
            estadisticaSeleccionada = 'poder';

            slotEstadisticaSeleccionada = 6
            objetoAccion = "estadistica"

            // Mostrar información de la estadística de poder actual y máximo en la consola
            let poderMaximo = esbirroSeleccionado.poderMaximo
            if (esbirroSeleccionado.equipo1.poderMaximo) poderMaximo += esbirroSeleccionado.equipo1.poderMaximo
            if (esbirroSeleccionado.equipo2.poderMaximo) poderMaximo += esbirroSeleccionado.equipo2.poderMaximo
            if (esbirroSeleccionado.equipo3.poderMaximo) poderMaximo += esbirroSeleccionado.equipo3.poderMaximo

            consolaBtn.innerHTML = `Maná ${esbirroSeleccionado.poder} / ${poderMaximo}`
          }
        })
      }
    }
  }

  { // * Modificación y descripción de habildades
    { // * Funciones
      function editarHabilidadEsbirro(nombre) {
        nombre = quitarAcentos(nombre).toLowerCase()
        // habilidadSeleccionada.nombre = nombre

        // habilidadSeleccionada.descripcion = habilidadesDict[nombre]
        Object.assign(habilidadSeleccionada, habilidadesDict[nombre])

        mostrarEsbirroSeleccionado()
        cerrarEdicion()
      }

      function descripcionHabilidadEsbirro(ranura) {
        contenConsola(esbirroSeleccionado[`habilidad${ranura}`].descripcion)
      }


      { // * Modal para selección de habilidades

        function abrirModalHabilidades() {
          var modal = document.getElementById("modalHabilidades");
          var lista = document.getElementById("listaHabilidades");
          if (!modal || !lista) return;

          lista.innerHTML = "";

          var clavesOrdenadas = Object.keys(habilidadesDict).sort(function (a, b) {
            var ha = habilidadesDict[a];
            var hb = habilidadesDict[b];
            var na = (ha && ha.nombre ? ha.nombre : a).toLowerCase();
            var nb = (hb && hb.nombre ? hb.nombre : b).toLowerCase();
            return na.localeCompare(nb);
          });

          var grupos = {};
          clavesOrdenadas.forEach(function (k) {
            var tipo = (habilidadesDict[k] && habilidadesDict[k].tipo) ? habilidadesDict[k].tipo : "otros";
            if (tipo === "oculto") return;
            if (!grupos[tipo]) grupos[tipo] = [];
            grupos[tipo].push(k);
          });

          Object.keys(grupos).sort().forEach(function (tipo) {
            var titulo = document.createElement("div");
            titulo.className = "titulo-reino";
            titulo.textContent = tipo.toUpperCase();
            lista.appendChild(titulo);

            grupos[tipo].forEach(function (key) {
              var hab = habilidadesDict[key];
              var item = document.createElement("div");
              item.className = "item-habilidad";
              item.textContent = (hab.nombre || key).toUpperCase();

              item.addEventListener("click", function () {
                if (esPersonaje) cambiarHabilidad(key);
                else editarHabilidadEsbirro(key);
                cerrarModalHabilidades();
              });
              initPressHoldVisor(item, hab);
              lista.appendChild(item);
            });
          });

          modal.classList.add("activo");
        }

        function cerrarModalHabilidades() {
          var modal = document.getElementById("modalHabilidades");
          if (modal) modal.classList.remove("activo");
        }
        {
          var modal = document.getElementById("modalHabilidades");
          if (modal) {
            modal.classList.remove("activo");
          }
        }
      }

    }
    { // * Triggers
      for (let i = 1; i <= 3; i++) {
        const boton = document.getElementById(`habilidad${i}Btn`)
        boton.addEventListener('click', () => {
          if (edicion && !esPersonaje) {
            tipoIngreso = "habilidad"
            habilidadSeleccionada = esbirroSeleccionado[`habilidad${i}`]
            abrirModalHabilidades()
          }
          // else if (!esPersonaje) descripcionHabilidadEsbirro(i)
        })
      }
    }
  }

  { // * Modificación y descripción de armas
    { // * Funciones
      /**
       * ? Cambia el arma equipada de un esbirro seleccionado.
       *
       * @param {string} nombre - El nombre del arma que se desea equipar.
       */
      function cambiarArmaEsbirro(nombre) {
        // Configura el arma en el slot de arma seleccionada del esbirro seleccionado.
        esbirroSeleccionado.configurarArma(slotArmaSeleccionada, nombre);

        // Muestra la información actualizada del esbirro seleccionado.
        mostrarEsbirroSeleccionado();

        // Cierra la interfaz de edición.
        cerrarEdicion();

        // Cierra el modal de selección de armas.
        cerrarModal('armas');
        cerrarModal('armasNaturales');
        cerrarModal('armasNaturales2');
      }

    }
  }

  { // * Intercambio de esbirro
    { // * Funciones
      function mostrarControlesCambioEsbirro() {
        izquierdaBtn.style.display = "block"
        derechaBtn.style.display = "block"

        ocultarBtnArrivaAbajo()
      }

      function ocultarControlesCambioEsbirro() {
        izquierdaBtn.style.display = "none"
        derechaBtn.style.display = "none"
      }
    }
    { // * Triggers
      let i = 0
      izquierdaBtn.addEventListener('click', () => {
        i--
        if (i < 0) i = esbirros.length - 1
        esbirroSeleccionado = esbirros[i]
        mostrarEsbirroSeleccionado()

        consolaBtn.innerHTML = esbirroSeleccionado.descripcion
      })
      derechaBtn.addEventListener('click', () => {
        i++
        if (i > esbirros.length - 1) i = 0
        esbirroSeleccionado = esbirros[i]
        mostrarEsbirroSeleccionado()

        consolaBtn.innerHTML = esbirroSeleccionado.descripcion
      })
    }
  }

  { // * Accion esbirro
    { // * Funciones
function accionEsbirroArma(slot) {

  const atributos = {
    ataque: esbirroSeleccionado.ataque,
    esquiva: esbirroSeleccionado.esquiva,
    bloqueo: esbirroSeleccionado.bloqueo,
    velocidad: esbirroSeleccionado.velocidad,
    vidaMaxima: esbirroSeleccionado.vidaMaxima,
    poderMaximo: esbirroSeleccionado.poderMaximo
  }

  for (const key in atributos) {
    if (esbirroSeleccionado.equipo1[key]) atributos[key] += esbirroSeleccionado.equipo1[key]
    if (esbirroSeleccionado.equipo2[key]) atributos[key] += esbirroSeleccionado.equipo2[key]
    if (esbirroSeleccionado.equipo3[key]) atributos[key] += esbirroSeleccionado.equipo3[key]
  }

  let ataque = atributos.ataque
  let bloqueo = atributos.bloqueo

  let dado = Math.floor(Math.random() * 20) + 1

  let arma = esbirroSeleccionado[`arma${slot}`]

  // =========================
  // ARMA MARCIAL (ATAQUE)
  // =========================
  if (arma.tipo == "marcial" || arma.tipo == "") {

    if (dado == 19 || dado == 20)
      contenConsola(`Ataque con ${arma.nombre}
      <br>Tirada: ${dado}
      <br>¡CRITICO!
      <br>Efecto base ${Math.floor((arma.danno * ataque) * 2)}
      <br>Alcance: ${ataque * arma.alcance}`)
    else if (dado == 1)
      contenConsola(`Ataque con ${arma.nombre}
      <br>Tirada: ${dado}
      <br>¡PIFIA!
      <br>Efecto base 0
      <br>Alcance: ${ataque * arma.alcance}`)
    else
      contenConsola(`Ataque con: ${arma.nombre}
      <br>Tirada: ${dado}
      <br>Total: ${dado + ataque}
      <br>Efecto base ${Math.floor(arma.danno * ataque)}
      <br>Alcance: ${ataque * arma.alcance}`)
  }

  // =========================
  // ARMA DE PROTECCIÓN (BLOQUEO)
  // =========================
  if (arma.tipo == "proteccion") {

    if (dado == 19 || dado == 20)
      contenConsola(`Bloqueo con ${arma.nombre}
      <br>Tirada: ${dado}
      <br>¡CRITICO!
      <br>Efecto base ${Math.floor((arma.danno * bloqueo) * 2)}
      <br>Alcance: ${bloqueo * arma.alcance}`)
    else if (dado == 1)
      contenConsola(`Bloqueo con ${arma.nombre}
      <br>Tirada: ${dado}
      <br>¡PIFIA!
      <br>Efecto base 0
      <br>Alcance: ${bloqueo * arma.alcance}`)
    else
      contenConsola(`Bloqueo con: ${arma.nombre}
      <br>Tirada: ${dado}
      <br>Total: ${dado + bloqueo}
      <br>Efecto base ${Math.floor(arma.danno * bloqueo)}
      <br>Alcance: ${bloqueo * arma.alcance}`)
  }

  // =========================
  // ARMA MECANO-MÁGICA
  // =========================
  if (arma.tipo == "mecanomagica") {

    if (esbirroSeleccionado.poder < arma.coste) {
      contenConsola("Poder insuficiente")
      return
    }

    esbirroSeleccionado.poder -= arma.coste
    guardarEstadoListaEsbirros()
    mostrarEsbirroSeleccionado()
  }
}

      function accionEsbirroAtributo(slot) {
        const atributos = {
          ataque: esbirroSeleccionado.ataque,
          esquiva: esbirroSeleccionado.esquiva,
          bloqueo: esbirroSeleccionado.bloqueo,
          velocidad: esbirroSeleccionado.velocidad,
          vidaMaxima: esbirroSeleccionado.vidaMaxima,
          poderMaximo: esbirroSeleccionado.poderMaximo
        }

        for (const key in atributos) {
          if (esbirroSeleccionado.equipo1[key]) atributos[key] += esbirroSeleccionado.equipo1[key]
          if (esbirroSeleccionado.equipo2[key]) atributos[key] += esbirroSeleccionado.equipo2[key]
          if (esbirroSeleccionado.equipo3[key]) atributos[key] += esbirroSeleccionado.equipo3[key]
        }

        let ataque = atributos.ataque,
          esquiva = atributos.esquiva,
          bloqueo = atributos.bloqueo,
          velocidad = atributos.velocidad,
          vidaMaxima = atributos.vidaMaxima,
          poderMaximo = atributos.poderMaximo

        let dado = Math.floor(Math.random() * 20) + 1
        switch (slot) {
          case 1: // * Ataque
            // TODO: Retocar el ataque limpio
            if (dado == 19 || dado == 20)
              contenConsola(`Ataque limpio<br>¡CRITICO!<br>Efecto base ${Math.floor(ataque * 3)}`)
            else if (dado == 1)
              contenConsola(`Ataque limpio<br>¡PIFIA!<br>Efecto base 0`)
            else
              contenConsola(`Ataque limpio<br>${dado + ataque}<br>Efecto base ${Math.floor(ataque)}`)
            break;
          case 2: // * Esquiva
            // TODO: Retocar esquiva
            if (dado == 19 || dado == 20)
              contenConsola(`Esquiva<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Esquiva<br>¡PIFIA!`)
            else
              contenConsola(`Esquiva<br>${dado + esquiva}`)
            break;
          case 3: // * Bloquea
            // TODO: Retocar bloqueo
            if (dado == 19 || dado == 20)
              contenConsola(`Bloquea<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Bloquea<br>¡PIFIA!`)
            else
              contenConsola(`Bloquea<br>${dado + esquiva}`)
            break;
          case 4: // * Huye
            // TODO: Retocar huye
            if (dado == 19 || dado == 20)
              contenConsola(`Corre<br>¡CRITICO!`)
            else if (dado == 1)
              contenConsola(`Corre<br>¡PIFIA!`)
            else
              contenConsola(`Corre<br>${dado + velocidad}`)
            break;
          case 5:
          case 6: // * Tirada limpia
            // TODO: Retocar tirada limpia
            if (dado == 19 || dado == 20)
              contenConsola(`Tirada limpia<br>¡CRITICO!<br>${dado}`)
            else if (dado == 1)
              contenConsola(`Tirada limpia<br>¡PIFIA!`)
            else
              contenConsola(`Tirada limpia<br>${dado}`)
            break;
          default:
            break;
        }
      }

function accionEsbirroHabilidad(slot) {

  const atributos = {
    ataque: esbirroSeleccionado.ataque,
    esquiva: esbirroSeleccionado.esquiva,
    bloqueo: esbirroSeleccionado.bloqueo,
    velocidad: esbirroSeleccionado.velocidad,
    vidaMaxima: esbirroSeleccionado.vidaMaxima,
    poderMaximo: esbirroSeleccionado.poderMaximo
  }

  for (const key in atributos) {
    if (esbirroSeleccionado.equipo1[key]) atributos[key] += esbirroSeleccionado.equipo1[key]
    if (esbirroSeleccionado.equipo2[key]) atributos[key] += esbirroSeleccionado.equipo2[key]
    if (esbirroSeleccionado.equipo3[key]) atributos[key] += esbirroSeleccionado.equipo3[key]
  }

  let ataque = atributos.ataque
  let bloqueo = atributos.bloqueo

  let dado = Math.floor(Math.random() * 20) + 1

  let arma = esbirroSeleccionado[`arma${slot}`]
  let habilidad = esbirroSeleccionado[`habilidad${slotHabilidadSeleccionada}`]

  if (esbirroSeleccionado.poder < habilidad.coste) {
    contenConsola("Maná insuficiente")
    return
  }

  // =========================
  // HABILIDAD + ARMA MARCIAL
  // =========================
  if (arma.tipo == "marcial") {

    if (dado == 19 || dado == 20)
      contenConsola(`Lanzas ${habilidad.nombre} con ${arma.nombre}
      <br>¡CRITICO!
      <br>Efecto base ${Math.floor(((arma.danno * ataque) + habilidad.coste) * 2)}`)
    else if (dado == 1)
      contenConsola(`Intentas lanzar ${habilidad.nombre} con ${arma.nombre}
      <br>¡PIFIA!
      <br>Efecto base 0`)
    else
      contenConsola(`Lanzas ${habilidad.nombre} con ${arma.nombre}
      <br>Tirada: ${dado + ataque}
      <br>Efecto base ${Math.floor((arma.danno * ataque) + habilidad.coste)}`)
  }

  // =========================
  // HABILIDAD + ARMA PROTECCIÓN
  // =========================
  if (arma.tipo == "proteccion") {

    if (dado == 19 || dado == 20)
      contenConsola(`Canalizas ${habilidad.nombre} con ${arma.nombre}
      <br>¡CRITICO!
      <br>Efecto base ${Math.floor(((arma.danno * bloqueo) + habilidad.coste) * 2)}`)
    else if (dado == 1)
      contenConsola(`Fallás al canalizar ${habilidad.nombre} con ${arma.nombre}
      <br>¡PIFIA!
      <br>Efecto base 0`)
    else
      contenConsola(`Canalizas ${habilidad.nombre} con ${arma.nombre}
      <br>Tirada: ${dado + bloqueo}
      <br>Efecto base ${Math.floor((arma.danno * bloqueo) + habilidad.coste)}`)
  }

  // =========================
  // COSTE ARMA MECANO-MÁGICA
  // =========================
  if (arma.tipo == "mecanomagica") {

    if (esbirroSeleccionado.poder < arma.coste) {
      contenConsola("Poder insuficiente para el arma")
      return
    }

    esbirroSeleccionado.poder -= arma.coste
    guardarEstadoListaEsbirros()
    mostrarEsbirroSeleccionado()
  }

  // =========================
  // COSTE DE LA HABILIDAD
  // =========================
  esbirroSeleccionado.poder -= habilidad.coste
  mostrarEsbirroSeleccionado()
}}}

  { // * Equipamiento de esbirros
    { // * Funciones
      function cambiarEquipamientoEsbirro(item) {
        esbirroSeleccionado.configurarEquipamiento(equipamientoSeleccionado, item)
        mostrarEsbirroSeleccionado()
        cerrarModal('equipamiento')
        cerrarEdicion()
      }
    }
  }
  //!! //////////////////// FIN BLOQUE DE MASCOTAS //!! ////////////////////


  // Conectar el input de importación de partida una vez cargado el DOM
  document.addEventListener("DOMContentLoaded", function () {
    var inputImportar = document.getElementById("importarPartidaInput");
    if (inputImportar) {
      inputImportar.addEventListener("change", manejarImportarArchivoPartida);
    }
  })
};
