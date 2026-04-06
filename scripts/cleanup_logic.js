const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Eliminar modificarAtributosEsbirro (ya cubierto por unificada modificarValores)
content = content.replace(/function modificarAtributosEsbirro\(accion, atributo\) \{[\s\S]*?mostrarEsbirroSeleccionado\(\)\s*\}/, "");

// 2. Eliminar modificarVidaPoderActualEsbirro (ya cubierto por masMenosVidaPoder)
content = content.replace(/function modificarVidaPoderActualEsbirro\(accion\) \{[\s\S]*?mostrarEsbirroSeleccionado\(\)\s*\}/, "");

// 3. Eliminar comprobaciones redundantes de if (esPersonaje) en handlers de clics base
// Buscamos patrones comunes para simplificarlos
content = content.replace(/if \(edicion && !esPersonaje\) \{[\s\S]*?\} else if \(!esPersonaje\) \{[\s\S]*?\}/g, (match) => {
    // Si detectamos que llama a modificarEstadistica o mostrarEstadistica, lo simplificamos a la llamada directa
    if (match.includes('modificarEstadistica')) {
        const attrMatch = match.match(/modificarEstadistica\(['"](.+?)['"]\)/);
        if (attrMatch) return `modificarEstadistica('${attrMatch[1]}')`;
    }
    return match;
});

// 4. Limpiar variables globales sueltas que ya están en entidades[0]
// Buscamos el inicio del bloque de variables de personaje (que ya refactorizamos antes)
// y nos aseguramos que no queden var arma1 = {} etc fuera si el usuario las agregó manualmente
const redundancyClean = [
   /var arma1 = \{\}/g, /var arma2 = \{\}/g,
   /var equipo1 = \{\}/g, /var equipo2 = \{\}/g, /var equipo3 = \{\}/g,
   /var habilidad1 = \{\}/g, /var habilidad2 = \{\}/g, /var habilidad3 = \{\}/g
];

redundancyClean.forEach(regex => {
    content = content.replace(regex, "");
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Limpieza de código duplicado completada.');
