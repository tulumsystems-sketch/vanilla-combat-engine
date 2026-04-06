const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'comandos.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Unificar cambio de personaje/esbirro inicial
content = content.replace(/if \(personajesDict\[comando\]\) \{[\s\S]*?\} else \{contenConsola\("NO EXISTE " \+ comando\)\}/,
`if (personajesDict[comando] || esbirrosDict[comando]) {
    const data = personajesDict[comando] || esbirrosDict[comando];
    if (esPersonaje) avatar(comando);
    else cambiarEsbirro(comando);
} else {
    // Si no es un nombre de entidad, seguimos procesando otros comandos
}`);

// 2. Unificar /full
content = content.replace(/if \(comando === '\/full'\) \{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}\s*\}/,
`if (comando === '/full') {
    const entidad = entidades[indexVisualizado];
    entidad.vida = entidad.vidaMaxima;
    entidad.poder = entidad.poderMaximo;
    contenConsola("ESTADO RESTABLECIDO");
    imprimirPersonaje();
}`);

// 3. Unificar /reencarnar
content = content.replace(/if \(comando === '\/reencarnar'\) \{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}\s*\}/,
`if (comando === '/reencarnar') {
    const lista = esPersonaje ? listaPersonajes : listaEsbirros;
    const nombre = lista[Math.floor(Math.random() * lista.length)];
    if (esPersonaje) avatar(nombre);
    else cambiarEsbirro(nombre);
}`);

// 4. Unificar /licantropo
content = content.replace(/if \(comando === '\/licantropo'\) \{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}\s*\}/,
`if (comando === '/licantropo') {
    cambiarArma('mordisco', 1);
    cambiarArma('garras', 2);
    contenConsola("LICANTROPÍA ACTIVADA");
}`);

// 5. Ajustar /reload para que sea más limpio (aunque sea un reset total)
// Eliminamos las asignaciones directas a variables que ya no existen o son getters
content = content.replace(/personaje = \{[\s\S]*?\};/g, "// Personaje reseteado via localStorage.clear()");
content = content.replace(/arma1 = armasDict\.nada;/g, "");
content = content.replace(/arma2 = armasDict\.nada;/g, "");

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Comandos unificados en comandos.js.');
