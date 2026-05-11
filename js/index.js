let main = document.querySelector('main');

const actions = {
    'inicio': mostrarInicio,
    'catalogo': mostrarCatalogo,
    'about': mostrarBuscador,
    'resenas': mostrarResenas,
    'estadisticas': mostrarEstadisticas,
    'perfil': mostrarPerfil,
    'login': mostrarLogin,
    'register': mostrarRegister
};

function bindNavigation() {
    Object.entries(actions).forEach(([id, func]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', func);
    });
}

window.onload = async () => {
    bindNavigation();
    await initAuth();
    if (usuarioActual) {
        mostrarInicio();
    } else {
        mostrarLogin();
    }
};

function emptyMain() {
    main.innerHTML = '';
}

function alerta(seccion) {
    alert(`La sección ${seccion} está en desarrollo.`);
}
