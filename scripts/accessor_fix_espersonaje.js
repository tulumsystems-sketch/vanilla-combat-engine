const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

const targetText = `Object.defineProperty(window, 'esPersonaje', { get: () => indexVisualizado === 0 });`;
const replacedText = `Object.defineProperty(window, 'esPersonaje', { 
  get: () => indexVisualizado === 0,
  set: (v) => { if (v) indexVisualizado = 0; }
});`;

if (content.indexOf(targetText) !== -1) {
    content = content.replace(targetText, replacedText);
} else {
    console.warn("No se encontró el texto de definición exacto para esPersonaje.");
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Setter de esPersonaje actualizado.');
