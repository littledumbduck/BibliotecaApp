async function mostrarEstadisticas() {
    if (!requireLogin()) return;

    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Estadísticas de libros</h2>
            <div class="estadisticas-grid">
                <article class="estadistica-card">
                    <h3>Total de libros</h3>
                    <p id="total-libros">Cargando...</p>
                </article>
                <article class="estadistica-card">
                    <h3>Total de categorías</h3>
                    <p id="total-categorias">Cargando...</p>
                </article>
                <article class="estadistica-card">
                    <h3>Libros en stock</h3>
                    <p id="total-stock">Cargando...</p>
                </article>
                <article class="estadistica-card">
                    <h3>Préstamos totales</h3>
                    <p id="total-prestamos">Cargando...</p>
                </article>
                <article class="estadistica-card">
                    <h3>Promedio de préstamos</h3>
                    <p id="promedio-prestamos">Cargando...</p>
                </article>
            </div>

            <section class="estadisticas-detalle">
                <h3>Top 5 libros más prestados</h3>
                <div id="top-libros" class="estadisticas-list">Cargando...</div>
            </section>

            <section class="estadisticas-detalle">
                <h3>Libros por categoría</h3>
                <div id="por-categoria" class="estadisticas-list">Cargando...</div>
            </section>
        </section>`;

    await renderEstadisticas();
}

async function renderEstadisticas() {
    const contenedorTop = document.getElementById('top-libros');
    const contenedorCategoria = document.getElementById('por-categoria');
    try {
        const response = await fetch('xml/biblioteca.xml');
        if (!response.ok) throw new Error('No se pudo cargar el catálogo.');

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const libros = Array.from(xmlDoc.querySelectorAll('libro'));

        const totalLibros = libros.length;
        const totalStock = libros.reduce((sum, libro) => sum + Number(getTagValue(libro, 'stock') || 0), 0);
        const totalPrestamos = libros.reduce((sum, libro) => sum + Number(getTagValue(libro, 'prestamos') || 0), 0);
        const categorias = libros.reduce((map, libro) => {
            const categoria = getTagValue(libro, 'categoria') || 'Sin categoría';
            map[categoria] = (map[categoria] || 0) + 1;
            return map;
        }, {});
        const topLibros = libros
            .slice()
            .sort((a, b) => Number(getTagValue(b, 'prestamos') || 0) - Number(getTagValue(a, 'prestamos') || 0))
            .slice(0, 5);

        document.getElementById('total-libros').textContent = totalLibros;
        document.getElementById('total-categorias').textContent = Object.keys(categorias).length;
        document.getElementById('total-stock').textContent = totalStock;
        document.getElementById('total-prestamos').textContent = totalPrestamos;
        document.getElementById('promedio-prestamos').textContent = totalLibros ? (totalPrestamos / totalLibros).toFixed(1) : '0.0';

        renderTopLibros(contenedorTop, topLibros);
        renderCategorias(contenedorCategoria, categorias);
    } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        document.getElementById('total-libros').textContent = 'Error';
        document.getElementById('total-categorias').textContent = 'Error';
        document.getElementById('total-stock').textContent = 'Error';
        document.getElementById('total-prestamos').textContent = 'Error';
        document.getElementById('promedio-prestamos').textContent = 'Error';
        if (contenedorTop) contenedorTop.innerHTML = '<p style="color:red;">No se pudieron cargar las estadísticas.</p>';
        if (contenedorCategoria) contenedorCategoria.innerHTML = '<p style="color:red;">No se pudieron cargar las estadísticas.</p>';
    }
}

function renderTopLibros(container, topLibros) {
    if (!container) return;
    if (!topLibros.length) {
        container.innerHTML = '<p>No hay datos de préstamos.</p>';
        return;
    }

    container.innerHTML = '';
    const lista = document.createElement('ol');
    topLibros.forEach(libro => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>${getTagValue(libro, 'titulo')}</strong>
            <span>${getTagValue(libro, 'autor')} — ${getTagValue(libro, 'prestamos')} préstamos</span>
        `;
        lista.appendChild(item);
    });
    container.appendChild(lista);
}

function renderCategorias(container, categorias) {
    if (!container) return;

    const keys = Object.keys(categorias);
    if (!keys.length) {
        container.innerHTML = '<p>No hay categorías disponibles.</p>';
        return;
    }

    container.innerHTML = '';
    const lista = document.createElement('div');
    lista.className = 'estadisticas-categorias';
    const sortedKeys = [...keys].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    sortedKeys.forEach(categoria => {
        const item = document.createElement('div');
        item.className = 'categoria-item';
        item.innerHTML = `
            <strong>${categoria}</strong>
            <span>${categorias[categoria]} libro(s)</span>
        `;
        lista.appendChild(item);
    });

    container.appendChild(lista);
}

function getTagValue(parent, tagName) {
    const element = parent.querySelector(tagName);
    return element ? element.textContent.trim() : '';
}
