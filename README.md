# 📚 BibliotecaApp

**BibliotecaApp** es una plataforma web integral diseñada para la gestión de recursos bibliográficos, perfiles de usuario y sistemas de interacción mediante reseñas. El proyecto destaca por una arquitectura modular que separa los datos (**XML**), la lógica de negocio (**JS**) e interfaces dinámicas (**XSLT/CSS**).

---

## 🌳 Estructura del Proyecto

Esta es la jerarquía completa de archivos que componen la aplicación:

```BibliotecaApp/
├── index.html              # Punto de entrada y contenedor principal
├── css/
│   └── styles.css          # Estilos globales y diseño responsivo
├── js/
│   ├── index.js            # Inicialización y gestión de carga de datos
│   ├── auth.js             # Sistema de autenticación y seguridad de acceso
│   ├── catalogo.js         # Lógica de visualización y manejo del catálogo
│   ├── usuarios.js         # Administración de perfiles de usuario
│   ├── resenas.js          # Control de comentarios y valoraciones
│   ├── estadisticas.js     # Procesamiento de métricas y datos del sistema 
│   ├── home.js             # Controladores específicos de la página de inicio
│   ├── search.js           # Motor de búsqueda y filtrado de recursos
│   └── feed.js             # Gestión de novedades y noticias dinámicas
├── xml/
│   ├── biblioteca.xml      # Base de datos local de libros 
│   ├── usuarios.xml        # Almacén de usuarios registrados (credenciales)
│   ├── resenas.xml         # Histórico de feedback de la comunidad
│   └── feed.xml            # Datos de noticias y actualizaciones
└── xsl/
    ├── biblioteca.xsl      # Transformación para renderizar el catálogo 
    ├── busquedaavanzada.xsl # Interfaz personalizada para resultados de búsqueda
    └── feed.xsl            # Formato de visualización para el feed de noticias
``` 

---

## 🏗️ Módulos Principales

### 🔒 Autenticación y Seguridad
Gestionado a través de `js/auth.js`, este módulo controla el flujo de acceso y validación de usuarios guardándolo en la caché del navegador.

### 📖 Gestión de Catálogo
El núcleo funcional reside en `js/catalogo.js`, que procesa la información de `xml/biblioteca.xml` para presentarla mediante las reglas de renderizado de `xsl/biblioteca.xsl`.

### ✍️ Comunidad y Reseñas
Permite a los usuarios interactuar con el catálogo. Las reseñas se almacenan en `xml/resenas.xml` y se gestionan mediante `js/resenas.js` para su visualización dinámica.

### 🔍 Motor de Búsqueda
Implementa un motor de filtrado en `js/search.js` que utiliza `xsl/busquedaavanzada.xsl` para presentar resultados precisos y detallados.

### 📊 Estadísticas y Métricas
El archivo `js/estadisticas.js` se encarga de analizar los datos globales para ofrecer una visión cuantitativa del uso de la biblioteca.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+).
* **Persistencia de Datos:** XML 1.0 (UTF-8).
* **Renderizado Dinámico:** XSLT (eXtensible Stylesheet Language Transformations).
* **Navegación:** SPA (Single Page Application) orientada a la carga de fragmentos mediante JS.

---

## 🚀 Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Debido al uso de transformaciones **XML/XSLT**, es necesario ejecutar el proyecto a través de un servidor local (como *Live Server* en VS Code) para evitar bloqueos de seguridad del navegador (CORS).
3. Accede a `index.html` para iniciar la aplicación.
4. Crea un usuario 

---

## 📖 Memorias

Habiendo empezado el proyecto el 6 de abril con el primer commit, empecé con conocimientos sobre HTML y CSS, XML, XLS y xPath, además de conocimientos básicos de JavaScript. De esta forma, tuve que aprender bastante sobre la clase DOM para poder hacer el proyecto, ya que mi idea era crear una única página `index.html` y que el DOM se encargase de cambiar el contenido de la página según qué pestaña se quiera mostrar. Entonces empecé haciendo el proyecto con un solo `index.html`, `styles.css` y un `index.js`.

Al hacer la estructura básica, empecé con la parte de XML, el cual creé `biblioteca.xml` y `feed.xml` para empezar a implementar los xsl en la página. Todo el contenido de los archivos xml han sido generados por inteligencia artificial para hacer más completo el proyecto y tener contenido amplio para poder indexarlo por los elementos de búsqueda de la web.

Mientras más pestañas iba creando, me di cuenta de que el index.js era demasiado grande, por lo que empecé a separar código creando todos los .js que existen ahora en el proyecto para poder ir un poco más organizado.

A falta de un servidor, se ha creado un sistema de autentificación de usuario que en principio no es funcional, ya que solamente sirve para poder ver el perfil de administrador que se muestra en la pestaña "perfil". Los usuarios que se creen no se guardarán en el archivo XML, sino en la caché del navegador, ya que para poder hacerlo funcional es necesario crear y desplegar un servidor backend para la aplicación, cosa que por el momento se escapa bastante de mis conocimientos.

Gran parte del proyecto ha sido creado bajo mi esfuerzo, ya que todo lo que estaba a mi alcance lo he intentado escribir yo, aunque han habido funciones que se escapaban de mi experiencia que han sido generadas con Inteligencia Artificial. 

---