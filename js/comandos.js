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
    const entidad = entidades[indexVisualizado];
    entidad.vida = entidad.vidaMaxima;
    entidad.poder = entidad.poderMaximo;
    contenConsola("ESTADO RESTABLECIDO");
    imprimirPersonaje();
}

    if (comando === '/reload') {
      // Borra todo el estado guardado y vuelve TODO a 0 (personaje + esbirros)
      localStorage.clear();

      // Forzar vuelta al personaje
      esPersonaje = true;
      tipoEdicion = 'personaje';

      // Reset personaje a cero
      // Personaje reseteado via localStorage.clear()

      // Reset equipo / armas / habilidades a placeholders
      
      

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
    const lista = esPersonaje ? listaPersonajes : listaEsbirros;
    const nombre = lista[Math.floor(Math.random() * lista.length)];
    if (esPersonaje) avatar(nombre);
    else cambiarEsbirro(nombre);
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
    cambiarArma('mordisco', 1);
    cambiarArma('garras', 2);
    contenConsola("LICANTROPÍA ACTIVADA");
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