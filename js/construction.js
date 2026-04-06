const element = document.querySelector('body');

element.innerHTML = `<!-- Navegación -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">📚 Biblioteca</div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="#inicio" class="nav-link">Inicio</a></li>
                <li class="nav-item"><a href="#catalogo" class="nav-link">Catálogo de libros</a></li>
                <li class="nav-item"><a href="#about" class="nav-link">Buscador avanzado</a></li>
                <li class="nav-item"><a href="#resenas" class="nav-link">Reseñas</a></li>
                <li class="nav-item"><a href="#estadisticas" class="nav-link">Estadísticas</a></li>
                <li class="nav-item"><a href="#register" class="nav-link">Registrarse</a></li>
            </ul>
        </div>
    </nav>

    

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Síguenos</h3>
                <div class="social-icons">
                    <a href="https://facebook.com" target="_blank" class="social-link facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" class="social-link twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" class="social-link instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" class="social-link linkedin">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            <div class="footer-section">
                <p>&copy; 2026 Biblioteca. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`