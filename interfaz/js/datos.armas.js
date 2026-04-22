// Datos separados automáticamente desde main.js
const armasDict = {
  "nada": {
    nombre: "nada",
    icono: "img/nada.png",
    danno: 0,
    coste: 0,
    tipo: "",
    descripcion: "Arma sin descripción",
    alcance: 0
  },
  "punno": {
    nombre: "puño",
    icono: "img/punno.png",
    danno: 1,
    coste: 1,
    tipo: "natural",
    descripcion: "PUÑO<br>Tipo: Natural......Acciones: 1<br>Daño: x 1......Alcance: 0",
    alcance: 0 
  },
  "patada": {
    nombre: "patada",
    icono: "img/patada.png",
    danno: 1.5,
    coste: 2,
    tipo: "natural",
    descripcion: "PATADA<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.5......Alcance: 0",
    alcance: 0
  },
  "daga": {
    nombre: "daga",
    icono: "img/daga.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "DAGA<br>Tipo: Marcial......Acciones: 1<br>Daño: x 1.5......Alcance: 0",
    alcance: 0
  },
  "espada": {
    nombre: "espada",
    icono: "img/espada.png",
    danno: 2,
    coste: 1,
    tipo: "marcial",
    descripcion: "ESPADA<br>TIPO: MARCIAL......ACCIONES: 2<br>DAÑO: x 2......ALCANCE: 0",
    alcance: 0
  },
  "arco": {
    nombre: "arco",
    icono: "img/arco.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "ARCO<br>Tipo: Marcial......Acciones: 3<br>Daño: x 1.5......Alcance: x 3",
    alcance: 2
  },
  "arrojadiza": {
    nombre: "arrojadiza",
    icono: "img/arrojadiza.png",
    danno: 0.5,
    coste: 1,
    tipo: "",
    descripcion: "ARMA ARROJADIZA<br>Tipo: Marcial......Acciones: 1<br>Daño: x 0.5......Alcance: x 2",
    alcance: 0
  },
  "escudo": {
    nombre: "escudo",
    icono: "img/escudo.png",
    danno: 0.5,
    coste: 1,
    tipo: "proteccion",
    descripcion: "ESCUDO<br>Tipo: Marcial......Acciones: 1<br>Daño: x 0.5......Alcance: x 0",
    alcance: 0
  },
  "magia": {
    nombre: "palma",
    icono: "img/magia.png",
    danno: 2,
    coste: 1,
    tipo: "",
    descripcion: "PALMA<br>Tipo: Mágica......Acciones: 1<br>Daño: x 2......Alcance: x 1",
    alcance: 0
  },
  "varita": {
    nombre: "varita",
    icono: "img/varita.png",
    danno: 1,
    coste: 1,
    tipo: "",
    descripcion: "VARITA<br>Tipo: Mágica......Acciones: 1<br>Daño: x 1......Alcance: x 5",
    alcance: 0
  },
  "baculo": {
    nombre: "baculo",
    icono: "img/baculo.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "BACULO<br>Tipo: Mágica......Acciones: 2<br>Daño: x 1.5......Alcance: x 3",
    alcance: 0
  },
  "runa": {
    nombre: "runa",
    icono: "img/runa.png",
    danno: 0.5,
    coste: 1,
    tipo: "",
    descripcion: "RUNA<br>Tipo: Mágica......Acciones: 2<br>Daño: x 0.5......Alcance: x 5",
    alcance: 0
  },
  "totem": {
    nombre: "totem",
    icono: "img/totem.png",
    danno: 1,
    coste: 1,
    tipo: "",
    descripcion: "TOTEM<br>Tipo: Mágica......Acciones: 2<br>Daño: x 1......Alcance: x 3",
    alcance: 0
  },
  "hojaruna": {
    nombre: "hoja runa",
    icono: "img/hojaruna.png",
    danno: 1,
    coste: 1,
    tipo: "",
    descripcion: "HOJA RUNA<br>Tipo: Mixta......Acciones: 1<br>Daño: x 1......Alcance: x 1",
    alcance: 0
  },
  "mordisco": {
    nombre: "mordisco",
    icono: "img/mordisco.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "MORDISCO<br>Tipo: Natural......Acciones: 1<br>Daño: x 1.5......Alcance: 0",
    alcance: 0
  },
  "garras": {
    nombre: "garras",
    icono: "img/garras.png", 
    danno: 1,
    coste: 1,
    tipo: "",
    descripcion: "GARRAS<br>Tipo: Natural......Acciones: 1<br>Daño: x 1......Alcance: 0",
    alcance: 0
  },
  "aliento": {
    nombre: "aliento",
    icono: "img/aliento.png",
    danno: 2,
    coste: 1,
    tipo: "",
    descripcion: "ALIENTO<br>Tipo: Natural......Acciones: 3<br>Daño: x 2......Alcance: x 3",
    alcance: 0
  },
  "pinzas": {
    nombre: "pinzas",
    icono: "img/pinzas.png",
    danno: 1.75,
    coste: 1,
    tipo: "",
    descripcion: "PINZAS<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.75......Alcance: 0",
    alcance: 0
  },
  "mente": {
    nombre: "mente",
    icono: "img/mente.png",
    danno: 2,
    coste: 1,
    tipo: "",
    descripcion: "MENTE<br>Tipo: Natural......Acciones: 1<br>Daño: x 2......Alcance: x 1",
    alcance: 0
  },
  "ramas": {
    nombre: "ramas",
    icono: "img/ramas.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "RAMAS<br>Tipo: Natural......Acciones: 1<br>Daño: x 1.25......Alcance: 0",
    alcance: 0
  },
  "hojas": {
    nombre: "hojas",
    icono: "img/hojas.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "HOJAS<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: x 3",
    alcance: 0
  },
  "esporas": {
    nombre: "esporas",
    icono: "img/esporas.png",
    danno: 0.5,
    coste: 1,
    tipo: "",
    descripcion: "ESPORAS<br>Tipo: Natural......Acciones: 2<br>Daño: x 0.5......Alcance: x 5",
    alcance: 0
  },
  "alas": {
    nombre: "alas",
    icono: "img/alas.png",
    danno: 2,
    coste: 1,
    tipo: "",
    descripcion: "ALAS<br>Tipo: Natural......Acciones: 2<br>Daño: x 2......Alcance: x 2",
    alcance: 0
  },
  "mirada": {
    nombre: "mirada",
    icono: "img/mirada.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "MIRADA<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.5......Alcance: x 2",
    alcance: 0
  },
  "cuernos": {
    nombre: "cuernos",
    icono: "img/cuernos.png",
    danno: 2.5,
    coste: 1,
    tipo: "",
    descripcion: "CUERNOS<br>Tipo: Natural......Acciones: 3<br>Daño: x 2.5......Alcance: 0",
    alcance: 0
  },
  "cascos": {
    nombre: "cascos",
    icono: "img/cascos.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "CASCOSbr>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: 0",
    alcance: 0
  },
  "tentaculos": {
    nombre: "tentaculos",
    icono: "img/tentaculos.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "TENTACULOS<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: 0",
    alcance: 0
  },
  "cola": {
    nombre: "cola",
    icono: "img/cola.png",
    danno: 1,
    coste: 1,
    tipo: "",
    descripcion: "COLA<br>Tipo: Natural......Acciones: 1<br>Daño: x 1......Alcance: 0",
    alcance: 0
  },
  "pico": {
    nombre: "pico",
    icono: "img/pico.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "MORDISCO<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: 0",
    alcance: 0
  },
  "espinas": {
    nombre: "espinas",
    icono: "img/espinas.png",
    danno: 0.75,
    coste: 1,
    tipo: "",
    descripcion: "ESPINAS<br>Tipo: Natural......Acciones: 1<br>Daño: x 0.75......Alcance: x 2",
    alcance: 0
  },
  "lengua": {
    nombre: "lengua",
    icono: "img/lengua.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "LENGUA<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.5......Alcance: 0",
    alcance: 0
  },
  "aguijon": {
    nombre: "aguijon",
    icono: "img/aguijon.png",
    danno: 2.75,
    coste: 1,
    tipo: "",
    descripcion: "AGUIJON<br>Tipo: Natural......Acciones: 3<br>Daño: x 2.75......Alcance: 0",
    alcance: 0
  },
  "aleta": {
    nombre: "aleta",
    icono: "img/aleta.png",
    danno: 2,
    coste: 1,
    tipo: "",
    descripcion: "ALETA<br>Tipo: Natural......Acciones: 2<br>Daño: x 2......Alcance: 0",
    alcance: 0
  },
  "antenas": {
    nombre: "antenas",
    icono: "img/antenas.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "ANTENAS<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: x 1",
    alcance: 0
  }
  ,
  "glandula": {
    nombre: "glandula",
    icono: "img/glandula.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "GLANDULA<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: x 1",
    alcance: 0
  },
  "raices": {
    nombre: "raices",
    icono: "img/raices.png",
    danno: 1.25,
    coste: 1,
    tipo: "",
    descripcion: "RAICES<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.25......Alcance: x 2",
    alcance: 0
  },
  "flores": {
    nombre: "flores",
    icono: "img/flores.png",
    danno: 1.5,
    coste: 1,
    tipo: "",
    descripcion: "FLORES<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.5......Alcance: x 1",
    alcance: 0
  },
  "frutos": {
    nombre: "frutos",
    icono: "img/frutos.png",
    danno: 1.75,
    coste: 1,
    tipo: "",
    descripcion: "FRUTOS<br>Tipo: Natural......Acciones: 2<br>Daño: x 1.75......Alcance: x 1",
    alcance: 0
  },
  "fusil": {
    nombre: "fusil",
    icono: "img/fusil.png",
    danno: 2,
    coste: 3,
    tipo: "mecanomagica",
    descripcion: "FUSIL<br>Tipo: Tecnomágica......Acciones: 2<br>Daño: x 2......Alcance: x 5",
    alcance: 0
  },
  "granada": {
    nombre: "granada",
    icono: "img/granada.png",
    danno: 3,
    coste: 6,
    tipo: "mecanomagica",
    descripcion: "GRANADA<br>Tipo: Tecnomágica......Acciones: 3<br>Daño: x 3.A......Alcance: x 3",
    alcance: 0
  }
}
