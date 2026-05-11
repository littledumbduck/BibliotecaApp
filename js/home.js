function mostrarInicio() {
    if (!requireLogin()) return;

    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h1>Bienvenido a la Biblioteca Virtual</h1>
            <p>Has iniciado sesión como <strong>${usuarioActual.usuario}</strong>.</p>
            <p>Tu correo registrado es <strong>${usuarioActual.email}</strong>.</p>
        </section>
        <aside id="sidebar-rss">
            <h3>Últimas Novedades (RSS)</h3>
            <div id="contenedor-feed">Cargando novedades...</div>
        </aside>`;

    renderizarRSS();
}

