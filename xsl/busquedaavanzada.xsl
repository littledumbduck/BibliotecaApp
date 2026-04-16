<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="titulo" select="''" />
    <xsl:param name="autor" select="''" />
    <xsl:param name="isbn" select="''" />
    <xsl:param name="palabrasClave" select="''" />
    <xsl:param name="categoria" select="''" />

    <xsl:template match="/">
        <div class="resultados-grid">
            <xsl:for-each select="biblioteca/libro[
                ($titulo = '' or contains(
                    translate(titulo, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ', 'abcdefghijklmnñopqrstuvwxyzáéíóúü'),
                    $titulo
                )) and
                ($autor = '' or contains(
                    translate(autor, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ', 'abcdefghijklmnñopqrstuvwxyzáéíóúü'),
                    $autor
                )) and
                ($isbn = '' or contains(isbn, $isbn)) and
                ($palabrasClave = '' or contains(
                    translate(palabras_clave, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ', 'abcdefghijklmnñopqrstuvwxyzáéíóúü'),
                    $palabrasClave
                )) and
                ($categoria = '' or categoria = $categoria)
            ]">
                <div class="libro-card">
                    <h4><xsl:value-of select="titulo"/></h4>
                    <p><strong>Autor: </strong> <xsl:value-of select="autor"/></p>
                    <p><strong>ISBN: </strong> <xsl:value-of select="isbn"/></p>
                    <p><strong>Categoría: </strong> <xsl:value-of select="categoria"/></p>
                    <p><strong>Palabras clave: </strong> <xsl:value-of select="palabras_clave"/></p>
                    <p class="descripcion"><xsl:value-of select="descripcion"/></p>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>