let usuarioActual = null;
const xmlUsuariosKey = 'usuariosXML';

async function initAuth() {
    usuarioActual = await getUsuarioActual();
    updateAuthNav();
}

function updateAuthNav() {
    const loginLink = document.getElementById('login');
    const registerLink = document.getElementById('register');
    if (!loginLink || !registerLink) return;

    if (usuarioActual) {
        loginLink.textContent = 'Cerrar sesión';
        registerLink.textContent = `Hola, ${usuarioActual.usuario}`;
        setAuthenticatedNav(true);
    } else {
        loginLink.textContent = 'Iniciar sesión';
        registerLink.textContent = 'Registrarse';
        setAuthenticatedNav(false);
    }
}

function setAuthenticatedNav(isAuthenticated) {
    const idsToToggle = ['inicio', 'catalogo', 'about', 'resenas', 'estadisticas', 'perfil'];
    idsToToggle.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const parent = el.parentElement;
        if (!parent) return;
        parent.style.display = isAuthenticated ? '' : 'none';
    });
}

function requireLogin() {
    if (!usuarioActual) {
        mostrarLogin();
        return false;
    }
    return true;
}

async function getUsuarioActual() {
    const xmlDoc = await loadUsuariosXML();
    const session = xmlDoc.querySelector('session');
    if (!session) return null;

    const usuario = session.getAttribute('usuario');
    const email = session.getAttribute('email');
    if (!usuario || !email) return null;
    return { usuario, email };
}

async function guardarUsuarioActual(usuario) {
    usuarioActual = usuario;
    updateAuthNav();
    await updateSessionInXML(usuario);
}

async function cerrarSesion() {
    await clearSessionInXML();
    usuarioActual = null;
    updateAuthNav();
    mostrarLogin();
}

async function loadUsuariosXML() {
    const parser = new DOMParser();
    const cached = localStorage.getItem(xmlUsuariosKey);

    if (cached) {
        return parser.parseFromString(cached, "text/xml");
    }

    const response = await fetch('xml/usuarios.xml');
    if (!response.ok) throw new Error("No se pudo cargar el archivo de usuarios.");
    const xmlText = await response.text();
    return parser.parseFromString(xmlText, "text/xml");
}

async function saveUsuariosXML(xmlDoc) {
    const xmlString = new XMLSerializer().serializeToString(xmlDoc);
    localStorage.setItem(xmlUsuariosKey, xmlString);
}

async function updateSessionInXML(usuario) {
    const xmlDoc = await loadUsuariosXML();
    let session = xmlDoc.querySelector('session');
    if (!session) {
        session = xmlDoc.createElement('session');
        xmlDoc.documentElement.appendChild(session);
    }
    session.setAttribute('usuario', usuario.usuario);
    session.setAttribute('email', usuario.email);
    await saveUsuariosXML(xmlDoc);
}

async function clearSessionInXML() {
    const xmlDoc = await loadUsuariosXML();
    const session = xmlDoc.querySelector('session');
    if (session) {
        session.remove();
        await saveUsuariosXML(xmlDoc);
    }
}

function findUsuario(xmlDoc, identifier) {
    identifier = identifier.trim().toLowerCase();
    return Array.from(xmlDoc.querySelectorAll('usuario')).find(usuario => {
        const nombre = usuario.getAttribute('usuario')?.toLowerCase() ?? '';
        const email = usuario.getAttribute('email')?.toLowerCase() ?? '';
        return nombre === identifier || email === identifier;
    });
}

