const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Reemplazar la declaración de entidades vacía por una inicializada con alias retrocompatible
const arrayEmpty = 'var entidades = []; // Array de 6 Entidades';
if (content.indexOf(arrayEmpty) !== -1) {
    const arrayInit = `
var entidades = new Array(6).fill(null).map((_, i) => new Esbirro({ nombre: i === 0 ? "HÉROE" : "ESBIRRO" }));
var esbirros = []; // Declaración para compatibilidad

// Hack retroactivo para esbirros
Object.defineProperty(window, 'esbirros', { get: () => entidades.slice(1) });
`;
    content = content.replace(arrayEmpty, arrayInit);
}

// 2. Modificar el bloque de variables personaje para que HIDRATE entidades[0]
const targetBlockStart = '{ // * Variables personaje';
const idxStart = content.indexOf(targetBlockStart);

if (idxStart !== -1) {
    let open = 0;
    let idxEnd = -1;
    for (let i = idxStart; i < content.length; i++) {
        if (content[i] === '{') open++;
        if (content[i] === '}') {
            open--;
            if (open === 0) {
                idxEnd = i + 1;
                break;
            }
        }
    }

    if (idxEnd !== -1) {
        const replacement = `{ // * Carga de Personaje principal en entidades[0]
  if (localStorage.getItem('personaje')) {
    const loaded = cargarEstadoPersonaje();
    entidades[0].actualizarPropiedades(loaded.personaje);
    entidades[0].arma1 = loaded.arma1;
    entidades[0].arma2 = loaded.arma2;
    entidades[0].equipo1 = loaded.equipo1;
    entidades[0].equipo2 = loaded.equipo2;
    entidades[0].equipo3 = loaded.equipo3;
    entidades[0].habilidad1 = loaded.habilidad1;
    entidades[0].habilidad2 = loaded.habilidad2;
    entidades[0].habilidad3 = loaded.habilidad3;
  } else {
    entidades[0].actualizarPropiedades({
      nombre: "BIENVENIDO",
      portada: "img/logo-meeple-combat.png",
      descripcion: "Descripcion personaje default",
      ataque: 0, esquiva: 0, bloqueo: 0, velocidad: 0, vida: 0, vidaMaxima: 0, poder: 0, poderMaximo: 0,
    });
  }
}`;
        content = content.substring(0, idxStart) + replacement + content.substring(idxEnd);
    }
}

// 3. Eliminar la declaración de var esbirros = [] redundante que pudiera haber quedado
const oldEsbirrosDecl = 'var esbirros = []';
const idxOldDecl = content.indexOf(oldEsbirrosDecl);
if (idxOldDecl !== -1 && idxOldDecl > content.indexOf('//!! //////////////////// CLASE ENTIDAD UNIFICADA')) {
    content = content.replace(oldEsbirrosDecl, '// var esbirros = [] (Redundante)');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Inicialización de entidades completado con getters.');
