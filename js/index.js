// Constantes para elementos del DOM
const main = document.querySelector('main');

// Mapa de acciones para los elementos de navegación
const actions = {
    'inicio': mostrarInicio,
    'catalogo': mostrarCatalogo,
    'about': mostrarBuscador,
    'resenas': () => alerta("Reseñas"),
    'estadisticas': () => alerta("Estadísticas"),
    'register': () => alerta("Registro")
};

// Asignar eventos a la navegación
Object.entries(actions).forEach(([id, func]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', func);
});

function emptyMain() {
    main.innerHTML = '';
}

function alerta(seccion) {
    alert(`La sección ${seccion} está en desarrollo.`);
}

function mostrarInicio() {
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h1>Bienvenido a la Biblioteca Virtual</h1>
            <p>Explora nuestro catálogo o utiliza el buscador avanzado.</p>
        </section>
        <aside id="sidebar-rss">
            <h3>Últimas Novedades (RSS)</h3>
            <div id="contenedor-feed">Cargando novedades...</div>
        </aside>`;
    renderizarRSS();
}

function mostrarCatalogo() {
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Catálogo Completo</h2>
            <p>Aquí se mostrarán todos los libros disponibles.</p>
        </section>`;
}

function mostrarBuscador() {
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Buscador Avanzado</h2>
            <div class="search-box">
                <input type="text" id="inputBusqueda" placeholder="Escribe el título del libro...">
                <select id="selectCategoria">
                    <option value="">Todas las categorías</option>
                    <option value="Ficción">Ficción</option>
                    <option value="Programación">Programación</option>
                    <option value="Historia">Historia</option>
                    <option value="Ciencia">Ciencia</option>
                    <option value="Filosofía">Filosofía</option>
                </select>
                <button id="btnEjecutarBusqueda">Buscar Libros</button>
            </div>
            <hr>
            <div id="contenedor-resultados">
                <p>Ingresa un criterio para comenzar la búsqueda.</p>
            </div>
        </section>`;

    document.getElementById('btnEjecutarBusqueda').addEventListener('click', realizarBusqueda);
}

// Función de Búsqueda Avanzada
async function realizarBusqueda() {
    const contenedor = document.getElementById('contenedor-resultados');
    const queryValue = document.getElementById('inputBusqueda').value.toLowerCase();
    const categoriaValue = document.getElementById('selectCategoria').value;

    contenedor.innerHTML = '<p>Buscando...</p>';

    try {
        // Carga de archivos (XML de biblioteca y XSL de búsqueda)
        const [xmlRes, xslRes] = await Promise.all([
            fetch('xml/biblioteca.xml'), 
            fetch('xsl/busquedaavanzada.xsl')
        ]);

        if (!xmlRes.ok || !xslRes.ok) throw new Error("Error al cargar archivos de datos.");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(await xmlRes.text(), "text/xml");
        const xslDoc = parser.parseFromString(await xslRes.text(), "text/xml");

        // Configuración del procesador XSLT
        const processor = new XSLTProcessor();
        processor.importStylesheet(xslDoc);

        // Paso de parámetros al XSLT
        processor.setParameter(null, "query", queryValue);
        processor.setParameter(null, "categoria", categoriaValue);

        // Transformación
        const fragmento = processor.transformToFragment(xmlDoc, document);

        contenedor.innerHTML = '';
        if (fragmento && fragmento.childNodes.length > 0) {
            contenedor.appendChild(fragmento);
        } else {
            contenedor.innerHTML = '<p>No se encontraron libros con esos criterios.</p>';
        }

    } catch (error) {
        console.error("Error en la búsqueda:", error);
        contenedor.innerHTML = '<p style="color:red">Error técnico al realizar la búsqueda. Revisa la consola.</p>';
    }
}

// Función para el RSS (Novedades)
async function renderizarRSS() {
    const contenedor = document.getElementById("contenedor-feed");
    try {
        const [xmlRes, xslRes] = await Promise.all([
            fetch('xml/feed.xml'),
            fetch('xsl/feed.xsl')
        ]);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(await xmlRes.text(), "text/xml");
        const xslDoc = parser.parseFromString(await xslRes.text(), "text/xml");

        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);

        const fragmento = xsltProcessor.transformToFragment(xmlDoc, document);
        contenedor.innerHTML = "";
        contenedor.appendChild(fragmento);
    } catch (error) {
        contenedor.innerHTML = "No se pudo cargar el feed de noticias.";
    }
}

// Carga inicial
window.onload = mostrarInicio;