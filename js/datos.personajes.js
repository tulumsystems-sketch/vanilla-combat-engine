// Datos separados automáticamente desde main.js
const personajesDict = {

  "bienvenida": {
    nombre: "BIENVENIDO",
    portada: "img/logo-meeple-combat.png",
    icono: "",
    descripcion: "Sin descripción.",

    ataque: 0,
    esquiva: 0,
    bloqueo: 0,
    velocidad: 0,
    vida: 0,
    vidaMaxima: 0,
    poder: 0,
    poderMaximo: 0,

    arma1: "nada",
    arma2: "nada",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "habilidad 1",
    habilidad2: "habilidad 2",
    habilidad3: "habilidad 3",
  },
  "nuevopj": {
    nombre: "nuevo",
    portada: "img/nuevopj.png",
    icono: "",
    descripcion: "Sin descripción.",

    ataque: 0,
    esquiva: 0,
    bloqueo: 0,
    velocidad: 0,
    vida: 0,
    vidaMaxima: 0,
    poder: 0,
    poderMaximo: 0,

    arma1: "nada",
    arma2: "nada",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "habilidad 1",
    habilidad2: "habilidad 2",
    habilidad3: "habilidad 3",
  },
  "nuevoesbirro": {
    nombre: "nuevo",
    portada: "img/nuevoesbirro.png",
    icono: "",
    descripcion: "Sin descripción.",

    ataque: 0,
    esquiva: 0,
    bloqueo: 0,
    velocidad: 0,
    vida: 0,
    vidaMaxima: 0,
    poder: 0,
    poderMaximo: 0,

    arma1: "nada",
    arma2: "nada",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "habilidad 1",
    habilidad2: "habilidad 2",
    habilidad3: "habilidad 3",
  },
  "guerrero": {
    nombre: "guerrero",
    portada: "img/guerrero.png",
    icono: "",
    descripcion: "combatiente cuerpo a cuerpo, con mucha resistencia pero muy poco daño base.",

    ataque: 4,
    esquiva: 2,
    bloqueo: 5,
    velocidad: 3,
    vida: 40,
    vidaMaxima: 40,
    poder: 40,
    poderMaximo: 40,

    arma1: "espada",
    arma2: "escudo",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "endurecer",
    habilidad2: "muralla",
    habilidad3: "miedo",
  },
  "chaman": {
    nombre: "chaman",
    portada: "img/chaman.png",
    icono: "",
    descripcion: "combatiente mágico elemental, utiliza totems para ampliar su área de efectos.",

    ataque: 5,
    esquiva: 3,
    bloqueo: 3,
    velocidad: 3,
    vida: 40,
    vidaMaxima: 40,
    poder: 43,
    poderMaximo: 43,

    arma1: "magia",
    arma2: "totem",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "purificar",
    habilidad2: "tornado",
    habilidad3: "enterrar",
  },
  "barbaro": {
    nombre: "barbaro",
    portada: "img/barbaro.png",
    icono: "",
    descripcion: "combatiente cuerpo a cuerpo que genera el mayor daño posible sin pensar mucho en su seguridad.",

    ataque: 6,
    esquiva: 1,
    bloqueo: 1,
    velocidad: 4,
    vida: 33,
    vidaMaxima: 33,
    poder: 38,
    poderMaximo: 38,

    arma1: "espada",
    arma2: "patada",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "furia",
    habilidad2: "machacar",
    habilidad3: "incansable",
  },
  "picaro": {
    nombre: "picaro",
    portada: "img/picaro.png",
    icono: "",
    descripcion: "combatiente sigiloso y rápido, siempre intenta infligir daño sin quedar expuesto.",

    ataque: 4,
    esquiva: 4,
    bloqueo: 2,
    velocidad: 4,
    vida: 25,
    vidaMaxima: 25,
    poder: 46,
    poderMaximo: 46,

    arma1: "daga",
    arma2: "daga",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "hemorragia",
    habilidad2: "sangrado",
    habilidad3: "evasion",
  },
  "mago": {
    nombre: "mago",
    portada: "img/mago.png",
    icono: "",
    descripcion: "experto en el manejo de armas y habilidades mágicas, mantiene distancia de sus enemigos.",

    ataque: 5,
    esquiva: 3,
    bloqueo: 1,
    velocidad: 4,
    vida: 20,
    vidaMaxima: 20,
    poder: 54,
    poderMaximo: 54,

    arma1: "varita",
    arma2: "daga",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "quemar",
    habilidad2: "arder",
    habilidad3: "combustion",
  },
  "paladin": {
    nombre: "paladin",
    portada: "img/paladin.png",
    icono: "",
    descripcion: "combatiente mixto, con buen daño cuerpo a cuerpo y control de habilidades mágicas.",

    ataque: 5,
    esquiva: 3,
    bloqueo: 4,
    velocidad: 3,
    vida: 30,
    vidaMaxima: 30,
    poder: 41,
    poderMaximo: 41,

    arma1: "hojaruna",
    arma2: "magia",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "sanar",
    habilidad2: "sentencia",
    habilidad3: "exorcismo",
  },
  "cazador": {
    nombre: "cazador",
    portada: "img/cazador.png",
    icono: "",
    descripcion: "combatiente de larga distancia, utiliza invocaciones a modo de mascotas.",

    ataque: 4,
    esquiva: 3,
    bloqueo: 1,
    velocidad: 5,
    vida: 20,
    vidaMaxima: 20,
    poder: 39,
    poderMaximo: 39,

    arma1: "arco",
    arma2: "daga",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "sangrado",
    habilidad2: "ritual",
    habilidad3: "veneno",
  },
  "monje": {
    nombre: "monje",
    portada: "img/monje.png",
    icono: "",
    descripcion: "combatiente cuerpo a cuerpo con armas naturales, aumenta el daño utilizando mucha energía.",

    ataque: 4,
    esquiva: 4,
    bloqueo: 3,
    velocidad: 4,
    vida: 23,
    vidaMaxima: 23,
    poder: 39,
    poderMaximo: 39,

    arma1: "punno",
    arma2: "patada",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "purificar",
    habilidad2: "impulso",
    habilidad3: "desarmar",
  },
  "druida": {
    nombre: "druida",
    portada: "img/druida.png",
    icono: "",
    descripcion: "combatiente mágico con habilidades del Reino Vida, prefiere sanar antes que dañar.",

    ataque: 5,
    esquiva: 2,
    bloqueo: 5,
    velocidad: 3,
    vida: 25,
    vidaMaxima: 25,
    poder: 40,
    poderMaximo: 40,

    arma1: "baculo",
    arma2: "runa",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "enraizar",
    habilidad2: "veneno",
    habilidad3: "regenerar",
  },



  "nigromante": {
    nombre: "nigromante",
    portada: "img/nigromante.png",
    icono: "",
    descripcion: "combatiente mágico con habilidades del Reino Vida, prefiere sanar antes que dañar.",

    ataque: 5,
    esquiva: 2,
    bloqueo: 5,
    velocidad: 3,
    vida: 25,
    vidaMaxima: 25,
    poder: 40,
    poderMaximo: 40,

    arma1: "baculo",
    arma2: "runa",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "enraizar",
    habilidad2: "veneno",
    habilidad3: "invocar",
  },

  "paladinoscuro": {
    nombre: "paladin oscuro",
    portada: "img/paladinoscuro.png",
    icono: "",
    descripcion: "combatiente mágico con habilidades del Reino Vida, prefiere sanar antes que dañar.",

    ataque: 5,
    esquiva: 2,
    bloqueo: 5,
    velocidad: 3,
    vida: 25,
    vidaMaxima: 25,
    poder: 40,
    poderMaximo: 40,

    arma1: "hojaruna",
    arma2: "magia",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "drenar",
    habilidad2: "ritual",
    habilidad3: "sacrificio",
  },

  "guardiarunico": {
    nombre: "guardia runico",
    portada: "img/guardiarunico.png",
    icono: "",
    descripcion: "combatiente mágico con habilidades del Reino Vida, prefiere sanar antes que dañar.",

    ataque: 5,
    esquiva: 2,
    bloqueo: 5,
    velocidad: 3,
    vida: 25,
    vidaMaxima: 25,
    poder: 40,
    poderMaximo: 40,

    arma1: "hojaruna",
    arma2: "escudo",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "rayo",
    habilidad2: "sobrecarga",
    habilidad3: "descarga",
  },




  "soldado": {
    nombre: "soldado",
    portada: "img/soldado.png",
    icono: "",
    descripcion: "Combatiente con poco entrenamiento y equipado con armas de tecnología arcana.",

    ataque: 5,
    esquiva: 2,
    bloqueo: 4,
    velocidad: 3,
    vida: 20,
    vidaMaxima: 20,
    poder: 55,
    poderMaximo: 55,

    arma1: "fusil",
    arma2: "granada",

    equipo1: "nada",
    equipo2: "nada",
    equipo3: "nada",

    habilidad1: "-",
    habilidad2: "-",
    habilidad3: "-",
  }

}
