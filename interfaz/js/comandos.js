// comandos.js
// Archivo dedicado a la lógica de interpretación de comandos.
// Aquí se define la función ingresarComando(comando), que decide qué hacer
// según el texto que escribe el usuario en la consola.
//
// Esta función usa variables y funciones globales definidas en main.js, como:
//   - personajesDict, esbirrosDict, habilidadesDict, armasDict
//   - avatar(), cambiarEsbirro(), imprimirPersonaje(), mostrarEsbirroSeleccionado(), etc.
//   - personaje, esbirroSeleccionado, esbirros, listaPersonajes, capital, itemMochila, etc.
//
// Todo está escrito en JavaScript vanilla y con nombres claros para que
// cualquier principiante pueda seguir la lógica paso a paso.

/**
   * Función que procesa un comando ingresado y realiza las acciones correspondientes.
   * @param {string} comando - El comando ingresado por el usuario.
   */
  function ingresarComando(comando) {
    comando = comando.trim().toLowerCase()
    // ? Cambio de personaje con '/' + nombre
    if (personajesDict[comando]) {
      if (esPersonaje) { // ? Cambio de personaje principal
        avatar(comando)
      } else { // ? Cambio de esbirro
        cambiarEsbirro(comando)
      }
    }
    else if (esbirrosDict[comando]) {
      if (esPersonaje) { // ? Cambio de personaje principal
        avatar(comando)
      } else { // ? Cambio de esbirro
        cambiarEsbirro(comando)
      }
    }else {contenConsola("NO EXISTE " + comando)}

    

    if (comando === '/full') {
      if (esPersonaje) {
        personaje.vida = personaje.vidaMaxima
        personaje.poder = personaje.poderMaximo
        contenConsola("VIDA Y PODER REESTABLECIDOS")

        imprimirPersonaje()
      } else {
        esbirroSeleccionado.vida = esbirroSeleccionado.vidaMaxima
        esbirroSeleccionado.poder = esbirroSeleccionado.poderMaximo

        mostrarEsbirroSeleccionado()
      }
    }

    if (comando === '/reload') {
      // Borra todo el estado guardado y vuelve TODO a 0 (personaje + esbirros)
      localStorage.clear();

      // Forzar vuelta al personaje
      esPersonaje = true;
      tipoEdicion = 'personaje';

      // Reset personaje a cero
      personaje = {
        nombre: 'BIENVENIDO',
        portada: 'img/logo-meeple-combat.png',
        descripcion: 'Descripcion personaje default',
        ataque: 0,
        esquiva: 0,
        bloqueo: 0,
        velocidad: 0,
        vida: 0,
        vidaMaxima: 0,
        poder: 0,
        poderMaximo: 0
      };

      // Reset equipo / armas / habilidades a placeholders
      arma1 = armasDict.nada;
      arma2 = armasDict.nada;

      equipo1 = equiposDict.nada;
      equipo2 = equiposDict.nada;
      equipo3 = equiposDict.nada;

      habilidad1 = habilidadesDict['habilidad 1'];
      habilidad2 = habilidadesDict['habilidad 2'];
      habilidad3 = habilidadesDict['habilidad 3'];

      experiencia = 0;

      // Reset esbirros a cero

      for (let i = 0; i < esbirros.length; i++) {

      

        const base = {
          nombre: `ESBIRRO ${i + 1}`,
          portada: 'img/logo-meeple-combat.png',
          descripcion: 'Esbirro vacio',
          experiencia: 0,
          ataque: 0,
          esquiva: 0,
          bloqueo: 0,
          velocidad: 0,
          vida: 0,
          vidaMaxima: 0,
          poder: 0,
          poderMaximo: 0,
          arma1: 'nada',
          arma2: 'nada',
          habilidad1: 'habilidad 1',
          habilidad2: 'habilidad 2',
          habilidad3: 'habilidad 3',
          equipo1: 'nada',
          equipo2: 'nada',
          equipo3: 'nada'
        };
      
        
        if (esbirros[i] && typeof esbirros[i].actualizarPropiedades === 'function') {
          esbirros[i].actualizarPropiedades(base);
        }
        
      }
      esbirroSeleccionado = esbirros[0];

      // Refrescar UI
      try {
        imprimirPersonaje();
        if (esbirrosImg) esbirrosImg.src = 'img/esbirrosico.png';
      } catch (e) {
        console.error('Error al refrescar UI en /reload', e);
      }

      // Recargar para limpiar cualquier estado residual en memoria
      window.location.reload();

     
    }

    if (comando === '/reencarnar') {
      console.log(esPersonaje)
      if (esPersonaje) {
        let index = Math.floor(Math.random() * listaPersonajes.length)
        let nombre = listaPersonajes[index]

        avatar(nombre)
      } else {
        let index = Math.floor(Math.random() * listaEsbirros.length)
        let nombre = listaEsbirros[index]

        cambiarEsbirro(nombre)
      }
    }

    if (comando === '.imagen') {
      cambioImagenBtn.click()
    }

    if (comando === '/loot') {
      const lista = ['Armadura Ligera', 'daga', 'anillo', 'espada', 'escudo', 'varita', 'baculo', 'pergamino']
      const index = Math.floor(Math.random() * lista.length)

      const elemento = lista[index]

      contenConsola("Loot = " + elemento)
    }

    if (comando === '/licantropo') {
      if (esPersonaje) {
        cambiarArma('mordisco', 1)
        cambiarArma('garras', 2)
      } else {
        slotArmaSeleccionada = 1
        cambiarArmaEsbirro('mordisco')
        slotArmaSeleccionada = 2
        cambiarArmaEsbirro('garras')
      }
      contenConsola("AHORA ERES UN HOMBRE LOBO")
    }

    if (comando === '/version') {
    
      contenConsola("VERSION 2.9.0 A")
    }

    

if (comando === '/exportar') {
  // Exporta toda la información guardada en localStorage a un archivo .txt
  if (typeof exportarPartidaComoTxt === 'function') {
    exportarPartidaComoTxt();
  } else {
    contenConsola("La función de exportar partida no está disponible.");
  }
}

if (comando === '/importar') {
  // Abre un selector de archivos para elegir un .txt de partida y restaurarlo
  var inputImportar = document.getElementById("importarPartidaInput");
  if (inputImportar) {
    inputImportar.click();
    contenConsola("Selecciona el archivo .txt de la partida que quieres importar.");
  } else {
    contenConsola("No se encontró el input de importación en el documento.");
  }
}
// TODO: Agregar los demas comandos
  }