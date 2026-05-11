async function mostrarResenas() {
    if (!requireLogin()) return;

    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Reseñas de libros</h2>
            <p>Lee opiniones reales de nuestros lectores sobre los libros disponibles en la biblioteca.</p>
            <div class="resenas-actions">
                <input id="resenas-busqueda" type="search" placeholder="Buscar por libro, autor, usuario o contenido...">
                <button type="button" id="btnBuscarResenas">Buscar</button>
            </div>
            <div class="resenas-summary">
                <p id="resenas-count">Cargando reseñas...</p>
                <p id="libros-count"></p>
            </div>
            <div id="resenas-container" class="resenas-container"></div>
        </section>`;

    document.getElementById('btnBuscarResenas').addEventListener('click', () => renderResenas());
    document.getElementById('resenas-busqueda').addEventListener('input', () => renderResenas());

    await renderResenas();
}

async function renderResenas() {
    const contenedor = document.getElementById('resenas-container');
    const resenasCount = document.getElementById('resenas-count');
    const librosCount = document.getElementById('libros-count');

    try {
        const response = await fetch('xml/resenas.xml');
        if (!response.ok) throw new Error('No se pudo cargar el archivo de reseñas.');

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const libros = Array.from(xmlDoc.querySelectorAll('libro'));

        const totalLibros = libros.length;
        const totalResenas = libros.reduce((sum, libro) => sum + libro.querySelectorAll('resena').length, 0);

        resenasCount.textContent = `Total de reseñas: ${totalResenas}`;
        librosCount.textContent = `Libros con reseñas: ${totalLibros}`;

        if (!libros.length) {
            contenedor.innerHTML = '<p>No hay reseñas disponibles en este momento.</p>';
            return;
        }

        contenedor.innerHTML = '';

        const searchValue = document.getElementById('resenas-busqueda')?.value.trim().toLowerCase() || '';
        const filteredBooks = libros.map(libro => {
            const titulo = libro.getAttribute('titulo') || getTagValue(libro, 'titulo');
            const autor = libro.getAttribute('autor') || getTagValue(libro, 'autor');
            const reviews = Array.from(libro.querySelectorAll('resena'));
            const matchedReviews = reviews.filter(resena => {
                const usuario = resena.getAttribute('usuario') || '';
                const texto = resena.textContent || '';
                const combined = `${titulo} ${autor} ${usuario} ${texto}`.toLowerCase();
                return combined.includes(searchValue);
            });
            return { libro, titulo, autor, reviews: matchedReviews };
        }).filter(book => book.reviews.length > 0);

        const totalResenasFiltradas = filteredBooks.reduce((sum, book) => sum + book.reviews.length, 0);
        const librosFiltrados = filteredBooks.length;

        resenasCount.textContent = searchValue
            ? `Reseñas encontradas: ${totalResenasFiltradas}`
            : `Total de reseñas: ${totalResenas}`;
        librosCount.textContent = searchValue
            ? `Libros encontrados: ${librosFiltrados}`
            : `Libros con reseñas: ${totalLibros}`;

        if (!filteredBooks.length) {
            contenedor.innerHTML = '<p>No se encontraron reseñas para el criterio de búsqueda.</p>';
            return;
        }

        contenedor.innerHTML = '';

        filteredBooks.forEach(({ libro, titulo, autor, reviews }) => {
            const bookCard = document.createElement('article');
            bookCard.className = 'resena-book';

            bookCard.innerHTML = `
                <div class="resena-book-header">
                    <div>
                        <h3>${titulo}</h3>
                        <p>Autor: <strong>${autor}</strong></p>
                        <p class="resenas-count">${reviews.length} reseña(s)</p>
                    </div>
                </div>
                <div class="resenas-list"></div>`;

            const list = bookCard.querySelector('.resenas-list');

            reviews.forEach(resena => {
                const item = document.createElement('div');
                item.className = 'resena-card';
                item.innerHTML = `
                    <div class="resena-header">
                        <span class="resena-usuario">${resena.getAttribute('usuario') || 'Anónimo'}</span>
                        <span class="resena-rating">${renderRating(resena.getAttribute('rating'))}</span>
                    </div>
                    <p class="resena-texto">${resena.textContent.trim()}</p>
                    <div class="resena-meta">${resena.getAttribute('fecha') || 'Fecha desconocida'}</div>`;
                list.appendChild(item);
            });

            contenedor.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error al renderizar reseñas:', error);
        if (resenasCount) resenasCount.textContent = 'Error al cargar reseñas.';
        if (librosCount) librosCount.textContent = '';
        if (contenedor) contenedor.innerHTML = '<p style="color:red;">No se pudieron cargar las reseñas. Revisa la consola.</p>';
    }
}

function renderRating(rating) {
    const score = Number(rating) || 0;
    const maxStars = 5;
    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
        stars += i <= score ? '★' : '☆';
    }
    return `<span class="rating-stars">${stars}</span>`;
}

function getTagValue(parent, tagName) {
    const element = parent.querySelector(tagName);
    return element ? element.textContent.trim() : '';
}
