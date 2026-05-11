# 📚 BibliotecaApp

[cite_start]**BibliotecaApp** es una plataforma web integral diseñada para la gestión de recursos bibliográficos, perfiles de usuario y sistemas de interacción mediante reseñas. [cite: 1, 193] [cite_start]El proyecto destaca por una arquitectura modular que separa los datos (**XML**), la lógica de negocio (**JS**) e interfaces dinámicas (**XSLT/CSS**). [cite: 167, 186, 193]

---

## 🌳 Estructura del Proyecto

[cite_start]Esta es la jerarquía completa de archivos que componen la aplicación: [cite: 1]

```text
BibliotecaApp/
├── index.html              # Punto de entrada y contenedor principal [cite: 1, 172]
├── css/
│   └── styles.css          # Estilos globales y diseño responsivo [cite: 1, 166]
├── js/
│   ├── index.js            # Inicialización y gestión de carga de datos [cite: 1, 186]
│   ├── auth.js             # Sistema de autenticación y seguridad de acceso [cite: 173]
│   ├── catalogo.js         # Lógica de visualización y manejo del catálogo [cite: 176]
│   ├── usuarios.js         # Administración de perfiles de usuario [cite: 110]
│   ├── resenas.js          # Control de comentarios y valoraciones [cite: 1, 187]
│   ├── estadisticas.js     # Procesamiento de métricas y datos del sistema 
│   ├── home.js             # Controladores específicos de la página de inicio [cite: 1, 185]
│   ├── search.js           # Motor de búsqueda y filtrado de recursos [cite: 190]
│   └── feed.js             # Gestión de novedades y noticias dinámicas [cite: 1, 183]
├── xml/
│   ├── biblioteca.xml      # Base de datos local de libros 
│   ├── usuarios.xml        # Almacén de usuarios registrados (credenciales) [cite: 212]
│   ├── resenas.xml         # Histórico de feedback de la comunidad [cite: 200]
│   └── feed.xml            # Datos de noticias y actualizaciones [cite: 1, 199]
└── xsl/
    ├── biblioteca.xsl      # Transformación para renderizar el catálogo 
    ├── busquedaavanzada.xsl # Interfaz personalizada para resultados de búsqueda [cite: 1, 213]
    └── feed.xsl            # Formato de visualización para el feed de noticias [cite: 1, 215]```

---

## 🏗️ Módulos Principales

### 🔒 Autenticación y Seguridad
[cite_start]Gestionado a través de `js/auth.js`, este módulo controla el flujo de acceso y validación de usuarios contra el archivo `xml/usuarios.xml`. [cite: 173, 212]

### 📖 Gestión de Catálogo
[cite_start]El núcleo funcional reside en `js/catalogo.js`, que procesa la información de `xml/biblioteca.xml` para presentarla mediante las reglas de renderizado de `xsl/biblioteca.xsl`. [cite: 176, 193, 212]

### ✍️ Comunidad y Reseñas
Permite a los usuarios interactuar con el catálogo. [cite_start]Las reseñas se almacenan en `xml/resenas.xml` y se gestionan mediante `js/resenas.js` para su visualización dinámica. [cite: 187, 200]

### 🔍 Motor de Búsqueda
[cite_start]Implementa un motor de filtrado en `js/search.js` que utiliza `xsl/busquedaavanzada.xsl` para presentar resultados precisos y detallados. [cite: 190, 213]

### 📊 Estadísticas y Métricas
[cite_start]El archivo `js/estadisticas.js` se encarga de analizar los datos globales para ofrecer una visión cuantitativa del uso de la biblioteca. [cite: 180]

---

## 🛠️ Tecnologías Utilizadas

* [cite_start]**Frontend:** HTML5, CSS3, JavaScript (ES6+). [cite: 166, 172, 186]
* [cite_start]**Persistencia de Datos:** XML 1.0 (UTF-8). [cite: 193, 212]
* [cite_start]**Renderizado Dinámico:** XSLT (eXtensible Stylesheet Language Transformations). [cite: 212, 213]
* [cite_start]**Navegación:** SPA (Single Page Application) orientada a la carga de fragmentos mediante JS. [cite: 186]

---

## 🚀 Instalación y Uso

1. [cite_start]Clona este repositorio en tu máquina local. [cite: 1]
2. [cite_start]Debido al uso de transformaciones **XML/XSLT**, es necesario ejecutar el proyecto a través de un servidor local (como *Live Server* en VS Code) para evitar bloqueos de seguridad del navegador (CORS). [cite: 172]
3. [cite_start]Accede a `index.html` para iniciar la aplicación. [cite: 172]

---
*README generado para documentar la estructura técnica del proyecto BibliotecaApp.*
