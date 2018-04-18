var gl; // Un variable global para el contexto WebGL

function start() {
    var canvas = document.getElementById("glcanvas");

    gl = initWebGL(canvas);      // Inicializar el contexto GL

    // Solo continuar si WebGL esta disponible y trabajando

    if (gl) {
        console.log("y aqui tambien");
    }
}

function initWebGL(canvas) {
    gl = null;
    console.log("si llego");
    try {
        // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    // Si no tenemos ningun contexto GL, date por vencido ahora
    if (!gl) {
        alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
        gl = null;
    }

    return gl;
}