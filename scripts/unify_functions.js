const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Unificar imprimirPersonaje
const replaceImprimir = `function imprimirPersonaje() {
  const entidad = entidades[indexVisualizado];
  
  if (!entidad) {
    console.error("No hay entidad activa para renderizar en el índice " + indexVisualizado);
    return;
  }

  let atributosEntidad = {
    ataque: entidad.ataque || 0,
    esquiva: entidad.esquiva || 0,
    bloqueo: entidad.bloqueo || 0,
    velocidad: entidad.velocidad || 0,
    vida: entidad.vida || 0,
    poder: entidad.poder || 0,
    vidaMaxima: entidad.vidaMaxima || 0,
    poderMaximo: entidad.poderMaximo || 0
  }

  const eq1 = entidad.equipo1 || {};
  const eq2 = entidad.equipo2 || {};
  const eq3 = entidad.equipo3 || {};

  for (const key in atributosEntidad) {
    if (eq1[key]) atributosEntidad[key] += eq1[key];
    if (eq2[key]) atributosEntidad[key] += eq2[key];
    if (eq3[key]) atributosEntidad[key] += eq3[key];
  }

  portadaImg.src = entidad.portada;
  nombreTxt.textContent = (entidad.nombre || "").toUpperCase();

  ataqueTxt.textContent = atributosEntidad.ataque;
  esquivaTxt.textContent = atributosEntidad.esquiva;
  bloqueoTxt.textContent = atributosEntidad.bloqueo;
  velocidadTxt.textContent = atributosEntidad.velocidad;

  vidaTxt.textContent = entidad.vida;
  poderTxt.textContent = entidad.poder;

  equipo1Txt.textContent = eq1.nivel !== undefined ? eq1.nivel : 0;
  equipo2Txt.textContent = eq2.nivel !== undefined ? eq2.nivel : 0;
  equipo3Txt.textContent = eq3.nivel !== undefined ? eq3.nivel : 0;

  equipo1Img.src = eq1.icono || "img/nada.png";
  equipo2Img.src = eq2.icono || "img/nada.png";
  equipo3Img.src = eq3.icono || "img/nada.png";

  const a1 = entidad.arma1 || {};
  const a2 = entidad.arma2 || {};

  arma1Txt.textContent = capitalizarPrimeraLetra(a1.nombre || "");
  arma2Txt.textContent = capitalizarPrimeraLetra(a2.nombre || "");
  arma1Img.src = a1.icono || "img/nada.png";
  arma2Img.src = a2.icono || "img/nada.png";

  const h1 = entidad.habilidad1 || {};
  const h2 = entidad.habilidad2 || {};
  const h3 = entidad.habilidad3 || {};

  habilidad1Txt.textContent = (h1.nombre || "").toUpperCase();
  habilidad2Txt.textContent = (h2.nombre || "").toUpperCase();
  habilidad3Txt.textContent = (h3.nombre || "").toUpperCase();

  if (typeof experienciaTxt !== "undefined") experienciaTxt.textContent = experiencia;
}`;

const startIdx = content.indexOf('function imprimirPersonaje() {');
if (startIdx !== -1) {
    let open = 0;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') open++;
        if (content[i] === '}') {
            open--;
            if (open === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
    if (endIdx !== -1) {
        content = content.substring(0, startIdx) + replaceImprimir + content.substring(endIdx);
    }
} else {
    console.error('No se encontró function imprimirPersonaje');
}

// 2. Unificar mostrarEsbirroSeleccionado
const replaceMostrar = `function mostrarEsbirroSeleccionado() {
    imprimirPersonaje();
}`;

const startIdx2 = content.indexOf('function mostrarEsbirroSeleccionado() {');
if (startIdx2 !== -1) {
    let open = 0;
    let endIdx = -1;
    for (let i = startIdx2; i < content.length; i++) {
        if (content[i] === '{') open++;
        if (content[i] === '}') {
            open--;
            if (open === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
    if (endIdx !== -1) {
        content = content.substring(0, startIdx2) + replaceMostrar + content.substring(endIdx);
    }
} else {
    console.error('No se encontró function mostrarEsbirroSeleccionado');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Funciones de renderizado unificadas.');
