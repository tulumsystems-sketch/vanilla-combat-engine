// Datos separados automáticamente desde main.js
const habilidadesDict = {
  "habilidad 1": {
    nombre: "habilidad 1",
    tipo: "oculto",
    coste: 0,
    descripcion: "Habildad 1 sin descripción",
    efecto: 0
  },
  "habilidad 2": {
    nombre: "habilidad 2",
    tipo: "oculto",
    coste: 0,
    descripcion: "Habildad 2 sin descripción",
    efecto: 0
  },
  "habilidad 3": {
    nombre: "habilidad 3",
    tipo: "oculto",
    coste: 0,
    descripcion: "Habildad 3 sin descripción",
    efecto: 0
  },
  "-": {
    tipo: "-",
    nombre: "-",
    coste: 0,
    descripcion: "SLOT LIBRE"
  },








  "quemar": {
    nombre: "QUEMAR",
    tipo: "Fuego",
    coste: 5,
    descripcion: "GENERA DAÑO DE FUEGO, LOS GOLPES CRITICOS DEJAN ARDIENDO AL OBJETIVO DURANTE 3 TURNOS",
    efecto: 0
  },
  "arder": {
    nombre: "ARDER",
    tipo: "Fuego",
    coste: 15,
    descripcion: "DEJA ARDIENDO AL OBJETIVO, LO CUAL LO VUELVE VULNERABLE A OTROS ATAQUES DE FUEGO Y HACE PERDER 1 PUNTO DE VIDA NO MITIGABLE POR TURNO",
    efecto: 0
  },
  "combustion": {
    nombre: "COMBUSTION",
    tipo: "Fuego",
    coste: 0,
    descripcion: "GENERA DAÑO X2 A UN OBJETIVO QUE SE ENCUENTRE ARDIENDO",
    efecto: 0
  },
  "explotar": {
    nombre: "EXPLOTAR",
    tipo: "Fuego",
    coste: 30,
    descripcion: "ESTERTOR / AL SER DESTRUIDO EXPLOTA CAUSANDO DAÑO A TODO LO QUE SE ENCUENTRE A MENOS DE 5 CASILLEROS DE SITANCIA",
    efecto: 0
  },
 "llamarada": {
    nombre: "LLAMARADA",
    tipo: "Fuego",
    coste: 10,
    descripcion: "GENERA DAÑO DE FUEGO A TODOS EN UN AREA CONICA DE HASTA 1 CASILLERO POR PUNTO DE ATAQUE",
    efecto: 0
  },
   "bola de fuego": {
    nombre: "BOLA DE FUEGO",
    tipo: "Fuego",
    coste: 10,
    descripcion: "GENERA DAÑO DE FUEGO A TODOS EN UN AREA CONICA DE HASTA 1 CASILLERO POR PUNTO DE ATAQUE",
    efecto: 0
  },













  "oleaje": {
    nombre: "OLEAJE",
    tipo: "Agua",
    coste: 5,
    descripcion: "CREA PODEROSAS OLAS EN UNA FUENTE DE AGUA",
    efecto: 0
  },
  "empapar": {
    nombre: "EMPAPAR",
    tipo: "Agua",
    coste: 5,
    descripcion: "VUELVE MAS PESADO AL OBJETIVO, DISMINUYENDO EN -2 SU VELOCIDAD",
    efecto: 0
  },
  "fluir": {
    nombre: "FLUIR",
    tipo: "Agua",
    coste: 5,
    descripcion: "CREA AGUA MÁGICA, LA CUAL SE PUEDE CONSUMIR PARA RECUPERAR 1 PUNTO DE MANÁ POR ACCIÓN",
    efecto: 0
  },
  "corriente": {
    nombre: "CORRIENTE",
    tipo: "Agua",
    coste: 5,
    descripcion: "CREA UNA CORRIENTE EN UNA FUENTE DE AGUA",
    efecto: 0
  },
  "purificar": {
    nombre: "PURIFICAR",
    tipo: "Agua",
    coste: 25,
    descripcion: "ELIMINA TODO EFECTO MAGICO NEGATIVO, EXEPTUANDO SANGRADOS",
    efecto: 0
  },
  "inundar": {
    nombre: "INUNDAR",
    tipo: "Agua",
    coste: 20,
    descripcion: "INUNDA UNA HABITACION DE HASTA 1 CASILLERO POR PUNTO DE ATAQUE, CON 1 METRO DE AGUA, SE PUEDE ACUMULAR",
    efecto: 0
  },






  "regenerar": {
    nombre: "Regenerar",
    tipo: "Vida",
    coste: 10,
    descripcion: "EL OBJETIVO REGENERA 5 PUNTOS DE SALUD Y MANÁ POR TURNO, DURANTE 3 TURNOS",
    efecto: 0
  },
  "florecer": {
    nombre: "Florecer",
    tipo: "Vida",
    coste: 15,
    descripcion: "Aumenta Vida máxima.",
    efecto: 0
  },
  "enraizar": {
    nombre: "ENRAIZAR",
    tipo: "Vida",
    coste: 15,
    descripcion: "ENRAIZA AL OBJETIVO, IMPIDIENDO QUE ESTE SE MUEVA DURANTE 3 TURNOS, AUN PUEDE ATACAR Y LANZAR HABILIDADES",
    efecto: 0
  },
  "veneno": {
    nombre: "VENENO",
    tipo: "Vida",
    coste: 10,
    descripcion: "ENVENENA AL OBJETIVO, EL CUAL PIERDE 3 PUNTOS DE SALUD NO MITIGABLES POR TURNO, HASTA SER SANADO",
    efecto: 0
  },
  "vitalidad": {
    nombre: "Vitalidad",
    tipo: "Vida",
    coste: 0,
    descripcion: "PASIVA / REGENERAS EL DOBLE DE VIDA Y MANÁ AL ESTAR EN DESCANSO O BAJO INFLUENCIA DE ALGUNA HABILIDAD",
    efecto: 0
  },
  "revitalizar": {
    nombre: "Revitalizar",
    tipo: "Vida",
    coste: 30,
    descripcion: "EL OBJETIVO RECUPERA AL 100% SU VIDA Y MANÁ",
    efecto: 0
  },









  "hemorragia": {
    nombre: "HEMORRAGIA",
    tipo: "Sangre",
    coste: 10,
    descripcion: "EL OBJETIVO PIERDE 1 PUNTO DE VIDA NO MITIGABLE, CADA VEZ QUE ACTUA, INDEFINIDAMENTE.",
    efecto: 0
  },
  "drenar": {
    nombre: "DRENAR",
    tipo: "Sangre",
    coste: 10,
    descripcion: "ROBA VIDA DEL OBJETIVO Y LA TRANSIFERE A SI MISMO, A OTRO PERSONAJE O CRIATURA",
    efecto: 0
  },
  "sangrado": {
    nombre: "SANGRADO",
    tipo: "Sangre",
    coste: 15,
    descripcion: "EL OBJETIVO PIERDE 3 PUNTOS DE SALUD, NO MITIGABLES DURANTE 3 TURNOS.",
    efecto: 0
  },
  "sacrificio": {
    nombre: "SACRIFICIO",
    tipo: "Sangre",
    coste: 1,
    descripcion: "SACRIFICA PUNTOS DE VIDA PARA OBTENER LA MISMA CANTIDAD EN MANÁ",
    efecto: 0
  },
  "ritual": {
    nombre: "RITUAL",
    tipo: "Sangre",
    coste: 10,
    descripcion: "SI EL OBJETIVO ES DESTRUIDO CON ESTE ATAQUE, TODO EL MANA UTILIZADO VOLVERA AL LANZADOR",
    efecto: 0
  },
  "incansable": {
    nombre: "INCANSABLE",
    tipo: "Sangre",
    coste: 0,
    descripcion: "PASIVA / GANAS UNA ACCION EXTRA EN CADA TURNO",
    efecto: 0
  },
  "machacar": {
    nombre: "MACHACAR",
    tipo: "Sangre",
    coste: 10,
    descripcion: "UN ATAQUE QUE NO SE PUEDE BLOQUEAR, DESTRUYE LA DEFENSA DEL OBJETIVO Y LO DEJA SIN MITIGACION POR 1 TURNO",
    efecto: 1000,
  },
  "furia": {
    nombre: "FURIA",
    tipo: "Sangre",
    coste: 10,
    descripcion: "ACTIVA / AUMENTA EN +5 EL ATAQUE PERO DISMINUYE EN 5 LA ESQUIVA DURANTE 3 TURNOS",
    efecto: 0
  },
   "desarmar": {
    nombre: "DESARMAR",
    tipo: "Sangre",
    coste: 10,
    descripcion: "DESARMA AL OBJETIVO, HACIENDO QUE SU ARMA CAIGA A 2 CASILLEROS DE DISTANCIA",
    efecto: 0
  },
  "derribo": {
    nombre: "DERRIBO",
    tipo: "Sangre",
    coste: 10,
    descripcion: "DERRIBA AL OBJETIVO, HACIENDO QUE ESTE SEA VULNERABLE EN EL SUELO CON -5 BASE A LA ESQUIVA, LEVANTARSE LE CUESTA UNA ACCIÓN",
    efecto: 0
  },
 









  "rayo": {
    nombre: "RAYO",
    tipo: "Rayo",
    coste: 5,
    descripcion: "GENERA DAÑO ELÉCTRICO, LOS GOLPES CRITICOS ADEMAS SOBRECARGAN AL OBJETIVO",
    efecto: 0
  },
  "sobrecarga": {
    nombre: "SOBRECARGA",
    tipo: "Rayo",
    coste: 10,
    descripcion: "AUMENTA LA VELOCIDAD Y ACCIONES DEL OBJETIVO EN 1, PERO LO HACEN COMPLETAMENTE VULNERABLE A LOS ATAQUES DE TIPO RAYO",
    efecto: 0
  },
  "electrocutar": {
    nombre: "ELECTROCUTAR",
    tipo: "Rayo",
    coste: 10,
    descripcion: "DAÑA AL OBJETIVO CON EL GOLPE INICIAL Y DEJA UN REMANENETE DE 3 DE DAÑO NO MITIGABLE POR TURNO DURANTE 3 TUNOS",
    efecto: 0
  },
  "impulso": {
    nombre: "IMPULSO",
    tipo: "Rayo",
    coste: 1,
    descripcion: "AUMENTA LA VELOCIDAD DEL OBJETIVO EN SU PROXIMA ACCION, UNA CANTIDAD DE CASILLEROS IGUAL AL EFECTO",
    efecto: 0
  },
  "paralizar": {
    nombre: "PARALIZAR",
    tipo: "Rayo",
    coste: 10,
    descripcion: "PARALIZA AL OBJETIVO DURANTE 1 TURNO, EN EL CUAL NO PUEDE MOVERSE NI ATACAR",
    efecto: 0
  },
  "descarga": {
    nombre: "DESCARGA",
    tipo: "Rayo",
    coste: 10,
    descripcion: "DAÑA A TODOS LOS OBJETIVOS EN CADENA, QUE SE ENCUENTREN A MENOS DE 3 CASILLEROS DE DISTANCIA ENTRE SI",
    efecto: 0
  },










  "vesntisca": {
    nombre: "VENTISCA",
    tipo: "Aire",
    coste: 15,
    descripcion: "UN VIETO HELADO QUE DAÑA AL OBJETIVO Y LO REALENTIZA EN -2 DE MOVIMIENTO POR ACCION, DURANTE 3 TURNOS",
    efecto: 0
  },
  "evasion": {
    nombre: "EVASION",
    tipo: "Aire",
    coste: 0,
    descripcion: "AURA / UNA NUVE DE POLVO TE ENVUELVE BRINDANDOTE +5 DE ESQUIVA BASE EN TODO MOMENTO",
    efecto: 0
  },
  "rafaga": {
    nombre: "RAFAGA",
    tipo: "Aire",
    coste: 5,
    descripcion: "DESPLAZA AL OBJETIVO A UNA DISTANCIA DE HASTA 1 CASILERO POR PUNTO DE ATAQUE",
    efecto: 0
  },
  "cortina": {
    nombre: "CORTINA",
    tipo: "Aire",
    coste: 10,
    descripcion: "UNA CORTINA DE VIENTO, QUE DISMINUYE EN 5 LOS ATAQUES RECIBIDOS A DISTANCIA",
    efecto: 0
  },
  "tornado": {
    nombre: "TORNADO",
    tipo: "Aire",
    coste: 10,
    descripcion: "GENERA DAÑO DE AIRE Y DESPLAZA AL OBJETIVO HASTA 3 CASILLEROS DE DISTANCIA",
    efecto: 0
  },
  "suspender": {
    nombre: "SUSPENDER",
    tipo: "Aire",
    coste: 10,
    descripcion: "EL OBJETIVO QUEDA SUSPENDIDO EN EL AIRE HASTA POR 3 TURNOS, PUEDES MOVERLO A TU VOLUNTAD.",
    efecto: 0
  },









  "petrificar": {
    nombre: "PETRIFICAR",
    tipo: "Tierra",
    coste: 30,
    descripcion: "EL OBJETIVO QUEDA INMOVIL INDEFINIDAMENTE.",
    efecto: 0
  },
  "endurecer": {
    nombre: "ENDURECER",
    tipo: "Tierra",
    coste: 5,
    descripcion: "AUMENTA LA MITIGACION BASE CONTRA EL PROXIMO ATAQUE CERTERO EN +5, SE ACUMULA HASTA 3 VECES.",
    efecto: 0
  },
  "aplastar": {
    nombre: "APLASTAR",
    tipo: "Tierra",
    coste: 10,
    descripcion: "GENERA DAÑO DE TIERRA Y ATURDE AL OBJETIVO 1 TURNO.",
    efecto: 0
  },
  "enterrar": {
    nombre: "ENTERRAR",
    tipo: "Tierra",
    coste: 10,
    descripcion: "IMPIDE CUALQUIER TIPO DE DESPLAZAMIENTO INVOLUTANRIO DURANTE 3 TURNOS.",
    efecto: 0
  },
  "derrubar": {
    nombre: "DERRUMBAR",
    tipo: "Tierra",
    coste: 0,
    descripcion: "Reduce Acciones del enemigo.",
    efecto: 0
  },
  "muralla": {
    nombre: "MURALLA",
    tipo: "Tierra",
    coste: 10,
    descripcion: "CREA UNA MURALLA DE 1 CASILLERO POR PUNTO DE ATAQUE, QUE DA COBERTURA TOTAL.",
    efecto: 0
  },



  "confusion": {
    nombre: "Confusion",
    tipo: "Psique",
    coste: 10,
    descripcion: "CONFUNDE AL ENEMIGO, QUITANDOLE 1 ACCION POR TURNO DURANTE 3 TURNOS",
    efecto: 0
  },
  "control": {
    nombre: "CONTROL",
    tipo: "Psique",
    coste: 30,
    descripcion: "CONTROLA UNA CRIATURA O JUGADOR EN SU TURNO, DURANTE UN MAXIMO DE 3 TURNOS",
    efecto: 0
  },
  "ilusion": {
    nombre: "ILUSION",
    tipo: "Psique",
    coste: 10,
    descripcion: "CREA UN OBJETIVO SEÑUELO, AL QUE LOS ENEMIGOS SE VERAN OBLIGADOS A ATACAR. DURACION 3 TURNOS",
    efecto: 0
  },
  "dominio": {
    nombre: "Dominio",
    tipo: "Psique",
    coste: 0,
    descripcion: "PUEDES CALMAR A CUALQUIER CRIATURA ELEMENTAL O SALVAJE PARA EVITAR QUE TE ATAQUE A TI O A TU GRUPO, SIEMPRE QUE NO SEA MOLESTADA",
    efecto: 0
  },
  "miedo": {
    nombre: "MIEDO",
    tipo: "Psique",
    coste: 10,
    descripcion: "EL OBJETIVO SALE CORRIENDO TODAS SUS ACCIONES DISPONIBLES, EN DIRECCION CONTRARIA AL LUGAR DONDE SE LANZO EL CONJURO, PUEDE SER SOBRE SI MISMO",
    efecto: 0
  },
  "sugestion": {
    nombre: "SUGESTION",
    tipo: "Psique",
    coste: 15,
    descripcion: "OBLIGA AL OBJETIVO A ATACARSE A SI MISMO, SIN POSIBILIDAD DE ESQUIVAR",
    efecto: 0
  },
  "hipnosis": {
    nombre: "HIPNOSIS",
    tipo: "Psique",
    coste: 20,
    descripcion: "CONTROLA A UNA CRIATURA O JUGADOR, DURANTE TU TURNO, COMPARTIENDO ACCIONES CON EL MISMO",
    efecto: 0
  },






  "redimir": {
    nombre: "Redimir",
    tipo: "Luz",
    coste: 0,
    descripcion: "REDIME AL OBJETIVO, RECUPERANDO LA MITAD DEL EFECTO EN PUNTOS DE MANÁ",
    efecto: 0
  },
  "resplandor": {
    nombre: "Resplandor",
    tipo: "Luz",
    coste: 0,
    descripcion: "UN RESPLANDOR QUE DAÑA A TODOS LOS OBJETIVOS QUE SE ENCUENTREN HASTA 2 CASILLEROS DE DISTANCIA DEL OBJETIVO",
    efecto: 0
  },
  "sanar": {
    nombre: "SANAR",
    tipo: "Luz",
    coste: 6,
    descripcion: "SANA AL OBJETIVO, RESTAURANDO PUNTOS DE VIDA",
    efecto: 0
  },
  "sentencia": {
    nombre: "SENTENCIA",
    tipo: "Luz",
    coste: 5,
    descripcion: "QUITA TODA MITIGACION AL OBJETIVO POR 1 TURNO",
    efecto: 0
  },
  "exorcismo": {
    nombre: "EXORCISMO",
    tipo: "Luz",
    coste: 6,
    descripcion: "GENERA DAÑO DE LUZ Y ATURDE AL OBJETIVO DURANTE LOS PROXIMOS 2 TURNOS",
    efecto: 0
  },
  "consagrar": {
    nombre: "CONSAGRAR",
    tipo: "Luz",
    coste: 15,
    descripcion: "CONSAGRA UN AREA DE 1 CASILLERO POR PUNTO DE ATAQUE, DONDE ALIADOS QUE SE ENCUENTRE ENCIMA, RECUPERAN 5 PUNTOS DE SALUD POR TURNO, Y ENEMIGOS RECIBEN MISMO DAÑO NO MITIGABLE, DURANTE 3 TURNOS",
    efecto: 0
  }, 
  "santificado": {
    nombre: "SANTIFICADO",
    tipo: "Luz",
    coste: 0,
    descripcion: "PASIVA / RECUPERA 1 PUNTO DE VIDA Y 1 DE MANÁ POR CADA TURNO QUE PERMANEZCAS FUERA DE COMBATE",
    efecto: 0
  },
   "prisma": {
    nombre: "PRISMA",
    tipo: "Luz",
    coste: 0,
    descripcion: "UN AURA PASIVA QUE CIEGA A TODO ENEMIGO QUE ATAQUE AL PORTADOR CUERPO A CUERPO,  DISMINUYENDO EL ATAQUE Y LA ESQUIVA HASTA SALIR DE SU AREA DE ALCANCE",
    efecto: 0
  },




  "desfase": {
    nombre: "DESFASE",
    tipo: "Eter",
    coste: 20,
    descripcion: "DESFASE TEMPORAL, EL OBJETIVO POSEE TODAS SUS ACCIONES DOS VECES EN ESTE TURNO",
    efecto: 0
  },
  "vinculo": {
    nombre: "VINCULO",
    tipo: "Eter",
    coste: 0,
    descripcion: "COMBINA VIDA Y MANÁ CON UNA CRIATURA O MASCOTA",
    efecto: 0
  },
  "distorsion": {
    nombre: "DISTORCION",
    tipo: "Eter",
    coste: 0,
    descripcion: "UN ÁREA DE HASTA 1 CASILLERO POR ATAQUE A DONDE SON ATRAIDOS TODOS LOS PERSONAJES Y CRIATURAS QUE SE ENCUENTREN A MENOS DE 5 CASILLEROS",
    efecto: 0
  },
  "desvanecer": {
    nombre: "DESVANECER",
    tipo: "Eter",
    coste: 0,
    descripcion: "TE VUELVES INMUNE A TODO DAÑO FÍSICO/SANGRE DURANTE 3 TURNOS",
    efecto: 0
  },
  "invocar": {
    nombre: "INVOCAR",
    tipo: "Eter",
    coste: 0,
    descripcion: "PASIVA / AHORA PUEDES INVOCAR CRIATURAS ELEMENTALES",
    efecto: 0
  },
  "colapso": {
    nombre: "Colapso",
    tipo: "Eter",
    coste: 0,
    descripcion: "AL SER DESTRUIDO, IMPLOSIONAS ATRAYENDO HACIA TU UBICACIÓN A TODO LO QUE SE ENCUENTRE HASTA 5 CASILLEROS DE DISTANCIA Y GENERA DAÑO ETEREO",
    efecto: 0
  },
   "disociar": {
    nombre: "DISOCIAR",
    tipo: "Eter",
    coste: 9,
    descripcion: "ATAQUE PSIQUICO QUE DAÑA AL OBJETIVO QUITANDOLE PUNTOS DE MANA LOS GOLPES CRITICOS ADEMAS APLICAN ALUCINACIONES",
    efecto: 0
  },
 
  



}
