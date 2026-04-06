const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Unificar establecerExperiencia
content = content.replace(/function establecerExperiencia\(valor\) \{[\s\S]*?cerrarEdicion\(\)\s*\}/, 
`function establecerExperiencia(valor) {
    if (!valor) valor = 0;
    experiencia += valor;
    imprimirPersonaje();
    cerrarEdicion();
}`);

// 2. Unificar aumentarDisminuirExperiencia
content = content.replace(/function aumentarDisminuirExperiencia\(tipo, accion, estadistica\) \{[\s\S]*?\}\s*\}/,
`function aumentarDisminuirExperiencia(tipo, accion, estadistica) {
    let valor;
    const entidad = entidades[indexVisualizado];
    if (estadistica === 'vidaMaxima' || estadistica === 'poderMaximo') {
        valor = 1;
    } else {
        valor = accion === "mas"
            ? (entidad[estadistica] === 0 ? 1 : entidad[estadistica] + 1) * valorExperiencia[estadistica]
            : entidad[estadistica] * valorExperiencia[estadistica];
    }
    experiencia += accion === "mas" ? valor : valor * -1;
}`);

// 3. Unificar modificarEstadistica
content = content.replace(/function modificarEstadistica\(atributo\) \{[\s\S]*?consolaBtn\.innerHTML = data\s*\}/,
`function modificarEstadistica(atributo) {
    mostrarBtnArribaAbajo();
    estadisticaSeleccionada = atributo;
    const entidad = entidades[indexVisualizado];
    let data;
    if (atributo === 'vidaMaxima') {
        data = \`Vida \${entidad.vida} / \${entidad.vidaMaxima}\`;
    } else if (atributo === 'poderMaximo') {
        data = \`Maná \${entidad.poder} / \${entidad.poderMaximo}\`;
    } else {
        data = \`\${capitalizarPrimeraLetra(atributo)} \${entidad[atributo]}\`;
    }
    consolaBtn.innerHTML = data;
}`);

// 4. Unificar modificarValores
content = content.replace(/function modificarValores\(accion, estadistica\) \{[\s\S]*?\}\s*\}/,
`function modificarValores(accion, estadistica) {
    let data = "";
    const entidad = entidades[indexVisualizado];
    let valor = (estadistica === 'vidaMaxima' || estadistica === 'poderMaximo') 
        ? 1 : (entidad[estadistica] + 1) * valorExperiencia[estadistica];

    if (accion === 'mas') {
        if (experiencia >= valor) {
            entidad[estadistica]++;
            aumentarDisminuirExperiencia(null, 'menos', estadistica);
            imprimirPersonaje();
            modificarEstadistica(estadistica);
        } else {
            consolaBtn.innerHTML = "Experiencia insuficiente";
        }
    } else {
        if (entidad[estadistica] > 0) {
            entidad[estadistica]--;
            aumentarDisminuirExperiencia(null, 'mas', estadistica);
            if (estadistica === 'vidaMaxima' && entidad.vidaMaxima < entidad.vida) entidad.vida--;
            if (estadistica === 'poderMaximo' && entidad.poderMaximo < entidad.poder) entidad.poder--;
            imprimirPersonaje();
            modificarEstadistica(estadistica);
        }
    }
}`);

// 5. Unificar masMenosVidaPoder
content = content.replace(/function masMenosVidaPoder\(accion\) \{[\s\S]*?guardarEstadoPersonaje\(\)\s*\}/,
`function masMenosVidaPoder(accion) {
    const entidad = entidades[indexVisualizado];
    const eq1 = entidad.equipo1 || {};
    const eq2 = entidad.equipo2 || {};
    const eq3 = entidad.equipo3 || {};
    
    let vidaMax = entidad.vidaMaxima + (eq1.vidaMaxima || 0) + (eq2.vidaMaxima || 0) + (eq3.vidaMaxima || 0);
    let poderMax = entidad.poderMaximo + (eq1.poderMaximo || 0) + (eq2.poderMaximo || 0) + (eq3.poderMaximo || 0);

    if (estadisticaSeleccionada === "vida") {
        if (accion === "mas") { if (entidad.vida < vidaMax) entidad.vida++; }
        else { if (entidad.vida > 0) entidad.vida--; }
        consolaBtn.innerHTML = \`Vida \${entidad.vida} / \${vidaMax}\`;
    } else if (estadisticaSeleccionada === "poder") {
        if (accion === "mas") { if (entidad.poder < poderMax) entidad.poder++; }
        else { if (entidad.poder > 0) entidad.poder--; }
        consolaBtn.innerHTML = \`Maná \${entidad.poder} / \${poderMax}\`;
    }
    imprimirPersonaje();
    if (indexVisualizado === 0) guardarEstadoPersonaje();
    else guardarEstadoListaEsbirros();
}`);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Refactorización unificada completada.');
