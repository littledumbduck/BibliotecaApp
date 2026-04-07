<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <div class="lista-rss">
        <xsl:for-each select="rss/channel/item">
        <div class="noticia-rss">
            <a href="{link}" style="font-weight:bold; color:#3498db; text-decoration:none;">
            <xsl:value-of select="title"/>
            </a>
            <p style="margin: 5px 0;"><xsl:value-of select="description"/></p>
            <small><xsl:value-of select="pubDate"/></small>
        </div>
        </xsl:for-each>
    </div>
    </xsl:template>
</xsl:stylesheet>