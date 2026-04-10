<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="query" select="''" />
    <xsl:param name="categoria" select="''" />

    <xsl:template match="/">
        <div class="resultados-grid">
            <!-- Cambio crítico: de 'catalogo/libro' a 'biblioteca/libro' -->
            <xsl:for-each select="biblioteca/libro[
                contains(
                    translate(titulo, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ', 'abcdefghijklmnñopqrstuvwxyzáéíóúü'),
                    $query
                ) and
                ($categoria = '' or categoria = $categoria)
            ]">
                <div class="libro-card">
                    <h4><xsl:value-of select="titulo"/></h4>
                    <p><strong>Autor:</strong> <xsl:value-of select="autor"/></p>
                    <p><strong>Categoría:</strong> <xsl:value-of select="categoria"/></p>
                    <p class="descripcion"><xsl:value-of select="descripcion"/></p>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>