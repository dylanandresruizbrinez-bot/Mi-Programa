const sistema = {

```
estado: "ACTIVO",

modo: "NORMAL",

energia: 100,

estabilidad: 100,

errores: 0,

tareas: 0,

prioridad: "BAJA",

nivelIA: 1,

memoriaUso: 0,

cpuUso: 0,

ultimaRevision: "--:--:--",

diagnostico: "Iniciando...",

accionPendiente: null
```

};

const estadisticas = {

```
tiempoActivo: 0,

revisiones: 0,

decisiones: 0,

erroresDetectados: 0,

correcciones: 0,

aprendizajes: 0
```

};

const memoria = {

```
eventos: [],

decisiones: [],

aprendizajes: [],

historialEstados: [],

tareasCompletadas: 0
```

};

// ======================================
// REGISTRO
// ======================================

function registrar(tipo, mensaje) {

```
const evento = {

    hora: new Date().toLocaleTimeString(),

    tipo,

    mensaje

};

memoria.eventos.push(evento);
```

}

// ======================================
// MONITOR
// ======================================

function revisarEnergia() {

```
sistema.energia = Math.max(
    0,
    sistema.energia - Math.floor(Math.random() * 2)
);
```

}

function revisarErrores() {

```
if (Math.random() < 0.1) {

    sistema.errores++;

    estadisticas.erroresDetectados++;

    registrar(
        "ERROR",
        "Error detectado."
    );

}
```

}

function revisarEstabilidad() {

```
sistema.estabilidad =
    Math.max(
        0,
        100 - (sistema.errores * 5)
    );
```

}

function monitor() {

```
revisarEnergia();

revisarErrores();

revisarEstabilidad();

sistema.cpuUso =
    Math.floor(Math.random() * 100);

sistema.tareas =
    Math.floor(Math.random() * 10);

sistema.ultimaRevision =
    new Date().toLocaleTimeString();

estadisticas.revisiones++;

registrar(
    "ANALISIS",
    "Revisión completada."
);
```

}

// ======================================
// ANALIZADOR
// ======================================

function obtenerDiagnostico() {

```
if (sistema.errores >= 10) {

    return "Sistema crítico";

}

if (sistema.energia < 20) {

    return "Energía baja";

}

return "Funcionamiento normal";
```

}

function analizar() {

```
if (sistema.energia >= 70) {

    sistema.prioridad = "BAJA";

}

else if (sistema.energia >= 40) {

    sistema.prioridad = "MEDIA";

}

else if (sistema.energia >= 20) {

    sistema.prioridad = "ALTA";

}

else {

    sistema.prioridad = "CRITICA";

}

sistema.diagnostico =
    obtenerDiagnostico();

registrar(
    "ANALISIS",
    sistema.diagnostico
);
```

}

// ======================================
// DECISOR
// ======================================

function decidir() {

```
sistema.accionPendiente = null;

if (sistema.errores >= 10) {

    sistema.accionPendiente =
        "EMERGENCIA";

    return;

}

if (sistema.errores >= 5) {

    sistema.accionPendiente =
        "REPARAR";

    return;

}

if (sistema.energia < 20) {

    sistema.accionPendiente =
        "ACTIVAR_AHORRO";

    return;

}

if (sistema.estabilidad < 50) {

    sistema.accionPendiente =
        "OPTIMIZAR";

    return;

}

if (
    sistema.cpuUso > 80 ||
    sistema.tareas > 8
) {

    sistema.accionPendiente =
        "REDUCIR_CARGA";

}
```

}

// ======================================
// MEMORIA
// ======================================

function guardarDecision(accion) {

```
memoria.decisiones.push({

    hora: new Date().toLocaleTimeString(),

    accion

});
```

}

function guardarEstado() {

```
memoria.historialEstados.push({

    hora: new Date().toLocaleTimeString(),

    energia: sistema.energia,

    estabilidad: sistema.estabilidad,

    errores: sistema.errores,

    modo: sistema.modo

});
```

}

function aprender(regla) {

```
memoria.aprendizajes.push({

    hora: new Date().toLocaleTimeString(),

    regla

});

estadisticas.aprendizajes++;
```

}

function guardarMemoria() {

```
localStorage.setItem(

    "autocore_memoria",

    JSON.stringify(memoria)

);
```

}

function cargarMemoria() {

```
const datos =
    localStorage.getItem(
        "autocore_memoria"
    );

if (datos) {

    Object.assign(
        memoria,
        JSON.parse(datos)
    );

}
```

}

// ======================================
// EJECUTOR
// ======================================

function activarAhorro() {

```
sistema.modo = "AHORRO";

registrar(
    "ACCION",
    "Modo ahorro activado."
);
```

}

function repararSistema() {

```
sistema.errores = 0;

estadisticas.correcciones++;

registrar(
    "ACCION",
    "Sistema reparado."
);
```

}

function optimizarSistema() {

```
sistema.estabilidad = 100;

registrar(
    "ACCION",
    "Optimización completada."
);
```

}

function reducirCarga() {

```
sistema.cpuUso =
    Math.max(0,
    sistema.cpuUso - 30);

sistema.tareas =
    Math.max(0,
    sistema.tareas - 3);

registrar(
    "ACCION",
    "Carga reducida."
);
```

}

function protocoloEmergencia() {

```
sistema.modo = "EMERGENCIA";

sistema.errores = 0;

sistema.cpuUso = 10;

sistema.tareas = 0;

sistema.estabilidad = 100;

registrar(
    "EMERGENCIA",
    "Protocolo ejecutado."
);
```

}

function ejecutar() {

```
if (!sistema.accionPendiente) return;

guardarDecision(
    sistema.accionPendiente
);

switch (sistema.accionPendiente) {

    case "ACTIVAR_AHORRO":
        activarAhorro();
        break;

    case "REPARAR":
        repararSistema();
        break;

    case "OPTIMIZAR":
        optimizarSistema();
        break;

    case "REDUCIR_CARGA":
        reducirCarga();
        break;

    case "EMERGENCIA":
        protocoloEmergencia();
        break;

}

estadisticas.decisiones++;

sistema.accionPendiente = null;
```

}

// ======================================
// INTERFAZ
// ======================================

function actualizarUI() {

```
const energia =
    document.getElementById(
        "energiaActual"
    );

if (energia) {

    energia.textContent =
        sistema.energia + "%";

}

const modo =
    document.getElementById(
        "modoActual"
    );

if (modo) {

    modo.textContent =
        sistema.modo;

}

const errores =
    document.getElementById(
        "erroresActuales"
    );

if (errores) {

    errores.textContent =
        sistema.errores;

}
```

}

// ======================================
// CICLO PRINCIPAL
// ======================================

function cicloPrincipal() {

```
monitor();

analizar();

decidir();

ejecutar();

guardarEstado();

guardarMemoria();

actualizarUI();
```

}

cargarMemoria();

setInterval(
cicloPrincipal,
5000
);

registrar(
"SISTEMA",
"AutoCore iniciado."
);
