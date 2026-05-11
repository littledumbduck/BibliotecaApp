async function mostrarCatalogo() {
    if (!requireLogin()) return;

    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Catálogo Completo</h2>
            <p>Explora todos los libros disponibles en nuestra colección.</p>
            <div id="catalogo-container">
                <p>Cargando catálogo...</p>
            </div>
        </section>`;

    await renderCatalogo();
}

async function renderCatalogo() {
    const contenedor = document.getElementById('catalogo-container');
    if (!contenedor) return;

    try {
        const response = await fetch('xml/biblioteca.xml');
        if (!response.ok) throw new Error('No se pudo cargar el catálogo.');

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const libros = Array.from(xmlDoc.querySelectorAll('libro'));

        if (!libros.length) {
            contenedor.innerHTML = '<p>No hay libros disponibles en el catálogo.</p>';
            return;
        }

        const lista = document.createElement('div');
        lista.className = 'catalogo-lista';

        libros.forEach(libro => {
            const item = document.createElement('article');
            item.className = 'catalogo-libro';
            item.innerHTML = `
                <h3>${getTagValue(libro, 'titulo')}</h3>
                <p><strong>Autor:</strong> ${getTagValue(libro, 'autor')}</p>
                <p><strong>ISBN:</strong> ${getTagValue(libro, 'isbn')}</p>
                <p><strong>Categoría:</strong> ${getTagValue(libro, 'categoria')}</p>
                <p><strong>Año:</strong> ${getTagValue(libro, 'anio_publicacion')}</p>
                <p><strong>Editorial:</strong> ${getTagValue(libro, 'editorial')}</p>
                <p><strong>Stock:</strong> ${getTagValue(libro, 'stock')}</p>
                ${getTagValue(libro, 'descripcion') ? `<p><strong>Descripción:</strong> ${getTagValue(libro, 'descripcion')}</p>` : ''}
            `;
            lista.appendChild(item);
        });

        contenedor.innerHTML = '';
        contenedor.appendChild(lista);
    } catch (error) {
        console.error('Error al cargar el catálogo:', error);
        contenedor.innerHTML = `<p style="color:red;">Error técnico al cargar el catálogo. Revisa la consola.</p>`;
    }
}

function getTagValue(parent, tagName) {
    const element = parent.querySelector(tagName);
    return element ? element.textContent.trim() : '';
}
