// UI.js
// Archivo para manejar la interfaz de usuario relacionada con los comandos.
// Aquí se maneja el input de comandos y los botones para ingresar texto.
// Usa elementos del DOM que tienen id: contenedorInputComandos, comandosValor, ingresarComandos, inputLabelComandos.
// También usa variables y funciones globales definidas en main.js (tipoIngreso, edicion, esPersonaje, personaje, esbirroSeleccionado, etc.).

const qsyo = `<div class="contenedor-input" id="contenedorInputComandos" style="display: none;">
    <span id="inputLabelComandos" class="input-label">Ingrese comando</span>
    <input type="text" id="comandosValor" class="comandos-input">
    <button id="ingresarComandos" class="input-button">Ingresar</button>
</div>`

let form = ""

function generar(el, id, tlo, txtId, btnId) {
    
}

function ocultarInputExperiencia() {
    const el = document.getElementById("contenedorInputExperiencia");
    if (el) el.style.display = "none";
}

var tipoIngreso = "comando"

  function mostrarInputComandos() {
    ocultarInputExperiencia()
    contenedorInputComandos.style.display = "flex"

    let data = ""
    switch (tipoIngreso) {
      case "comando":
        data = "Ingrese comando"
        break
      case "habilidad":
        data = "Ingrese nombre de habilidad"
        break
      case "nombre":
        data = "Ingrese nombre"
        break
      case "mochila-item":
        data = "Ingrese nombre del item"
      default:
        break
    }

    inputLabelComandos.textContent = data
  }

  function ocultarInputComandos() {
    contenedorInputComandos.style.display = "none"
  }

  comandosValor.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      switch (tipoIngreso) {
        case "comando":
          ingresarComando(comandosValor.value)
          break
        case "nombre":
          if (esPersonaje) {
            personaje.nombre = comandosValor.value
            imprimirPersonaje()
          } else {
            esbirroSeleccionado.nombre = comandosValor.value
            mostrarEsbirroSeleccionado()
          }
          break
        case "habilidad":
          if (esPersonaje) {
            cambiarHabilidad(comandosValor.value)
          } else {
            editarHabilidadEsbirro(comandosValor.value)
          }
          break
        case "mochila-item":
          cambiarItemMochila(comandosValor.value)
          actualizarMochila()
          break
        default:
          break
      }
      ocultarInputComandos()
      cerrarEdicion()
    }
  })
  ingresarComandos.addEventListener("click", function () {
    switch (tipoIngreso) {
      case "comando":
        ingresarComando(comandosValor.value)
        break
      case "nombre":
        if (esPersonaje) {
          personaje.nombre = comandosValor.value
          imprimirPersonaje()
        } else {
          esbirroSeleccionado.nombre = comandosValor.value
          mostrarEsbirroSeleccionado()
        }
        break
      case "habilidad":
        if (esPersonaje) {
          cambiarHabilidad(comandosValor.value)
        } else {
          editarHabilidadEsbirro(comandosValor.value)
        }
        break
      case "mochila-item":
        cambiarItemMochila(comandosValor.value)
        actualizarMochila()
        break
      default:
        break
    }
    ocultarInputComandos()
    cerrarEdicion()
  })
