const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Extraer la Clase Esbirro
const classStart = content.indexOf('class Esbirro {');
if (classStart === -1) {
    console.error('No se encontró class Esbirro');
    process.exit(1);
}

// Encontrar el final de la clase (la llave de cierre en la columna 0/2 que coincida)
let openBraces = 0;
let classEnd = -1;
for (let i = classStart; i < content.length; i++) {
    if (content[i] === '{') openBraces++;
    if (content[i] === '}') {
        openBraces--;
        if (openBraces === 0) {
            classEnd = i + 1;
            break;
        }
    }
}

if (classEnd === -1) {
    console.error('No se encontró el final de class Esbirro');
    process.exit(1);
}

// Extraer clase
const classText = content.substring(classStart, classEnd);

// Eliminar clase del lugar original (incluyendo comentarios previos si es posible, o solo la clase)
content = content.substring(0, classStart) + content.substring(classEnd);

// 2. Insertar clase arriba del Bloque de Personaje o al inicio del bloque de variables
const insertTarget = 'var edicion = 0'; // Un lugar seguro arriba de las variables de personaje
const insertIdx = content.indexOf(insertTarget);

if (insertIdx === -1) {
    console.error('No se encontró el punto de insercción');
    process.exit(1);
}

const unificadoCode = `
//!! //////////////////// CLASE ENTIDAD UNIFICADA //!! ////////////////////
${classText}

var indexVisualizado = 0; // 0 = Héroe, 1-5 = Esbirros
var entidades = []; // Array de 6 Entidades

// Getters retrocompatibles para no romper el código existente
Object.defineProperty(window, 'personaje', { get: () => entidades[0] });
Object.defineProperty(window, 'esPersonaje', { get: () => indexVisualizado === 0 });
Object.defineProperty(window, 'esbirroSeleccionado', { get: () => entidades[indexVisualizado] });

// Getters para equipamiento y armas del activa
Object.defineProperty(window, 'arma1', { get: () => entidades[indexVisualizado].arma1, set: (v) => { entidades[indexVisualizado].arma1 = v; } });
Object.defineProperty(window, 'arma2', { get: () => entidades[indexVisualizado].arma2, set: (v) => { entidades[indexVisualizado].arma2 = v; } });
Object.defineProperty(window, 'equipo1', { get: () => entidades[indexVisualizado].equipo1, set: (v) => { entidades[indexVisualizado].equipo1 = v; } });
Object.defineProperty(window, 'equipo2', { get: () => entidades[indexVisualizado].equipo2, set: (v) => { entidades[indexVisualizado].equipo2 = v; } });
Object.defineProperty(window, 'equipo3', { get: () => entidades[indexVisualizado].equipo3, set: (v) => { entidades[indexVisualizado].equipo3 = v; } });
Object.defineProperty(window, 'habilidad1', { get: () => entidades[indexVisualizado].habilidad1, set: (v) => { entidades[indexVisualizado].habilidad1 = v; } });
Object.defineProperty(window, 'habilidad2', { get: () => entidades[indexVisualizado].habilidad2, set: (v) => { entidades[indexVisualizado].habilidad2 = v; } });
Object.defineProperty(window, 'habilidad3', { get: () => entidades[indexVisualizado].habilidad3, set: (v) => { entidades[indexVisualizado].habilidad3 = v; } });

`;

content = content.substring(0, insertIdx) + unificadoCode + content.substring(insertIdx);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Refactorización de clase completada en memoria.');
