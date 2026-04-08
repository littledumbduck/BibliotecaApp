<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="query" select="''" />
    <xsl:param name="categoria" select="''" />

    <xsl:template match="/">
        <div class="resultados">
            <xsl:for-each select="catalogo/libro[
                contains(translate(titulo, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', 'abcdefghijklmnñopqrstuvwxyz'), $query) and 
                ($categoria = '' or categoria = $categoria)
            ]">
                <div class="libro">
                    <p><xsl:value-of select="titulo"/></p>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>