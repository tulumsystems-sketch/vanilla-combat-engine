const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'faell', 'OneDrive', 'Escritorio', 'Guille', 'vanilla-combat-engine', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Unificar función accion(slot)
const unificadaAccion = `function accion(slot) {
    const entidad = entidades[indexVisualizado];
    const eq1 = entidad.equipo1 || {};
    const eq2 = entidad.equipo2 || {};
    const eq3 = entidad.equipo3 || {};

    const atributos = {
        ataque: (entidad.ataque || 0) + (eq1.ataque || 0) + (eq2.ataque || 0) + (eq3.ataque || 0),
        esquiva: (entidad.esquiva || 0) + (eq1.esquiva || 0) + (eq2.esquiva || 0) + (eq3.esquiva || 0),
        bloqueo: (entidad.bloqueo || 0) + (eq1.bloqueo || 0) + (eq2.bloqueo || 0) + (eq3.bloqueo || 0),
        velocidad: (entidad.velocidad || 0) + (eq1.velocidad || 0) + (eq2.velocidad || 0) + (eq3.velocidad || 0),
        vidaMaxima: (entidad.vidaMaxima || 0) + (eq1.vidaMaxima || 0) + (eq2.vidaMaxima || 0) + (eq3.vidaMaxima || 0),
        poderMaximo: (entidad.poderMaximo || 0) + (eq1.poderMaximo || 0) + (eq2.poderMaximo || 0) + (eq3.poderMaximo || 0)
    };

    let dado = Math.floor(Math.random() * 20) + 1;
    let msg = "";

    if (objetoAccion == "arma") {
        let arma = slot == 1 ? entidad.arma1 : entidad.arma2;
        if (arma.tipo == "mecanomagica") {
            if (entidad.poder < arma.coste) { contenConsola("Poder insuficiente"); return; }
            entidad.poder -= arma.coste;
        }

        let baseVal = (arma.tipo == "proteccion") ? atributos.bloqueo : atributos.ataque;
        let finalVal = Math.floor(arma.danno * baseVal);

        if (dado >= 19) msg = \`\${arma.nombre.toUpperCase()}<br>¡CRITICO!<br>Efecto: \${finalVal * 2}\`;
        else if (dado == 1) msg = \`\${arma.nombre.toUpperCase()}<br>¡PIFIA!<br>Efecto: 0\`;
        else msg = \`\${arma.nombre.toUpperCase()}<br>Tirada: \${dado + baseVal}<br>Efecto: \${finalVal}<br>Alcance: \${baseVal * arma.alcance}\`;
    } 
    else if (objetoAccion === "habilidad") {
        if (entidad.poder < habilidadSeleccionada.coste) { contenConsola("Maná insuficiente"); return; }
        
        let arma = slotArmaSeleccionada === 1 ? entidad.arma1 : entidad.arma2;
        let baseVal = (arma.tipo == "proteccion") ? atributos.bloqueo : atributos.ataque;
        let finalVal = Math.floor((arma.danno * baseVal) + (habilidadSeleccionada.coste || 0));

        entidad.poder -= habilidadSeleccionada.coste;

        if (dado >= 19) msg = \`\${habilidadSeleccionada.nombre} con \${arma.nombre}<br>¡CRITICO!<br>Total: \${finalVal * 2}\`;
        else if (dado == 1) msg = \`\${habilidadSeleccionada.nombre}<br>¡PIFIA!<br>Total: 0\`;
        else msg = \`\${habilidadSeleccionada.nombre} con \${arma.nombre}<br>Tirada: \${dado + baseVal}<br>Total: \${finalVal}<br>Alcance: \${baseVal * arma.alcance}\`;
    } 
    else {
        switch (slot) {
            case 1: msg = \`Ataque limpio<br>Total: \${dado + atributos.ataque}\`; break;
            case 2: msg = \`Esquiva<br>Total: \${dado + atributos.esquiva}\`; break;
            case 3: msg = \`Bloqueo<br>Total: \${dado + atributos.bloqueo}\`; break;
            case 4: msg = \`Velocidad<br>Total: \${dado + atributos.velocidad}\`; break;
            default: msg = \`Tirada limpia<br>Resultado: \${dado}\`; break;
        }
    }

    contenConsola(msg);
    imprimirPersonaje();
    if (indexVisualizado === 0) guardarEstadoPersonaje(); else guardarEstadoListaEsbirros();
}`;

content = content.replace(/function accion\(slot\) \{[\s\S]*?\n\s*\}\s*\}/, unificadaAccion + "\n}");

// 2. Simplificar el eventListener del botón de acción
content = content.replace(/accionBtn\.addEventListener\('click', \(\) => \{[\s\S]*?\}\)/, 
`accionBtn.addEventListener('click', () => {
    if (!edicion) {
        accion(objetoAccion === 'arma' ? slotArmaSeleccionada : 
               objetoAccion === 'habilidad' ? slotHabilidadSeleccionada : 
               slotEstadisticaSeleccionada);
    }
})`);

// 3. Eliminar funciones de acción de esbirros duplicadas
content = content.replace(/function accionEsbirroArma[\s\S]*?\}\s*\}/g, "");
content = content.replace(/function accionEsbirroHabilidad[\s\S]*?\}\s*\}/g, "");
content = content.replace(/function accionEsbirroAtributo[\s\S]*?\}\s*\}/g, "");

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Motor de combate unificado.');
