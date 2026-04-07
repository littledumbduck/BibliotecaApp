
function emptyMain() {
    const main = document.getElementById('contenido-principal');
    main.innerHTML = '';
}

// Funciones clicks para cambiar el contenido del main
elementInicio = document.getElementById('inicio');
elementCatalogo = document.getElementById('catalogo');
elementBuscador = document.getElementById('buscador');
elementResenas = document.getElementById('resenas');
elementEstadisticas = document.getElementById('estadisticas');
elementRegister = document.getElementById('register');
elementLogin = document.getElementById('login');

elementInicio.addEventListener('click', mostrarInicio);
elementCatalogo.addEventListener('click', mostrarCatalogo);
elementBuscador.addEventListener('click', mostrarBuscador);
elementResenas.addEventListener('click', mostrarResenas);
elementEstadisticas.addEventListener('click', mostrarEstadisticas);
elementRegister.addEventListener('click', mostrarRegister);
elementLogin.addEventListener('click', mostrarLogin);