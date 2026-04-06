# 🛡️ Meeple Combat - RPG Engine (Vanilla JS)

Bienvenido al **Meeple Combat Engine**, un motor de juego de rol de mesa digitalizado, construido 100% en Vanilla JavaScript, diseñado para ser ligero, modular y extremadamente fácil de "moddear".

## 🚀 Arquitectura del Motor

El motor ha sido refactorizado para seguir principios **SOLID** y una arquitectura **Data-Driven**. La lógica principal está separada de los datos, permitiendo expandir el contenido sin tocar el código core.

### Estructura de Módulos (js/)
- `engine.js`: El corazón del sistema. Define la clase `Entidad` y el objeto global `GameState`.
- `persistencia.js`: Gestión de guardado/carga atómica en `localStorage` y archivos `.txt`.
- `mochila.js`: Lógica de economía (oro/plata/bronce) y consumibles.
- `edicion.js`: Herramientas para modificar estadísticas y atributos en tiempo real.
- `combate.js`: Resolución de acciones, cálculo de daño y uso de habilidades.
- `UI_render.js`: Motor de actualización visual del DOM basado en el estado.
- `UI_modals.js`: Control centralizado de ventanas y diálogos.
- `UI_events.js`: Orquestador de interactividad del usuario.
- `UI_dynamic.js`: Generador automático de interfaces (modales de armas, listas, etc.).

---

## 🛠️ Guía para Modders (Añadir Contenido)

Todo el contenido del juego se define en los archivos `js/datos.*.js`. No es necesario modificar el HTML para añadir nuevos elementos.

### 1. Añadir Habilidades (`datos.habilidades.js`)
Busca el diccionario `habilidadesDict` y añade tu nueva entrada:

```javascript
"bola_fuego": {
    nombre: "Bola de Fuego",
    descripcion: "Lanza una esfera ardiente que causa gran daño.",
    coste: 5,
    tipo: "magia"
}
```

### 2. Añadir Armas (`datos.armas.js`)
Las armas se definen en `armasDict`. Pueden ser físicas o mágicas:

```javascript
"espada_leyenda": {
    nombre: "Espada de Leyenda",
    danno: 15,
    img: "img/espada_oro.png",
    descripcion: "Una espada forjada por dioses."
}
```

### 3. Añadir Personajes o Esbirros
Edita `datos.personajes.js` o `datos.esbirros.js`. El motor unifica ambos bajo la misma estructura:

```javascript
"guerrero_elite": {
    nombre: "Guerrero de Élite",
    ataque: 10,
    vidaMaxima: 100,
    poderMaximo: 20,
    portada: "img/pj_guerrero.png"
}
```

---

## 💾 Sistema de Estado (GameState)

El motor utiliza un objeto único de verdad llamado `GameState`. 

- **Persistencia**: Todos los datos se guardan bajo la clave `meeple_combat_state` en el navegador.
- **Entidades**: El juego maneja 6 slots de entidades (Índice 0 = Héroe, 1-5 = Esbirros).
- **QR / URL**: Puedes cargar personajes específicos mediante parámetros GET: 
  `?personaje=guerrero_elite&esbirro1=lobo_feroz`

---

## 📜 Reglas de Oro para Desarrolladores
1. **No al HTML Estático**: Si necesitas un nuevo botón o lista, genéralo dinámicamente en `UI_dynamic.js`.
2. **SRP (Single Responsibility)**: Si añades lógica de red, crea `js/network.js`, no la pongas en `main.js`.
3. **Inmutabilidad**: Procura no modificar los diccionarios de `datos.*.js` en tiempo de ejecución; usa `actualizarPropiedades()` de la clase `Entidad`.

---

Desarrollado con ❤️ para la comunidad de Meeple Combat.
