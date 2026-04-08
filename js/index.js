// Constantes para elementos del DOM
const main = document.querySelector('main');

// Mapa de acciones para los elementos
const actions = {
    'inicio': mostrarInicio,
    'catalogo': mostrarCatalogo,
    'about': mostrarBuscador,
    'resenas': alerta,
    'estadisticas': alerta,
    'register': alerta,
    'login': alerta
};

// Agregar event listeners
for (const [id, func] of Object.entries(actions)) {
    document.getElementById(id).addEventListener('click', func);
}

// Funcion para limpiar main
function emptyMain() {
    main.innerHTML = '';
}

// Funciones de cambio de pestaña
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

function mostrarBuscador() {
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Buscador Avanzado</h2>
            <div class="search-box">
                <input type="text" id="inputBusqueda" placeholder="Buscar por título...">
                <select id="selectCategoria">
                    <option value="">Todas las categorías</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Historia">Historia</option>
                </select>
                <button id="btnEjecutarBusqueda">Filtrar con XSLT</button>
            </div>
            <div id="contenedor-resultados">
                </div>
        </section>`;

    // Importante: El listener debe ponerse DESPUÉS de crear el botón en el DOM
    document.getElementById('btnEjecutarBusqueda').addEventListener('click', realizarBusqueda);
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

// Función para pruebas

function alerta() {
    alert("Funcionalidad en desarrollo");
}

function realizarBusqueda() {
    const textoBusqueda = document.getElementById('inputBusqueda').value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('selectCategoria').value;
    
    const processor = new XSLTProcessor();
    processor.importStylesheet(xslDoc);

    // Pasamos los parámetros al XSLT
    processor.setParameter(null, "query", textoBusqueda);
    processor.setParameter(null, "categoria", categoriaSeleccionada);

    // Realizamos la transformación
    const fragmentoContenido = processor.transformToFragment(xmlDoc, document);

    // Inyectamos el resultado en el DOM
    const contenedor = document.getElementById('contenedor-resultados');
    contenedor.innerHTML = ''; 
    contenedor.appendChild(fragmentoContenido);
}