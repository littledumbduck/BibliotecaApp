const main = document.querySelector('main');

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
    
        renderizarRSS();
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

async function renderizarRSS() {
    try {
        // 1. Descargar archivos
        const [xmlRes, xslRes] = await Promise.all([
            fetch('../xml/feed.xml'),
            fetch('../xsl/feed.xsl')
        ]);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(await xmlRes.text(), "text/xml");
        const xslDoc = parser.parseFromString(await xslRes.text(), "text/xml");

        // 2. Preparar el procesador XSLT
        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);

        // 3. Transformar
        const fragmento = xsltProcessor.transformToFragment(xmlDoc, document);

        // 4. Inyectar en el DOM
        const contenedor = document.getElementById("contenedor-feed");
        contenedor.innerHTML = ""; // Limpiamos carga previa
        contenedor.appendChild(fragmento);

    } catch (error) {
        console.error("Error al cargar el RSS:", error);
        document.getElementById("contenedor-feed").innerHTML = "No se pudo cargar el feed.";
    }
}

// Funciones clicks para cambiar el contenido del main
const elementInicio = document.getElementById('inicio');
const elementCatalogo = document.getElementById('catalogo');
const elementBuscador = document.getElementById('buscador');
const elementResenas = document.getElementById('resenas');
const elementEstadisticas = document.getElementById('estadisticas');
const elementRegister = document.getElementById('register');
const elementLogin = document.getElementById('login');

elementInicio.addEventListener('click', mostrarInicio);
elementCatalogo.addEventListener('click', mostrarCatalogo);