async function registrarUsuario(event) {
    if (event) event.preventDefault();

    const usuario = document.getElementById('reg-usuario').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-password-confirm').value;
    const mensaje = document.getElementById('reg-mensaje');

    mensaje.textContent = '';
    mensaje.style.color = 'var(--accent-color)';

    if (!usuario || !email || !password || !confirmPassword) {
        mensaje.textContent = 'Completa todos los campos.';
        return;
    }
    if (password !== confirmPassword) {
        mensaje.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    try {
        const xmlDoc = await loadUsuariosXML();
        if (findUsuario(xmlDoc, usuario) || findUsuario(xmlDoc, email)) {
            mensaje.textContent = 'El usuario o correo ya existe.';
            return;
        }

        const usuarioNode = xmlDoc.createElement('usuario');
        usuarioNode.setAttribute('usuario', usuario);
        usuarioNode.setAttribute('email', email);
        usuarioNode.setAttribute('password', password);
        xmlDoc.documentElement.appendChild(usuarioNode);

        saveUsuariosXML(xmlDoc);
        await guardarUsuarioActual({ usuario, email });

        mensaje.style.color = 'green';
        mensaje.textContent = 'Registro exitoso. Bienvenido!';
        setTimeout(() => mostrarInicio(), 1000);
    } catch (error) {
        console.error(error);
        mensaje.textContent = 'Error técnico al registrar usuario.';
    }
}

async function loginUsuario(event) {
    if (event) event.preventDefault();

    const identificador = document.getElementById('login-identificador').value.trim();
    const password = document.getElementById('login-password').value;
    const mensaje = document.getElementById('login-mensaje');

    mensaje.textContent = '';
    mensaje.style.color = 'var(--accent-color)';

    if (!identificador || !password) {
        mensaje.textContent = 'Completa todos los campos.';
        return;
    }

    try {
        const xmlDoc = await loadUsuariosXML();
        const usuarioNode = findUsuario(xmlDoc, identificador);
        if (!usuarioNode || usuarioNode.getAttribute('password') !== password) {
            mensaje.textContent = 'Credenciales incorrectas.';
            return;
        }

        await guardarUsuarioActual({
            usuario: usuarioNode.getAttribute('usuario'),
            email: usuarioNode.getAttribute('email')
        });

        mensaje.style.color = 'green';
        mensaje.textContent = 'Inicio de sesión correcto.';
        setTimeout(() => mostrarInicio(), 1000);
    } catch (error) {
        console.error(error);
        mensaje.textContent = 'Error técnico al iniciar sesión.';
    }
}

function mostrarLogin() {
    if (usuarioActual) {
        cerrarSesion();
        return;
    }

    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Iniciar Sesión</h2>
            <form id="formLogin" class="auth-form">
                <label for="login-identificador">Usuario o correo electrónico:</label>
                <input type="text" id="login-identificador" placeholder="usuario o correo">
                <label for="login-password">Contraseña:</label>
                <input type="password" id="login-password" placeholder="Contraseña">
                <button type="submit">Entrar</button>
                <p id="login-mensaje" class="auth-mensaje"></p>
            </form>
        </section>`;

    document.getElementById('formLogin').addEventListener('submit', loginUsuario);
}

function mostrarRegister() {
    if (usuarioActual) {
        emptyMain();
        main.innerHTML = `
            <section id="contenido-principal">
                <h2>Ya has iniciado sesión</h2>
                <p>Actualmente estás conectado como <strong>${usuarioActual.usuario}</strong>.</p>
                <button type="button" id="btnCerrarSesion">Cerrar sesión</button>
            </section>`;
        document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
        return;
    }

    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Registrarse</h2>
            <form id="formRegister" class="auth-form">
                <label for="reg-usuario">Nombre de usuario:</label>
                <input type="text" id="reg-usuario" placeholder="Escribe tu usuario">
                <label for="reg-email">Correo electrónico:</label>
                <input type="email" id="reg-email" placeholder="tucorreo@ejemplo.com">
                <label for="reg-password">Contraseña:</label>
                <input type="password" id="reg-password" placeholder="Contraseña">
                <label for="reg-password-confirm">Confirmar contraseña:</label>
                <input type="password" id="reg-password-confirm" placeholder="Repite la contraseña">
                <button type="submit">Crear cuenta</button>
                <p id="reg-mensaje" class="auth-mensaje"></p>
            </form>
        </section>`;

    document.getElementById('formRegister').addEventListener('submit', registrarUsuario);
}

function mostrarPerfil() {
    if (!requireLogin()) return;
    emptyMain();
    main.innerHTML = `
        <section id="contenido-principal">
            <h2>Perfil de Usuario</h2>
            <div class="profile-card">
                <p><strong>Usuario:</strong> ${usuarioActual.usuario}</p>
                <p><strong>Correo:</strong> ${usuarioActual.email}</p>
                <p><strong>Estado:</strong> Conectado</p>
                <button type="button" id="btnCerrarSesionPerfil">Cerrar sesión</button>
            </div>
        </section>`;

    document.getElementById('btnCerrarSesionPerfil').addEventListener('click', cerrarSesion);
}
