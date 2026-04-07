const main = document.body;

function emptyMain() {
    main.innerHTML = '';
}

function mostrarInicio() {
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            dfgdfgsdfgdfgdfg
        </section>
        <aside id="sidebar-rss">
            <h3>Últimas Novedades (RSS)</h3>
            <div id="contenedor-feed"></div>
        </aside>`;
    
}

function mostrarCatalogo() {
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            Catálogo de Libros
        </section>`;
}

function alerta() {
    alert("Funcionalidad en desarrollo");
}

// Funciones clicks para cambiar el contenido del main
const elementInicio = document.getElementById('inicio');
const elementCatalogo = document.getElementById('catalogo');
const elementBuscador = document.getElementById('buscador');
const elementResenas = document.getElementById('resenas');
const elementEstadisticas = document.getElementById('estadisticas');
const elementRegister = document.getElementById('register');
const elementLogin = document.getElementById('login');

elementInicio.addEventListener('click', alerta);
elementCatalogo.addEventListener('click', mostrarCatalogo);

