const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Modificar la definición de esbirroSeleccionado para que tenga setter retroactivo
const targetText = `Object.defineProperty(window, 'esbirroSeleccionado', { get: () => entidades[indexVisualizado] });`;
const replacedText = `Object.defineProperty(window, 'esbirroSeleccionado', { 
  get: () => entidades[indexVisualizado],
  set: (v) => {
    const idx = entidades.indexOf(v);
    if (idx !== -1) indexVisualizado = idx;
  }
});`;

if (content.indexOf(targetText) !== -1) {
    content = content.replace(targetText, replacedText);
} else {
    console.warn("No se encontró el texto de definición exacto para esbirroSeleccionado.");
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Accessors de esbirroSeleccionado actualizados.');
