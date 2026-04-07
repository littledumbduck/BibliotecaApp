async function renderizarRSS() {
    try {
        // 1. Descargar archivos
        const [xmlRes, xslRes] = await Promise.all([
            fetch('../xml/feed.xml'),
            fetch('../xsl/feed.xsl')
        ]);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(await xmlRes.text(), "text/xml");
        const xslDoc = parser.parseFromString(await xslRes.text(), "text/xml");

        // 2. Preparar el procesador XSLT
        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);

        // 3. Transformar
        const fragmento = xsltProcessor.transformToFragment(xmlDoc, document);

        // 4. Inyectar en el DOM
        const contenedor = document.getElementById("contenedor-feed");
        contenedor.innerHTML = ""; // Limpiamos carga previa
        contenedor.appendChild(fragmento);

    } catch (error) {
        console.error("Error al cargar el RSS:", error);
        document.getElementById("contenedor-feed").innerHTML = "No se pudo cargar el feed.";
    }
}

// Llamar a la función cuando se cargue la página
window.addEventListener('DOMContentLoaded', renderizarRSS);