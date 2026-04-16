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
            <form id="formularioBusqueda">
                <div class="search-box">
                    <label for="titulo">Título:</label>
                    <input type="text" id="titulo" name="titulo" placeholder="Escribe el título del libro...">
                    
                    <label for="autor">Autor:</label>
                    <input type="text" id="autor" name="autor" placeholder="Escribe el autor...">
                    
                    <label for="isbn">ISBN:</label>
                    <input type="text" id="isbn" name="isbn" placeholder="Escribe el ISBN...">
                    
                    <label for="palabrasClave">Palabras clave:</label>
                    <input type="text" id="palabrasClave" name="palabrasClave" placeholder="Escribe palabras clave...">
                    
                    <label for="categoria">Categoría:</label>
                    <select id="categoria" name="categoria">
                        <option value="">Todas las categorías</option>
                        <option value="Ficción">Ficción</option>
                        <option value="Programación">Programación</option>
                        <option value="Historia">Historia</option>
                        <option value="Ciencia">Ciencia</option>
                        <option value="Filosofía">Filosofía</option>
                    </select>
                    
                    <button type="button" id="btnEjecutarBusqueda">Buscar Libros</button>
                </div>
            </form>
            <hr>
            <div id="contenedor-resultados">
                <p>Ingresa un criterio para comenzar la búsqueda.</p>
            </div>
        </section>`;

    document.getElementById('btnEjecutarBusqueda').addEventListener('click', realizarBusqueda);
    document.getElementById('categoria').addEventListener('change', realizarBusqueda);
    document.getElementById('palabrasClave').addEventListener('input', realizarBusqueda);
    document.getElementById('titulo').addEventListener('input', realizarBusqueda);
    document.getElementById('autor').addEventListener('input', realizarBusqueda);
    document.getElementById('isbn').addEventListener('input', realizarBusqueda);

    // Optional: allow search on enter in any input
    const inputs = document.querySelectorAll('#formularioBusqueda input');
    inputs.forEach(input => input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') realizarBusqueda();
    }));
}

// Función de Búsqueda Avanzada
async function realizarBusqueda() {
    const contenedor = document.getElementById('contenedor-resultados');
    const tituloValue = document.getElementById('titulo').value.toLowerCase();
    const autorValue = document.getElementById('autor').value.toLowerCase();
    const isbnValue = document.getElementById('isbn').value.toLowerCase();
    const palabrasClaveValue = document.getElementById('palabrasClave').value.toLowerCase();
    const categoriaValue = document.getElementById('categoria').value;

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
        processor.setParameter(null, "titulo", tituloValue);
        processor.setParameter(null, "autor", autorValue);
        processor.setParameter(null, "isbn", isbnValue);
        processor.setParameter(null, "palabrasClave", palabrasClaveValue);
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